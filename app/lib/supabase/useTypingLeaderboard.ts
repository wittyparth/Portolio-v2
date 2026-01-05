import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured, getVisitorFingerprint } from './client';
import type { TypingScoreInsert, TypingLeaderboardEntry } from './types';

// Fallback leaderboard data
const FALLBACK_LEADERBOARD: TypingLeaderboardEntry[] = [
    { id: '1', user_name: 'Cyber_Ninja', country_code: 'USA', accuracy: 100, wpm: 184, mode: '15s', is_user: false, avatar_url: null, created_at: new Date().toISOString(), rank: 1 },
    { id: '2', user_name: 'KeyStroke_Legend', country_code: 'GER', accuracy: 99.8, wpm: 172, mode: '15s', is_user: false, avatar_url: null, created_at: new Date().toISOString(), rank: 2 },
    { id: '3', user_name: 'Alex_Dev', country_code: 'UK', accuracy: 98, wpm: 165, mode: '15s', is_user: false, avatar_url: null, created_at: new Date().toISOString(), rank: 3 },
    { id: '4', user_name: 'Partha Saradhi', country_code: 'IND', accuracy: 99, wpm: 142, mode: '15s', is_user: true, avatar_url: null, created_at: new Date().toISOString(), rank: 4 },
    { id: '5', user_name: 'NullPointer', country_code: 'IND', accuracy: 96, wpm: 130, mode: '15s', is_user: false, avatar_url: null, created_at: new Date().toISOString(), rank: 5 },
    { id: '6', user_name: 'FastFingers_99', country_code: 'CAN', accuracy: 95, wpm: 128, mode: '15s', is_user: false, avatar_url: null, created_at: new Date().toISOString(), rank: 6 },
];

export interface UseTypingLeaderboardReturn {
    leaderboard: TypingLeaderboardEntry[];
    loading: boolean;
    error: string | null;
    userRank: number | null;
    userBestScore: TypingLeaderboardEntry | null;
    submitScore: (score: Omit<TypingScoreInsert, 'id' | 'created_at' | 'visitor_fingerprint'>) => Promise<{ rank: number; isNewBest: boolean } | null>;
    refresh: () => Promise<void>;
}

export function useTypingLeaderboard(options?: {
    mode?: string;
    limit?: number;
}): UseTypingLeaderboardReturn {
    const { mode = '15s', limit = 10 } = options || {};

    const [leaderboard, setLeaderboard] = useState<TypingLeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userRank, setUserRank] = useState<number | null>(null);
    const [userBestScore, setUserBestScore] = useState<TypingLeaderboardEntry | null>(null);

    // Fetch leaderboard
    const fetchLeaderboard = useCallback(async () => {
        if (!isSupabaseConfigured()) {
            const filtered = FALLBACK_LEADERBOARD.filter((e) => e.mode === mode).slice(0, limit);
            setLeaderboard(filtered);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);

            // Fetch from the view
            const { data, error: fetchError } = await supabase
                .from('typing_leaderboard')
                .select('*')
                .eq('mode', mode)
                .order('rank', { ascending: true })
                .limit(limit);

            if (fetchError) throw fetchError;

            setLeaderboard(data || []);

            // Find user's rank and best score
            const fingerprint = getVisitorFingerprint();
            const { data: userScores } = await supabase
                .from('typing_scores')
                .select('*')
                .eq('mode', mode)
                .eq('visitor_fingerprint', fingerprint)
                .order('wpm', { ascending: false })
                .limit(1);

            if (userScores && userScores.length > 0) {
                const best = userScores[0];
                // Calculate rank
                const { count } = await supabase
                    .from('typing_scores')
                    .select('*', { count: 'exact', head: true })
                    .eq('mode', mode)
                    .gt('wpm', best.wpm);

                setUserRank((count || 0) + 1);
                setUserBestScore({
                    ...best,
                    rank: (count || 0) + 1,
                } as TypingLeaderboardEntry);
            }

            setError(null);
        } catch (err) {
            console.error('Error fetching leaderboard:', err);
            setError('Failed to load leaderboard');
            setLeaderboard(FALLBACK_LEADERBOARD.filter((e) => e.mode === mode).slice(0, limit));
        } finally {
            setLoading(false);
        }
    }, [mode, limit]);

    // Initial fetch
    useEffect(() => {
        fetchLeaderboard();
    }, [fetchLeaderboard]);

    // Real-time subscription
    useEffect(() => {
        if (!isSupabaseConfigured()) return;

        const channel = supabase
            .channel('typing-scores-changes')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'typing_scores' },
                () => {
                    // Refresh leaderboard on new score
                    fetchLeaderboard();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [fetchLeaderboard]);

    // Submit a new score
    const submitScore = useCallback(
        async (
            score: Omit<TypingScoreInsert, 'id' | 'created_at' | 'visitor_fingerprint'>
        ): Promise<{ rank: number; isNewBest: boolean } | null> => {
            if (!isSupabaseConfigured()) {
                console.warn('Supabase not configured');
                // Simulate submission
                const newRank = FALLBACK_LEADERBOARD.filter(
                    (e) => e.mode === score.mode && e.wpm > score.wpm
                ).length + 1;
                return { rank: newRank, isNewBest: true };
            }

            try {
                const fingerprint = getVisitorFingerprint();

                // Check if this is a new personal best
                const { data: existingBest } = await supabase
                    .from('typing_scores')
                    .select('wpm')
                    .eq('mode', score.mode || '15s')
                    .eq('visitor_fingerprint', fingerprint)
                    .order('wpm', { ascending: false })
                    .limit(1);

                const isNewBest = !existingBest?.length || score.wpm > existingBest[0].wpm;

                // Insert the score
                const { error: insertError } = await supabase.from('typing_scores').insert({
                    ...score,
                    visitor_fingerprint: fingerprint,
                });

                if (insertError) throw insertError;

                // Calculate new rank
                const { count } = await supabase
                    .from('typing_scores')
                    .select('*', { count: 'exact', head: true })
                    .eq('mode', score.mode || '15s')
                    .gt('wpm', score.wpm);

                const rank = (count || 0) + 1;

                // Refresh leaderboard
                await fetchLeaderboard();

                return { rank, isNewBest };
            } catch (err) {
                console.error('Error submitting score:', err);
                setError('Failed to submit score');
                return null;
            }
        },
        [fetchLeaderboard]
    );

    return {
        leaderboard,
        loading,
        error,
        userRank,
        userBestScore,
        submitScore,
        refresh: fetchLeaderboard,
    };
}

// Get color based on rank
export function getRankColor(rank: number): { border: string; bg: string; text: string } {
    switch (rank) {
        case 1:
            return { border: 'border-[#ffd700]', bg: 'bg-[#ffd700]/5', text: 'text-[#ffd700]' };
        case 2:
            return { border: 'border-[#c0c0c0]', bg: 'bg-[#c0c0c0]/5', text: 'text-[#c0c0c0]' };
        case 3:
            return { border: 'border-[#cd7f32]', bg: 'bg-[#cd7f32]/5', text: 'text-[#cd7f32]' };
        default:
            return { border: 'border-transparent', bg: '', text: 'text-[#9da6b9]' };
    }
}
