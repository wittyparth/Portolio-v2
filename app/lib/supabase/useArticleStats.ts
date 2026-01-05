import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured, getVisitorFingerprint } from './client';
import type { ArticleStats } from './types';

// Fallback stats from blog.json
const FALLBACK_STATS: Record<number, ArticleStats> = {
    1: { id: '1', article_id: 1, article_slug: null, views_count: 1200, likes_count: 89, created_at: '', updated_at: '' },
    2: { id: '2', article_id: 2, article_slug: null, views_count: 890, likes_count: 342, created_at: '', updated_at: '' },
    3: { id: '3', article_id: 3, article_slug: null, views_count: 654, likes_count: 142, created_at: '', updated_at: '' },
    4: { id: '4', article_id: 4, article_slug: null, views_count: 432, likes_count: 48, created_at: '', updated_at: '' },
    5: { id: '5', article_id: 5, article_slug: null, views_count: 890, likes_count: 76, created_at: '', updated_at: '' },
};

export interface UseArticleStatsReturn {
    stats: Record<number, ArticleStats>;
    loading: boolean;
    error: string | null;
    getStats: (articleId: number) => ArticleStats | null;
    trackView: (articleId: number) => Promise<void>;
    toggleLike: (articleId: number) => Promise<boolean>;
    hasLiked: (articleId: number) => boolean;
    formatViews: (count: number) => string;
}

