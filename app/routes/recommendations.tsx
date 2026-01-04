import type { Route } from "./+types/recommendations";
import { GlobalHeader, HeaderSpacer, GlobalFooter } from '~/components/layout';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Partha.Dev - The Knowledge Stack" },
        { name: "description", content: "A curated collection of the tools, reads, and resources that power my engineering workflow." },
    ];
}

const featuredItems = [
    {
        id: 1,
        title: 'Designing Data-Intensive Applications',
        author: 'Martin Kleppmann',
        description: 'The absolute bible for backend engineering. It bridges the gap between theory and practice for distributed systems.',
        type: 'Book',
        tag: 'Essential',
        tagColor: 'yellow',
        category: 'System Design',
        icon: 'menu_book',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYlAaI8GADJKoV2tW4gqeT95fn-IB-ahbV3Sx7e1Hdx9uD-7vgo38Yguigv_flMF3Zo13G3awieJGJMgbtfRJ9zTeQqHq1IjGxG42Xl7ML99_vckISwnxT8-Y3KS-qfmD6Kd8qUgX_49GTOyJDgkgXSPA7Nohg1YQubkLjIrOxkSb8yEQpTMDe8DD-RBxgz3ySW1YBSovMgONRPHBq80gfP2I8DJgfiHWs6woRbHtuJ_qlBVWqjZB7c-2mx849FR75GixXebP-4EV8',
        cta: 'Get Book',
    },
    {
        id: 2,
        title: 'Obsidian',
        author: 'Knowledge Base',
        description: 'My second brain. The local-first, markdown-based approach makes it indispensable for engineering notes and long-term knowledge retention.',
        type: 'Tool',
        tag: 'Tool',
        tagColor: 'blue',
        category: 'Productivity',
        icon: 'terminal',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFnJuyOpsRja6q6C-KC6DsXUcYtgZ1AlrUU1P_ZtG8ilZHc3OsxCD8CPL78xjnQeyh8zNN4LzYw864UfMuoeawV9xsbb6d4mQWml_H-Xf-Sx1rd19VCFhxm4lgv1aT3VfutzUeRS2c9tVpa1UV1Gqn2a9Xk-ACRiB3hBTw5eFwq6X9E7H-35HdQYKePzSPPl9vRDV8ciWxQsQnfiGCTDfWyjpG3NA1ISW6_q6FiINvaNu8W4AfyLI4dGZS6k5J6zcZRja86dTYwskD',
        cta: 'Download',
    },
];

const gridItems = [
    { title: 'Hussein Nasser', subtitle: 'YouTube Channel', icon: 'smart_display', iconColor: 'red', quote: 'The deepest dives into backend engineering protocols you will find for free. His breakdown of gRPC vs REST is legendary.', desc: 'Covers database internals, networking, proxies, and load balancing with incredible clarity.', tags: ['Networking', 'DBs'] },
    { title: 'Pragmatic Engineer', subtitle: 'Newsletter', icon: 'rss_feed', iconColor: 'green', quote: 'Gergely Orosz provides the most accurate pulse on the tech market and senior engineering career paths.', tags: ['Career', 'Industry'] },
    { title: 'Postman', subtitle: 'Dev Tool', icon: 'webhook', iconColor: 'orange', quote: 'Essential for API development. The team collaboration features have saved me countless hours of debugging.', desc: 'API platform for building and using APIs. Simplifies each step of the lifecycle and streamlines collaboration.', tags: ['API', 'Testing'] },
    { title: 'Three.js Journey', subtitle: 'Course • Bruno Simon', icon: 'school', iconColor: 'blue', quote: 'The most immersive way to learn WebGL. If you want to make websites like this one, start here.', tags: ['Frontend', '3D'] },
    { title: 'Lex Fridman', subtitle: 'Podcast', icon: 'podcasts', iconColor: 'purple', quote: 'Long-form conversations that actually go deep into AI, physics, and life. A staple for my commute.', desc: 'Conversations about the nature of intelligence, consciousness, love, and power.', tags: ['AI', 'Society'] },
    { title: 'Warp', subtitle: 'Terminal', icon: 'terminal', iconColor: 'teal', quote: 'The terminal reimagined for the 21st century. The AI command suggestions are surprisingly good.', tags: ['DevEnv', 'Rust'] },
];

