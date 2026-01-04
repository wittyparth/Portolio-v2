export interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'glass' | 'hover' | 'bordered';
    onClick?: () => void;
}

const variantClasses = {
    default: 'bg-[#181e29] border border-[#282e39]',
    glass: 'bg-[#181e29]/60 backdrop-blur-md border border-white/10',
    hover: 'bg-[#181e29] border border-[#282e39] hover:border-slate-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.5)]',
    bordered: 'bg-[#16181D] border border-white/10 hover:border-[#2b6cee]/30 transition-all duration-300',
};

export function Card({ children, className = '', variant = 'default', onClick }: CardProps) {
    const Component = onClick ? 'button' : 'div';

    return (
        <Component
            onClick={onClick}
            className={`rounded-xl overflow-hidden ${variantClasses[variant]} ${className}`}
        >
            {children}
        </Component>
    );
}

// Card header component
export function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`p-5 border-b border-[#282e39] ${className}`}>
            {children}
        </div>
    );
}

// Card body component
export function CardBody({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`p-5 ${className}`}>
            {children}
        </div>
    );
}

// Card footer component  
export function CardFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`p-5 pt-0 mt-auto border-t border-[#282e39] ${className}`}>
            {children}
        </div>
    );
}
