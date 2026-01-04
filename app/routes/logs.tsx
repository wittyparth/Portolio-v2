import type { Route } from "./+types/logs";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Lessons & Failures - Partha Saradhi" },
        { name: "description", content: "A transparent log of exceptions, timeouts, and the architectural patches that defined my growth as a backend engineer." },
    ];
}

const logEntries = [
    {
        id: 1,
        type: 'failure',
        title: 'Microservices Over-Engineering',
        description: 'Attempted to split a simple CRUD application into 15 independent microservices prematurely. Resulted in a distributed monolith where every request required 6 internal network hops and debugging became a nightmare.',
        lesson: "Distributed systems complexity is a tax. Don't pay it until scale demands it. Monolith-first is often the correct architecture.",
        lessonLabel: 'What I Learned',
        category: 'Architecture',
        period: '2019 Q3',
        tags: ['Node.js', 'K8s'],
        color: 'error',
        icon: 'warning',
        badge: 'System Failure',
    },
    {
        id: 2,
        type: 'insight',
        title: 'The Monolith Reformation',
        description: 'Refactored the distributed mess back into a modular monolith. Latency dropped by 65% and developer velocity tripled because we could run the entire stack on a single laptop again.',
        lesson: 'Modular Monoliths allow you to define boundaries without the network penalty. Scale via instances, not services, until necessary.',
        lessonLabel: 'Key Outcome',
        category: 'Architecture',
        period: 'Resolved',
        tags: ['Refactor', 'DevOps'],
        color: 'primary',
        icon: 'build_circle',
        badge: 'Insight & Solution',
    },
    {
        id: 3,
        type: 'performance',
        title: 'The Cache Stampede',
        description: 'Cache expiration was synchronized for 100k keys at exactly midnight. DB CPU spiked to 100% instantly as all requests bypassed cache simultaneously, creating a "thundering herd."',
        lesson: 'Synchronization of Time-To-Live (TTL) creates predictable failure points. Randomness is a feature, not a bug, in caching strategies.',
        lessonLabel: 'Root Cause',
        category: 'Database',
        period: '2021 Q1',
        tags: ['Redis', 'PostgreSQL'],
        color: 'warn',
        icon: 'hourglass_empty',
        badge: 'Performance Fail',
    },
    {
        id: 4,
        type: 'recommendation',
        title: 'Probabilistic Jitter Strategy',
        description: 'Implemented random jitter on all TTLs and probabilistic early re-computation. The system now handles traffic spikes gracefully without any "thundering herds" or manual intervention.',
        lesson: 'Zero downtime since implementation. CPU utilization leveled at 40% even during peak traffic events.',
        lessonLabel: 'Outcome',
        category: 'Best Practice',
        period: 'Adopted',
        tags: ['Algorithms', 'Scale'],
        color: 'success',
        icon: 'science',
        badge: 'Recommendation',
    },
];

const filterButtons = [
    { label: 'All Entries', icon: 'apps', active: true },
    { label: 'Architecture', icon: 'dns', active: false },
    { label: 'Database', icon: 'database', active: false },
    { label: 'Leadership', icon: 'groups', active: false },
];

