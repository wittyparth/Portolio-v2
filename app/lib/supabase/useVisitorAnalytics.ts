import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase, isSupabaseConfigured, getVisitorFingerprint } from './client';
import type { VisitorStats } from './types';

export interface UseVisitorAnalyticsReturn {
    visitorCount: number;
    formattedCount: string;
    todayCount: number;
    thisWeekCount: number;
    onlineNow: number;
    loading: boolean;
    error: string | null;
    trackPageView: (path: string) => Promise<void>;
}

// Format number to human readable (1.2k, 1.5M, etc.)
function formatCount(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return num.toString();
}

export function useVisitorAnalytics(): UseVisitorAnalyticsReturn {
    const [stats, setStats] = useState<Record<string, number>>({
        total: 0,
        today: 0,
        this_week: 0,
        online_now: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const hasTracked = useRef(false);
    const pageLoadTime = useRef(Date.now());

    // Track the current visitor
    const trackVisitor = useCallback(async () => {
        if (!isSupabaseConfigured() || typeof window === 'undefined') return;

        try {
            const fingerprint = getVisitorFingerprint();

            // Upsert visitor
            const { error: upsertError } = await supabase.from('visitors').upsert(
                {
                    fingerprint,
                    user_agent: navigator.userAgent,
                    last_visit: new Date().toISOString(),
                },
                {
                    onConflict: 'fingerprint',
                    ignoreDuplicates: false,
                }
            );

            if (upsertError && upsertError.code !== '23505') {
                console.error('Error tracking visitor:', upsertError);
            }

            // Update visit count for returning visitors
            await supabase.rpc('increment_visitor_count', { fp: fingerprint }).catch(() => {
                // RPC might not exist, that's okay
            });
        } catch (err) {
            console.error('Error tracking visitor:', err);
        }
    }, []);

    // Track page view
    const trackPageView = useCallback(async (path: string) => {
        if (!isSupabaseConfigured() || typeof window === 'undefined') return;

        try {
            const fingerprint = getVisitorFingerprint();

            // Get visitor ID
            const { data: visitor } = await supabase
                .from('visitors')
                .select('id')
                .eq('fingerprint', fingerprint)
                .single();

            if (visitor) {
                const duration = Date.now() - pageLoadTime.current;
                pageLoadTime.current = Date.now();

                await supabase.from('page_views').insert({
                    visitor_id: visitor.id,
                    page_path: path,
                    referrer: document.referrer || null,
                    duration_ms: duration,
                });
            }
        } catch (err) {
            console.error('Error tracking page view:', err);
        }
    }, []);

    // Fetch stats
    const fetchStats = useCallback(async () => {
        if (!isSupabaseConfigured()) {
            // Return demo stats
            setStats({
                total: 15420,
                today: 127,
                this_week: 892,
                online_now: 3,
            });
            setLoading(false);
            return;
        }

        try {
            setLoading(true);

            const { data, error: fetchError } = await supabase
                .from('visitor_stats')
                .select('stat_type, count');

            if (fetchError) throw fetchError;

            const statsMap: Record<string, number> = {};
            data?.forEach((stat: VisitorStats) => {
                statsMap[stat.stat_type] = stat.count;
            });

            setStats({
                total: statsMap.total || 0,
                today: statsMap.today || 0,
                this_week: statsMap.this_week || 0,
                online_now: statsMap.online_now || 0,
            });

            setError(null);
        } catch (err) {
            console.error('Error fetching visitor stats:', err);
            setError('Failed to load visitor stats');
            setStats({
                total: 15420,
                today: 127,
                this_week: 892,
                online_now: 3,
            });
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial tracking and fetch
    useEffect(() => {
        if (!hasTracked.current) {
            hasTracked.current = true;
            trackVisitor();
        }
        fetchStats();
    }, [trackVisitor, fetchStats]);

    // Real-time subscription for stats
    useEffect(() => {
        if (!isSupabaseConfigured()) return;

        const channel = supabase
            .channel('visitor-stats-changes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'visitor_stats' },
                (payload) => {
                    if (payload.new) {
                        const stat = payload.new as VisitorStats;
                        setStats((prev) => ({
                            ...prev,
                            [stat.stat_type]: stat.count,
                        }));
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // Track page unload for duration
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleUnload = () => {
            // Use sendBeacon for reliable tracking on page unload
            if (navigator.sendBeacon && isSupabaseConfigured()) {
                const duration = Date.now() - pageLoadTime.current;
                // This would require a server endpoint to process
                // For now, we track duration on next page view
            }
        };

        window.addEventListener('beforeunload', handleUnload);
        return () => window.removeEventListener('beforeunload', handleUnload);
    }, []);

    return {
        visitorCount: stats.total,
        formattedCount: formatCount(stats.total),
        todayCount: stats.today,
        thisWeekCount: stats.this_week,
        onlineNow: stats.online_now,
        loading,
        error,
        trackPageView,
    };
}

// Hook for simple visitor counter display
export function useVisitorCount(): { count: number; formatted: string; loading: boolean } {
    const { visitorCount, formattedCount, loading } = useVisitorAnalytics();
    return { count: visitorCount, formatted: formattedCount, loading };
}
