import { Icon } from './Icon';

interface ButtonProps {
    children?: React.ReactNode;
    variant?: 'primary' | 'ghost' | 'outline' | 'icon' | 'neon';
    size?: 'sm' | 'md' | 'lg';
    icon?: string;
    iconPosition?: 'left' | 'right';
    className?: string;
    onClick?: () => void;
    type?: 'button' | 'submit';
}

const variantClasses = {
    primary: 'bg-[#2b6cee] hover:bg-[#2b6cee]/90 text-white font-bold shadow-[0_0_10px_rgba(43,108,238,0.5),0_0_20px_rgba(43,108,238,0.3)]',
    ghost: 'bg-transparent hover:bg-white/5 text-slate-400 hover:text-white',
    outline: 'border border-white/20 hover:border-white text-white backdrop-blur-sm',
    icon: 'bg-[#282e39] text-white hover:bg-[#2b6cee] hover:text-white',
    neon: 'bg-[#2b6cee] text-white font-bold shadow-[0_0_15px_rgba(43,108,238,0.4)] hover:shadow-[0_0_25px_rgba(43,108,238,0.6)] hover:scale-105',
};

const sizeClasses = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-5 text-sm',
    lg: 'h-12 px-6 text-base',
};

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'left',
    className = '',
    onClick,
    type = 'button'
}: ButtonProps) {
    const isIconOnly = variant === 'icon' && !children;

    return (
        <button
            type={type}
            onClick={onClick}
            className={`
        flex items-center justify-center gap-2 rounded-lg transition-all
        ${variantClasses[variant]}
        ${isIconOnly ? 'size-9' : sizeClasses[size]}
        ${className}
      `}
        >
            {icon && iconPosition === 'left' && <Icon name={icon} size="sm" />}
            {children}
            {icon && iconPosition === 'right' && <Icon name={icon} size="sm" />}
        </button>
    );
}

// Icon-only button variant
export function IconButton({
    icon,
    className = '',
    onClick,
    variant = 'icon'
}: {
    icon: string;
    className?: string;
    onClick?: () => void;
    variant?: 'default' | 'primary' | 'yellow';
}) {
    const variantStyles = {
        default: 'bg-[#282e39] text-white hover:bg-[#3b4354]',
        primary: 'bg-[#282e39] text-white hover:bg-[#2b6cee]',
        yellow: 'bg-[#282e39] text-white hover:bg-yellow-500 hover:text-black',
    };

    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-center size-9 rounded-lg transition-colors ${variantStyles[variant]} ${className}`}
        >
            <Icon name={icon} size="md" className="!text-[20px]" />
        </button>
    );
}
