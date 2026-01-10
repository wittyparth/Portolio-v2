/**
 * GitHub Contribution Heatmap - Premium Edition
 * A stunning, full-width GitHub contribution visualization
 */

import { useState, useEffect, useMemo } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

interface GitHubHeatmapProps {
    username: string;
    className?: string;
}

// Premium GitHub theme with visible empty cells
const githubTheme = {
    dark: ['#21262d', '#0e4429', '#006d32', '#26a641', '#39d353'],
};

// Get contribution level and emoji based on count
function getContributionLevel(count: number): {
    level: string;
    emoji: string;
    color: string;
    message: string;
} {
    if (count === 0) {
        return {
            level: 'rest',
            emoji: '😴',
            color: '#768390',
            message: 'Rest day',
        };
    } else if (count <= 3) {
        return {
            level: 'light',
            emoji: '💻',
            color: '#0e4429',
            message: 'Light coding',
        };
    } else if (count <= 6) {
        return {
            level: 'moderate',
            emoji: '⚡',
            color: '#006d32',
            message: 'Productive day',
        };
    } else if (count <= 10) {
        return {
            level: 'active',
            emoji: '🔥',
            color: '#26a641',
            message: 'On fire!',
        };
    } else {
        return {
            level: 'legendary',
            emoji: '🚀',
            color: '#39d353',
            message: 'Legendary!',
        };
    }
}

// Format the tooltip content
function formatTooltip(count: number, date: string): string {
    const { emoji, message } = getContributionLevel(count);
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    if (count === 0) {
        return `${emoji} No contributions on ${formattedDate}`;
    }

    return `${emoji} ${count} contribution${count !== 1 ? 's' : ''} on ${formattedDate} — ${message}`;
}

