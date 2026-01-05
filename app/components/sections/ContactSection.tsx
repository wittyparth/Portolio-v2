/**
 * Contact & Guestbook Section Component
 * Combined contact form with guestbook activity - matches contact-form.html design
 */

import { guestbook } from "~/data";

export default function ContactSection() {
    const { entries, stats } = guestbook;
    const guestbookEntries = entries.filter(e => e.showOnHomepage);

    return (
        <section className="py-20 relative">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#020408] via-[#050a14] to-[#020408] opacity-90" />
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30">
                    <div className="absolute -top-[10%] -left-[10%] w-[70vw] h-[70vw] bg-blue-900/40 rounded-full mix-blend-screen filter blur-[120px] animate-blob" />
                    <div className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] bg-indigo-900/40 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000" />
                    <div className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] bg-violet-900/40 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-4000" />
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(43,108,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(43,108,238,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 lg:px-16">
                <div className="flex flex-col gap-8">
                    {/* Header */}
                    <div className="flex items-center justify-between w-full border-b border-[#2a3449] pb-4 mb-4 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[#2b6cee] animate-pulse">terminal</span>
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                TRANSMISSION &amp; LOGS
                            </h2>
                        </div>
                        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-[#94a3b8] bg-[#151c2f]/80 px-3 py-1 rounded-full border border-[#2a3449] backdrop-blur-sm shadow-lg">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            SYSTEM ONLINE
                        </div>
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
                        {/* Guestbook Activity Card */}
                        <div className="lg:col-span-5 flex flex-col gap-6">
                            <div className="relative flex-1 group rounded-xl border border-[#2a3449] bg-[#151c2f]/60 backdrop-blur-xl p-6 lg:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-[#2b6cee]/50 shadow-2xl">
                                {/* Top Glow Line */}
                                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#2b6cee]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="flex flex-col gap-4 z-10">
                                    <div className="flex items-start justify-between">
                                        <div className="p-3 bg-[#2b6cee]/10 rounded-lg border border-[#2b6cee]/20 text-[#2b6cee] shadow-[0_0_15px_rgba(43,108,238,0.1)]">
                                            <span className="material-symbols-outlined text-[32px]">history_edu</span>
                                        </div>
                                        <span className="text-[10px] font-mono text-[#2b6cee] bg-[#2b6cee]/5 px-2 py-1 rounded border border-[#2b6cee]/10">LIVE FEED</span>
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold text-white mb-2">Guestbook Activity</h3>
                                        <p className="text-[#94a3b8] text-sm leading-relaxed">
                                            See who's stopped by recently. Join the list of visitors and leave your mark on the digital log.
                                        </p>
                                    </div>
                                </div>

                                {/* Guestbook Entries */}
                                <div className="mt-8 flex flex-col gap-3 relative">
                                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#151c2f] to-transparent z-20 pointer-events-none" />
                                    {guestbookEntries.map((entry, idx) => (
                                        <div
                                            key={idx}
                                            className={`flex items-center gap-4 p-3 rounded-lg bg-[#0f1420]/80 border border-[#2a3449]/50 hover:border-[#2b6cee]/30 transition-colors group/item backdrop-blur-sm ${idx === guestbookEntries.length - 1 ? 'opacity-60' : ''}`}
                                        >
                                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center border border-[#2a3449] text-xs font-bold text-gray-300 group-hover/item:text-white group-hover/item:border-[#2b6cee]/50 transition-colors">
                                                {entry.initials}
                                            </div>
                                            <div className="flex flex-col flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-bold text-white truncate">{entry.name}</span>
                                                    <span className="text-[10px] font-mono text-[#94a3b8]">{entry.timeDisplay}</span>
                                                </div>
                                                <p className="text-xs text-[#94a3b8] truncate italic group-hover/item:text-[#2b6cee]/80 transition-colors">"{entry.message}"</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Sign Guestbook Button */}
                                <div className="mt-8 pt-6 border-t border-[#2a3449]/50 z-20">
                                    <a href="/guestbook" className="w-full group/btn relative flex items-center justify-between px-6 py-4 bg-[#2b6cee] rounded-lg overflow-hidden transition-all hover:bg-blue-600 active:scale-[0.98] shadow-lg shadow-[#2b6cee]/20 hover:shadow-[#2b6cee]/40">
                                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                                        <div className="flex flex-col items-start relative z-10">
                                            <span className="text-white font-bold text-lg tracking-wide">Sign the Guestbook</span>
                                            <span className="text-blue-100 text-xs font-normal">Join {stats.totalSignatures.toLocaleString()} other visitors</span>
                                        </div>
                                        <span className="material-symbols-outlined text-white group-hover/btn:translate-x-1 transition-transform relative z-10">arrow_forward</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-7 h-full">
                            <div className="relative h-full rounded-xl border border-[#2a3449] bg-[#151c2f]/40 backdrop-blur-md p-1 shadow-2xl">
                                {/* Corner Brackets */}
                                <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[#2b6cee] rounded-tl-sm -translate-x-[1px] -translate-y-[1px] shadow-[0_0_10px_rgba(43,108,238,0.5)]" />
                                <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-[#2b6cee] rounded-tr-sm translate-x-[1px] -translate-y-[1px] shadow-[0_0_10px_rgba(43,108,238,0.5)]" />
                                <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-[#2b6cee] rounded-bl-sm -translate-x-[1px] translate-y-[1px] shadow-[0_0_10px_rgba(43,108,238,0.5)]" />
                                <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[#2b6cee] rounded-br-sm translate-x-[1px] translate-y-[1px] shadow-[0_0_10px_rgba(43,108,238,0.5)]" />

                                <form className="h-full flex flex-col gap-6 p-6 lg:p-10 bg-[#0e121b]/80 rounded-lg shadow-inner backdrop-blur-sm">
                                    {/* Form Header */}
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                            <span className="w-2 h-6 bg-[#2b6cee] rounded-sm shadow-[0_0_8px_rgba(43,108,238,0.6)]" />
                                            INITIALIZE CONTACT
                                        </h3>
                                        <div className="flex gap-2">
                                            <span className="h-2 w-2 rounded-full bg-[#2a3449]" />
                                            <span className="h-2 w-2 rounded-full bg-[#2a3449]" />
                                            <span className="h-2 w-2 rounded-full bg-[#2a3449]" />
                                        </div>
                                    </div>

                                    {/* Input Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="input-group flex flex-col gap-2 group">
                                            <label className="text-xs font-bold tracking-widest text-[#94a3b8] group-focus-within:text-[#2b6cee] transition-colors uppercase pl-1">Identifier (Name)</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <span className="material-symbols-outlined text-[#2a3449] group-focus-within:text-[#2b6cee] transition-colors text-lg">badge</span>
                                                </div>
                                                <input
                                                    className="w-full bg-[#151c2f]/80 border border-[#2a3449] text-white text-sm rounded-lg focus:ring-1 focus:ring-[#2b6cee] focus:border-[#2b6cee] block pl-10 p-3.5 placeholder-gray-600 transition-all shadow-[0_0_0_1px_rgba(0,0,0,0)] focus:shadow-[0_0_15px_rgba(43,108,238,0.15)] outline-none backdrop-blur-sm"
                                                    placeholder="e.g. Neo Anderson"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="input-group flex flex-col gap-2 group">
                                            <label className="text-xs font-bold tracking-widest text-[#94a3b8] group-focus-within:text-[#2b6cee] transition-colors uppercase pl-1">Return Address (Email)</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <span className="material-symbols-outlined text-[#2a3449] group-focus-within:text-[#2b6cee] transition-colors text-lg">alternate_email</span>
                                                </div>
                                                <input
                                                    className="w-full bg-[#151c2f]/80 border border-[#2a3449] text-white text-sm rounded-lg focus:ring-1 focus:ring-[#2b6cee] focus:border-[#2b6cee] block pl-10 p-3.5 placeholder-gray-600 transition-all shadow-[0_0_0_1px_rgba(0,0,0,0)] focus:shadow-[0_0_15px_rgba(43,108,238,0.15)] outline-none backdrop-blur-sm"
                                                    placeholder="neo@matrix.com"
                                                    type="email"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Message Textarea */}
                                    <div className="input-group flex flex-col gap-2 flex-1 group">
                                        <label className="text-xs font-bold tracking-widest text-[#94a3b8] group-focus-within:text-[#2b6cee] transition-colors uppercase pl-1">Payload (Message)</label>
                                        <div className="relative flex-1">
                                            <textarea
                                                className="w-full h-40 md:h-full min-h-[160px] bg-[#151c2f]/80 border border-[#2a3449] text-white text-sm rounded-lg focus:ring-1 focus:ring-[#2b6cee] focus:border-[#2b6cee] block p-4 placeholder-gray-600 transition-all resize-none shadow-[0_0_0_1px_rgba(0,0,0,0)] focus:shadow-[0_0_15px_rgba(43,108,238,0.15)] outline-none font-mono backdrop-blur-sm"
                                                placeholder="Type your transmission here..."
                                            />
                                            <div className="absolute bottom-3 right-3 text-[10px] text-gray-600 font-mono pointer-events-none bg-[#151c2f] px-1 rounded">Markdown Supported</div>
                                        </div>
                                    </div>

                                    {/* Submit Row */}
                                    <div className="flex items-center justify-between pt-2">
                                        <div className="hidden sm:flex items-center gap-2 text-xs text-[#94a3b8] font-mono">
                                            <span className="material-symbols-outlined text-[16px]">encrypted</span>
                                            <span>End-to-end encrypted</span>
                                        </div>
                                        <button
                                            className="group flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-black px-8 py-3.5 rounded-lg font-bold text-sm transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] active:scale-95 ml-auto w-full sm:w-auto"
                                            type="button"
                                        >
                                            <span className="tracking-widest uppercase">Execute Send</span>
                                            <span className="material-symbols-outlined group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-lg">send</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Footer Status */}
                    <div className="w-full flex justify-between items-center text-[10px] text-gray-600 font-mono uppercase tracking-widest border-t border-[#2a3449] pt-6 mt-2 opacity-50">
                        <span>System_ID: PS_PORTFOLIO_V4</span>
                        <span className="flex items-center gap-2">
                            <span className="animate-ping h-1 w-1 rounded-full bg-green-500" />
                            Network Stable
                        </span>
                    </div>
                </div>
            </div>

            {/* Animations */}
            <style>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob { animation: blob 20s infinite; }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
            `}</style>
        </section>
    );
}
