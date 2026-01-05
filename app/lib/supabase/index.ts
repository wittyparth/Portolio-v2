// Supabase Integration - Central Export
// =====================================

// Client
export { supabase, isSupabaseConfigured, getVisitorFingerprint, generateVisitorFingerprint } from './client';

// Types
export type {
    Database,
    GuestbookEntry,
    GuestbookEntryInsert,
    GuestbookLike,
    TypingScore,
    TypingScoreInsert,
    TypingLeaderboardEntry,
    Visitor,
    VisitorStats,
    ArticleStats,
    ContactSubmission,
    LiveStatus,
} from './types';

// Hooks
export { useGuestbook, formatTimeAgo } from './useGuestbook';
export type { UseGuestbookReturn } from './useGuestbook';

export { useTypingLeaderboard, getRankColor } from './useTypingLeaderboard';
export type { UseTypingLeaderboardReturn } from './useTypingLeaderboard';

export { useVisitorAnalytics, useVisitorCount } from './useVisitorAnalytics';
export type { UseVisitorAnalyticsReturn } from './useVisitorAnalytics';

export { useArticleStats } from './useArticleStats';
export type { UseArticleStatsReturn } from './useArticleStats';

export { useContactForm } from './useContactForm';
export type { UseContactFormReturn } from './useContactForm';

export { useLiveStatus, useOnlineStatus } from './useLiveStatus';
export type { 
    UseLiveStatusReturn, 
    OnlineStatus, 
    NowPlaying, 
    CurrentActivity, 
    Weather 
} from './useLiveStatus';
