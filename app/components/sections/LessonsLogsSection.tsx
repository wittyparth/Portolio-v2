/**
 * Lessons & Logs Section Component
 * Based on failures and lessons and logs.html reference
 * Bento grid with Failures & Lessons, Curated Recs, and Dev Log
 */

import { lessonsLogs } from "~/data";

export default function LessonsLogsSection() {
    const { sectionHeader, failuresLessons, curatedRecs, devLog } = lessonsLogs;

    return (
        <section className="py-16">
            <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex items-end justify-between px-1 mb-6">
                    <div className="flex flex-col gap-1">
                        <span className="text-[#2b6cee] text-xs font-bold tracking-wider uppercase">{sectionHeader.badge}</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{sectionHeader.title}</h2>
                        <p className="text-gray-400 max-w-md text-sm leading-relaxed">
                            {sectionHeader.description}
                        </p>
                    </div>
                    <div className="hidden sm:block h-[1px] flex-1 bg-gradient-to-r from-[#282e39] to-transparent ml-6 mb-3" />
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[minmax(180px,auto)]">

                    {/* Failures & Lessons Card */}
                    <a href={failuresLessons.href} className="group md:col-span-8 relative overflow-hidden rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-[#2b6cee]/50 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-10px_rgba(43,108,238,0.15)] transition-all duration-400 flex flex-col md:flex-row">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#2b6cee]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="flex-1 p-8 flex flex-col justify-between z-10">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-[#282e39]/50 text-white border border-white/5">
                                        <span className="material-symbols-outlined" style={{ filter: 'drop-shadow(0 0 8px rgba(43, 108, 238, 0.3))' }}>build_circle</span>
                                    </div>
                                    <span className="text-xs font-mono text-[#2b6cee] bg-[#2b6cee]/10 px-2 py-1 rounded">{failuresLessons.badge}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#2b6cee] transition-colors">{failuresLessons.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                                    {failuresLessons.description}
                                </p>
                            </div>
                            <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-white">
                                <span>{failuresLessons.ctaText}</span>
                                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform text-[#2b6cee]">arrow_forward</span>
                            </div>
                        </div>
                        <div className="w-full md:w-2/5 min-h-[200px] bg-[#111318]/50 relative flex items-center justify-center overflow-hidden">
                            <svg className="w-full h-full absolute inset-0 text-[#2b6cee]/20" preserveAspectRatio="none" viewBox="0 0 100 100">
                                <path d="M0 100 L20 80 L40 90 L60 40 L80 50 L100 20 L100 100 Z" fill="currentColor" />
                            </svg>
                            <div className="relative size-32 opacity-80 group-hover:scale-110 transition-transform duration-500">
                                <svg className="w-full h-full text-[#2b6cee]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path className="animate-pulse" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </a>

                    {/* Curated Recs Card */}
                    <a href={curatedRecs.href} className="group md:col-span-4 relative overflow-hidden rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-[#2b6cee]/50 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-10px_rgba(43,108,238,0.15)] transition-all duration-400 flex flex-col">
                        <div className="absolute top-0 right-0 p-32 bg-[#2b6cee]/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-[#2b6cee]/20 transition-all" />
                        <div className="p-6 flex flex-col h-full z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-2 rounded-lg bg-[#282e39]/50 text-white border border-white/5">
                                    <span className="material-symbols-outlined" style={{ filter: 'drop-shadow(0 0 8px rgba(43, 108, 238, 0.3))' }}>tips_and_updates</span>
                                </div>
                                <div className="size-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#2b6cee] transition-colors">{curatedRecs.title}</h3>
                            <p className="text-gray-400 text-xs leading-relaxed mb-6 flex-grow">
                                {curatedRecs.description}
                            </p>
                            <div className="flex -space-x-3 mb-6">
                                {[1, 2, 3].map((_, i) => (
                                    <div key={i} className="size-8 rounded-full border border-[#161b22] bg-[#282e39]" />
                                ))}
                                <div className="size-8 rounded-full border border-[#161b22] bg-[#282e39] flex items-center justify-center text-[10px] text-white font-medium">+{curatedRecs.totalItems}</div>
                            </div>
                            <div className="flex items-center justify-between border-t border-white/5 pt-4">
                                <span className="text-xs text-gray-500 font-mono">{curatedRecs.updateFrequency}</span>
                                <span className="material-symbols-outlined text-white text-[20px] group-hover:text-[#2b6cee] group-hover:translate-x-1 transition-all">arrow_forward</span>
                            </div>
                        </div>
                    </a>

                    {/* Dev Log Card - Terminal Style */}
                    <a href={devLog.href} className="group md:col-span-12 relative overflow-hidden rounded-2xl bg-[#0d1117] border border-[#30363d] hover:border-[#2b6cee]/50 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-10px_rgba(43,108,238,0.15)] transition-all duration-400 flex flex-col">
                        {/* Terminal Header */}
                        <div className="w-full h-8 bg-[#161b22] border-b border-[#30363d] flex items-center px-4 gap-2">
                            <div className="size-3 rounded-full bg-[#ff5f56]" />
                            <div className="size-3 rounded-full bg-[#ffbd2e]" />
                            <div className="size-3 rounded-full bg-[#27c93f]" />
                            <div className="ml-4 text-[10px] text-gray-500 font-mono">{devLog.terminalPath}</div>
                        </div>

                        <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 w-full">
                            <div className="flex-shrink-0 flex flex-col gap-2 min-w-[200px]">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-[#2b6cee]">terminal</span>
                                    <h3 className="text-xl font-bold text-white group-hover:text-[#2b6cee] transition-colors">{devLog.title}</h3>
                                </div>
                                <p className="text-gray-400 text-sm">{devLog.description}</p>
                                {devLog.liveUpdates && (
                                    <div className="mt-2 inline-flex items-center gap-2 text-xs text-[#2b6cee] font-mono bg-[#2b6cee]/5 border border-[#2b6cee]/20 px-2 py-1 rounded w-fit">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2b6cee] opacity-75" />
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2b6cee]" />
                                        </span>
                                        Live Updates
                                    </div>
                                )}
                            </div>

                            {/* Code Block */}
                            <div className="flex-grow w-full bg-[#111318] rounded-lg border border-[#30363d] p-4 font-mono text-xs md:text-sm text-gray-400 relative overflow-hidden group-hover:border-[#2b6cee]/30 transition-colors">
                                <div className="flex flex-col gap-1">
                                    <div className="flex gap-2">
                                        <span className="text-gray-600">01</span>
                                        <span><span className="text-purple-400">const</span> <span className="text-blue-400">today</span> = <span className="text-green-400">new Date()</span>;</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="text-gray-600">02</span>
                                        <span><span className="text-purple-400">await</span> <span className="text-yellow-400">learn</span>(<span className="text-orange-400">"System Design Patterns"</span>);</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="text-gray-600">03</span>
                                        <span className="text-gray-500">// TODO: Refactor the cache layer implementation</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="text-gray-600">04</span>
                                        <span className="animate-pulse text-[#2b6cee]">_</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-shrink-0">
                                <div className="h-10 w-10 rounded-full bg-[#282e39] flex items-center justify-center group-hover:bg-[#2b6cee] group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined">arrow_outward</span>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}
