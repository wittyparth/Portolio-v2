/**
 * Social Posts / Engineering Logs Section
 * Based on social media posts.html reference
 */

import { socialPosts, getHomepageSocialPosts } from "~/data";

// Platform icons as components
const PlatformIcons: Record<string, JSX.Element> = {
    medium: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
        </svg>
    ),
    devto: (
        <svg className="w-7 h-7 fill-current" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
            <path d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35 3.88-2.9 5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM404.1 32H43.9C19.7 32 .06 51.59 0 75.8v360.4C.06 460.41 19.7 480 43.9 480h360.2c24.21 0 43.84-19.59 43.9-43.8V75.8c-.06-24.21-19.7-43.8-43.9-43.8zM154.2 291.19c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28l.01 70.93zm100.68-88.66H201.6v38.42h32.57v29.57H201.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V193.7c-.27-11.15 8.56-20.41 19.71-20.69h63.19l-.01 29.52zm103.64 115.29c-13.2 30.75-36.85 24.63-47.44 0l-38.53-144.8h32.57l29.71 113.72 29.57-113.72h32.58l-38.46 144.8z" />
        </svg>
    ),
    twitter: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    ),
};

export default function SocialPostsSection() {
    const posts = getHomepageSocialPosts();
    const { sectionHeader, ctaCard, stats } = socialPosts;

    return (
        <section className="py-20">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                {/* Section Header */}
                <div className="flex flex-col gap-2 mb-8">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="h-px w-8 bg-[#2b6cee]" />
                        <span className="text-[#2b6cee] text-xs font-bold uppercase tracking-widest">{sectionHeader.badge}</span>
                    </div>
                    <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                        {sectionHeader.title.split('\n').map((line, i) => (
                            <span key={i}>
                                {line}
                                {i === 0 && <br className="hidden sm:block" />}
                            </span>
                        ))}
                    </h2>
                    <p className="text-gray-400 max-w-xl mt-2 text-sm md:text-base leading-relaxed">
                        {sectionHeader.description}
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
                    {/* Recent Posts List */}
                    <div className="lg:col-span-8 rounded-2xl bg-[#16181D]/70 backdrop-blur-xl border border-white/[0.08] p-6 lg:p-8 flex flex-col relative overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]">
                        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-[#2b6cee]/5 rounded-full blur-3xl pointer-events-none" />

                        {/* Header */}
                        <div className="flex items-center justify-between mb-6 z-10">
                            <div className="flex items-center gap-3">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                                </span>
                                <h3 className="text-lg font-bold text-white tracking-tight">Recent Activity</h3>
                            </div>
                        </div>

                        {/* Posts List */}
                        <div className="flex flex-col gap-3 z-10">
                            {posts.map((post, index) => (
                                <a key={index} href="/blog" className="group flex items-center gap-4 bg-[#161b22]/50 hover:bg-[#1c2128] border border-white/5 hover:border-[#2b6cee]/30 p-4 rounded-xl transition-all duration-300 relative overflow-hidden">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2b6cee] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="shrink-0 size-12 rounded-lg bg-black/40 border border-white/5 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                                        {PlatformIcons[post.platformIcon] || PlatformIcons.medium}
                                    </div>
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <h4 className="text-white text-base font-semibold leading-snug truncate group-hover:text-[#2b6cee] transition-colors">{post.title}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-gray-500 font-medium">{post.platform}</span>
                                            <span className="w-0.5 h-0.5 bg-gray-600 rounded-full" />
                                            <span className="text-xs text-gray-400">{post.date}</span>
                                            <span className="w-0.5 h-0.5 bg-gray-600 rounded-full" />
                                            <span className="text-xs text-gray-400">{post.readTime}</span>
                                        </div>
                                    </div>
                                    <div className="shrink-0 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all">
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Deep Dive CTA */}
                    <div className="lg:col-span-4 rounded-2xl bg-[#16181D]/70 backdrop-blur-xl border border-white/[0.08] flex flex-col justify-between p-1 relative overflow-hidden hover:border-[#2b6cee]/40 transition-all shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#1c212b] to-[#111318] -z-10" />
                        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#2b6cee]/10 via-transparent to-transparent opacity-50" />

                        <div className="flex flex-col items-center justify-center pt-8 pb-4 flex-1 text-center relative z-10 px-6">
                            {/* Animated Hub */}
                            <div className="w-32 h-32 relative mb-6">
                                <div className="absolute inset-0 flex items-center justify-center animate-[float_6s_ease-in-out_infinite]">
                                    <svg className="text-[#2b6cee] drop-shadow-[0_0_15px_rgba(43,108,238,0.3)]" fill="none" height="100%" viewBox="0 0 100 100" width="100%" xmlns="http://www.w3.org/2000/svg">
                                        <circle className="opacity-80" cx="50" cy="50" r="16" stroke="currentColor" strokeWidth="2" />
                                        <circle className="opacity-100" cx="50" cy="50" fill="currentColor" r="8" />
                                        <g className="origin-center animate-[spin_10s_linear_infinite]">
                                            <circle className="opacity-60" cx="50" cy="15" fill="white" r="3" />
                                        </g>
                                        <g className="origin-center animate-[spin_8s_linear_infinite_reverse]">
                                            <circle className="opacity-60" cx="85" cy="50" fill="#a0aab8" r="4" />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">{ctaCard.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                {ctaCard.description.replace('50+', `${stats.totalArticles}+`)}
                            </p>
                        </div>

                        <div className="p-4 z-10">
                            <a href="/blog" className="flex items-center justify-center w-full bg-[#2b6cee] hover:bg-blue-600 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 group/btn shadow-lg shadow-[#2b6cee]/20 hover:shadow-[#2b6cee]/40">
                                <span>{ctaCard.buttonText}</span>
                                <span className="material-symbols-outlined ml-2 group-hover/btn:translate-x-1 transition-transform text-[20px]">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center border-t border-white/5 pt-6 mt-8">
                    <p className="text-xs text-gray-600 font-mono">SYSTEM_STATUS: <span className="text-green-500">ONLINE</span></p>
                    <div className="flex gap-4">
                        <a href="#" className="text-gray-600 hover:text-white transition-colors"><span className="material-symbols-outlined text-[20px]">rss_feed</span></a>
                        <a href="#" className="text-gray-600 hover:text-white transition-colors"><span className="material-symbols-outlined text-[20px]">alternate_email</span></a>
                    </div>
                </div>
            </div>
        </section>
    );
}