const filterTabs = ['All', 'Courses', 'Tools', 'Reads', 'People'];
const topicChips = ['All Topics', 'System Design', 'Backend Eng', 'DevOps', 'Productivity', 'AI / ML', 'Frontend', 'Career'];

export default function RecommendationsPage() {
    return (
        <div className="bg-[#111318] text-white font-display overflow-x-hidden selection:bg-[#2b6cee] selection:text-white">
            {/* Background Decoration */}
            <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(43,108,238,0.15),rgba(17,19,24,0)_50%)]" />
            <div className="fixed top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2b6cee]/20 to-transparent z-10" />

            {/* Navbar */}
            <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#282e39] bg-[#111318]/80 backdrop-blur-xl px-4 md:px-10 py-3 transition-all duration-300">
                <div className="flex items-center gap-4 text-white">
                    <div className="size-8 rounded bg-[#2b6cee]/20 flex items-center justify-center text-[#2b6cee]">
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>terminal</span>
                    </div>
                    <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Partha.Dev</h2>
                </div>
                <div className="flex flex-1 justify-end gap-8">
                    <div className="hidden md:flex items-center gap-9">
                        <a className="text-[#9da6b9] hover:text-white transition-colors text-sm font-medium leading-normal" href="/">Home</a>
                        <a className="text-[#9da6b9] hover:text-white transition-colors text-sm font-medium leading-normal" href="/projects">Work</a>
                        <a className="text-[#9da6b9] hover:text-white transition-colors text-sm font-medium leading-normal" href="/about">About</a>
                        <a className="text-white text-sm font-medium leading-normal" href="/recommendations">Recommendations</a>
                        <a className="text-[#9da6b9] hover:text-white transition-colors text-sm font-medium leading-normal" href="/contact">Contact</a>
                    </div>
                    <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-[#2b6cee] hover:bg-[#2b6cee]/90 transition-colors text-white text-sm font-bold leading-normal tracking-[0.015em] shadow-[0_0_15px_rgba(43,108,238,0.3)]">
                        <span className="truncate">Resume</span>
                    </button>
                </div>
            </header>

            <main className="relative z-10 flex-1 flex flex-col items-center px-4 md:px-10 pb-20">
                <div className="w-full max-w-[1200px] flex flex-col gap-8 mt-10">

                    {/* Page Heading */}
                    <div className="flex flex-wrap justify-between items-end gap-6 pb-6 border-b border-[#282e39]">
                        <div className="flex min-w-72 flex-col gap-3 relative">
                            <div className="absolute -left-4 top-2 w-1 h-12 bg-[#2b6cee] rounded-full" />
                            <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
                                THE KNOWLEDGE <span className="text-[#2b6cee]">STACK</span>
                            </h1>
                            <p className="text-[#9da6b9] text-base md:text-lg font-normal leading-normal max-w-2xl">
                                A dynamic, curated collection of the tools, reads, and resources that power my engineering workflow.
                                Hand-picked for quality, depth, and pragmatism.
                            </p>
                        </div>
                        <button className="flex items-center gap-2 cursor-pointer rounded-lg h-10 px-4 bg-[#161a22] border border-[#282e39] hover:border-[#2b6cee] transition-colors text-white text-sm font-bold shadow-sm">
                            <span className="material-symbols-outlined text-[#2b6cee]" style={{ fontSize: '20px' }}>add_circle</span>
                            <span className="truncate">Submit a Resource</span>
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col gap-4 sticky top-[70px] z-40 bg-[#111318]/95 backdrop-blur-sm py-4 border-b border-[#282e39]/50 -mx-4 px-4 md:-mx-10 md:px-10">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            {/* Search */}
                            <div className="w-full md:w-1/2 lg:w-1/3">
                                <div className="flex w-full flex-1 items-stretch rounded-lg h-10 border border-[#282e39] bg-[#161a22] focus-within:border-[#2b6cee] transition-colors">
                                    <div className="text-[#9da6b9] flex items-center justify-center pl-3 pr-2">
                                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>search</span>
                                    </div>
                                    <input className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg bg-transparent text-white focus:outline-none focus:ring-0 border-none h-full placeholder:text-[#9da6b9]/50 px-0 text-sm font-normal leading-normal" placeholder="Search by name, topic, or author..." />
                                </div>
                            </div>

                            {/* Type Filter */}
                            <div className="flex overflow-x-auto">
                                <div className="flex h-10 items-center justify-center rounded-lg bg-[#161a22] border border-[#282e39] p-1">
                                    {filterTabs.map((tab, i) => (
                                        <label key={tab} className={`cursor-pointer h-full px-4 rounded-md flex items-center justify-center transition-all ${i === 0 ? 'bg-[#111318] text-white shadow-sm' : 'text-[#9da6b9] hover:text-white'}`}>
                                            <span className="text-xs font-bold uppercase tracking-wider">{tab}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Topic Chips */}
                        <div className="flex gap-2 overflow-x-auto pb-1">
                            {topicChips.map((chip, i) => (
                                <button
                                    key={chip}
                                    className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full pl-4 pr-4 transition-all ${i === 0
                                            ? 'border border-[#2b6cee] bg-[#2b6cee]/10 text-[#2b6cee] hover:bg-[#2b6cee]/20'
                                            : 'border border-[#282e39] bg-[#161a22] text-[#9da6b9] hover:border-[#9da6b9] hover:text-white'
                                        }`}
                                >
                                    <span className="text-xs font-medium">{chip}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Featured Section */}
                    <div className="w-full">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="material-symbols-outlined text-yellow-500">hotel_class</span>
                            <h2 className="text-white text-xl font-bold tracking-tight uppercase">Partha's Top Picks</h2>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {featuredItems.map((item) => (
                                <FeaturedCard key={item.id} {...item} />
                            ))}
                        </div>
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                        {gridItems.map((item, i) => (
                            <ResourceCard key={i} {...item} />
                        ))}
                    </div>

                    {/* Loading indicator */}
                    <div className="flex justify-center mt-10">
                        <p className="text-[#9da6b9] text-sm flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                            Indexing more resources...
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="w-full border-t border-[#282e39] mt-10 pt-8 flex flex-col md:flex-row items-center justify-between text-[#9da6b9] text-sm">
                        <p>© 2024 Partha.Dev. Built with ☕ and Code.</p>
                        <div className="flex gap-4 mt-4 md:mt-0">
                            <a className="hover:text-[#2b6cee] transition-colors" href="#">Twitter</a>
                            <a className="hover:text-[#2b6cee] transition-colors" href="#">GitHub</a>
                            <a className="hover:text-[#2b6cee] transition-colors" href="#">LinkedIn</a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Featured Card Component
function FeaturedCard({ title, author, description, tag, tagColor, category, icon, imageUrl, cta }: {
    title: string;
    author: string;
    description: string;
    tag: string;
    tagColor: string;
    category: string;
    icon: string;
    imageUrl: string;
    cta: string;
}) {
    const borderColor = tagColor === 'yellow' ? 'border-yellow-500/30 hover:border-yellow-500' : 'border-[#2b6cee]/30 hover:border-[#2b6cee]';
    const tagBg = tagColor === 'yellow' ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' : 'bg-[#2b6cee]/20 text-[#2b6cee] border-[#2b6cee]/30';
    const iconColor = tagColor === 'yellow' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-[#2b6cee]/20 text-[#2b6cee]';
    const hoverText = tagColor === 'yellow' ? 'group-hover:text-yellow-400' : 'group-hover:text-[#2b6cee]';
    const shadowColor = tagColor === 'yellow' ? 'hover:shadow-[0_0_30px_rgba(234,179,8,0.1)]' : 'hover:shadow-[0_0_30px_rgba(43,108,238,0.15)]';

    return (
        <div className={`group relative flex flex-col md:flex-row overflow-hidden rounded-xl border ${borderColor} bg-gradient-to-br from-[#161a22] to-[#1a1e26] p-0 transition-all duration-300 ${shadowColor}`}>
            <div className="absolute top-0 right-0 p-3 z-20">
                <div className={`${tagBg} text-[10px] font-bold px-2 py-1 rounded border uppercase tracking-widest`}>{tag}</div>
            </div>
            <div
                className="w-full md:w-1/3 h-48 md:h-auto bg-cover bg-center relative"
                style={{ backgroundImage: `url('${imageUrl}')` }}
            >
                <div className="absolute inset-0 bg-[#111318]/40 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            <div className="flex flex-col flex-1 p-6">
                <div className="flex items-center gap-3 mb-3">
                    <div className={`size-8 rounded ${iconColor} flex items-center justify-center`}>
                        <span className="material-symbols-outlined text-lg">{icon}</span>
                    </div>
                    <div>
                        <h3 className={`font-bold text-white text-lg leading-tight ${hoverText} transition-colors`}>{title}</h3>
                        <p className="text-xs text-[#9da6b9]">{author}</p>
                    </div>
                </div>
                <p className="text-[#9da6b9] text-sm mb-4 line-clamp-2">{description}</p>
                <div className="mt-auto flex items-center justify-between">
                    <span className="text-[10px] bg-[#111318] border border-[#282e39] text-[#9da6b9] px-2 py-0.5 rounded-full">{category}</span>
                    <a className={`text-sm font-bold text-white ${hoverText} flex items-center gap-1 transition-colors`} href="#">
                        {cta} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

// Resource Card Component
function ResourceCard({ title, subtitle, icon, iconColor, quote, desc, tags }: {
    title: string;
    subtitle: string;
    icon: string;
    iconColor: string;
    quote: string;
    desc?: string;
    tags: string[];
}) {
    const iconColors: Record<string, string> = {
        red: 'text-red-500',
        green: 'text-green-400',
        orange: 'text-orange-400',
        blue: 'text-blue-400',
        purple: 'text-purple-400',
        teal: 'text-teal-400',
    };
    const borderColors: Record<string, string> = {
        red: 'border-red-500',
        green: 'border-green-400',
        orange: 'border-orange-400',
        blue: 'border-blue-400',
        purple: 'border-purple-400',
        teal: 'border-teal-400',
    };

    return (
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-[#282e39] bg-[#161a22] p-6 transition-all duration-300 hover:border-[#2b6cee] hover:shadow-[0_0_20px_rgba(43,108,238,0.1)] hover:-translate-y-1">
            <div>
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className={`size-10 rounded-lg bg-[#282e39] flex items-center justify-center ${iconColors[iconColor]} shadow-inner`}>
                            <span className="material-symbols-outlined">{icon}</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-lg group-hover:text-[#2b6cee] transition-colors">{title}</h3>
                            <span className="text-xs text-[#9da6b9] font-medium">{subtitle}</span>
                        </div>
                    </div>
                </div>
                <div className={`bg-[#111318]/50 rounded-lg p-3 mb-4 border-l-2 ${borderColors[iconColor]}`}>
                    <p className="text-xs text-gray-300 italic font-medium leading-relaxed">"{quote}"</p>
                </div>
                {desc && <p className="text-[#9da6b9] text-sm mb-4">{desc}</p>}
            </div>
            <div className="mt-4 pt-4 border-t border-[#282e39] flex items-center justify-between">
                <div className="flex gap-2 flex-wrap">
                    {tags.map((tag) => (
                        <span key={tag} className="text-[10px] bg-[#111318]/80 text-[#9da6b9] px-2 py-1 rounded border border-[#282e39]">{tag}</span>
                    ))}
                </div>
                <a className="size-8 rounded-full bg-[#282e39] flex items-center justify-center hover:bg-[#2b6cee] text-white transition-colors" href="#">
                    <span className="material-symbols-outlined text-sm">north_east</span>
                </a>
            </div>
        </div>
    );
}
