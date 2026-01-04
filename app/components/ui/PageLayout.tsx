interface PageLayoutProps {
    children: React.ReactNode;
    variant?: 'default' | 'terminal' | 'contact' | 'library';
    className?: string;
    embedded?: boolean;
}

export function PageLayout({ children, variant = 'default', className = '', embedded = false }: PageLayoutProps) {
    return (
        <div className={`dark ${embedded ? '' : 'bg-[#101622] min-h-screen'} text-white font-[Space_Grotesk,sans-serif] overflow-x-hidden antialiased ${className}`}>
            {/* Background Effects based on variant - only render when not embedded */}
            {!embedded && <BackgroundEffects variant={variant} />}

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}

interface BackgroundEffectsProps {
    variant?: 'default' | 'terminal' | 'contact' | 'library';
}

export function BackgroundEffects({ variant = 'default' }: BackgroundEffectsProps) {
    if (variant === 'terminal') {
        return (
            <div className="fixed inset-0 top-[60px] pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_#162026_0%,_#0b0e11_70%)] opacity-80" />
                <div className="scanlines w-full h-full opacity-30" />
            </div>
        );
    }

    if (variant === 'contact') {
        return (
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#020408]">
                <div className="absolute inset-0 bg-gradient-to-b from-[#020408] via-[#050a14] to-[#020408] opacity-90" />
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30">
                    <div className="absolute -top-[10%] -left-[10%] w-[70vw] h-[70vw] bg-blue-900/40 rounded-full mix-blend-screen filter blur-[120px] animate-blob" />
                    <div className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] bg-indigo-900/40 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000" />
                    <div className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] bg-violet-900/40 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-4000" />
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(43,108,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(43,108,238,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
            </div>
        );
    }

    if (variant === 'library') {
        return (
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#2b6cee]/10 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBMMCAwTDQwIDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] z-0" />
            </div>
        );
    }

    // Default variant
    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#2b6cee]/10 rounded-full blur-[120px] mix-blend-screen" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] mix-blend-screen" />
        </div>
    );
}
