import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Environment variables (set these in your .env file)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
        '⚠️ Supabase credentials not found. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
    );
}

// Create Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: false, // No auth needed for public portfolio
    },
    realtime: {
        params: {
            eventsPerSecond: 10,
        },
    },
});

// Helper to check if Supabase is configured
export const isSupabaseConfigured = () => {
    return Boolean(supabaseUrl && supabaseAnonKey);
};

// Generate a simple fingerprint for the visitor (client-side)
export const generateVisitorFingerprint = (): string => {
    if (typeof window === 'undefined') return 'server';
    
    const components = [
        navigator.userAgent,
        navigator.language,
        screen.width,
        screen.height,
        screen.colorDepth,
        new Date().getTimezoneOffset(),
        navigator.hardwareConcurrency || 0,
    ];
    
    // Simple hash function
    const str = components.join('|');
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    
    return Math.abs(hash).toString(36) + Date.now().toString(36).slice(-4);
};

// Get stored fingerprint or generate new one
export const getVisitorFingerprint = (): string => {
    if (typeof window === 'undefined') return 'server';
    
    const stored = localStorage.getItem('visitor_fingerprint');
    if (stored) return stored;
    
    const fingerprint = generateVisitorFingerprint();
    localStorage.setItem('visitor_fingerprint', fingerprint);
    return fingerprint;
};

export default supabase;