export default function GitHubHeatmap({ username, className = '' }: GitHubHeatmapProps) {
    const [isClient, setIsClient] = useState(false);
    const [totalContributions, setTotalContributions] = useState(0);
    const [currentStreak, setCurrentStreak] = useState(0);
    const [longestStreak, setLongestStreak] = useState(0);
    const [todayCount, setTodayCount] = useState(0);

    // Handle SSR
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Current year
    const currentYear = new Date().getFullYear();

    // Calculate stats from contributions
    const calculateStats = useMemo(() => {
        return (contributions: Array<{ date: string; count: number; level: number }>) => {
            const total = contributions.reduce((sum, day) => sum + day.count, 0);

            // Calculate streaks
            let current = 0;
            let longest = 0;
            let tempStreak = 0;
            const today = new Date().toISOString().split('T')[0];

            // Sort by date descending
            const sorted = [...contributions].sort((a, b) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            );

            // Find today's count
            const todayData = sorted.find(d => d.date === today);
            const todayContributions = todayData?.count || 0;

            // Calculate current streak (from today backwards)
            for (let i = 0; i < sorted.length; i++) {
                if (sorted[i].count > 0) {
                    tempStreak++;
                    if (i === 0 || sorted[i].date === today) {
                        current = tempStreak;
                    }
                    longest = Math.max(longest, tempStreak);
                } else {
                    if (sorted[i].date < today) {
                        break; // Stop counting current streak
                    }
                    tempStreak = 0;
                }
            }

            return { total, current, longest, todayContributions };
        };
    }, []);

    if (!isClient) {
        return (
            <div className="h-[280px] animate-pulse rounded-2xl bg-gradient-to-br from-[#0d1117] to-[#161b22] border border-white/10" />
        );
    }

    return (
        <div
            className={`${className} relative group overflow-hidden`}
            style={{
                background: '#0a0e12',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(48, 54, 61, 0.8)',
            }}
        >
            {/* Animated gradient border effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(57, 211, 83, 0.1), transparent)',
                    animation: 'shimmer 3s infinite',
                }}
            />

            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #39d353 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                }}
            />

            {/* Glow effects */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 relative z-10">
                <div className="flex items-center gap-4">
                    {/* GitHub Icon with glow */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full" />
                        <div className="relative p-3 rounded-xl bg-gradient-to-br from-[#21262d] to-[#161b22] border border-white/10 shadow-lg">
                            <svg className="w-6 h-6 text-[#e6edf3]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-[#e6edf3] tracking-tight">
                            Contribution Graph
                        </h2>
                        <p className="text-sm text-[#768390] flex items-center gap-2">
                            <span>@{username}</span>
                            <span className="text-[#30363d]">•</span>
                            <span className="text-emerald-400">{currentYear}</span>
                        </p>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="flex flex-wrap gap-3">
                    {/* Total Contributions */}
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#21262d]/80 border border-white/5 backdrop-blur-sm">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-lg font-bold text-white">{totalContributions.toLocaleString()}</span>
                        <span className="text-xs text-[#768390] uppercase tracking-wider">total</span>
                    </div>

                    {/* Current Streak */}
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#21262d]/80 border border-white/5 backdrop-blur-sm">
                        <span className="text-base">🔥</span>
                        <span className="text-lg font-bold text-white">{currentStreak}</span>
                        <span className="text-xs text-[#768390] uppercase tracking-wider">streak</span>
                    </div>

                    {/* Today */}
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#21262d]/80 border border-emerald-500/20 backdrop-blur-sm">
                        <span className="text-base">{getContributionLevel(todayCount).emoji}</span>
                        <span className="text-lg font-bold text-emerald-400">{todayCount}</span>
                        <span className="text-xs text-[#768390] uppercase tracking-wider">today</span>
                    </div>
                </div>
            </div>

            {/* GitHub Calendar */}
            <div className="github-calendar-container relative z-10 flex justify-center py-2">
                <GitHubCalendar
                    username={username}
                    colorScheme="dark"
                    theme={githubTheme}
                    blockSize={14}
                    blockMargin={4}
                    blockRadius={3}
                    fontSize={11}
                    showWeekdayLabels={true}
                    transformData={(contributions) => {
                        // Calculate and update stats
                        const stats = calculateStats(contributions);

                        // Use setTimeout to avoid state update during render
                        setTimeout(() => {
                            if (stats.total !== totalContributions) setTotalContributions(stats.total);
                            if (stats.current !== currentStreak) setCurrentStreak(stats.current);
                            if (stats.longest !== longestStreak) setLongestStreak(stats.longest);
                            if (stats.todayContributions !== todayCount) setTodayCount(stats.todayContributions);
                        }, 0);

                        return contributions;
                    }}
                    labels={{
                        totalCount: '{{count}} contributions in {{year}}',
                    }}
                    renderBlock={(block, activity) => {
                        const tooltipContent = formatTooltip(activity.count, activity.date);

                        return (
                            <rect
                                {...(block.props as React.SVGProps<SVGRectElement>)}
                                data-tooltip-id="github-tooltip"
                                data-tooltip-content={tooltipContent}
                                className="transition-all duration-200 hover:brightness-125 cursor-pointer"
                                style={{
                                    cursor: 'pointer',
                                    filter: activity.count > 10 ? 'drop-shadow(0 0 4px rgba(57, 211, 83, 0.5))' : undefined,
                                }}
                            />
                        );
                    }}
                />

                {/* Premium Tooltip */}
                <Tooltip
                    id="github-tooltip"
                    place="top"
                    className="github-premium-tooltip"
                    style={{
                        backgroundColor: 'rgba(22, 27, 34, 0.95)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(48, 54, 61, 0.8)',
                        borderRadius: '12px',
                        color: '#e6edf3',
                        fontSize: '13px',
                        fontWeight: '500',
                        padding: '12px 16px',
                        boxShadow: '0 16px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.05)',
                        zIndex: 99999,
                        maxWidth: '320px',
                    }}
                />
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6 pt-5 border-t border-white/5 relative z-10">
                {/* Activity Links */}
                <div className="flex items-center gap-5 text-sm text-[#768390]">
                    <a
                        href={`https://github.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-emerald-400 transition-colors group/link"
                    >
                        <svg className="w-4 h-4 group-hover/link:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        View Profile
                    </a>
                    <a
                        href={`https://github.com/${username}?tab=repositories`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-emerald-400 transition-colors group/link"
                    >
                        <svg className="w-4 h-4 group-hover/link:scale-110 transition-transform" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
                        </svg>
                        Repositories
                    </a>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-3 text-xs text-[#768390]">
                    <span className="font-medium">Less</span>
                    <div className="flex gap-1">
                        {githubTheme.dark.map((color, i) => (
                            <div
                                key={i}
                                className="w-3 h-3 rounded-sm transition-transform hover:scale-125"
                                style={{
                                    backgroundColor: color,
                                    boxShadow: i === 4 ? '0 0 8px rgba(57, 211, 83, 0.4)' : undefined,
                                }}
                            />
                        ))}
                    </div>
                    <span className="font-medium">More</span>
                </div>
            </div>

            {/* Custom styles */}
            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                
                .github-calendar-container {
                    width: 100%;
                    overflow-x: auto;
                    scrollbar-width: thin;
                    scrollbar-color: #30363d transparent;
                }
                
                .github-calendar-container::-webkit-scrollbar {
                    height: 6px;
                }
                
                .github-calendar-container::-webkit-scrollbar-track {
                    background: transparent;
                }
                
                .github-calendar-container::-webkit-scrollbar-thumb {
                    background: #30363d;
                    border-radius: 3px;
                }
                
                .github-calendar-container::-webkit-scrollbar-thumb:hover {
                    background: #484f58;
                }
                
                .github-calendar-container > div {
                    width: 100%;
                }
                
                .github-calendar-container text {
                    fill: #768390 !important;
                    font-weight: 500;
                }
                
                .github-calendar-container rect {
                    transition: all 0.2s ease;
                }
                
                .github-calendar-container rect:hover {
                    stroke: rgba(255, 255, 255, 0.2);
                    stroke-width: 1px;
                }
                
                .github-premium-tooltip {
                    animation: tooltipFadeIn 0.2s ease;
                }
                
                @keyframes tooltipFadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(4px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}
