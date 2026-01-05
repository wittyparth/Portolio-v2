/**
 * Current Focus Section Component
 * Shows what the developer is currently building, learning, and exploring
 * Based on current focus.html reference
 */

import { currentFocus } from "~/data";

export default function CurrentFocusSection() {
    const { activeBuild, learning, obsessed, nextUp, liveUpdates } = currentFocus;

    return (
        <section className="py-20 bg-[#050505]">
            <div className="max-w-[1200px] mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-3 text-emerald-400 text-xs font-mono uppercase tracking-widest font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>{liveUpdates ? 'Live Updates' : 'Updates'}</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                            Current Focus
                        </h2>
                    </div>
                    <p className="text-gray-500 max-w-sm text-sm md:text-right leading-relaxed font-medium">
                        A live look at what I'm building, learning, and exploring in the backend ecosystem right now.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(340px,auto)]">

                    {/* Active Build Card - Large */}
                    <div className="group relative md:col-span-2 lg:col-span-2 rounded-3xl bg-gradient-to-b from-[#121214] to-[#080808] border border-white/[0.06] overflow-hidden flex flex-col justify-between hover:border-emerald-500/20 transition-all duration-500 hover:-translate-y-1 shadow-2xl shadow-black/30">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:40px_40px] opacity-10 pointer-events-none" />
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-emerald-500/10 transition-all duration-700" />

                        <div className="relative z-10 p-8 flex justify-between items-start">
                            <div className="flex flex-col gap-2">
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono font-medium backdrop-blur-md shadow-[0_0_15px_-5px_rgba(16,185,129,0.3)]">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                    </span>
                                    Active Build
                                </span>
                                <h3 className="text-3xl font-bold text-white mt-4 group-hover:text-emerald-400 transition-colors duration-300">{activeBuild.title}</h3>
                                <p className="text-gray-400 max-w-md mt-1 font-light leading-relaxed">{activeBuild.description}</p>
                                <div className="flex flex-wrap gap-2 mt-5">
                                    {activeBuild.tech.map(tech => (
                                        <span key={tech} className="px-3 py-1.5 rounded-lg bg-[#1a1a1c] border border-white/5 text-[11px] text-gray-300 font-mono font-medium hover:bg-white/5 transition-colors">{tech}</span>
                                    ))}
                                </div>
                            </div>
                            <button className="size-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-emerald-500 hover:border-emerald-500 hover:text-black transition-all duration-300 shadow-lg group-hover:scale-105">
                                <span className="material-symbols-outlined rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 text-[24px]">arrow_forward</span>
                            </button>
                        </div>

                        {/* Code Preview */}
                        <div className="relative w-full h-52 mt-6 pl-10 overflow-hidden">
                            <div className="absolute top-0 left-8 right-0 bottom-0 bg-[#0e0e10] rounded-tl-2xl border-l border-t border-white/10 shadow-2xl transform translate-y-6 group-hover:translate-y-3 transition-transform duration-500">
                                <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-[#121214]">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] opacity-80" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] opacity-80" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f] opacity-80" />
                                    <div className="ml-4 text-[10px] text-gray-600 font-mono font-medium tracking-wide">{activeBuild.codePreview.filename}</div>
                                </div>
                                <div className="p-5 font-mono text-xs leading-relaxed text-gray-400">
                                    <div className="flex gap-4 hover:bg-white/5 px-2 -mx-2 rounded">
                                        <span className="text-gray-700 select-none text-[10px] pt-0.5">01</span>
                                        <span><span className="text-blue-400">func</span> <span className="text-purple-300">ProcessTransaction</span>(tx Tx) <span className="text-blue-400">error</span> {"{"}</span>
                                    </div>
                                    <div className="flex gap-4 hover:bg-white/5 px-2 -mx-2 rounded">
                                        <span className="text-gray-700 select-none text-[10px] pt-0.5">02</span>
                                        <span className="pl-4"><span className="text-gray-600 italic">// Validate signature</span></span>
                                    </div>
                                    <div className="flex gap-4 hover:bg-white/5 px-2 -mx-2 rounded">
                                        <span className="text-gray-700 select-none text-[10px] pt-0.5">03</span>
                                        <span className="pl-4"><span className="text-blue-400">if</span> !crypto.<span className="text-purple-300">Verify</span>(tx.Sig, tx.Pub) {"{"}</span>
                                    </div>
                                    <div className="flex gap-4 hover:bg-white/5 px-2 -mx-2 rounded">
                                        <span className="text-gray-700 select-none text-[10px] pt-0.5">04</span>
                                        <span className="pl-8"><span className="text-blue-400">return</span> <span className="text-emerald-400">ErrInvalidSig</span></span>
                                    </div>
                                    <div className="flex gap-4 hover:bg-white/5 px-2 -mx-2 rounded bg-white/[0.02]">
                                        <span className="text-gray-700 select-none text-[10px] pt-0.5">05</span>
                                        <span className="pl-4 text-gray-200">shard := s.router.GetShard(tx.Key)<span className="text-blue-500 animate-pulse">|</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Learning Card */}
                    <div className="group relative rounded-3xl bg-gradient-to-b from-[#121214] to-[#080808] border border-white/[0.06] overflow-hidden flex flex-col hover:border-indigo-500/20 transition-all duration-500 hover:-translate-y-1 shadow-2xl shadow-black/30">
                        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-50" />
                        <div className="relative z-10 p-7 flex flex-col h-full justify-between">
                            <div className="flex justify-between items-start">
                                <span className="inline-flex px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-medium shadow-[0_0_10px_-3px_rgba(99,102,241,0.3)]">
                                    Learning
                                </span>
                            </div>
                            <div className="flex-1 flex items-center justify-center py-6">
                                <div className="relative size-36">
                                    <svg className="size-full -rotate-90 transform group-hover:scale-105 transition-transform duration-500 ease-out" viewBox="0 0 36 36">
                                        <path className="text-white/5" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                        <path className="text-indigo-500 drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${learning.progress}, 100`} strokeLinecap="round" strokeWidth="1.5" />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-4xl font-bold text-white tracking-tighter">{learning.progress}<span className="text-base font-normal text-indigo-400">%</span></span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-indigo-400 transition-colors">{learning.topic}</h3>
                                <p className="text-sm text-gray-500 font-medium">{learning.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Obsessed Card */}
                    <div className="group relative rounded-3xl bg-gradient-to-b from-[#121214] to-[#080808] border border-white/[0.06] overflow-hidden flex flex-col hover:border-fuchsia-500/20 transition-all duration-500 hover:-translate-y-1 shadow-2xl shadow-black/30">
                        <div className="absolute -right-20 -top-20 w-56 h-56 bg-fuchsia-600/10 blur-[90px] rounded-full pointer-events-none group-hover:bg-fuchsia-600/20 transition-all duration-700" />
                        <div className="relative z-10 p-7 flex flex-col h-full justify-between">
                            <div className="flex justify-between items-start">
                                <span className="inline-flex px-3 py-1.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-300 text-xs font-mono font-medium shadow-[0_0_10px_-3px_rgba(217,70,239,0.3)]">
                                    Obsessed
                                </span>
                                <span className="material-symbols-outlined text-white/20 group-hover:text-fuchsia-400 transition-colors">graphic_eq</span>
                            </div>
                            <div className="flex-1 flex items-center justify-center gap-2 py-8 h-32">
                                {obsessed.visualBars.map((h, i) => (
                                    <div key={i} className={`w-1.5 bg-gradient-to-t from-violet-900 to-fuchsia-400 rounded-full shadow-[0_0_8px_rgba(217,70,239,0.4)] animate-pulse`} style={{ height: `${h * 4}px`, animationDelay: `${i * 0.1}s` }} />
                                ))}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-fuchsia-400 transition-colors">{obsessed.area}</h3>
                                <p className="text-sm text-gray-500 font-medium">{obsessed.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Next Up Card - Large */}
                    <div className="group relative md:col-span-2 lg:col-span-2 rounded-3xl bg-gradient-to-b from-[#121214] to-[#080808] border border-white/[0.06] overflow-hidden flex flex-col hover:border-amber-500/20 transition-all duration-500 hover:-translate-y-1 shadow-2xl shadow-black/30">
                        <div className="absolute -left-10 bottom-0 w-40 h-40 bg-amber-500/5 blur-[80px] rounded-full pointer-events-none" />
                        <div className="relative z-10 p-8 h-full flex flex-col md:flex-row gap-10 items-start md:items-center">
                            <div className="flex-shrink-0 max-w-[260px]">
                                <span className="inline-flex px-3 py-1.5 mb-5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono font-medium shadow-[0_0_10px_-3px_rgba(245,158,11,0.2)]">
                                    Next Up • {nextUp.quarter}
                                </span>
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">{nextUp.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{nextUp.description}</p>
                                <div className="mt-8 flex items-center -space-x-3">
                                    {nextUp.avatars.map((label, i) => (
                                        <div key={i} className="size-9 rounded-full border-2 border-[#121212] bg-[#222] flex items-center justify-center overflow-hidden shadow-lg transition-transform hover:scale-110 hover:z-10">
                                            <span className={`text-[10px] font-bold ${i < 2 ? 'text-white' : 'text-gray-400 font-mono'}`}>{label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-grow w-full bg-[#0a0a0c]/80 rounded-2xl border border-white/5 p-5 backdrop-blur-sm shadow-inner relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/5 to-transparent opacity-20 pointer-events-none" />
                                <div className="space-y-3 relative z-10">
                                    {nextUp.tasks.map((task, idx) => (
                                        <div key={idx} className={`flex items-center gap-3 p-3 rounded-xl ${idx === 0 ? 'bg-[#1a1a1c] border border-white/5 shadow-sm group/item transition-colors hover:border-amber-500/30' : idx === 1 ? 'border border-transparent opacity-60' : 'border border-transparent opacity-30'}`}>
                                            <span className={`material-symbols-outlined text-[20px] ${idx === 0 ? 'text-amber-400 group-hover/item:scale-110 transition-transform' : idx === 2 ? 'text-gray-700' : 'text-gray-600'}`}>
                                                {task.locked ? 'lock' : 'radio_button_unchecked'}
                                            </span>
                                            <span className={`text-sm ${idx === 0 ? 'text-gray-200 font-medium' : 'text-gray-400'}`}>{task.text}</span>
                                            {task.status && (
                                                <span className="ml-auto text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/10">{task.status}</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
