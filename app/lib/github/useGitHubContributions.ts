import { useState, useEffect, useCallback } from 'react';

export interface ContributionDay {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionWeek {
    days: ContributionDay[];
}

export interface GitHubContributions {
    totalContributions: number;
    weeks: ContributionWeek[];
}

export interface UseGitHubContributionsReturn {
    contributions: GitHubContributions | null;
    loading: boolean;
    error: string | null;
    totalCount: number;
    currentStreak: number;
    longestStreak: number;
    refresh: () => Promise<void>;
}

// GitHub GraphQL API endpoint
const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

// GraphQL query for contributions
const CONTRIBUTIONS_QUERY = `
query($username: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $username) {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            contributionLevel
          }
        }
      }
    }
  }
}
`;

// Parse GitHub contribution level to numeric
function parseContributionLevel(level: string): 0 | 1 | 2 | 3 | 4 {
    switch (level) {
        case 'NONE': return 0;
        case 'FIRST_QUARTILE': return 1;
        case 'SECOND_QUARTILE': return 2;
        case 'THIRD_QUARTILE': return 3;
        case 'FOURTH_QUARTILE': return 4;
        default: return 0;
    }
}

// Calculate streaks from contribution data
function calculateStreaks(weeks: ContributionWeek[]): { current: number; longest: number } {
    const allDays: ContributionDay[] = [];
    weeks.forEach(week => allDays.push(...week.days));
    
    // Sort by date
    allDays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    
    const today = new Date().toISOString().split('T')[0];
    
    for (let i = allDays.length - 1; i >= 0; i--) {
        if (allDays[i].count > 0) {
            tempStreak++;
            if (allDays[i].date === today || (i === allDays.length - 1 && currentStreak === 0)) {
                currentStreak = tempStreak;
            }
            longestStreak = Math.max(longestStreak, tempStreak);
        } else {
            if (currentStreak === 0 && allDays[i].date < today) {
                // Still looking for current streak
            }
            tempStreak = 0;
        }
    }
    
    return { current: currentStreak, longest: longestStreak };
}

// Generate fallback weeks when no token or API fails
function generateFallbackWeeks(): ContributionWeek[] {
    const weeks: ContributionWeek[] = [];
    // Start from January 1 of current year
    const currentYear = new Date().getFullYear();
    const startDate = new Date(`${currentYear}-01-01`);
    
    // Generate 52 weeks of data
    for (let w = 0; w < 52; w++) {
        const days: ContributionDay[] = [];
        for (let d = 0; d < 7; d++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + (w * 7 + d));
            
            // Only generate contributions for dates in the past or today
            const now = new Date();
            let count = 0;
            let level: 0 | 1 | 2 | 3 | 4 = 0;
            
            if (date <= now) {
                // Random contribution level for past dates
                const rand = Math.random();
                if (rand > 0.92) { level = 4; count = Math.floor(Math.random() * 10) + 15; }
                else if (rand > 0.80) { level = 3; count = Math.floor(Math.random() * 5) + 10; }
                else if (rand > 0.60) { level = 2; count = Math.floor(Math.random() * 5) + 5; }
                else if (rand > 0.30) { level = 1; count = Math.floor(Math.random() * 4) + 1; }
            }
            
            days.push({
                date: date.toISOString().split('T')[0],
                count,
                level,
            });
        }
        weeks.push({ days });
    }
    
    return weeks;
}

// Fallback data
const FALLBACK_CONTRIBUTIONS: GitHubContributions = {
    totalContributions: 27,
    weeks: generateFallbackWeeks(),
};

