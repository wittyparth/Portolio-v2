import { Icon } from './Icon';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'primary' | 'yellow' | 'green' | 'purple' | 'red' | 'default';
    pulse?: boolean;
    className?: string;
}

const variantClasses = {
    primary: 'bg-[#2b6cee]/20 text-[#2b6cee] border-[#2b6cee]/30',
    yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    green: 'bg-green-500/20 text-green-400 border-green-500/30',
    purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    red: 'bg-red-500/20 text-red-400 border-red-500/30',
    default: 'bg-white/20 text-white border-white/30',
};

export function Badge({ children, variant = 'default', pulse = false, className = '' }: BadgeProps) {
    return (
        <span className={`flex items-center gap-2 px-2 py-1 rounded border text-xs font-bold uppercase tracking-wide backdrop-blur-md ${variantClasses[variant]} ${className}`}>
            {pulse && (
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
                </span>
            )}
            {children}
        </span>
    );
}