export default function LogsPage() {
    return (
        <div className="bg-[#111318] min-h-screen w-full flex flex-col relative z-10">
            <main className="flex-1 flex flex-col items-center">
                {/* Hero Section */}
                <section className="w-full max-w-5xl px-6 py-12 lg:py-20">
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#181b21] shadow-2xl">
                        <div
                            className="absolute inset-0 z-0 opacity-40 mix-blend-overlay bg-cover bg-center"
                            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAADpdbcMzdoIoDCM4tyIC6TInna8BnXpDc48X-fCDGHDDzlUA7jM6abXGM7wV5N4DoGcROUGnalJfMFHeiJ9N8Ze5wghHNa_qJOUlQrKDgReglkCUqU9rTaHWnEjgcU89uNXKsyMASpirbf4JpRV2G4guX_4eigZsIiKPqjowOJbntWeW2AUrQfQlD5DHxL_swCS80vqBkJ_DBv1VP6rv7hm9mogjNBnjYLdAqx5QqRe4dBAWoSRU9ilsI6lrLusxqxnCn_PUonHaU')" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#111318] via-[#111318]/90 to-transparent z-0" />

                        <div className="relative z-10 grid gap-8 px-8 py-12 md:grid-cols-2 md:px-12 md:py-16 items-end">
                            <div className="flex flex-col gap-4">
                                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#2b6cee]/30 bg-[#2b6cee]/10 px-3 py-1 backdrop-blur-sm">
                                    <div className="size-2 animate-pulse rounded-full bg-[#2b6cee]" />
                                    <span className="text-xs font-mono font-medium text-[#2b6cee] uppercase tracking-wider">System Diagnostic Mode</span>
                                </div>
                                <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                                    Debugging <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2b6cee] to-white">The Career</span>
                                </h1>
                                <p className="max-w-md text-base leading-relaxed text-gray-400">
                                    A transparent log of exceptions, timeouts, and the architectural patches that defined my growth as a backend engineer.
                                </p>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-3 md:gap-4">
                                <StatCard label="EXCEPTIONS_LOGGED" value="42" subtext="12 Critical" icon="bug_report" iconColor="text-red-500" />
                                <StatCard label="PATCH_RATE" value="100%" subtext="+Learning" icon="check_circle" iconColor="text-emerald-500" />
                                <div className="col-span-2 flex flex-col gap-1 rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm hover:border-[#2b6cee]/30 transition-colors group">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-mono text-gray-400">GROWTH_COEFFICIENT</span>
                                        <span className="material-symbols-outlined text-[#2b6cee] text-[16px] opacity-60 group-hover:opacity-100">trending_up</span>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-bold text-white font-mono">10x</span>
                                        <span className="text-xs text-gray-500">Since Initial Commit</span>
                                    </div>
                                    <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
                                        <div className="h-full w-[85%] rounded-full bg-[#2b6cee]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Filter Bar */}
                <section className="sticky top-[64px] z-40 w-full border-y border-white/5 bg-[#111318]/95 backdrop-blur-lg">
                    <div className="mx-auto flex max-w-5xl items-center gap-4 overflow-x-auto px-6 py-4">
                        <span className="flex items-center gap-2 text-xs font-mono font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">
                            <span className="material-symbols-outlined text-[16px]">filter_list</span>
                            Filter Log:
                        </span>
                        {filterButtons.map((btn, i) => (
                            <button
                                key={btn.label}
                                className={`group relative flex h-9 min-w-fit items-center gap-2 rounded border px-4 text-xs font-bold uppercase tracking-wider transition-all ${btn.active
                                    ? 'border-[#2b6cee] bg-[#2b6cee]/10 text-[#2b6cee] shadow-[0_0_15px_rgba(43,108,238,0.2)] hover:bg-[#2b6cee]/20'
                                    : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/30 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                <span className="material-symbols-outlined text-[16px]">{btn.icon}</span>
                                {btn.label}
                            </button>
                        ))}
                        <div className="ml-auto hidden md:flex items-center gap-2 border-l border-white/10 pl-4">
                            <span className="text-[10px] font-mono text-gray-600 uppercase">Sort By:</span>
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                                <span className="text-white font-mono cursor-pointer hover:underline">Chronological</span>
                                <span className="material-symbols-outlined text-[14px]">arrow_drop_down</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Log Entries */}
                <section className="w-full max-w-4xl px-6 py-12 flex flex-col gap-6 mx-auto">
                    {logEntries.map((entry) => (
                        <LogEntry key={entry.id} {...entry} />
                    ))}

                    <div className="pt-8 text-center border-t border-white/5">
                        <span className="font-mono text-xs text-gray-600 uppercase tracking-widest">End of Public Log</span>
                    </div>
                </section>
            </main>
        </div>
    );
}

// Stat Card Component
function StatCard({ label, value, subtext, icon, iconColor }: { label: string; value: string; subtext: string; icon: string; iconColor: string }) {
    return (
        <div className="flex flex-col gap-1 rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm hover:border-[#2b6cee]/30 transition-colors group">
            <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-gray-400">{label}</span>
                <span className={`material-symbols-outlined ${iconColor} text-[16px] opacity-60 group-hover:opacity-100`}>{icon}</span>
            </div>
            <span className="text-2xl font-bold text-white font-mono">{value}</span>
            <span className={`text-xs font-mono ${iconColor}`}>{subtext}</span>
        </div>
    );
}

// Log Entry Component
function LogEntry({ type, title, description, lesson, lessonLabel, category, period, tags, color, icon, badge }: {
    type: string;
    title: string;
    description: string;
    lesson: string;
    lessonLabel: string;
    category: string;
    period: string;
    tags: string[];
    color: string;
    icon: string;
    badge: string;
}) {
    const colors: Record<string, { bg: string; border: string; text: string; hover: string; shadow: string }> = {
        error: { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-500', hover: 'hover:border-red-500/40', shadow: 'hover:shadow-[0_4px_40px_rgba(239,68,68,0.1)]' },
        primary: { bg: 'bg-[#2b6cee]/10', border: 'border-[#2b6cee]/20', text: 'text-[#2b6cee]', hover: 'hover:border-[#2b6cee]/40', shadow: 'hover:shadow-[0_4px_40px_rgba(43,108,238,0.1)]' },
        warn: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-500', hover: 'hover:border-amber-500/40', shadow: 'hover:shadow-[0_4px_40px_rgba(245,158,11,0.1)]' },
        success: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-500', hover: 'hover:border-emerald-500/40', shadow: 'hover:shadow-[0_4px_40px_rgba(16,185,129,0.1)]' },
    };
    const c = colors[color] || colors.primary;

    return (
        <article className={`group relative w-full rounded-2xl border border-white/10 bg-[#181b21] transition-all ${c.hover} ${c.shadow} overflow-hidden`}>
            <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-${color === 'error' ? 'red' : color === 'primary' ? '[#2b6cee]' : color === 'warn' ? 'amber' : 'emerald'}-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity`} />

            <div className="flex flex-col md:flex-row p-6 md:p-8 gap-6 md:gap-8">
                <div className="flex-shrink-0">
                    <div className={`flex size-14 items-center justify-center rounded-xl ${c.bg} ${c.text} ${c.border} border shadow-[inset_0_0_15px_${color === 'error' ? 'rgba(239,68,68,0.1)' : color === 'primary' ? 'rgba(43,108,238,0.1)' : color === 'warn' ? 'rgba(245,158,11,0.1)' : 'rgba(16,185,129,0.1)'}]`}>
                        <span className="material-symbols-outlined text-3xl">{icon}</span>
                    </div>
                </div>

                <div className="flex-grow flex flex-col gap-4">
                    <div className="flex flex-wrap items-center justify-between gap-y-2">
                        <div className="flex items-center gap-3">
                            <span className={`inline-flex items-center rounded ${c.bg} px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${c.text} ${c.border} border`}>
                                {badge}
                            </span>
                            <span className="text-xs font-mono text-gray-500">{period} • {category}</span>
                        </div>
                        <div className="flex gap-2">
                            {tags.map((tag) => (
                                <span key={tag} className="rounded bg-white/5 px-2 py-1 font-mono text-[10px] text-gray-500 border border-white/5">{tag}</span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className={`text-2xl font-bold text-white mb-2 group-hover:${c.text} transition-colors duration-300`}>{title}</h3>
                        <p className="text-sm leading-relaxed text-gray-400">{description}</p>
                    </div>

                    <div className={`mt-2 rounded-lg bg-black/30 border border-white/5 p-4 border-l-2 border-l-${color === 'error' ? 'red' : color === 'primary' ? '[#2b6cee]' : color === 'warn' ? 'amber' : 'emerald'}-500 relative overflow-hidden`}>
                        <div className={`absolute inset-0 ${c.bg} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />
                        <div className="relative z-10 flex flex-col gap-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`material-symbols-outlined text-sm ${c.text}`}>
                                    {type === 'failure' ? 'bug_report' : type === 'insight' ? 'lightbulb' : type === 'performance' ? 'warning' : 'auto_awesome'}
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{lessonLabel}</span>
                            </div>
                            <p className="font-mono text-xs text-gray-300">
                                <span className={`${c.text} mr-2`}>&gt;</span>{lesson}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
