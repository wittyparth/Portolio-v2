import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from './client';
import type { LiveStatus } from './types';

// Default fallback status
const FALLBACK_STATUS: Record<string, Record<string, unknown>> = {
    online_status: { status: 'online', message: 'Building something cool...' },
    now_playing: { title: 'Not playing', artist: '', isPlaying: false },
    current_activity: { activity: 'coding', project: 'Portfolio' },
    weather: { temp: '28°C', condition: 'Sunny', city: 'Hyderabad' },
};

export interface OnlineStatus {
    status: 'online' | 'away' | 'offline';
    message: string;
}

export interface NowPlaying {
    title: string;
    artist: string;
    featuring?: string;
    albumArt?: string;
    isPlaying: boolean;
    progress?: { current: string; duration: string; percent: number };
}

export interface CurrentActivity {
    activity: string;
    project: string;
    startedAt?: string;
}

export interface Weather {
    temp: string;
    condition: string;
    city: string;
    country?: string;
}

export interface UseLiveStatusReturn {
    onlineStatus: OnlineStatus;
    nowPlaying: NowPlaying;
    currentActivity: CurrentActivity;
    weather: Weather;
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}

export function useLiveStatus(): UseLiveStatusReturn {
    const [statuses, setStatuses] = useState<Record<string, Record<string, unknown>>>(FALLBACK_STATUS);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch all live statuses
    const fetchStatuses = useCallback(async () => {
        if (!isSupabaseConfigured()) {
            setStatuses(FALLBACK_STATUS);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);

            const { data, error: fetchError } = await supabase
                .from('live_status')
                .select('*');

            if (fetchError) throw fetchError;

            const statusMap: Record<string, Record<string, unknown>> = { ...FALLBACK_STATUS };
            data?.forEach((status: LiveStatus) => {
                statusMap[status.status_type] = status.value;
            });

            setStatuses(statusMap);
            setError(null);
        } catch (err) {
            console.error('Error fetching live status:', err);
            setError('Failed to load live status');
            setStatuses(FALLBACK_STATUS);
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchStatuses();
    }, [fetchStatuses]);

    // Real-time subscription
    useEffect(() => {
        if (!isSupabaseConfigured()) return;

        const channel = supabase
            .channel('live-status-changes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'live_status' },
                (payload) => {
                    if (payload.new) {
                        const status = payload.new as LiveStatus;
                        setStatuses((prev) => ({
                            ...prev,
                            [status.status_type]: status.value,
                        }));
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return {
        onlineStatus: statuses.online_status as unknown as OnlineStatus,
        nowPlaying: statuses.now_playing as unknown as NowPlaying,
        currentActivity: statuses.current_activity as unknown as CurrentActivity,
        weather: statuses.weather as unknown as Weather,
        loading,
        error,
        refresh: fetchStatuses,
    };
}

// Simple hook for just online status
export function useOnlineStatus(): { status: OnlineStatus; loading: boolean } {
    const { onlineStatus, loading } = useLiveStatus();
    return { status: onlineStatus, loading };
}
