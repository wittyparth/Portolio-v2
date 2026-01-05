import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured, getVisitorFingerprint } from './client';
import type { GuestbookEntry, GuestbookEntryInsert } from './types';

// Fallback data when Supabase is not configured
const FALLBACK_ENTRIES: GuestbookEntry[] = [
    {
        id: '1',
        name: 'Alice M.',
        initials: 'AM',
        role: 'Frontend Dev • London',
        message: 'Incredible attention to detail!',
        gradient: 'from-purple-500 to-indigo-600',
        is_anonymous: false,
        featured: false,
        show_on_homepage: true,
        avatar_url: null,
        tags: [],
        likes_count: 12,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ip_hash: null,
        user_agent: null,
    },
];

export interface UseGuestbookReturn {
    entries: GuestbookEntry[];
    loading: boolean;
    error: string | null;
    totalCount: number;
    addEntry: (entry: Omit<GuestbookEntryInsert, 'id' | 'created_at' | 'updated_at'>) => Promise<GuestbookEntry | null>;
    likeEntry: (entryId: string) => Promise<boolean>;
    hasLiked: (entryId: string) => boolean;
    refresh: () => Promise<void>;
}

export function useGuestbook(options?: {
    limit?: number;
    filter?: 'all' | 'featured' | 'homepage';
    orderBy?: 'newest' | 'popular';
}): UseGuestbookReturn {
    const { limit = 50, filter = 'all', orderBy = 'newest' } = options || {};
    
    const [entries, setEntries] = useState<GuestbookEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [likedEntries, setLikedEntries] = useState<Set<string>>(new Set());

    // Load liked entries from localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('liked_guestbook_entries');
            if (stored) {
                setLikedEntries(new Set(JSON.parse(stored)));
            }
        }
    }, []);

    // Fetch entries
    const fetchEntries = useCallback(async () => {
        if (!isSupabaseConfigured()) {
            setEntries(FALLBACK_ENTRIES);
            setTotalCount(FALLBACK_ENTRIES.length);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            let query = supabase
                .from('guestbook_entries')
                .select('*', { count: 'exact' });

            // Apply filters
            if (filter === 'featured') {
                query = query.eq('featured', true);
            } else if (filter === 'homepage') {
                query = query.eq('show_on_homepage', true);
            }

            // Apply ordering
            if (orderBy === 'popular') {
                query = query.order('likes_count', { ascending: false });
            } else {
                query = query.order('created_at', { ascending: false });
            }

            // Apply limit
            query = query.limit(limit);

            const { data, error: fetchError, count } = await query;

            if (fetchError) throw fetchError;

            setEntries(data || []);
            setTotalCount(count || 0);
            setError(null);
        } catch (err) {
            console.error('Error fetching guestbook entries:', err);
            setError('Failed to load guestbook entries');
            setEntries(FALLBACK_ENTRIES);
        } finally {
            setLoading(false);
        }
    }, [limit, filter, orderBy]);

    // Initial fetch
    useEffect(() => {
        fetchEntries();
    }, [fetchEntries]);

    // Real-time subscription
    useEffect(() => {
        if (!isSupabaseConfigured()) return;

        const channel = supabase
            .channel('guestbook-changes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'guestbook_entries' },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        setEntries((prev) => [payload.new as GuestbookEntry, ...prev]);
                        setTotalCount((prev) => prev + 1);
                    } else if (payload.eventType === 'UPDATE') {
                        setEntries((prev) =>
                            prev.map((e) =>
                                e.id === (payload.new as GuestbookEntry).id
                                    ? (payload.new as GuestbookEntry)
                                    : e
                            )
                        );
                    } else if (payload.eventType === 'DELETE') {
                        setEntries((prev) =>
                            prev.filter((e) => e.id !== (payload.old as { id: string }).id)
                        );
                        setTotalCount((prev) => prev - 1);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // Add new entry
    const addEntry = useCallback(
        async (entry: Omit<GuestbookEntryInsert, 'id' | 'created_at' | 'updated_at'>): Promise<GuestbookEntry | null> => {
            if (!isSupabaseConfigured()) {
                console.warn('Supabase not configured');
                return null;
            }

            try {
                // Generate initials if not anonymous
                const initials = entry.is_anonymous
                    ? ''
                    : entry.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase();

                // Random gradient
                const gradients = [
                    'from-purple-500 to-indigo-600',
                    'from-emerald-400 to-cyan-600',
                    'from-orange-500 to-pink-600',
                    'from-blue-500 to-cyan-500',
                    'from-pink-500 to-purple-600',
                ];
                const gradient = gradients[Math.floor(Math.random() * gradients.length)];

                const { data, error: insertError } = await supabase
                    .from('guestbook_entries')
                    .insert({
                        ...entry,
                        initials,
                        gradient,
                        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
                    })
                    .select()
                    .single();

                if (insertError) throw insertError;
                return data;
            } catch (err) {
                console.error('Error adding guestbook entry:', err);
                setError('Failed to add entry');
                return null;
            }
        },
        []
    );

    // Like an entry
    const likeEntry = useCallback(
        async (entryId: string): Promise<boolean> => {
            if (likedEntries.has(entryId)) return false;

            if (!isSupabaseConfigured()) {
                // Optimistic update for demo
                setEntries((prev) =>
                    prev.map((e) =>
                        e.id === entryId ? { ...e, likes_count: e.likes_count + 1 } : e
                    )
                );
                const newLiked = new Set(likedEntries).add(entryId);
                setLikedEntries(newLiked);
                localStorage.setItem('liked_guestbook_entries', JSON.stringify([...newLiked]));
                return true;
            }

            try {
                const fingerprint = getVisitorFingerprint();

                const { error: likeError } = await supabase.from('guestbook_likes').insert({
                    entry_id: entryId,
                    visitor_fingerprint: fingerprint,
                });

                if (likeError) {
                    if (likeError.code === '23505') {
                        // Duplicate - already liked
                        return false;
                    }
                    throw likeError;
                }

                // Optimistic update
                setEntries((prev) =>
                    prev.map((e) =>
                        e.id === entryId ? { ...e, likes_count: e.likes_count + 1 } : e
                    )
                );

                const newLiked = new Set(likedEntries).add(entryId);
                setLikedEntries(newLiked);
                localStorage.setItem('liked_guestbook_entries', JSON.stringify([...newLiked]));

                return true;
            } catch (err) {
                console.error('Error liking entry:', err);
                return false;
            }
        },
        [likedEntries]
    );

    const hasLiked = useCallback(
        (entryId: string): boolean => likedEntries.has(entryId),
        [likedEntries]
    );

    return {
        entries,
        loading,
        error,
        totalCount,
        addEntry,
        likeEntry,
        hasLiked,
        refresh: fetchEntries,
    };
}

// Helper to format time ago
export function formatTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    const weeks = Math.floor(diff / 604800000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    if (weeks < 4) return `${weeks}w ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
