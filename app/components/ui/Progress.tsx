interface ProgressBarProps {
    value: number; // 0-100
    variant?: 'default' | 'gradient' | 'glow';
    size?: 'sm' | 'md' | 'lg';
    showIndicator?: boolean;
    className?: string;
}

const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
};

export function ProgressBar({
    value,
    variant = 'default',
    size = 'md',
    showIndicator = false,
    className = ''
}: ProgressBarProps) {
    const clampedValue = Math.min(100, Math.max(0, value));

    return (
        <div className={`w-full bg-slate-800 rounded-full overflow-hidden ${sizeClasses[size]} ${className}`}>
            <div
                className={`h-full rounded-full relative transition-all duration-300 ${variant === 'gradient'
                        ? 'bg-gradient-to-r from-[#2b6cee] to-blue-400'
                        : variant === 'glow'
                            ? 'bg-[#2b6cee] shadow-[0_0_10px_rgba(43,108,238,0.5)]'
                            : 'bg-[#2b6cee]'
                    }`}
                style={{ width: `${clampedValue}%` }}
            >
                {showIndicator && (
                    <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                )}
            </div>
        </div>
    );
}

// Rating bars component (like the anime cards have)
interface RatingBarsProps {
    filled: number; // Number of filled bars (out of 5)
    total?: number;
    className?: string;
}

export function RatingBars({ filled, total = 5, className = '' }: RatingBarsProps) {
    return (
        <div className={`flex gap-0.5 ${className}`}>
            {[...Array(total)].map((_, i) => (
                <div
                    key={i}
                    className={`w-1 h-3 rounded-full ${i < filled ? 'bg-[#2b6cee]' : 'bg-white/30'}`}
                />
            ))}
        </div>
    );
}

// Signal bars component (like the book ratings)
interface SignalBarsProps {
    level: number; // 1-5
    className?: string;
}

export function SignalBars({ level, className = '' }: SignalBarsProps) {
    const heights = ['h-1.5', 'h-2', 'h-2.5', 'h-3', 'h-3'];

    return (
        <div className={`flex items-end gap-0.5 h-3 ${className}`}>
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className={`w-1 ${heights[i]} rounded-sm ${i < level ? 'bg-[#2b6cee]' : 'bg-slate-700'}`}
                />
            ))}
        </div>
    );
}
