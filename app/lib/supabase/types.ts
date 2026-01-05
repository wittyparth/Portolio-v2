// Auto-generated types for Supabase tables
// You can regenerate these using: npx supabase gen types typescript

export interface Database {
    public: {
        Tables: {
            guestbook_entries: {
                Row: {
                    id: string;
                    name: string;
                    initials: string | null;
                    role: string;
                    message: string;
                    gradient: string;
                    is_anonymous: boolean;
                    featured: boolean;
                    show_on_homepage: boolean;
                    avatar_url: string | null;
                    tags: string[];
                    likes_count: number;
                    created_at: string;
                    updated_at: string;
                    ip_hash: string | null;
                    user_agent: string | null;
                };
                Insert: {
                    id?: string;
                    name: string;
                    initials?: string | null;
                    role?: string;
                    message: string;
                    gradient?: string;
                    is_anonymous?: boolean;
                    featured?: boolean;
                    show_on_homepage?: boolean;
                    avatar_url?: string | null;
                    tags?: string[];
                    likes_count?: number;
                    created_at?: string;
                    updated_at?: string;
                    ip_hash?: string | null;
                    user_agent?: string | null;
                };
                Update: Partial<Database['public']['Tables']['guestbook_entries']['Insert']>;
            };
            guestbook_likes: {
                Row: {
                    id: string;
                    entry_id: string;
                    visitor_fingerprint: string;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    entry_id: string;
                    visitor_fingerprint: string;
                    created_at?: string;
                };
                Update: Partial<Database['public']['Tables']['guestbook_likes']['Insert']>;
            };
            typing_scores: {
                Row: {
                    id: string;
                    user_name: string;
                    country_code: string;
                    wpm: number;
                    accuracy: number;
                    mode: string;
                    correct_chars: number;
                    errors: number;
                    time_taken: number;
                    is_verified: boolean;
                    is_user: boolean;
                    avatar_url: string | null;
                    created_at: string;
                    visitor_fingerprint: string | null;
                };
                Insert: {
                    id?: string;
                    user_name: string;
                    country_code?: string;
                    wpm: number;
                    accuracy: number;
                    mode?: string;
                    correct_chars?: number;
                    errors?: number;
                    time_taken?: number;
                    is_verified?: boolean;
                    is_user?: boolean;
                    avatar_url?: string | null;
                    created_at?: string;
                    visitor_fingerprint?: string | null;
                };
                Update: Partial<Database['public']['Tables']['typing_scores']['Insert']>;
            };
            visitors: {
                Row: {
                    id: string;
                    fingerprint: string;
                    ip_country: string | null;
                    ip_city: string | null;
                    user_agent: string | null;
                    first_visit: string;
                    last_visit: string;
                    total_visits: number;
                };
                Insert: {
                    id?: string;
                    fingerprint: string;
                    ip_country?: string | null;
                    ip_city?: string | null;
                    user_agent?: string | null;
                    first_visit?: string;
                    last_visit?: string;
                    total_visits?: number;
                };
                Update: Partial<Database['public']['Tables']['visitors']['Insert']>;
            };
            page_views: {
                Row: {
                    id: string;
                    visitor_id: string | null;
                    page_path: string;
                    referrer: string | null;
                    duration_ms: number;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    visitor_id?: string | null;
                    page_path: string;
                    referrer?: string | null;
                    duration_ms?: number;
                    created_at?: string;
                };
                Update: Partial<Database['public']['Tables']['page_views']['Insert']>;
            };
            visitor_stats: {
                Row: {
                    id: string;
                    stat_type: string;
                    count: number;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    stat_type: string;
                    count?: number;
                    updated_at?: string;
                };
                Update: Partial<Database['public']['Tables']['visitor_stats']['Insert']>;
            };
            article_stats: {
                Row: {
                    id: string;
                    article_id: number;
                    article_slug: string | null;
                    views_count: number;
                    likes_count: number;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    article_id: number;
                    article_slug?: string | null;
                    views_count?: number;
                    likes_count?: number;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: Partial<Database['public']['Tables']['article_stats']['Insert']>;
            };
            article_views: {
                Row: {
                    id: string;
                    article_id: number;
                    visitor_fingerprint: string;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    article_id: number;
                    visitor_fingerprint: string;
                    created_at?: string;
                };
                Update: Partial<Database['public']['Tables']['article_views']['Insert']>;
            };
            article_reactions: {
                Row: {
                    id: string;
                    article_id: number;
                    visitor_fingerprint: string;
                    reaction_type: string;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    article_id: number;
                    visitor_fingerprint: string;
                    reaction_type?: string;
                    created_at?: string;
                };
                Update: Partial<Database['public']['Tables']['article_reactions']['Insert']>;
            };
            contact_submissions: {
                Row: {
                    id: string;
                    name: string;
                    email: string;
                    message: string;
                    inquiry_type: string;
                    read_status: boolean;
                    replied: boolean;
                    ip_hash: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    name: string;
                    email: string;
                    message: string;
                    inquiry_type?: string;
                    read_status?: boolean;
                    replied?: boolean;
                    ip_hash?: string | null;
                    created_at?: string;
                };
                Update: Partial<Database['public']['Tables']['contact_submissions']['Insert']>;
            };
            live_status: {
                Row: {
                    id: string;
                    status_type: string;
                    value: Record<string, unknown>;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    status_type: string;
                    value: Record<string, unknown>;
                    updated_at?: string;
                };
                Update: Partial<Database['public']['Tables']['live_status']['Insert']>;
            };
        };
        Views: {
            typing_leaderboard: {
                Row: {
                    id: string;
                    user_name: string;
                    country_code: string;
                    wpm: number;
                    accuracy: number;
                    mode: string;
                    is_user: boolean;
                    avatar_url: string | null;
                    created_at: string;
                    rank: number;
                };
            };
        };
        Functions: {
            get_formatted_visitor_count: {
                Args: Record<string, never>;
                Returns: string;
            };
            time_ago: {
                Args: { ts: string };
                Returns: string;
            };
        };
    };
}

// Convenience type aliases
export type GuestbookEntry = Database['public']['Tables']['guestbook_entries']['Row'];
export type GuestbookEntryInsert = Database['public']['Tables']['guestbook_entries']['Insert'];
export type GuestbookLike = Database['public']['Tables']['guestbook_likes']['Row'];
export type TypingScore = Database['public']['Tables']['typing_scores']['Row'];
export type TypingScoreInsert = Database['public']['Tables']['typing_scores']['Insert'];
export type TypingLeaderboardEntry = Database['public']['Views']['typing_leaderboard']['Row'];
export type Visitor = Database['public']['Tables']['visitors']['Row'];
export type VisitorStats = Database['public']['Tables']['visitor_stats']['Row'];
export type ArticleStats = Database['public']['Tables']['article_stats']['Row'];
export type ContactSubmission = Database['public']['Tables']['contact_submissions']['Insert'];
export type LiveStatus = Database['public']['Tables']['live_status']['Row'];
