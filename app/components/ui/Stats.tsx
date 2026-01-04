interface StatCardProps {
    label: string;
    value: string | number;
    suffix?: string;
    className?: string;
}

export function StatCard({ label, value, suffix, className = '' }: StatCardProps) {
    return (
        <div className={`flex flex-col gap-1 px-4 ${className}`}>
            <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">{label}</span>
            <span className="text-white text-3xl font-bold tabular-nums">
                {value}
                {suffix && <span className="text-sm text-[#2b6cee] ml-1">{suffix}</span>}
            </span>
        </div>
    );
}

// Stat HUD component (like in anime page)
interface StatHUDProps {
    stats: { label: string; value: string | number; suffix?: string }[];
    className?: string;
}

export function StatHUD({ stats, className = '' }: StatHUDProps) {
    return (
        <div className={`flex gap-4 p-4 bg-[#161b26]/50 border border-[#282e39] rounded-xl backdrop-blur-sm ${className}`}>
            {stats.map((stat, index) => (
                <div
                    key={stat.label}
                    className={`flex flex-col gap-1 px-4 ${index < stats.length - 1 ? 'border-r border-[#282e39]' : ''}`}
                >
                    <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">{stat.label}</span>
                    <span className="text-white text-3xl font-bold tabular-nums">
                        {stat.value}
                        {stat.suffix && <span className="text-sm text-[#2b6cee] ml-1">{stat.suffix}</span>}
                    </span>
                </div>
            ))}
        </div>
    );
}

// Inline stats row (like in anime hero)
interface InlineStatsProps {
    stats: { label: string; value: string | number; icon?: string }[];
    className?: string;
}

export function InlineStats({ stats, className = '' }: InlineStatsProps) {
    return (
        <div className={`hidden md:flex flex-col gap-3 bg-[#181e29]/60 backdrop-blur-md p-6 rounded-xl border border-white/10 min-w-[280px] ${className}`}>
            {stats.map((stat, index) => (
                <div
                    key={stat.label}
                    className={`flex justify-between items-center ${index < stats.length - 1 ? 'border-b border-white/10 pb-3' : ''}`}
                >
                    <span className="text-slate-400 text-sm font-mono">{stat.label}</span>
                    <div className="flex items-center gap-2">
                        <span className={`text-xl font-bold font-mono ${index === stats.length - 1 ? 'text-[#2b6cee]' : 'text-white'}`}>
                            {stat.value}
                        </span>
                        {stat.icon && (
                            <span className="material-symbols-outlined text-[#2b6cee] text-sm">{stat.icon}</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
