import { Link } from 'react-router';
import { Icon } from './Icon';
import { IconButton } from './Button';

export interface NavLink {
    label: string;
    href: string;
    isActive?: boolean;
}

interface NavigationProps {
    links?: NavLink[];
    showThemeToggle?: boolean;
    showSearch?: boolean;
    variant?: 'default' | 'minimal';
}

export function Navigation({
    links = [],
    showThemeToggle = true,
    showSearch = false,
    variant = 'default'
}: NavigationProps) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#111318]/80 backdrop-blur-md border-b border-[#282e39]">
            <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-4 text-white group cursor-pointer">
                    <div className="size-8 rounded bg-[#2b6cee]/20 flex items-center justify-center text-[#2b6cee] border border-[#2b6cee]/30">
                        <Icon name="terminal" size="lg" />
                    </div>
                    <h2 className="text-white text-xl font-bold tracking-tight group-hover:text-[#2b6cee] transition-colors">
                        PARTHA.DEV
                    </h2>
                </Link>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            to={link.href}
                            className={`text-sm font-medium transition-colors ${link.isActive
                                    ? 'text-white border-b-2 border-[#2b6cee] py-5'
                                    : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className="flex gap-3">
                    {showSearch && <IconButton icon="search" variant="primary" />}
                    {showThemeToggle && <IconButton icon="light_mode" variant="yellow" />}
                </div>
            </div>
        </header>
    );
}

// Alternative Navigation style for some pages
export function NavigationAlt({
    links = [],
    ctaLabel = "Let's Talk",
    ctaHref = "#"
}: {
    links?: NavLink[];
    ctaLabel?: string;
    ctaHref?: string;
}) {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#111318]/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
                <Link to="/" className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white">
                        <Icon name="terminal" className="!text-[20px]" />
                    </div>
                    <h2 className="text-lg font-bold tracking-tight">Partha Saradhi</h2>
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            to={link.href}
                            className={`text-sm font-medium transition-colors ${link.isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <Link
                    to={ctaHref}
                    className="hidden md:flex h-9 items-center justify-center rounded-full bg-[#2b6cee] px-5 text-sm font-bold text-white shadow-[0_0_15px_rgba(43,108,238,0.4)] hover:shadow-[0_0_25px_rgba(43,108,238,0.6)] hover:scale-105 transition-all"
                >
                    {ctaLabel}
                </Link>

                <button className="flex md:hidden h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white">
                    <Icon name="menu" />
                </button>
            </div>
        </header>
    );
}
