import type { Route } from "./+types/guestbook";
import { useState, useMemo } from 'react';
import { profile } from "~/data";
import { useGuestbook, formatTimeAgo, useVisitorCount } from "~/lib/supabase";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: `Guestbook - ${profile.name}` },
        { name: "description", content: "A persistent stream of thoughts from visitors. Sign and leave your mark." },
    ];
}

export default function GuestbookPage() {
    // Use Supabase hooks
    const {
        entries,
        loading,
        totalCount,
        addEntry,
        likeEntry,
        hasLiked,
    } = useGuestbook({ orderBy: 'newest' });

    const { formatted: visitorCount } = useVisitorCount();

    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('newest');
    const [showModal, setShowModal] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const [newName, setNewName] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [visibleCount, setVisibleCount] = useState(8);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const filterOptions = [
        { label: "Newest Arrival", value: "newest" },
        { label: "Most Appreciated", value: "popular" },
        { label: "Featured", value: "featured" }
    ];

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
            result.sort((a, b) => b.likes_count - a.likes_count);
        } else if (activeFilter === 'featured') {
            result = result.filter(e => e.featured);
        }

        return result;
    }, [entries, searchQuery, activeFilter]);

    // Handle like
    const handleLike = async (id: string) => {
        if (hasLiked(id)) return;
        await likeEntry(id);
    };

    // Handle sign guestbook
    const handleSign = async () => {
        if (!newMessage.trim() || isSubmitting) return;

        setIsSubmitting(true);
        try {
            const entry = await addEntry({
                name: isAnonymous ? 'Anonymous User' : (newName.trim() || 'Anonymous User'),
                role: isAnonymous ? `Visitor #${Math.floor(1000 + Math.random() * 9000)}` : 'New Visitor',
                message: newMessage,
                is_anonymous: isAnonymous,
            });

            if (entry) {
                setNewMessage('');
                setNewName('');
                setIsAnonymous(false);
                setShowModal(false);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const regularEntries = filteredEntries.filter(e => !e.featured);
    const featuredEntry = entries.find(e => e.featured);

    return (
        <div className="bg-[#111518] font-display selection:bg-[#3b82f6]/30 text-white min-h-screen flex flex-col relative overflow-hidden">
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
                                        disabled={!newMessage.trim() || isSubmitting}
                                        className="px-6 py-2 bg-[#19a1e6] text-white font-bold rounded-lg hover:bg-[#19a1e6]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        {isSubmitting && (
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        )}
                                        Sign Guestbook
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                    <span className="font-mono text-xs text-gray-300">Entries: <span className="text-white font-bold">{totalCount}</span></span>
                                </div>
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#293338]/50 border border-[#293338]">
                                    <span className="material-symbols-outlined text-gray-400 text-base">group</span>
                                    <span className="font-mono text-xs text-gray-300">Visitors: <span className="text-white font-bold">{visitorCount}</span></span>
                                </div>
                                {loading && (
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#19a1e6]/10 border border-[#19a1e6]/30">
                                        <span className="w-2 h-2 rounded-full bg-[#19a1e6] animate-pulse" />
                                        <span className="font-mono text-xs text-[#19a1e6]">Syncing...</span>
                                    </div>
                                )}
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

                {/* Loading State */}
                {loading && entries.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-[#293338] border-t-[#19a1e6] rounded-full animate-spin mb-4" />
                        <p className="text-gray-400">Loading entries...</p>
                    </div>
                )}

                {/* Guest Entries Grid */}
                <section className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 pb-20">
                    {regularEntries.slice(0, visibleCount).map((entry) => (
                        <article key={entry.id} className="break-inside-avoid relative group bg-[#161b20] rounded-2xl p-6 border border-[#293338] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(25,161,230,0.15)] hover:border-[#19a1e6]/40">
                            <div className="flex items-center gap-4 mb-4">
                                {entry.is_anonymous ? (
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
                            {entry.tags && entry.tags.length > 0 && (
                                <div className="flex items-center gap-2 mb-4 flex-wrap">
                                    {entry.tags.map((tag) => (
                                        <span key={tag} className="px-2 py-1 rounded bg-[#293338] text-[10px] text-gray-400 font-mono border border-gray-700">{tag}</span>
                                    ))}
                                </div>
                            )}
                            <div className="flex items-center justify-between pt-4 border-t border-[#293338]/50">
                                <span className="text-gray-500 text-xs font-mono">{formatTimeAgo(entry.created_at)}</span>
                                <button
                                    onClick={() => handleLike(entry.id)}
                                    className={`flex items-center gap-2 group/btn ${hasLiked(entry.id) ? 'cursor-default' : 'cursor-pointer'}`}
                                >
                                    <span className={`material-symbols-outlined text-[20px] transition-all ${hasLiked(entry.id) ? 'text-[#19a1e6] scale-110' : 'text-gray-500 group-hover/btn:text-[#19a1e6]'}`}>
                                        thumb_up
                                    </span>
                                    <span className={`text-sm font-medium transition-colors ${hasLiked(entry.id) ? 'text-white' : 'text-gray-500 group-hover/btn:text-white'}`}>{entry.likes_count}</span>
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
                                        <img alt={featuredEntry.name} className="w-full h-full object-cover" src={featuredEntry.avatar_url || ''} />
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
                                <span className="text-gray-500 text-xs font-mono">{formatTimeAgo(featuredEntry.created_at)}</span>
                                <button className="flex items-center gap-1.5 text-[#19a1e6] bg-[#19a1e6]/10 px-3 py-1 rounded-full border border-[#19a1e6]/20 hover:bg-[#19a1e6] hover:text-white transition-all">
                                    <span className="material-symbols-outlined text-[16px]">reply</span>
                                    <span className="text-xs font-bold">Reply</span>
                                </button>
                            </div>
                        </article>
                    )}
                </section>

                {/* No Results */}
                {filteredEntries.length === 0 && !loading && (
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
                            onClick={() => setVisibleCount(prev => prev + 8)}
                            className="group flex items-center justify-center gap-2 px-6 py-3 bg-[#161b20] border border-[#293338] hover:border-[#19a1e6]/50 text-white text-sm font-bold rounded-xl transition-all hover:bg-[#293338]/50"
                        >
                            <span className="material-symbols-outlined text-[18px] group-hover:text-[#19a1e6]">expand_more</span>
                            <span>Load More Entries</span>
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
