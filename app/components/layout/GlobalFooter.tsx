import { Link } from 'react-router';
import { useVisitorAnalytics } from '~/lib/supabase/useVisitorAnalytics';

/**
 * Global Footer Component - Exact match to footer.html
 * Features: Grid pattern, glow effects, navigation matrices, social hub, visitor counter
 */
export function GlobalFooter() {
    const currentYear = new Date().getFullYear();
    const { visitorCount, todayCount, onlineNow, loading } = useVisitorAnalytics();

    return (
        <footer className="relative w-full border-t border-[#293338] bg-[#111518] z-10">
            {/* Decorative Top Gradient Line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#19a1e6] to-transparent opacity-50" />

            {/* Ambient Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(41,51,56,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(41,51,56,0.3)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20" />
            <div className="absolute -top-32 right-0 w-96 h-96 bg-[#19a1e6]/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#19a1e6]/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative px-6 md:px-12 lg:px-24 pt-16 pb-8 max-w-[1400px] mx-auto">
                {/* TOP DECK: Brand & Navigation */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

                    {/* Col 1: Brand Identity */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="group cursor-default">
                            <h2 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#19a1e6] animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]">code_blocks</span>
                                <span className="group-hover:text-[#19a1e6] transition-colors duration-300">PARTHA SARADHI</span>
                            </h2>
                            <div className="h-1 w-12 bg-[#19a1e6] rounded-full mb-4 group-hover:w-24 transition-all duration-500" />
                            <p className="text-[#9dafb8] text-base leading-relaxed max-w-sm">
                                Backend Engineer architecting high-performance scalable systems.
                                Crafting detailed digital experiences where code meets precision.
                            </p>
                        </div>

                        {/* Status Indicator */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#293338]/50 border border-[#293338] w-fit mt-2">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                            </span>
                            <span className="text-xs font-medium text-[#9dafb8] uppercase tracking-wider">System Operational</span>
                        </div>
                    </div>

                    {/* Col 2: Navigation Matrices */}
                    <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        {/* Main Deck */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-[#19a1e6]/80 mb-2 border-b border-[#19a1e6]/20 pb-2 w-fit">Main Deck</h3>
                            <ul className="flex flex-col gap-2">
                                <FooterLink href="/" label="Home" />
                                <FooterLink href="/projects" label="Projects" />
                                <FooterLink href="/blog" label="Blog" />
                                <FooterLink href="/about" label="Resume" />
                            </ul>
                        </div>

                        {/* External Nodes */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-[#19a1e6]/80 mb-2 border-b border-[#19a1e6]/20 pb-2 w-fit">Nodes</h3>
                            <ul className="flex flex-col gap-2">
                                <FooterLink href="/terminal" label="Docs" icon="terminal" />
                                <FooterLink href="/typing-test" label="Status" icon="show_chart" />
                                <FooterLink href="/animes" label="Changelog" icon="history" />
                            </ul>
                        </div>

                        {/* Connect */}
                        <div className="flex flex-col gap-4 sm:hidden md:flex">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-[#19a1e6]/80 mb-2 border-b border-[#19a1e6]/20 pb-2 w-fit">Connect</h3>
                            <Link
                                to="/contact"
                                className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#1a2126] border border-[#293338] hover:border-[#19a1e6] hover:bg-[#19a1e6]/10 text-[#9dafb8] hover:text-white transition-all duration-300 group relative"
                            >
                                <span className="material-symbols-outlined text-xl">mail</span>
                                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-[#19a1e6] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Send Email</span>
                            </Link>
                        </div>
                    </div>

                    {/* Col 3: Social & Visitor Console */}
                    <div className="lg:col-span-3 flex flex-col justify-between gap-8">
                        {/* Social Hub */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-[#19a1e6]/80 mb-2 w-fit">Social Frequency</h3>
                            <div className="flex flex-wrap gap-3">
                                <SocialButton icon="code" label="GitHub" />
                                <SocialButton icon="work" label="LinkedIn" />
                                <SocialButton icon="flutter_dash" label="Twitter" />
                                <SocialButton icon="data_object" label="LeetCode" />
                            </div>
                        </div>

                        {/* Visitor Counter Console */}
                        <div className="relative overflow-hidden rounded-xl bg-[#1a2126]/50 border border-[#293338] p-4 group">
                            {/* Scan line effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#19a1e6]/5 to-transparent w-full h-full -translate-x-full animate-[scan_8s_linear_infinite] pointer-events-none" />

                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] uppercase font-bold tracking-widest text-[#9dafb8]">Live Traffic</span>
                                <div className="flex items-center gap-1.5">
                                    {onlineNow > 0 && (
                                        <span className="text-[9px] text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded font-mono">
                                            {onlineNow} online
                                        </span>
                                    )}
                                    <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 border-t border-[#293338]/50 pt-2">
                                <div>
                                    <p className="text-[10px] text-[#9dafb8] uppercase mb-0.5">Total Visits</p>
                                    <p className="font-mono text-xl font-bold text-white tabular-nums tracking-tight group-hover:text-[#19a1e6] transition-colors">
                                        {loading ? (
                                            <span className="inline-block w-16 h-6 bg-[#293338] animate-pulse rounded" />
                                        ) : (
                                            visitorCount.toLocaleString()
                                        )}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-[#9dafb8] uppercase mb-0.5">Today</p>
                                    <p className="font-mono text-xl font-bold text-white tabular-nums tracking-tight flex items-center gap-1">
                                        {loading ? (
                                            <span className="inline-block w-10 h-6 bg-[#293338] animate-pulse rounded" />
                                        ) : (
                                            <>
                                                {todayCount}
                                                {todayCount > 0 && (
                                                    <span className="text-[10px] text-green-400 bg-green-400/10 px-1 rounded flex items-center">
                                                        <span className="material-symbols-outlined text-[10px]">arrow_drop_up</span>
                                                        live
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MIDDLE DECK: Interactive Console Strip */}
                <div className="border-y border-[#293338] py-6 flex flex-col md:flex-row items-center justify-between gap-6 mb-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/[0.01] pointer-events-none" />

                    {/* Email Copy Component */}
                    <div className="flex items-center gap-4 z-10 w-full md:w-auto">
                        <div className="relative w-full md:w-auto group">
                            <button className="flex w-full md:w-auto items-center justify-between md:justify-start gap-3 bg-[#1a2126] border border-[#293338] hover:border-[#19a1e6]/50 rounded-lg px-4 py-3 transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-8 h-8 rounded bg-[#19a1e6]/10 text-[#19a1e6]">
                                        <span className="material-symbols-outlined text-[18px]">mail</span>
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <span className="text-[10px] uppercase tracking-wider text-[#9dafb8] font-bold">Contact Node</span>
                                        <span className="text-sm font-medium text-white font-mono">partha@example.com</span>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-[#9dafb8] group-hover:text-[#19a1e6] transition-colors ml-4 text-[18px]">content_copy</span>
                            </button>
                        </div>
                    </div>

                    {/* Quote / Console Log */}
                    <div className="hidden md:flex items-center gap-2 text-[#9dafb8]/60 font-mono text-xs z-10">
                        <span className="text-[#19a1e6]/60">&gt;</span>
                        <span className="italic">"Optimizing for O(1) experiences in an O(n) world."</span>
                        <span className="animate-pulse w-2 h-4 bg-[#19a1e6]/60 ml-1" />
                    </div>
                </div>

                {/* BOTTOM DECK: Legal & Meta */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#9dafb8] pt-2">
                    <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4">
                        <p>© {currentYear} Partha Saradhi. All systems go.</p>
                        <span className="hidden md:inline text-[#293338]">|</span>
                        <div className="flex gap-4">
                            <a className="hover:text-[#19a1e6] transition-colors hover:underline" href="#">Privacy Protocol</a>
                            <a className="hover:text-[#19a1e6] transition-colors hover:underline" href="#">Terms of Service</a>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined text-[14px]">bolt</span>
                        <span>Powered by <span className="text-white font-medium">Passion & Coffee</span></span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// Footer Link Component
function FooterLink({ href, label, icon }: { href: string; label: string; icon?: string }) {
    return (
        <li>
            <Link
                to={href}
                className="text-[#9dafb8] hover:text-white hover:pl-2 transition-all duration-300 text-sm flex items-center gap-1 group"
            >
                <span className={`w-0 overflow-hidden group-hover:w-4 transition-all duration-300 text-[#19a1e6] opacity-0 group-hover:opacity-100 material-symbols-outlined text-[14px]`}>
                    {icon || 'arrow_forward_ios'}
                </span>
                {label}
            </Link>
        </li>
    );
}

// Social Button Component
function SocialButton({ icon, label }: { icon: string; label: string }) {
    return (
        <a
            href="#"
            className="group relative flex items-center justify-center w-10 h-10 rounded-lg bg-[#1a2126] border border-[#293338] hover:border-[#19a1e6] hover:bg-[#19a1e6] hover:shadow-[0_0_15px_rgba(25,161,230,0.4)] hover:-translate-y-1 transition-all duration-300"
        >
            <i className={`material-symbols-outlined text-xl text-[#9dafb8] group-hover:text-white transition-colors`}>{icon}</i>
            <span className="sr-only">{label}</span>
        </a>
    );
}