export function useGitHubContributions(username: string): UseGitHubContributionsReturn {
    const [contributions, setContributions] = useState<GitHubContributions | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [streaks, setStreaks] = useState({ current: 0, longest: 0 });

    const fetchContributions = useCallback(async () => {
        console.log('🔍 [DEBUG] fetchContributions called');
        console.log('🔍 [DEBUG] Username:', username);
        
        // Get token from Vite environment variable (available on client in dev)
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        
        console.log('🔍 [DEBUG] Token exists:', !!token);
        console.log('🔍 [DEBUG] Token length:', token ? token.length : 0);
        console.log('🔍 [DEBUG] Token prefix:', token ? token.substring(0, 10) + '...' : 'N/A');
        console.log('🔍 [DEBUG] All VITE env vars:', Object.keys(import.meta.env).filter(k => k.startsWith('VITE_')));
        
        // If no token, use fallback data
        if (!token) {
            console.warn('⚠️ No VITE_GITHUB_TOKEN found in .env - using fallback data');
            console.log('To see real GitHub data, add VITE_GITHUB_TOKEN=your_token to your .env file');
            setContributions(FALLBACK_CONTRIBUTIONS);
            setStreaks(calculateStreaks(FALLBACK_CONTRIBUTIONS.weeks));
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            console.log('🔄 Fetching GitHub contributions for:', username);
            
            // Get date range (from start of year to now)
            const to = new Date();
            const currentYear = to.getFullYear();
            const from = new Date(`${currentYear}-01-01`);
            
            console.log('🔍 [DEBUG] Date range:', {
                from: from.toISOString(),
                to: to.toISOString(),
                currentYear
            });
            
            const requestBody = {
                query: CONTRIBUTIONS_QUERY,
                variables: {
                    username,
                    from: from.toISOString(),
                    to: to.toISOString(),
                },
            };
            
            console.log('🔍 [DEBUG] Request body:', JSON.stringify(requestBody, null, 2));
            
            const response = await fetch(GITHUB_GRAPHQL_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });

            console.log('🔍 [DEBUG] Response status:', response.status);
            console.log('🔍 [DEBUG] Response ok:', response.ok);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('🔍 [DEBUG] Error response body:', errorText);
                throw new Error(`GitHub API error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('🔍 [DEBUG] Response data:', JSON.stringify(data, null, 2));
            
            if (data.errors) {
                console.error('GitHub GraphQL errors:', data.errors);
                throw new Error(data.errors[0]?.message || 'GraphQL error');
            }

            const calendar = data.data?.user?.contributionsCollection?.contributionCalendar;
            console.log('🔍 [DEBUG] Calendar data exists:', !!calendar);
            console.log('🔍 [DEBUG] Total contributions:', calendar?.totalContributions);
            console.log('🔍 [DEBUG] Weeks count:', calendar?.weeks?.length);
            
            if (!calendar) {
                throw new Error('No contribution data found for user');
            }

            console.log('✅ Fetched', calendar.totalContributions, 'contributions');

            const parsedContributions: GitHubContributions = {
                totalContributions: calendar.totalContributions,
                weeks: calendar.weeks.map((week: { contributionDays: Array<{ date: string; contributionCount: number; contributionLevel: string }> }) => ({
                    days: week.contributionDays.map((day) => ({
                        date: day.date,
                        count: day.contributionCount,
                        level: parseContributionLevel(day.contributionLevel),
                    })),
                })),
            };

            console.log('🔍 [DEBUG] Parsed contributions:', {
                totalContributions: parsedContributions.totalContributions,
                weeksCount: parsedContributions.weeks.length,
                firstWeek: parsedContributions.weeks[0],
            });

            setContributions(parsedContributions);
            setStreaks(calculateStreaks(parsedContributions.weeks));
            setError(null);
            console.log('✅ [DEBUG] Successfully set contributions state');
        } catch (err) {
            console.error('❌ Error fetching GitHub contributions:', err);
            console.error('🔍 [DEBUG] Error details:', {
                message: err instanceof Error ? err.message : 'Unknown error',
                stack: err instanceof Error ? err.stack : 'N/A',
            });
            setError(err instanceof Error ? err.message : 'Failed to fetch contributions');
            // Fall back to generated data
            console.log('🔍 [DEBUG] Falling back to generated data');
            setContributions(FALLBACK_CONTRIBUTIONS);
            setStreaks(calculateStreaks(FALLBACK_CONTRIBUTIONS.weeks));
        } finally {
            setLoading(false);
            console.log('🔍 [DEBUG] fetchContributions completed');
        }
    }, [username]);

    useEffect(() => {
        fetchContributions();
    }, [fetchContributions]);

    return {
        contributions,
        loading,
        error,
        totalCount: contributions?.totalContributions || 0,
        currentStreak: streaks.current,
        longestStreak: streaks.longest,
        refresh: fetchContributions,
    };
}

// Helper to get level color class
export function getLevelColor(level: 0 | 1 | 2 | 3 | 4): string {
    switch (level) {
        case 0: return 'bg-[#161b22]';
        case 1: return 'bg-[#0e4429]';
        case 2: return 'bg-[#006d32]';
        case 3: return 'bg-[#26a641]';
        case 4: return 'bg-[#39d353]';
        default: return 'bg-[#161b22]';
    }
}

// Helper to format date for tooltip
export function formatContributionDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
}
