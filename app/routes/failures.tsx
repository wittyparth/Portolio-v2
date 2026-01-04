import type { Route } from "./+types/failures";
import { GlobalHeader, HeaderSpacer, GlobalFooter } from '~/components/layout';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Failures & Lessons - Partha Saradhi" },
        { name: "description", content: "A dynamic log of post-mortems, architectural insights, and tooling recommendations." },
    ];
}

const entriesData = [
    {
        id: 1,
        type: 'failure',
        severity: 'CRITICAL',
        title: 'Production DB Deadlock',
        description: 'Circular dependency in transaction logic caused cascading failure during peak load. Required manual session termination.',
        category: 'Post-Mortem',
        color: 'red',
        timeAgo: '2 days ago',
        icon: 'warning',
    },
    {
        id: 2,
        type: 'recommendation',
        severity: 'REC',
        title: 'Biome JS Tooling',
        description: 'Replaced ESLint and Prettier. 30x faster linting and formatting pipeline. A massive DX improvement for the team.',
        category: 'Tooling',
        color: 'purple',
        timeAgo: '4 days ago',
        icon: 'star',
    },
    {
        id: 3,
        type: 'lesson',
        severity: 'LESSON',
        title: 'The Value of Strict Typing',
        description: "Moving to strict TypeScript reduced our runtime errors by 40%. It's not just tooling; it's documentation that never lies.",
        category: 'Architecture',
        color: 'blue',
        timeAgo: '1 week ago',
        icon: 'lightbulb',
    },
    {
        id: 4,
        type: 'failure',
        severity: 'RECOVERED',
        title: 'Memory Leak in Workers',
        description: 'Identified zombie processes in image processing pipeline. Implemented graceful shutdowns and active monitoring on heap usage.',
        category: 'Performance',
        color: 'orange',
        timeAgo: '2 weeks ago',
        icon: 'sync_problem',
    },
    {
        id: 5,
        type: 'recommendation',
        severity: 'REC',
        title: '"Staff Engineer" Book',
        description: 'Essential reading for understanding technical leadership beyond code. It redefined how I approach architectural buy-in.',
        category: 'Career',
        color: 'pink',
        timeAgo: '3 weeks ago',
        icon: 'menu_book',
    },
    {
        id: 6,
        type: 'lesson',
        severity: 'LESSON',
        title: 'Event Sourcing Patterns',
        description: 'Complex domains benefit from storing state changes, not just current state. Audit trails became essentially free.',
        category: 'Design Patterns',
        color: 'emerald',
        timeAgo: '1 month ago',
        icon: 'extension',
    },
];

const recentLogs = [
    { type: 'lesson', title: 'Early Abstractions', desc: 'Wait for the rule of three before extracting a shared component.', time: 'Today, 10:00 AM', color: 'blue' },
    { type: 'rec', title: '"Staff Engineer" Book', desc: 'Understanding technical leadership beyond code.', time: 'Yesterday', color: 'purple' },
    { type: 'failure', title: 'API Rate Limiting', desc: 'Forgot to implement sliding window on the public endpoint.', time: '3 days ago', color: 'red' },
    { type: 'lesson', title: 'Testing Pyramid', desc: 'Shifted focus from E2E to integration tests.', time: '1 week ago', color: 'blue' },
];

