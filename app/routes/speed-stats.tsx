import type { Route } from "./+types/speed-stats";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Speed Stats - Partha Saradhi" },
        { name: "description", content: "Real-time engineering metrics and productivity insights." },
    ];
}

const recentShips = [
    { name: 'Hydra API Gateway', version: 'v2.4', type: 'High Performance', icon: 'api', status: 'Live' },
    { name: 'ScaleDB Proxy', version: 'Oct 12', type: 'Database Tool', icon: 'database', status: 'Live' },
    { name: 'Auth Service V3', version: 'Sep 28', type: 'Security', icon: 'lock', status: 'Beta' },
];

import { PageLayout } from "~/components/ui";

export default function SpeedStatsPage({ embedded = false }: { embedded?: boolean }) {
    return (
        <PageLayout embedded={embedded} className={embedded ? "" : "bg-[#0d1117]"}>
            <div className="font-display flex flex-col items-center justify-center p-4 md:p-8 selection:bg-[#2b6cee]/30">
                <div className="w-full max-w-6xl mb-8 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white/90">Speed Stats</h2>
                        <p className="text-gray-400 max-w-lg text-sm md:text-base">Real-time engineering metrics from GitHub, WakaTime, and typing benchmarks.</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs text-emerald-500 font-bold uppercase tracking-widest">Live Updates</span>
                    </div>
                </div>

                <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(180px,auto)] gap-4 md:gap-5 lg:gap-6">
                    {/* Typing Velocity */}
                    <div className="lg:col-span-2 lg:row-span-2 relative overflow-hidden rounded-2xl border border-white/10 bg-[#161b22] p-6 md:p-8 flex flex-col justify-between group hover:border-[#2b6cee]/50 transition-all shadow-2xl">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(43,108,238,0.1),transparent)] opacity-50 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-1.5 rounded-md bg-[#2b6cee]/10 ring-1 ring-[#2b6cee]/20">
                                    <span className="material-symbols-outlined text-[#2b6cee] text-lg">keyboard_alt</span>
                                </div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Typing Velocity</h3>
                            </div>
                            <div className="mt-2 flex items-baseline gap-2">
                                <span className="text-6xl md:text-7xl font-bold text-white tracking-tighter drop-shadow-[0_0_15px_rgba(43,108,238,0.3)]">125</span>
                                <span className="text-xl md:text-2xl text-gray-500 font-medium">WPM</span>
                            </div>
                            <div className="mt-3 flex items-center gap-2 text-emerald-400 bg-emerald-500/5 ring-1 ring-emerald-500/20 px-3 py-1.5 rounded-full w-fit">
                                <span className="material-symbols-outlined text-sm">trending_up</span>
                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wide">Top 1% Global</span>
                            </div>
                        </div>
                        <a href="/typing-test" className="mt-4 w-full flex items-center justify-center gap-2 bg-[#2b6cee] hover:bg-blue-600 text-white font-bold py-3.5 px-6 rounded-lg transition-all">
                            <span className="material-symbols-outlined text-[20px]">speed</span>
                            <span>Test Your Speed</span>
                        </a>
                    </div>

                    {/* Activity */}
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#161b22] flex flex-col hover:border-emerald-500/30 transition-all group">
                        <div className="p-5 pb-1 flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2">
                                    <div className="p-1 rounded bg-emerald-500/10">
                                        <span className="material-symbols-outlined text-emerald-500 text-sm">grid_view</span>
                                    </div>
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Activity</h3>
                                </div>
                                <div className="mt-1 flex items-baseline gap-2">
                                    <span className="text-2xl font-bold text-white">2,847</span>
                                    <span className="text-[10px] text-emerald-400 font-medium bg-emerald-400/10 px-1.5 py-0.5 rounded-full">+12%</span>
                                </div>
                            </div>
                            <div className="px-2 py-1 rounded bg-white/5 text-[10px] text-gray-400 font-mono">2024</div>
                        </div>
                        <div className="flex-1 p-5 flex items-end">
                            <div className="flex gap-[3px] w-full justify-between">
                                {[...Array(7)].map((_, i) => (
                                    <div key={i} className="flex flex-col gap-[3px]">
                                        {[...Array(7)].map((_, j) => (
                                            <div key={j} className={`w-2.5 h-2.5 rounded-[2px] ${Math.random() > 0.5 ? 'bg-emerald-500' : 'bg-[#21262d]'}`} />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Latency */}
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#161b22] p-6 flex flex-col justify-between hover:border-purple-500/30 transition-all">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/10 blur-[40px] rounded-full" />
                        <div className="flex items-center gap-2 mb-2 relative z-10">
                            <div className="p-1 rounded bg-purple-500/10">
                                <span className="material-symbols-outlined text-purple-500 text-sm">bolt</span>
                            </div>
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Latency</h3>
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl md:text-4xl font-bold text-white">35</span>
                                <span className="text-sm text-gray-500">ms avg</span>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                                <span className="material-symbols-outlined text-purple-500 text-[14px]">arrow_downward</span>
                                <span className="text-purple-500 text-[11px] font-bold">-12% vs last month</span>
                            </div>
                        </div>
                    </div>

                    {/* Recent Ships */}
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#161b22] flex flex-col hover:border-amber-500/30 transition-all">
                        <div className="p-5 pb-3 flex justify-between items-center border-b border-white/5">
                            <div className="flex items-center gap-2">
                                <div className="p-1 rounded bg-amber-500/10">
                                    <span className="material-symbols-outlined text-amber-500 text-sm">rocket_launch</span>
                                </div>
                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Recent Ships</h3>
                            </div>
                            <span className="text-[10px] text-gray-400">8 YTD</span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-3 space-y-2">
                            {recentShips.map((ship) => (
                                <div key={ship.name} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#21262d]/50 border border-white/5 hover:border-amber-500/30 transition-all">
                                    <div className="h-9 w-9 rounded-lg bg-gray-900 flex items-center justify-center border border-white/10">
                                        <span className="material-symbols-outlined text-gray-400 text-lg">{ship.icon}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-xs font-bold text-gray-200 truncate">{ship.name}</h4>
                                        <p className="text-[10px] text-gray-500">{ship.version} • {ship.type}</p>
                                    </div>
                                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${ship.status === 'Live' ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'}`}>{ship.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* LOC/Month */}
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#161b22] p-6 flex flex-col justify-between hover:border-sky-500/30 transition-all">
                        <div className="flex items-center gap-2">
                            <div className="p-1 rounded bg-sky-500/10">
                                <span className="material-symbols-outlined text-sky-500 text-sm">code_blocks</span>
                            </div>
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">LOC / Month</h3>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-3xl font-bold text-white">12.4k</span>
                                <span className="text-[10px] text-sky-500 font-bold bg-sky-500/10 px-1.5 py-0.5 rounded">+2.4k</span>
                            </div>
                            <div className="w-full bg-[#21262d] h-2 rounded-full overflow-hidden">
                                <div className="bg-sky-500 h-full rounded-full w-[75%] shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
                            </div>
                            <div className="flex justify-between mt-2">
                                <p className="text-[10px] text-gray-500">Current Progress</p>
                                <p className="text-[10px] text-white font-medium">75%</p>
                            </div>
                        </div>
                    </div>

                    {/* Caffeine */}
                    <div className="lg:col-span-2 relative overflow-hidden rounded-2xl border border-white/10 bg-[#161b22] p-6 flex items-center justify-between hover:border-orange-600/30 transition-all">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="material-symbols-outlined text-orange-500 text-lg">local_cafe</span>
                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Caffeine Level</h3>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl md:text-5xl font-bold text-white">42</span>
                                <span className="text-base text-gray-500">Cups</span>
                            </div>
                            <p className="text-xs text-orange-400 mt-1 font-medium">Fueling backend architecture</p>
                        </div>
                        <div className="w-20 h-24 relative">
                            <div className="absolute bottom-0 w-full h-[85%] bg-[#21262d] rounded-b-2xl rounded-t-sm border border-gray-700 overflow-hidden">
                                <div className="absolute bottom-0 w-full h-[65%] bg-gradient-to-t from-orange-950 to-orange-800 animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
