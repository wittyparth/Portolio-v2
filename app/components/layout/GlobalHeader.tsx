import { Link } from 'react-router';
import { useState, useEffect } from 'react';

// Rotating taglines about me
const taglines = [
    'Backend Engineer',
    'Building 1→1M user systems',
    'IIT Dhanbad',
    'System Architecture',
    'API Designer',
    'Performance Optimizer',
];

/**
 * Global Header Component - Exact match to headers.html
 * Features: Animated cyber border, glassmorphism, circuit logo, nav with hover effects
 */
export function GlobalHeader() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
            {/* Top Cyber Border with animated line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-[#293338] overflow-hidden">
                <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#19a1e6] to-transparent animate-[flow-line_2s_cubic-bezier(0.4,0,0.2,1)_infinite] opacity-50" />
            </div>

            {/* Main Header Content */}
            <div className="bg-[rgba(17,21,24,0.85)] backdrop-blur-xl border-b border-[#293338] relative">
                {/* Subtle noise texture overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-30 pointer-events-none" />

                <div className="px-4 md:px-8 xl:px-12 mx-auto max-w-[1400px]">
                    <div className="h-20 flex items-center justify-between relative z-10">

                        {/* Logo Area */}
                        <Link to="/" className="group flex items-center gap-4 relative">
                            {/* Abstract Circuit Logo */}
                            <div className="relative w-10 h-10 flex items-center justify-center bg-[#1a2228] border border-[#293338] rounded-lg shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] group-hover:border-[#19a1e6]/50 transition-colors duration-300">
                                <svg className="w-6 h-6 text-[#19a1e6]" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
                                    <path className="animate-[draw-logo_2s_ease-out_forwards]" style={{ strokeDasharray: 100, strokeDashoffset: 100 }} d="M7 12H10L12 8L14 16L16 12H17" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    <circle className="animate-pulse" cx="17" cy="12" fill="currentColor" r="1.5" />
                                </svg>
                                {/* Glow effect behind logo */}
                                <div className="absolute inset-0 bg-[#19a1e6]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Text Logo */}
                            <div className="hidden sm:flex flex-col justify-center">
                                <h1 className="text-base font-bold tracking-tight text-white leading-none">
                                    PARTHA<span className="text-[#19a1e6]">.DEV</span>
                                </h1>
                                <RotatingTagline />
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-1 [&:hover_.nav-link-item]:opacity-50 [&:hover_.nav-link-item]:blur-[0.5px] [&_.nav-link-item:hover]:opacity-100 [&_.nav-link-item:hover]:blur-0 [&_.nav-link-item:hover]:scale-105">
                            <NavLink href="/" label="Home" isHome />
                            <NavLink href="/projects" label="Projects" />
                            <NavLink href="/blog" label="Blog" />
                            <NavLink href="/terminal" label="Terminal" hasIndicator />
                            <NavLink href="/contact" label="Contact" />
                        </nav>

                        {/* Right Actions */}
                        <div className="flex items-center gap-3 lg:gap-6">
                            {/* Theme Toggle */}
                            <button
                                aria-label="Toggle Theme"
                                className="hidden sm:flex items-center justify-center w-9 h-9 rounded-lg text-slate-400 hover:text-[#19a1e6] hover:bg-[#1a2228] transition-all duration-300 border border-transparent hover:border-[#293338] group relative overflow-hidden"
                            >
                                <span className="material-symbols-outlined text-[20px] relative z-10 group-hover:rotate-90 transition-transform duration-500">light_mode</span>
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#19a1e6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </button>

                            {/* GitHub Icon */}
                            <a
                                href="https://github.com/parthasaradhi"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Github Profile"
                                className="hidden sm:flex items-center justify-center w-9 h-9 rounded-lg text-slate-400 hover:text-white hover:bg-[#1a2228] transition-all duration-300 border border-transparent hover:border-[#293338] group relative overflow-hidden"
                            >
                                <svg aria-hidden="true" className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                                    <path clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fillRule="evenodd" />
                                </svg>
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#19a1e6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </a>

                            {/* Primary CTA */}
                            <button className="relative group overflow-hidden rounded-md bg-[#19a1e6] hover:bg-[#127CB5] transition-all duration-300 shadow-[0_0_20px_-5px_rgba(25,161,230,0.4)]">
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shine_1s_ease-in-out]" />
                                <div className="relative flex items-center gap-2 px-5 py-2.5">
                                    <span className="material-symbols-outlined text-[18px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                                    <span className="text-white text-sm font-bold tracking-wide uppercase">Get Resume</span>
                                </div>
                            </button>

                            {/* Mobile Menu Trigger */}
                            <button className="md:hidden flex flex-col justify-center items-center w-10 h-10 border border-[#293338] rounded-md bg-[#1a2228] text-slate-300 hover:text-white hover:border-[#19a1e6]/50 transition-colors">
                                <span className="material-symbols-outlined">menu</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Border Gradient Trace */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#19a1e6]/30 to-transparent" />
        </header>
    );
}

// Navigation Link Component
function NavLink({ href, label, isHome = false, hasIndicator = false }: { href: string; label: string; isHome?: boolean; hasIndicator?: boolean }) {
    return (
        <Link
            to={href}
            className="nav-link-item relative px-4 py-2 text-sm font-medium text-slate-300 transition-all duration-300 group"
        >
            <span className="relative z-10 flex items-center gap-1">
                {isHome && <span className="text-[#19a1e6] opacity-50 font-mono text-xs">//</span>}
                {label}
                {hasIndicator && <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />}
            </span>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#19a1e6] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </Link>
    );
}

// Header spacer for fixed header
export function HeaderSpacer() {
    return <div className="h-24 w-full" />;
}

// Rotating Tagline Component with smooth animation
function RotatingTagline() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % taglines.length);
                setIsAnimating(false);
            }, 300); // Half of the transition time
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-4 overflow-hidden mt-1">
            <span
                className={`absolute text-[10px] text-slate-400 font-mono tracking-widest uppercase transition-all duration-300 ease-out ${isAnimating
                        ? 'opacity-0 -translate-y-2'
                        : 'opacity-100 translate-y-0'
                    }`}
            >
                {taglines[currentIndex]}
            </span>
        </div>
    );
}
