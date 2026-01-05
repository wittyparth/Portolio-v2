/**
 * Speed Stats Section Component
 * Bento grid with typing speed, latency, shipped projects, LOC, contribution graph, and caffeine level
 */

import { speedStats } from "~/data";

// Generate contribution grid data
const generateContributions = () => {
    const levels = ['bg-[#161b22]', 'bg-[#0e4429]', 'bg-[#006d32]', 'bg-[#26a641]', 'bg-[#39d353]'];
    const contributions = [];
    for (let i = 0; i < 140; i++) {
        const rand = Math.random();
        let level = 0;
        if (rand > 0.95) level = 4;
        else if (rand > 0.85) level = 3;
        else if (rand > 0.70) level = 2;
        else if (rand > 0.40) level = 1;
        contributions.push(levels[level]);
    }
    return contributions;
};

const contributions = generateContributions();

export default function SpeedStatsSection() {
    const { typingVelocity, latency, locPerMonth, contributions: contribData, caffeineLevel, shippedProjects, shippedCount } = speedStats;

    return (
        <section className="py-20">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                {/* Section Header */}
                <div className="mb-8 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white/90">Speed Stats</h2>
                        <p className="text-gray-400 max-w-lg text-sm md:text-base">
                            Real-time engineering metrics and productivity insights. Data aggregated from GitHub, WakaTime, and typing benchmarks.
                        </p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs text-emerald-500 font-bold uppercase tracking-widest">Live Updates</span>
                    </div>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(180px,auto)] gap-4 md:gap-5 lg:gap-6">

                    {/* Typing Velocity - Large Card */}
                    <div className="lg:col-span-2 lg:row-span-2 relative overflow-hidden rounded-2xl border border-white/10 bg-[#161b22] p-6 md:p-8 flex flex-col justify-between group hover:border-[#2b6cee]/50 transition-all duration-500 shadow-2xl shadow-black/20">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#2b6cee]/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(0deg, transparent 24%, #ffffff 25%, #ffffff 26%, transparent 27%, transparent 74%, #ffffff 75%, #ffffff 76%, transparent 77%), linear-gradient(90deg, transparent 24%, #ffffff 25%, #ffffff 26%, transparent 27%, transparent 74%, #ffffff 75%, #ffffff 76%, transparent 77%)", backgroundSize: "50px 50px" }} />

                        <div className="flex justify-between items-start relative z-10">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-1.5 rounded-md bg-[#2b6cee]/10 ring-1 ring-[#2b6cee]/20">
                                        <span className="material-symbols-outlined text-[#2b6cee] text-lg leading-none">keyboard_alt</span>
                                    </div>
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Typing Velocity</h3>
                                </div>
                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="text-6xl md:text-7xl font-bold text-white tracking-tighter drop-shadow-[0_0_15px_rgba(43,108,238,0.3)]">{typingVelocity.wpm}</span>
                                    <span className="text-xl md:text-2xl text-gray-500 font-medium">WPM</span>
                                </div>
                                <div className="mt-3 flex items-center gap-2 text-emerald-400 bg-emerald-500/5 ring-1 ring-emerald-500/20 px-3 py-1.5 rounded-full w-fit backdrop-blur-sm">
                                    <span className="material-symbols-outlined text-sm">trending_up</span>
                                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-wide">{typingVelocity.percentile}</span>
                                </div>
                            </div>
                        </div>

                        {/* Gauge */}
                        <div className="relative h-40 w-full mt-4 flex items-end justify-center group-hover:scale-[1.02] transition-transform duration-500">
                            <svg className="w-full h-full max-w-[340px] overflow-visible" viewBox="0 0 200 100">
                                <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#21262d" strokeLinecap="round" strokeWidth="16" />
                                <g stroke="#30363d" strokeWidth="2">
                                    <line transform="rotate(0 100 100)" x1="20" x2="10" y1="100" y2="100" />
                                    <line transform="rotate(45 100 100)" x1="20" x2="10" y1="100" y2="100" />
                                    <line transform="rotate(90 100 100)" x1="20" x2="10" y1="100" y2="100" />
                                    <line transform="rotate(135 100 100)" x1="20" x2="10" y1="100" y2="100" />
                                    <line transform="rotate(180 100 100)" x1="20" x2="10" y1="100" y2="100" />
                                </g>
                                <defs>
                                    <linearGradient id="gaugeGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                                        <stop offset="50%" stopColor="#2b6cee" />
                                        <stop offset="100%" stopColor="#60a5fa" />
                                    </linearGradient>
                                </defs>
                                <path d="M 20 100 A 80 80 0 0 1 165 35" fill="none" stroke="url(#gaugeGradient)" strokeLinecap="round" strokeWidth="16" />
                                <text fill="#6b7280" fontSize="10" fontWeight="600" textAnchor="middle" x="25" y="125">0</text>
                                <text fill="#6b7280" fontSize="10" fontWeight="600" textAnchor="middle" x="175" y="125">180</text>
                            </svg>
                        </div>

                        <a href="/typing-test" className="mt-4 relative overflow-hidden w-full flex items-center justify-center gap-2 bg-[#2b6cee] hover:bg-blue-600 text-white font-bold py-3.5 px-6 rounded-lg transition-all active:scale-[0.98] group/btn">
                            <span className="material-symbols-outlined text-[20px] transition-transform group-hover/btn:rotate-12">speed</span>
                            <span className="tracking-wide">Test Your Speed</span>
                        </a>
                    </div>

                    {/* Latency Card */}
                    <div className="lg:col-span-1 lg:row-span-1 relative overflow-hidden rounded-2xl border border-white/10 bg-[#161b22] p-6 flex flex-col justify-between hover:border-purple-500/30 transition-all duration-300">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/10 blur-[40px] rounded-full" />
                        <div className="flex items-center gap-2 mb-2 relative z-10">
                            <div className="p-1 rounded bg-purple-500/10">
                                <span className="material-symbols-outlined text-purple-500 text-sm leading-none">bolt</span>
                            </div>
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Latency</h3>
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl md:text-4xl font-bold text-white tracking-tight">{latency.avg}</span>
                                <span className="text-sm text-gray-500 font-medium">{latency.unit} avg</span>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                                <span className="material-symbols-outlined text-purple-500 text-[14px]">arrow_downward</span>
                                <span className="text-purple-500 text-[11px] font-bold tracking-wide">{latency.trend}</span>
                            </div>
                        </div>
                        <div className="h-12 w-full mt-4 relative">
                            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
                                <defs>
                                    <linearGradient id="purpleGrad" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0" stopColor="#a855f7" stopOpacity="0.3" />
                                        <stop offset="1" stopColor="#a855f7" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                <path d="M0 35 L 10 30 L 20 32 L 30 15 L 40 25 L 50 20 L 60 22 L 70 10 L 80 18 L 90 12 L 100 5 L 100 40 L 0 40 Z" fill="url(#purpleGrad)" />
                                <path d="M0 35 L 10 30 L 20 32 L 30 15 L 40 25 L 50 20 L 60 22 L 70 10 L 80 18 L 90 12 L 100 5" fill="none" stroke="#a855f7" strokeLinejoin="round" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                                <circle cx="100" cy="5" fill="#ffffff" r="3" stroke="#a855f7" strokeWidth="2" />
                            </svg>
                        </div>
                    </div>

                    {/* Shipped Projects - Tall Card */}
                    <div className="lg:col-span-1 lg:row-span-2 relative overflow-hidden rounded-2xl border border-white/10 bg-[#161b22] flex flex-col hover:border-amber-500/50 transition-all duration-300 shadow-xl shadow-black/30 group ring-1 ring-white/5">
                        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute -right-10 top-0 w-32 h-32 bg-amber-500/10 blur-[60px] rounded-full pointer-events-none" />

                        {/* Header */}
                        <div className="p-6 pb-4 flex justify-between items-center z-10 border-b border-white/5 bg-[#161b22]/80 backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-amber-500/10 ring-1 ring-amber-500/20 shadow-lg shadow-amber-500/5">
                                    <span className="material-symbols-outlined text-amber-500 text-lg leading-none">rocket_launch</span>
                                </div>
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-300">Shipped</h3>
                                    <p className="text-[10px] text-gray-500 font-mono mt-0.5">Deployment Log</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                                </span>
                                <span className="text-[10px] text-amber-500 font-bold">{shippedCount} YTD</span>
                            </div>
                        </div>

                        {/* Projects List */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 z-10">
                            {shippedProjects.map((project, index) => (
                                <div key={index} className={`group/item relative flex flex-col gap-2 p-3.5 rounded-xl bg-[#21262d]/50 border border-white/5 hover:bg-[#21262d] hover:border-amber-500/40 hover:shadow-[0_0_15px_rgba(245,158,11,0.1)] transition-all cursor-pointer ${index === 3 ? 'opacity-80 hover:opacity-100' : ''}`}>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-lg bg-gray-900 flex items-center justify-center shrink-0 border border-white/10 group-hover/item:border-amber-500/50 group-hover/item:text-amber-500 transition-all shadow-inner">
                                                <span className="material-symbols-outlined text-gray-400 text-xl group-hover/item:scale-110 transition-transform">{project.icon}</span>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-100 group-hover/item:text-white transition-colors">{project.name}</h4>
                                                <p className="text-[10px] text-gray-500 font-mono mt-0.5">{project.version}</p>
                                            </div>
                                        </div>
                                        <span className={`text-[9px] font-bold px-2 py-1 rounded border ${project.statusColor === 'emerald' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
                                            project.statusColor === 'amber' ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' :
                                                'text-gray-400 bg-gray-500/10 border-gray-500/20'
                                            }`}>{project.status}</span>
                                    </div>
                                    {project.description && (
                                        <div className="pl-[52px]">
                                            <p className="text-[11px] text-gray-400 leading-relaxed border-l-2 border-white/5 pl-2 group-hover/item:border-amber-500/30 transition-colors">{project.description}</p>
                                            {project.tags && (
                                                <div className="flex gap-2 mt-2">
                                                    {project.tags.map((tag, i) => (
                                                        <span key={i} className="text-[10px] text-gray-600 bg-black/20 px-1.5 py-0.5 rounded">{tag}</span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#161b22] to-transparent pointer-events-none z-20" />
                    </div>

                    {/* LOC/Month Card */}
                    <div className="lg:col-span-1 lg:row-span-1 relative overflow-hidden rounded-2xl border border-white/10 bg-[#161b22] p-6 flex flex-col justify-between hover:border-sky-500/30 transition-all duration-300">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                                <div className="p-1 rounded bg-sky-500/10">
                                    <span className="material-symbols-outlined text-sky-500 text-sm leading-none">code_blocks</span>
                                </div>
                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">LOC / Month</h3>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-3xl font-bold text-white tracking-tight">{locPerMonth.current}</span>
                                <span className="text-[10px] text-sky-500 font-bold bg-sky-500/10 px-1.5 py-0.5 rounded">{locPerMonth.growth}</span>
                            </div>
                            <div className="w-full bg-[#21262d] h-2 rounded-full mt-1 overflow-hidden relative">
                                <div className="bg-sky-500 h-full rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]" style={{ width: `${locPerMonth.progressPercent}%` }} />
                            </div>
                            <div className="flex justify-between mt-2">
                                <p className="text-[10px] text-gray-500">Current Progress</p>
                                <p className="text-[10px] text-white font-medium">{locPerMonth.progressPercent}%</p>
                            </div>
                        </div>
                    </div>

                    {/* Contribution Graph - Wide */}
                    <div className="lg:col-span-3 lg:row-span-1 relative overflow-hidden rounded-2xl border border-white/10 bg-[#161b22] flex flex-col hover:border-emerald-500/30 transition-all duration-500 group shadow-lg">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-emerald-500/10 transition-colors duration-700" />

                        <div className="p-5 pb-2 flex justify-between items-center z-10 border-b border-white/5 bg-[#161b22]/50 backdrop-blur-sm">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-md bg-[#21262d] border border-white/5">
                                    <span className="material-symbols-outlined text-white text-sm leading-none">commit</span>
                                </div>
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-300">Contribution Graph</h3>
                                    <p className="text-[10px] text-emerald-400 font-mono">{contribData.total.toLocaleString()} contributions in {contribData.year}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="hidden sm:flex items-center gap-1">
                                    <span className="text-[10px] text-gray-500">Less</span>
                                    <div className="w-2.5 h-2.5 rounded-[2px] bg-[#161b22]" />
                                    <div className="w-2.5 h-2.5 rounded-[2px] bg-[#0e4429]" />
                                    <div className="w-2.5 h-2.5 rounded-[2px] bg-[#006d32]" />
                                    <div className="w-2.5 h-2.5 rounded-[2px] bg-[#26a641]" />
                                    <div className="w-2.5 h-2.5 rounded-[2px] bg-[#39d353]" />
                                    <span className="text-[10px] text-gray-500">More</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 w-full relative p-5 flex items-center overflow-x-auto">
                            <div className="flex flex-col justify-between text-[9px] text-gray-500 font-mono mr-2 h-[88px] py-1 select-none">
                                <span>Mon</span>
                                <span>Wed</span>
                                <span>Fri</span>
                            </div>
                            <div className="grid grid-rows-7 grid-flow-col gap-[3px] h-[96px] w-full min-w-[700px]">
                                {contributions.map((level, i) => (
                                    <div key={i} className={`w-3 h-3 rounded-[2px] ${level} hover:scale-[1.4] hover:z-10 hover:shadow-[0_0_8px_rgba(57,211,83,0.8)] transition-all cursor-pointer`} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Caffeine Card */}
                    <div className="lg:col-span-1 lg:row-span-1 relative overflow-hidden rounded-2xl border border-white/10 bg-[#161b22] p-6 flex items-center justify-between hover:border-orange-600/30 transition-all duration-300">
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#6b7280 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                        <div className="relative z-10 flex flex-col gap-1 pl-2">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="material-symbols-outlined text-orange-500 text-lg">local_cafe</span>
                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Caffeine Level</h3>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">{caffeineLevel.cups}</span>
                                <span className="text-base text-gray-500 font-medium">Cups</span>
                            </div>
                            <p className="text-xs text-orange-400 mt-1 font-medium tracking-wide">Fueling backend architecture</p>
                        </div>
                        {/* Coffee Cup Visual */}
                        <div className="relative w-20 h-24 mr-6 group">
                            <div className="absolute bottom-0 w-full h-[85%] bg-[#21262d] rounded-b-2xl rounded-t-sm border border-gray-700 overflow-hidden shadow-lg z-10">
                                <div className="absolute bottom-0 left-0 w-full bg-orange-900/60 group-hover:h-[75%] transition-all duration-1000" style={{ height: `${caffeineLevel.fillPercent}%` }}>
                                    <div className="w-full h-full animate-pulse bg-gradient-to-t from-orange-950 to-orange-800" />
                                </div>
                                <div className="absolute top-0 right-2 w-2 h-full bg-white/5 skew-x-[-10deg]" />
                            </div>
                            <div className="absolute top-[15%] w-full h-1.5 bg-gray-600 rounded-full z-20 shadow-sm" />
                            <div className="absolute top-[35%] -right-3 w-6 h-10 border-[3px] border-gray-700 rounded-r-xl z-0" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
