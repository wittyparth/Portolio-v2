import type { Route } from "./+types/guestbook";
import { useState, useMemo } from 'react';
import { GlobalHeader, HeaderSpacer, GlobalFooter } from '~/components/layout';
import { PageLayout } from "~/components/ui";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Guestbook - Partha.dev" },
        { name: "description", content: "A persistent stream of thoughts from visitors. Sign and leave your mark." },
    ];
}

interface GuestEntry {
    id: number;
    name: string;
    initials: string;
    role: string;
    message: string;
    time: string;
    likes: number;
    gradient?: string;
    featured: boolean;
    tags?: string[];
    isAnonymous?: boolean;
    avatar?: string;
}

const initialGuestEntries: GuestEntry[] = [
    { id: 1, name: 'Alex Rivera', initials: 'AR', role: 'Frontend Dev • London', message: 'Incredible work on the backend architecture article. Keep shipping! 🚀', time: '2h ago', likes: 12, gradient: 'from-purple-500 to-indigo-600', featured: false },
    { id: 2, name: 'Sarah Chen', initials: 'JD', role: 'Product Designer', message: 'Love the dark mode implementation here! The contrast ratios are perfect.', time: '5h ago', likes: 48, gradient: 'from-emerald-400 to-cyan-600', featured: false },
    { id: 3, name: 'Elena Lin', initials: 'EL', role: 'UX Researcher', message: "I've been following your open source contributions. Would love a breakdown of the API design.", time: '2d ago', likes: 89, gradient: 'from-orange-500 to-pink-600', tags: ['#opensource', '#state-management'], featured: false },
    { id: 4, name: 'Anonymous User', initials: '', role: 'Visitor #4291', message: '"Simplicity is the ultimate sophistication." - You nailed it.', time: '3d ago', isAnonymous: true, likes: 15, featured: false, gradient: 'from-gray-500 to-gray-600' },
    { id: 5, name: 'David Kim', initials: 'DK', role: 'CTO @ TechFlow', message: "Partha, I'm seriously impressed by the database optimization techniques you detailed. We're facing similar challenges at scale. Sent you a DM!", time: '1w ago', likes: 156, gradient: 'from-blue-500 to-cyan-500', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiQMc4ZS5tQgIHdInkjnLp20rtrsx-Z2Yt6ir-r98PGeCYdwq-vX-fKKSm88XCz0s538Aofh7WwWs62eBgygmXaLfm-_W1a_e6b9zT01_-NEKJu6qmQCNTdqtLDYhVXJCkv0zWEKe-xpQo6RV4V4f5j0cDYLIv5HVAvfjWaYRlW4OTP_xUTGgE-CiRJundn2POG6xK4I-8VGsI_jIgVZzyrdpdRNVpE0nkQpZyK5QZlTVy4pKmikUH_6JG08owCnhyK_XcMv9X724N', featured: true },
];

const filterOptions = [
    { label: 'Newest Arrival', value: 'newest' },
    { label: 'Most Appreciated', value: 'popular' },
    { label: 'Featured', value: 'featured' },
];

export default function GuestbookPage({ embedded = false }: { embedded?: boolean }) {
    const [entries, setEntries] = useState(initialGuestEntries);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('newest');
    const [showModal, setShowModal] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const [newName, setNewName] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [visibleCount, setVisibleCount] = useState(4);
    const [likedEntries, setLikedEntries] = useState<number[]>([]);

    // Filter and sort entries
    const filteredEntries = useMemo(() => {
        let result = [...entries];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(entry =>
                entry.name.toLowerCase().includes(query) ||
                entry.message.toLowerCase().includes(query) ||
                entry.role.toLowerCase().includes(query)
            );
        }

        // Sort/Filter by type
        if (activeFilter === 'popular') {
            result.sort((a, b) => b.likes - a.likes);
        } else if (activeFilter === 'featured') {
            result = result.filter(e => e.featured);
        } else {
            // newest - default order
        }

        return result;
    }, [entries, searchQuery, activeFilter]);

    // Handle like
    const handleLike = (id: number) => {
        if (likedEntries.includes(id)) return;

        setLikedEntries(prev => [...prev, id]);
        setEntries(prev => prev.map(e =>
            e.id === id ? { ...e, likes: e.likes + 1 } : e
        ));
    };

    // Handle sign guestbook
    const handleSign = () => {
        if (!newMessage.trim()) return;

        const newEntry: GuestEntry = {
            id: Date.now(),
            name: isAnonymous ? 'Anonymous User' : (newName.trim() || 'Anonymous User'),
            initials: isAnonymous ? '' : (newName.trim() ? newName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : ''),
            role: isAnonymous ? `Visitor #${Math.floor(1000 + Math.random() * 9000)}` : 'New Visitor',
            message: newMessage,
            time: 'Just now',
            likes: 0,
            gradient: `from-${['purple', 'emerald', 'orange', 'blue', 'pink'][Math.floor(Math.random() * 5)]}-500 to-${['indigo', 'cyan', 'pink', 'cyan', 'purple'][Math.floor(Math.random() * 5)]}-600`,
            isAnonymous,
            featured: false,
        };

        setEntries(prev => [newEntry, ...prev]);
        setNewMessage('');
        setNewName('');
        setIsAnonymous(false);
        setShowModal(false);
    };

    const regularEntries = filteredEntries.filter(e => !e.featured);
    const featuredEntry = entries.find(e => e.featured);

    return (
        <PageLayout embedded={embedded} className={embedded ? "bg-transparent" : "bg-[#111518]"}>
            <div className="font-display selection:bg-[#3b82f6]/30 text-white min-h-screen flex flex-col relative overflow-hidden">
                {/* Sign Guestbook Modal */}
                {
                    showModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                            <div className="bg-[#161b20] border border-[#293338] rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[#19a1e6]">edit</span>
                                        Sign the Guestbook
                                    </h3>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                                    >
                                        <span className="material-symbols-outlined">close</span>
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            id="anonymous"
                                            checked={isAnonymous}
                                            onChange={(e) => setIsAnonymous(e.target.checked)}
                                            className="w-4 h-4 rounded border-gray-600 bg-[#111518] text-[#19a1e6] focus:ring-[#19a1e6]"
                                        />
                                        <label htmlFor="anonymous" className="text-sm text-gray-400">Sign anonymously</label>
                                    </div>

                                    {!isAnonymous && (
                                        <input
                                            type="text"
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            placeholder="Your name"
                                            className="w-full bg-[#111518] border border-[#293338] rounded-lg p-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#19a1e6] transition-colors"
                                        />
                                    )}

                                    <textarea
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Leave a message for future visitors..."
                                        className="w-full h-32 bg-[#111518] border border-[#293338] rounded-lg p-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#19a1e6] transition-colors resize-none"
                                    />

                                    <div className="flex justify-end gap-3">
                                        <button
                                            onClick={() => setShowModal(false)}
                                            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSign}
                                            disabled={!newMessage.trim()}
                                            className="px-6 py-2 bg-[#19a1e6] text-white font-bold rounded-lg hover:bg-[#19a1e6]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Sign Guestbook
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* Header - only when not embedded */}
                {
                    !embedded && (
                        <header className="sticky top-0 z-50 w-full border-b border-[#293338] bg-[#111518]/80 backdrop-blur-[12px]">
                            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex items-center justify-between h-16">
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 text-[#19a1e6]">
                                            <svg className="w-full h-full drop-shadow-[0_0_8px_rgba(25,161,230,0.5)]" fill="none" viewBox="0 0 48 48">
                                                <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor" />
                                            </svg>
                                        </div>
                                        <h2 className="text-white text-lg font-bold tracking-tight">Partha.dev</h2>
                                    </div>
                                    <nav className="hidden md:flex items-center gap-8">
                                        <a className="text-gray-400 hover:text-white text-sm font-medium transition-colors" href="/projects">Work</a>
                                        <a className="text-gray-400 hover:text-white text-sm font-medium transition-colors" href="/about">About</a>
                                        <a className="text-white text-sm font-medium border-b-2 border-[#19a1e6] pb-0.5" href="/guestbook">Guestbook</a>
                                        <a className="text-gray-400 hover:text-white text-sm font-medium transition-colors" href="/contact">Contact</a>
                                    </nav>
                                    <button className="flex items-center justify-center h-10 px-5 bg-[#19a1e6] hover:bg-[#19a1e6]/90 text-white text-sm font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(25,161,230,0.3)]">
                                        Hire Me
                                    </button>
                                </div>
                            </div>
                        </header>
                    )
                }

                <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                    {/* Header Section */}
                    <section className="mb-12 relative">
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#19a1e6]/10 rounded-full blur-[100px] pointer-events-none" />
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="space-y-4 max-w-2xl">
                                <div className="flex items-center gap-2 text-[#19a1e6] font-mono text-xs tracking-wider uppercase">
                                    <span className="w-2 h-2 rounded-full bg-[#19a1e6] animate-pulse" />
                                    System Online
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                                    Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#19a1e6] to-blue-400">Logs</span>
                                </h1>
                                <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
                                    A persistent stream of thoughts from visitors. This space is a dynamic collection of signals, appreciation, and connections.
                                </p>
                                <div className="flex items-center gap-4 pt-2">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#293338]/50 border border-[#293338]">
                                        <span className="material-symbols-outlined text-gray-400 text-base">database</span>
                                        <span className="font-mono text-xs text-gray-300">Entries: <span className="text-white font-bold">{entries.length}</span></span>
                                    </div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#293338]/50 border border-[#293338]">
                                        <span className="material-symbols-outlined text-gray-400 text-base">update</span>
                                        <span className="font-mono text-xs text-gray-300">Last Update: <span className="text-white font-bold">2m ago</span></span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowModal(true)}
                                className="group flex items-center justify-center gap-3 h-12 px-6 bg-white text-[#111518] hover:bg-gray-100 text-sm font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">edit</span>
                                Sign Guestbook
                            </button>
                        </div>
                    </section>

                    {/* Filters */}
                    <section className="mb-8 sticky top-[70px] z-40">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 rounded-2xl bg-[#161b20]/80 backdrop-blur-md border border-[#293338] shadow-2xl">
                            <div className="flex p-1 gap-1 bg-[#111518]/50 rounded-xl w-full sm:w-auto">
                                {filterOptions.map(filter => (
                                    <button
                                        key={filter.value}
                                        onClick={() => setActiveFilter(filter.value)}
                                        className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeFilter === filter.value
                                            ? 'bg-[#293338] text-white shadow-sm border border-gray-600'
                                            : 'text-gray-400 hover:text-white hover:bg-[#293338]/50'
                                            }`}
                                    >
                                        {filter.label}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-3 w-full sm:w-auto px-2">
                                <div className="relative w-full sm:w-64 group">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                        <span className="material-symbols-outlined text-[20px]">search</span>
                                    </span>
                                    <input
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-[#111518] border border-[#293338] text-white text-sm rounded-lg pl-10 pr-4 py-2 focus:ring-1 focus:ring-[#19a1e6] focus:border-[#19a1e6] placeholder-gray-600 outline-none"
                                        placeholder="Search logs..."
                                        type="text"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">close</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Guest Entries Grid */}
                    <section className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 pb-20">
                        {regularEntries.slice(0, visibleCount).map((entry) => (
                            <article key={entry.id} className="break-inside-avoid relative group bg-[#161b20] rounded-2xl p-6 border border-[#293338] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(25,161,230,0.15)] hover:border-[#19a1e6]/40">
                                <div className="flex items-center gap-4 mb-4">
                                    {entry.isAnonymous ? (
                                        <div className="size-10 rounded-full bg-gray-800 flex items-center justify-center text-white border border-gray-700">
                                            <span className="material-symbols-outlined text-gray-400">person</span>
                                        </div>
                                    ) : (
                                        <div className={`size-12 rounded-full bg-gradient-to-br ${entry.gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                                            {entry.initials}
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-white font-bold text-base leading-tight">{entry.name}</h3>
                                        <p className="text-gray-500 text-xs font-mono mt-0.5">{entry.role}</p>
                                    </div>
                                </div>
                                <div className="mb-5 relative">
                                    <span className="absolute -left-3 top-0 bottom-0 w-0.5 bg-[#293338] group-hover:bg-[#19a1e6]/50 transition-colors" />
                                    <p className="text-gray-300 text-sm leading-relaxed pl-2">{entry.message}</p>
                                </div>
                                {entry.tags && (
                                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                                        {entry.tags.map((tag) => (
                                            <span key={tag} className="px-2 py-1 rounded bg-[#293338] text-[10px] text-gray-400 font-mono border border-gray-700">{tag}</span>
                                        ))}
                                    </div>
                                )}
                                <div className="flex items-center justify-between pt-4 border-t border-[#293338]/50">
                                    <span className="text-gray-500 text-xs font-mono">{entry.time}</span>
                                    <button
                                        onClick={() => handleLike(entry.id)}
                                        className={`flex items-center gap-2 group/btn ${likedEntries.includes(entry.id) ? 'cursor-default' : 'cursor-pointer'}`}
                                    >
                                        <span className={`material-symbols-outlined text-[20px] transition-colors ${likedEntries.includes(entry.id) ? 'text-[#19a1e6]' : 'text-gray-500 group-hover/btn:text-[#19a1e6]'}`}>
                                            {likedEntries.includes(entry.id) ? 'thumb_up' : 'thumb_up'}
                                        </span>
                                        <span className={`text-sm font-medium transition-colors ${likedEntries.includes(entry.id) ? 'text-white' : 'text-gray-500 group-hover/btn:text-white'}`}>{entry.likes}</span>
                                    </button>
                                </div>
                            </article>
                        ))}

                        {/* Featured Entry */}
                        {featuredEntry && activeFilter !== 'featured' && (
                            <article className="break-inside-avoid relative group bg-gradient-to-b from-[#161b20] to-[#0f1316] rounded-2xl p-6 border border-[#19a1e6]/30 transition-all duration-300 hover:-translate-y-1 shadow-[0_0_20px_rgba(25,161,230,0.05)]">
                                <div className="absolute top-4 right-4">
                                    <span className="material-symbols-outlined text-[#19a1e6] text-[20px]">push_pin</span>
                                </div>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="size-12 rounded-full border-2 border-[#19a1e6] p-0.5">
                                        <div className="w-full h-full rounded-full bg-slate-700 overflow-hidden">
                                            <img alt={featuredEntry.name} className="w-full h-full object-cover" src={featuredEntry.avatar} />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-base leading-tight">{featuredEntry.name}</h3>
                                        <div className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[#19a1e6] text-[14px]">verified</span>
                                            <p className="text-[#19a1e6] text-xs font-medium">{featuredEntry.role}</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-200 text-sm font-medium leading-relaxed mb-5">{featuredEntry.message}</p>
                                <div className="flex items-center justify-between pt-4 border-t border-[#293338]/50">
                                    <span className="text-gray-500 text-xs font-mono">{featuredEntry.time}</span>
                                    <button className="flex items-center gap-1.5 text-[#19a1e6] bg-[#19a1e6]/10 px-3 py-1 rounded-full border border-[#19a1e6]/20 hover:bg-[#19a1e6] hover:text-white transition-all">
                                        <span className="material-symbols-outlined text-[16px]">reply</span>
                                        <span className="text-xs font-bold">Reply</span>
                                    </button>
                                </div>
                            </article>
                        )}
                    </section>

                    {/* No Results */}
                    {filteredEntries.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <span className="material-symbols-outlined text-gray-600 text-6xl mb-4">search_off</span>
                            <h3 className="text-xl font-bold text-white mb-2">No entries found</h3>
                            <p className="text-gray-400">Try adjusting your search or filter.</p>
                            <button
                                onClick={() => { setSearchQuery(''); setActiveFilter('newest'); }}
                                className="mt-4 text-[#19a1e6] hover:underline"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}

                    {/* Load More */}
                    {regularEntries.length > visibleCount && (
                        <div className="flex flex-col items-center justify-center py-8 border-t border-[#293338]">
                            <p className="text-gray-500 font-mono text-xs mb-4">Displaying {visibleCount} of {regularEntries.length} logs</p>
                            <button
                                onClick={() => setVisibleCount(prev => prev + 4)}
                                className="group flex items-center justify-center gap-2 px-6 py-3 bg-[#161b20] border border-[#293338] hover:border-[#19a1e6]/50 text-white text-sm font-bold rounded-xl transition-all hover:bg-[#293338]/50"
                            >
                                <span className="size-4 border-2 border-gray-400 border-t-white rounded-full animate-spin group-hover:border-[#19a1e6] group-hover:border-t-transparent" />
                                <span>Load More Entries</span>
                            </button>
                        </div>
                    )}
                </main>

                {/* Footer - only when not embedded */}
                {
                    !embedded && (
                        <footer className="bg-[#161b20] border-t border-[#293338] py-12">
                            <div className="max-w-[1280px] mx-auto px-4 text-center">
                                <p className="text-gray-600 text-xs">© 2024 Partha Saradhi. All rights reserved.</p>
                            </div>
                        </footer>
                    )
                }
            </div >
        </PageLayout >
    );
}
