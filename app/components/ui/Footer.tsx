import { Link } from 'react-router';
import { Icon } from './Icon';

export interface FooterLink {
    label: string;
    href: string;
}

interface FooterProps {
    links?: FooterLink[];
    showStatus?: boolean;
    variant?: 'default' | 'minimal' | 'full';
}

export function Footer({
    links = [
        { label: 'Twitter', href: '#' },
        { label: 'GitHub', href: '#' },
        { label: 'LinkedIn', href: '#' },
    ],
    showStatus = true,
    variant = 'default'
}: FooterProps) {
    if (variant === 'minimal') {
        return (
            <footer className="w-full border-t border-white/5 bg-[#0B0C10] py-12">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-sm">© 2024 Partha Saradhi. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a className="text-gray-500 hover:text-white transition-colors" href="#">
                            <Icon name="mail" size="lg" />
                        </a>
                        <a className="text-gray-500 hover:text-white transition-colors" href="#">
                            <Icon name="code" size="lg" />
                        </a>
                        <a className="text-gray-500 hover:text-white transition-colors" href="#">
                            <Icon name="link" size="lg" />
                        </a>
                    </div>
                </div>
            </footer>
        );
    }

    return (
        <footer className="bg-[#111318] border-t border-[#282e39] py-12">
            <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="size-6 rounded bg-[#2b6cee]/20 flex items-center justify-center text-[#2b6cee] border border-[#2b6cee]/30">
                        <Icon name="terminal" size="sm" />
                    </div>
                    <span className="text-slate-400 font-mono text-sm">Partha.dev © 2024</span>
                </div>

                {/* Links */}
                <div className="flex gap-6">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-slate-500 hover:text-[#2b6cee] transition-colors text-sm"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Status */}
                {showStatus && (
                    <div className="flex items-center gap-2 text-xs text-slate-600 font-mono">
                        <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                        <span>System Operational</span>
                    </div>
                )}
            </div>
        </footer>
    );
}