export function useArticleStats(): UseArticleStatsReturn {
    const [stats, setStats] = useState<Record<number, ArticleStats>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [likedArticles, setLikedArticles] = useState<Set<number>>(new Set());

    // Load liked articles from localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('liked_articles');
            if (stored) {
                setLikedArticles(new Set(JSON.parse(stored)));
            }
        }
    }, []);

    // Fetch all article stats
    const fetchStats = useCallback(async () => {
        if (!isSupabaseConfigured()) {
            setStats(FALLBACK_STATS);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);

            const { data, error: fetchError } = await supabase
                .from('article_stats')
                .select('*');

            if (fetchError) throw fetchError;

            const statsMap: Record<number, ArticleStats> = {};
            data?.forEach((stat) => {
                statsMap[stat.article_id] = stat;
            });

            // Merge with fallback for missing articles
            Object.keys(FALLBACK_STATS).forEach((id) => {
                const articleId = parseInt(id);
                if (!statsMap[articleId]) {
                    statsMap[articleId] = FALLBACK_STATS[articleId];
                }
            });

            setStats(statsMap);
            setError(null);
        } catch (err) {
            console.error('Error fetching article stats:', err);
            setError('Failed to load article stats');
            setStats(FALLBACK_STATS);
        } finally {
            setLoading(false);
        }
    }, []);

    // Check which articles user has liked
    const checkLikedArticles = useCallback(async () => {
        if (!isSupabaseConfigured() || typeof window === 'undefined') return;

        try {
            const fingerprint = getVisitorFingerprint();

            const { data } = await supabase
                .from('article_reactions')
                .select('article_id')
                .eq('visitor_fingerprint', fingerprint);

            if (data) {
                const liked = new Set(data.map((r) => r.article_id));
                setLikedArticles(liked);
                localStorage.setItem('liked_articles', JSON.stringify([...liked]));
            }
        } catch (err) {
            console.error('Error checking liked articles:', err);
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchStats();
        checkLikedArticles();
    }, [fetchStats, checkLikedArticles]);

    // Real-time subscription
    useEffect(() => {
        if (!isSupabaseConfigured()) return;

        const channel = supabase
            .channel('article-stats-changes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'article_stats' },
                (payload) => {
                    if (payload.new) {
                        const stat = payload.new as ArticleStats;
                        setStats((prev) => ({
                            ...prev,
                            [stat.article_id]: stat,
                        }));
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // Get stats for a specific article
    const getStats = useCallback(
        (articleId: number): ArticleStats | null => {
            return stats[articleId] || FALLBACK_STATS[articleId] || null;
        },
        [stats]
    );

    // Track article view
    const trackView = useCallback(async (articleId: number) => {
        if (!isSupabaseConfigured()) {
            // Optimistic update for demo
            setStats((prev) => ({
                ...prev,
                [articleId]: {
                    ...(prev[articleId] || FALLBACK_STATS[articleId]),
                    views_count: (prev[articleId]?.views_count || FALLBACK_STATS[articleId]?.views_count || 0) + 1,
                },
            }));
            return;
        }

        try {
            const fingerprint = getVisitorFingerprint();

            // Insert view (will be ignored if duplicate due to unique constraint)
            const { error: viewError } = await supabase.from('article_views').insert({
                article_id: articleId,
                visitor_fingerprint: fingerprint,
            });

            // Ignore duplicate errors
            if (viewError && viewError.code !== '23505') {
                console.error('Error tracking view:', viewError);
            }
        } catch (err) {
            console.error('Error tracking article view:', err);
        }
    }, []);

    // Toggle like on article
    const toggleLike = useCallback(
        async (articleId: number): Promise<boolean> => {
            const alreadyLiked = likedArticles.has(articleId);

            if (!isSupabaseConfigured()) {
                // Optimistic toggle for demo
                const newLiked = new Set(likedArticles);
                if (alreadyLiked) {
                    newLiked.delete(articleId);
                } else {
                    newLiked.add(articleId);
                }
                setLikedArticles(newLiked);
                localStorage.setItem('liked_articles', JSON.stringify([...newLiked]));

                setStats((prev) => ({
                    ...prev,
                    [articleId]: {
                        ...(prev[articleId] || FALLBACK_STATS[articleId]),
                        likes_count:
                            (prev[articleId]?.likes_count || FALLBACK_STATS[articleId]?.likes_count || 0) +
                            (alreadyLiked ? -1 : 1),
                    },
                }));

                return !alreadyLiked;
            }

            try {
                const fingerprint = getVisitorFingerprint();

                if (alreadyLiked) {
                    // Remove like
                    await supabase
                        .from('article_reactions')
                        .delete()
                        .eq('article_id', articleId)
                        .eq('visitor_fingerprint', fingerprint);

                    const newLiked = new Set(likedArticles);
                    newLiked.delete(articleId);
                    setLikedArticles(newLiked);
                    localStorage.setItem('liked_articles', JSON.stringify([...newLiked]));

                    // Optimistic update
                    setStats((prev) => ({
                        ...prev,
                        [articleId]: {
                            ...prev[articleId],
                            likes_count: Math.max(0, (prev[articleId]?.likes_count || 0) - 1),
                        },
                    }));

                    return false;
                } else {
                    // Add like
                    const { error: likeError } = await supabase.from('article_reactions').insert({
                        article_id: articleId,
                        visitor_fingerprint: fingerprint,
                        reaction_type: 'like',
                    });

                    if (likeError && likeError.code !== '23505') {
                        throw likeError;
                    }

                    const newLiked = new Set(likedArticles);
                    newLiked.add(articleId);
                    setLikedArticles(newLiked);
                    localStorage.setItem('liked_articles', JSON.stringify([...newLiked]));

                    // Optimistic update
                    setStats((prev) => ({
                        ...prev,
                        [articleId]: {
                            ...prev[articleId],
                            likes_count: (prev[articleId]?.likes_count || 0) + 1,
                        },
                    }));

                    return true;
                }
            } catch (err) {
                console.error('Error toggling like:', err);
                return alreadyLiked;
            }
        },
        [likedArticles]
    );

    const hasLiked = useCallback(
        (articleId: number): boolean => likedArticles.has(articleId),
        [likedArticles]
    );

    // Format views count
    const formatViews = useCallback((count: number): string => {
        if (count >= 1000000) {
            return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (count >= 1000) {
            return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
        }
        return count.toString();
    }, []);

    return {
        stats,
        loading,
        error,
        getStats,
        trackView,
        toggleLike,
        hasLiked,
        formatViews,
    };
}
