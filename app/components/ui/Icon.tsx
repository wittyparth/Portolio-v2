interface IconProps {
    name: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
    sm: '!text-sm',
    md: '!text-lg',
    lg: '!text-xl',
    xl: '!text-2xl',
};

export function Icon({ name, className = '', size = 'md' }: IconProps) {
    return (
        <span className={`material-symbols-outlined ${sizeClasses[size]} ${className}`}>
            {name}
        </span>
    );
}
