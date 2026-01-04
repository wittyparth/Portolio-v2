/**
 * MainLayout - Shared layout wrapper for all pages
 * Contains the GlobalHeader and GlobalFooter that appear on every page
 */

import { Outlet } from "react-router";
import { GlobalHeader, HeaderSpacer, GlobalFooter } from "~/components/layout";

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white font-[Space_Grotesk,sans-serif] overflow-x-hidden selection:bg-[#2b6cee] selection:text-white flex flex-col">
            {/* Global Header - same on every page */}
            <GlobalHeader />
            <HeaderSpacer />

            {/* Main Content Area - renders the current route */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* Global Footer - same on every page */}
            <GlobalFooter />

            {/* Global CSS Animations */}
            <style>{`
                @keyframes scroll-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes scroll-right {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                .animate-scroll-left { animation: scroll-left 30s linear infinite; }
                .animate-scroll-right { animation: scroll-right 30s linear infinite; }
                .animate-scroll-left:hover, .animate-scroll-right:hover { animation-play-state: paused; }
            `}</style>
        </div>
    );
}