export default function FailuresPage() {
    return (
        <div className="bg-[#101622] min-h-screen text-slate-200 font-display selection:bg-[#2b6cee] selection:text-white overflow-x-hidden">
            {/* Background Effects */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-[#2b6cee]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-12 lg:py-20 max-w-7xl">
                {/* Header */}
                <header className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-[#2b6cee]/80 font-mono text-sm tracking-widest uppercase">
                            <span className="material-symbols-outlined text-sm">terminal</span>
                            <span>&gt; ./load_modules.sh --mode=grid</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                            FAILURES & <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-600">LEARNINGS</span>
                        </h1>
                        <p className="text-slate-400 max-w-xl text-lg mt-2 font-light">
                            A dynamic log of post-mortems, architectural insights, and tooling recommendations.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-xs text-slate-500 uppercase tracking-wider font-mono">Synced</span>
                            <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                </span>
                                Live
                            </span>
                        </div>
                        <button className="bg-[#161b26] border border-[#2a3140] hover:border-[#2b6cee]/50 hover:bg-[#2a3140]/50 transition-all text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium group shadow-lg shadow-black/20">
                            <span>Manage Entries</span>
                            <span className="material-symbols-outlined text-base group-hover:rotate-90 transition-transform">settings</span>
                        </button>
                    </div>
                </header>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Content */}
                    <div className="lg:col-span-8 w-full">
                        {/* Filter Tabs */}
                        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                            {['ALL', 'FAILURES', 'LESSONS', 'RECOMMENDATIONS'].map((filter, i) => (
                                <button
                                    key={filter}
                                    className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-colors ${i === 0
                                            ? 'bg-[#2b6cee]/10 border border-[#2b6cee]/20 text-[#2b6cee] hover:bg-[#2b6cee]/20'
                                            : 'bg-[#161b26] border border-[#2a3140] text-slate-400 hover:text-white hover:border-slate-500'
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {entriesData.map((entry) => (
                                <EntryCard key={entry.id} {...entry} />
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="mt-12 flex flex-col items-center justify-center gap-4 opacity-70 hover:opacity-100 transition-opacity">
                            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#2a3140] to-transparent" />
                            <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-[#2b6cee] transition-colors group cursor-pointer bg-transparent border-none">
                                <span className="material-symbols-outlined text-base group-hover:animate-bounce">keyboard_double_arrow_down</span>
                                <span>Load older entries</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <aside className="lg:col-span-4 w-full flex flex-col gap-6 sticky top-8">
                        {/* Learning Velocity */}
                        <div className="bg-[#161b26] rounded-xl border border-[#2a3140] overflow-hidden">
                            <div className="p-5 border-b border-[#2a3140]/50 bg-[#131821] flex justify-between items-center">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Learning Velocity</h3>
                                <span className="material-symbols-outlined text-slate-600 text-sm">bar_chart</span>
                            </div>
                            <div className="p-6">
                                <div className="flex items-end gap-2 mb-2">
                                    <span className="text-3xl font-bold text-white">12</span>
                                    <span className="text-sm text-slate-400 mb-1">entries this month</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-800 rounded-full mb-4 overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-[#2b6cee] to-purple-500 w-[65%] rounded-full" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 rounded bg-white/5 border border-white/5">
                                        <span className="block text-xs text-slate-500 mb-1">Lessons</span>
                                        <span className="text-lg font-mono text-[#2b6cee] font-bold">8</span>
                                    </div>
                                    <div className="p-3 rounded bg-white/5 border border-white/5">
                                        <span className="block text-xs text-slate-500 mb-1">Failures</span>
                                        <span className="text-lg font-mono text-red-500 font-bold">4</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Logs */}
                        <div className="bg-[#161b26] rounded-xl border border-[#2a3140] flex flex-col overflow-hidden">
                            <div className="p-5 border-b border-[#2a3140]/50 flex justify-between items-center bg-[#131821]">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 font-mono">
                                    <span className="w-1.5 h-1.5 bg-[#2b6cee] rounded-full animate-pulse" />
                                    Recent Logs
                                </h3>
                                <span className="material-symbols-outlined text-slate-600 text-sm">history</span>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                {recentLogs.map((log, i) => (
                                    <LogItem key={i} {...log} />
                                ))}
                            </div>
                            <div className="p-3 border-t border-[#2a3140]/50 bg-[#131821]">
                                <button className="w-full py-2 text-[10px] font-mono text-slate-500 hover:text-white hover:bg-white/5 rounded transition-colors uppercase tracking-widest border border-transparent hover:border-[#2a3140]">
                                    View Archive
                                </button>
                            </div>
                        </div>

                        {/* Subscribe Card */}
                        <div className="bg-gradient-to-br from-[#2b6cee]/10 to-transparent rounded-xl border border-[#2b6cee]/20 p-6 flex flex-col gap-3 relative overflow-hidden group">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#2b6cee]/20 rounded-full blur-2xl group-hover:bg-[#2b6cee]/30 transition-all" />
                            <h3 className="text-white font-bold text-sm z-10">Subscribe to updates</h3>
                            <p className="text-xs text-slate-400 z-10 mb-2">Get notified when new post-mortems or lessons are added.</p>
                            <div className="flex gap-2 z-10">
                                <input
                                    className="bg-[#161b26]/50 border border-white/10 rounded px-3 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#2b6cee]/50 flex-1"
                                    placeholder="email@example.com"
                                    type="email"
                                />
                                <button className="bg-[#2b6cee] text-white p-1.5 rounded hover:bg-[#2b6cee]/90 transition-colors">
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <GlobalFooter />
        </div>
    );
}

// Entry Card Component
function EntryCard({ type, severity, title, description, category, color, timeAgo, icon }: {
    type: string;
    severity: string;
    title: string;
    description: string;
    category: string;
    color: string;
    timeAgo: string;
    icon: string;
}) {
    const colorClasses: Record<string, { bg: string; border: string; text: string; hover: string }> = {
        red: { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-500', hover: 'hover:border-red-500/30' },
        purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400', hover: 'hover:border-purple-500/30' },
        blue: { bg: 'bg-[#2b6cee]/10', border: 'border-[#2b6cee]/20', text: 'text-[#2b6cee]', hover: 'hover:border-[#2b6cee]/30' },
        orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-400', hover: 'hover:border-orange-500/30' },
        pink: { bg: 'bg-pink-500/10', border: 'border-pink-500/20', text: 'text-pink-400', hover: 'hover:border-pink-500/30' },
        emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', hover: 'hover:border-emerald-500/30' },
    };
    const c = colorClasses[color] || colorClasses.blue;

    return (
        <article className={`group relative bg-[#161b26] rounded-xl border border-[#2a3140] overflow-hidden flex flex-col h-full transition-all duration-[400ms] hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] ${c.hover}`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${c.bg.replace('bg-', 'from-')} to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />
            <div className="p-6 flex flex-col flex-1 relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className={`w-10 h-10 rounded-lg ${c.bg} ${c.border} border flex items-center justify-center ${c.text} group-hover:scale-110 transition-transform duration-300`}>
                        <span className="material-symbols-outlined">{icon}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className={`text-[10px] font-mono ${c.text} ${c.bg} px-2 py-0.5 rounded border ${c.border}`}>{severity}</span>
                        <span className="text-[10px] font-mono text-slate-600 mt-1">{timeAgo}</span>
                    </div>
                </div>
                <h3 className={`text-xl font-bold text-white mb-2 group-hover:${c.text.replace('text-', 'text-').replace('500', '200').replace('400', '200')} transition-colors leading-tight`}>{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">{description}</p>
                <div className="mt-auto pt-4 border-t border-[#2a3140]/50 flex items-center justify-between">
                    <div className="flex gap-2">
                        <span className={`w-2 h-2 rounded-full ${c.bg.replace('/10', '-500')}`} />
                        <span className="text-xs font-mono text-slate-500">{category}</span>
                    </div>
                    <span className={`material-symbols-outlined text-slate-600 group-hover:${c.text} transition-colors -rotate-45 group-hover:rotate-0 transform duration-300`}>
                        {type === 'recommendation' ? 'open_in_new' : 'arrow_forward'}
                    </span>
                </div>
            </div>
        </article>
    );
}

// Log Item Component
function LogItem({ type, title, desc, time, color }: { type: string; title: string; desc: string; time: string; color: string }) {
    const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
        blue: { bg: 'bg-[#2b6cee]/10', border: 'border-[#2b6cee]/20', text: 'text-[#2b6cee]' },
        purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-500' },
        red: { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-500' },
    };
    const c = colorClasses[color] || colorClasses.blue;
    const icons: Record<string, string> = { lesson: 'lightbulb', rec: 'star', failure: 'warning' };

    return (
        <div className="group flex gap-4 p-4 hover:bg-white/[0.03] transition-colors cursor-pointer border-b border-[#2a3140]/30 last:border-0">
            <div className="mt-1">
                <div className={`w-8 h-8 rounded ${c.bg} ${c.text} flex items-center justify-center border ${c.border} group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-outlined text-lg">{icons[type] || 'lightbulb'}</span>
                </div>
            </div>
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[9px] font-mono ${c.text} ${c.bg} px-1.5 rounded uppercase`}>{type}</span>
                    <span className="text-[9px] text-slate-500">{time}</span>
                </div>
                <h4 className={`text-sm font-medium text-slate-200 group-hover:${c.text} transition-colors leading-tight`}>{title}</h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{desc}</p>
            </div>
        </div>
    );
}
