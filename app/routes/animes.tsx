import type { Route } from "./+types/animes";
import { useState, useMemo } from 'react';
import {
    Badge,
    Button,
    Icon,
    InlineStats,
    RatingBars,
    ProgressBar
} from '~/components/ui';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Partha.dev | The Anime Archive" },
        { name: "description", content: "A curated collection of psychological thrillers, cyberpunk dystopias, and slice-of-life masterpieces." },
    ];
}

const navLinks = [
    { label: 'Work', href: '/work' },
    { label: 'Blog', href: '/blog' },
    { label: 'Anime', href: '/animes', isActive: true },
    { label: 'Contact', href: '/contact' },
];

const animeData = [
    {
        id: 1,
        title: "Cyberpunk: Edgerunners",
        genres: ["Sci-Fi", "Tragedy"],
        badge: { text: "Masterpiece", color: "yellow" as const },
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQrix49s3avgCV-xGOEhwgQXODIYY247CI_vXQ9ZjE4GXA0cckuhEcY2K96pPXJDgdD5LbBPL1ITY7KAg6V-ZOvyKBjVgi0YYbMBDL23MmJnHZwgvhpEhw-w4by3Bi6IfL93fnxFVsW5wCmqgXuFBtb7vuZvgZL1J0CNpHn7gG6upp1naFN6vd3BmNwzbbsBdBSpTu5yqusGU9ojg0iTfB7W4VRmwKmBLxGVjORoYDMP6M9ZTOQrSri-mQNokTrAX9Pj6nejVDkeM6",
        description: "A kid from the streets tries to survive in a technology and body modification-obsessed city of the future. The visual style is absolutely insane.",
        rating: "10/10",
        ratingBars: 5,
        showArrow: true,
    },
    {
        id: 2,
        title: "Attack on Titan",
        genres: ["Action", "Mystery"],
        badge: { text: "Watching", color: "primary" as const, pulse: true },
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYKgMCZDQvmxuueuFb27nwKKqT3fTHTkMZY3IQeceI5agD5cQjlO4SDo8QStYIVESLLhEw3c1g_Xia7PJGUdeDj3nn82EYhroRRGFr_sUG_TjHNLUnqdsdXvXF1kYf6vpzzYNndYOg_eA1r8hiW3jbdpn697pe6p8pc-5aXl_GdBP-G3umqtXcU416xoLyqEx_7Dp9oBBaapUNNqvXcMZqOpUAstxsUp4VDIIXpzCpq__VrltNdNnatDOWI-StQUCVykmIby_WQquQ",
        description: "Humanity lives inside cities surrounded by enormous walls. The mystery of the Titans keeps unraveling in ways I never expected.",
        status: "Season 4, Part 2",
        progress: { current: 75, total: 89 },
        isWatching: true,
    },
    {
        id: 3,
        title: "Steins;Gate",
        genres: ["Thriller", "Sci-Fi"],
        badge: { text: "Completed", color: "green" as const },
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5AqJ0ssYruG_FSxYwwHJx4ZbKH6u_27CMQJ0nIqlj-Msy3HaXcR1gMBCusBtlSeMXA1lme94jWMsj-zvyZImLC8dszSCIMptiLUOGUCgVqz_muxoqkS2JvkpGIHsavCfUXBcJwniM1Sup9uzM8ZphLX5bw0f2z6xvFaunqXTGU1VFQeDQ5tmtBg7iwo1sKDPmZm0fdg00xq6jFaMR0T1Q_mkhtuVAlJ3JmOtZbqlFXWlNKOywo65j8Yzr9flZ1yCUjpxvFn4oyGkh",
        description: "The ultimate time travel story. It starts slow but the second half is an emotional rollercoaster that hits perfectly.",
        rating: "9.8/10",
        ratingBars: 4,
    },
    {
        id: 4,
        title: "Violet Evergarden",
        genres: ["Drama", "Slice of Life"],
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAn4SzhIqQ_7u-jgqZQlHd3OmAaJZjvDIOLbjI_tCFapHOIwCSZzLCWAZNRWa9tGiqVDoTphHvTCokLJZ0OoVYuewJfoOFzf9fwNxMpLi7p2SGey5sLqtUdQVIkNcuJCXSYXvGbrDFPP5DmVmWf91ZbUGGDjESxA6LstYPzSMzrFcDvQtaNyTyQjj_odDdg5IoFlTMr6qvsRACndNh6sgZqfv5eRHO1W0CpGwL9iX2sBbcgCKnI-xev5BeUo_GSa-atpQxUw6Lz6TTN",
        description: "Visually stunning animation by Kyoto Animation. A touching story about learning what 'I love you' means.",
        rating: "9.5/10",
        ratingBars: 4,
    },
    {
        id: 5,
        title: "Chainsaw Man",
        genres: ["Action", "Dark Fantasy"],
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD306XqWBacCpVTDmkc-nHVEKe1Z1oAWuVWyRe6KxR2R8rCW_rwbZzmoQlalSVVjzidH9PSv77OYAKJGhQG3mxRsTkesM-ZM6W9pL3D8gmPcM-K5cXmo10OpyGDNgGhVdW5j0eZpyeY_RVC98Yue_pUNmIiwB1kLQyks-raknQZLnA_OQa0nNZNB7gH2CZVr2LSnpyBfH5kOZ0rkZf1PeHNYb8NKAnDJ4SW0ZSn2o2O_AG0sgPtkJIENhxqexweD3u_-5O6qd-iozWV",
        description: "Pure chaos and adrenaline. It subverts shonen tropes in the most brutal ways possible.",
        rating: "8.8/10",
        ratingBars: 3,
        grayscale: true,
    },
    {
        id: 6,
        title: "Neon Genesis Evangelion",
        genres: ["Mecha", "Psychological"],
        badge: { text: "Classic", color: "purple" as const },
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTgR3EBYTW8Drt_g7RCXIS96hjHFYAqTjRQV-0itOfu8KgdFldgAVYq3U93NtBx-nmT-Lj1-JhsfxiOdglFXUowvLZn4vZB14XjaaPYLcQhA7DKIkCVYCpK5Hc58wPjRNXqou6tv1KiRIlWSM1lKCSLZfQTVRz1kjmd2WJC4JOEi6W-lky8pQ9hgyO7jESTaoR0OoJuyt3VD8e5beUP9_0Q8bs1HmPFCA-UcIh4Ql32EkyjWSxaos_B4WO0xMBodeY56eRquqTq4Us",
        description: "A deconstruction of the mecha genre that dives deep into depression, philosophy, and what it means to be human.",
        rating: "10/10",
        ratingBars: 5,
    },
    {
        id: 7,
        title: "Mob Psycho 100",
        genres: ["Action", "Comedy"],
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhc-B1dJYcrXUA4dbptw5v8rsKbXHow_LJXhnRr0WgDfeR1dp4On0BmQC_xe9KzwHCroGVf7eEI7XNW8pbBVEJB66QZMmJPOKo6aadQyBsq2-NScc-DcMlmpd8sR2TTliiDRF34RW3nRFBqd-H35grhcEJtpgBuOheXguzZNLRst1sesZctKJX5zOh8Yp7pMLQ7fTmhB5ktsrXq5GlUrkNe5lfE_eXZ3hfgZe_lYEgaTOirvhW54pDI89h9EAP1gclQoS_lksj3aHh",
        description: "Unique animation style and a heartfelt story about self-improvement wrapped in psychic battles.",
        rating: "9.2/10",
        ratingBars: 4,
    },
    {
        id: 8,
        title: "Mushishi",
        genres: ["Supernatural", "Iyashikei"],
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAO--G1_Mz1wu5f6X87ka_b7ygdr03sOH99jbTQag1gKn3-HNH6yjST_V_2iUPJE7o2u38YHgpxGDgE1zYYaTVMJwwUzVjNwfR-o1oM3ptHJQVMz3ExVxsqIWQQKqgLPGuk8kZLhiG0PVZ69Go_2xyhOIl-ekbMHWNebqFgRbgdSxb_WVBPwbQMEqoOYKctt8rVvLRZytrsuC8e4aDrbUJeVZKEKh64nirTx5--7qIxwKu0ozkpKLxdLVnwHlgb_ev45VW5w2hKiBDj",
        description: "An episodic, atmospheric masterpiece exploring the relationship between nature and humanity. Very calming.",
        rating: "9.0/10",
        ratingBars: 4,
    },
];

const timelineData = [
    {
        date: "OCT 12, 2023",
        title: "Vinland Saga S2",
        status: "Completed",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcsZtqyAanU5IteccyJ4nj-uyGsdNaTJF9KWkHGj2k_qHImdK94ou7jjmvz04nN9H3IYGuDIwKjsH3k1sDnyFF5XLh1TX4IAy-087WOYC6sGJAFkS6mFpOHmyOAns4ROLiL5ZqgeH9qTdYGiN2pQDLeLv1487hlTTpkJIvEEgeDOi9ahne4pzKxJbf3p6IzA-yKT15gIAucI_VYS3mS2ISnVq6r8KSyk5fPL-ZTEYMGSCFQ9g7z52nyXzRADhL-oyDklM5hWp1wbjd",
    },
    {
        date: "NOV 05, 2023",
        title: "Pluto",
        status: "Started",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmtHQTKtkxA9Wh-3ndDlyrnHkgT3u6TIjRW6KfYnQ0bekyoEygIMY5aJyHdSxyvzaP_TEXhLSxQXMwBr5whnqmrhgOyytJGpnpSLjoLGi8V2xGVMDtVjbu2gO4RtyebhPbkhVdsa74y2YAS1JW2H-6Zn6XAKGKMKBb0u0gkTH8BDmpBK27h1iSwEvypffezwMcX_6ZEDAqZmRB93wsXs57c9CJecBXBADHfH4tc_gbwq9zirg2QxS9seWYRe3MwPmHpYG4VBpAL8W_",
    },
    {
        date: "TODAY",
        title: "Solo Leveling",
        status: "Ep 6 Watched",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzOosd9MFgsTQNqNeNZexBnXZ2vvsirMO84_QxWnmApG8OeEyg6gAd_H-Jznf_0hNp2nRD3FblQPRqevoDkYPPKcYsdAgjgBB59xn6ZUDIE_0cPIxM9xSYH9XjV0Q1dtBW9S36HHz5Bw4cIrhMpP4FXn6m853xoNBBdOTmYTo5TyBu41XR0XuBUe9kJ-KSULAJGRk8n3ACSOSHm_yrijpCos8RLv4Zf3V4Tg51OekyZkKKzywXtLxAv4J6hl7akA-SgLde6Lg1rhZ3",
        isActive: true,
    },
    {
        date: "UPCOMING",
        title: "Kaiju No. 8",
        status: "Plan to Watch",
        isFuture: true,
    },
];

const filters = [
    { label: 'All Animes', value: 'all', isActive: true },
    { label: 'Currently Watching', value: 'watching' },
    { label: 'Masterpieces', value: 'masterpieces' },
    { label: 'Cyberpunk', value: 'cyberpunk' },
];

export default function AnimesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [sortBy, setSortBy] = useState<'default' | 'rating' | 'title'>('default');
    const [showFilters, setShowFilters] = useState(false);
    const [visibleCount, setVisibleCount] = useState(8);

    // Filter logic
    const filteredAnimes = useMemo(() => {
        let result = [...animeData];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(anime =>
                anime.title.toLowerCase().includes(query) ||
                anime.genres.some(g => g.toLowerCase().includes(query)) ||
                anime.description.toLowerCase().includes(query)
            );
        }

        // Category filter
        if (activeFilter === 'watching') {
            result = result.filter(anime => anime.badge?.text === 'Watching' || anime.isWatching);
        } else if (activeFilter === 'masterpieces') {
            result = result.filter(anime => anime.badge?.text === 'Masterpiece' || anime.rating === '10/10');
        } else if (activeFilter === 'cyberpunk') {
            result = result.filter(anime =>
                anime.genres.some(g => g.toLowerCase().includes('sci-fi') || g.toLowerCase().includes('mecha')) ||
                anime.title.toLowerCase().includes('cyberpunk')
            );
        }

        // Sort
        if (sortBy === 'rating') {
            result.sort((a, b) => {
                const ratingA = parseFloat(a.rating?.replace('/10', '') || '0');
                const ratingB = parseFloat(b.rating?.replace('/10', '') || '0');
                return ratingB - ratingA;
            });
        } else if (sortBy === 'title') {
            result.sort((a, b) => a.title.localeCompare(b.title));
        }

        return result;
    }, [searchQuery, activeFilter, sortBy]);

    // Random pick function
    const handleRandomPick = () => {
        const randomIndex = Math.floor(Math.random() * animeData.length);
        const randomAnime = animeData[randomIndex];
        alert(`🎲 Random Pick: ${randomAnime.title}\n\n${randomAnime.description}\n\nRating: ${randomAnime.rating || 'Not rated'}`);
    };

    // Load more function
    const handleLoadMore = () => {
        setVisibleCount(prev => Math.min(prev + 4, filteredAnimes.length));
    };

    // Update filters array with active state
    const filtersWithState = filters.map(f => ({
        ...f,
        isActive: f.value === activeFilter
    }));

    return (
        <div className="bg-[#111318] min-h-screen">
            <main className="relative flex flex-col">
                {/* Cinematic Hero Section */}
                <section className="relative w-full h-[600px] flex items-end justify-center overflow-hidden">
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] hover:scale-105"
                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDgTVF4-PUUe1SF9kFQmT74X0xCfdIokCF8fXp2YGsG9BPcETK5fzqJN3l9qdafdXr7aAbwXvqsfYq8T7DsUwSKXTKD7mKh54Mv-5E4yKBK57dGuJMIxlAOn9lfQW3bwgWEt5kbY9JymTIYw1Ld4DcDI8R7RTi7EGkNnlT7PU_oWSusyYX4L78xqcF3vnpPWItbkxkTxGl0ctJq0BhZULjD7oKjjwJFZzd7rOCidWyOSZ3OQvwJ-cu34JFw7_BPQpvMGDCHbhaItKxJ')" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111318] via-[#111318]/80 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#111318]/90 via-transparent to-[#111318]/90 z-10" />

                    <div className="relative z-20 w-full max-w-[1200px] px-6 pb-16 flex flex-col md:flex-row items-end justify-between gap-10">
                        <div className="flex flex-col gap-4 max-w-2xl">
                            <div className="flex items-center gap-3">
                                <Badge variant="primary">The Archive</Badge>
                                <Badge>v2.4.0</Badge>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter">
                                VISUAL<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2b6cee] to-purple-500">ANTHOLOGY</span>
                            </h1>
                            <p className="text-slate-400 text-lg md:text-xl font-light max-w-lg mt-2">
                                A curated collection of psychological thrillers, cyberpunk dystopias, and slice-of-life masterpieces. Tracked, rated, and obsessed over.
                            </p>
                            <div className="flex gap-4 mt-6">
                                <Button icon="play_arrow" onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}>Start Exploring</Button>
                                <Button variant="outline" icon="shuffle" onClick={handleRandomPick}>Random Pick</Button>
                            </div>
                        </div>

                        <InlineStats
                            stats={[
                                { label: 'WATCH_TIME', value: '2,450h' },
                                { label: 'COMPLETED', value: '312' },
                                { label: 'AVG_RATING', value: '9.4', icon: 'star' },
                            ]}
                        />
                    </div>
                </section>

                {/* Sticky Control Bar */}
                <section className="sticky top-16 z-40 bg-[#111318]/95 backdrop-blur-sm border-y border-[#282e39] shadow-2xl">
                    <div className="max-w-[1200px] mx-auto px-6 py-3 flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-96">
                            <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size="sm" />
                            <input
                                type="text"
                                placeholder="Search titles, genres, or tags..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[#1c2127] border border-[#282e39] rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#2b6cee] transition-colors"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                                >
                                    <Icon name="close" size="sm" />
                                </button>
                            )}
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
                            <div className="flex gap-1 bg-[#1c2127] rounded-lg p-1">
                                {filtersWithState.map((filter) => (
                                    <button
                                        key={filter.value}
                                        onClick={() => setActiveFilter(filter.value)}
                                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${filter.isActive
                                            ? 'bg-[#2b6cee] text-white'
                                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {filter.label}
                                    </button>
                                ))}
                            </div>
                            <div className="w-px h-6 bg-[#3b4354] mx-2 hidden md:block" />
                            <div className="relative">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                                >
                                    <Icon name="tune" size="sm" />
                                    <span className="text-sm">Filter</span>
                                </button>
                            </div>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as 'default' | 'rating' | 'title')}
                                className="bg-[#1c2127] border border-[#282e39] rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#2b6cee] cursor-pointer"
                            >
                                <option value="default">Default</option>
                                <option value="rating">By Rating</option>
                                <option value="title">By Title</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Main Gallery Grid */}
                <section id="gallery" className="flex-grow max-w-[1400px] mx-auto px-6 py-12 w-full">
                    {/* Results count */}
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-slate-400 text-sm">
                            Showing {Math.min(visibleCount, filteredAnimes.length)} of {filteredAnimes.length} results
                            {searchQuery && <span className="text-[#2b6cee]"> for "{searchQuery}"</span>}
                        </p>
                        {filteredAnimes.length === 0 && (
                            <Button variant="ghost" size="sm" onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}>
                                Clear Filters
                            </Button>
                        )}
                    </div>

                    {filteredAnimes.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                            {filteredAnimes.slice(0, visibleCount).map((anime) => (
                                <AnimeCard key={anime.id} {...anime} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <Icon name="search_off" className="text-slate-600 !text-6xl mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
                            <p className="text-slate-400 max-w-md">
                                Try adjusting your search or filter criteria to find what you're looking for.
                            </p>
                        </div>
                    )}

                    {filteredAnimes.length > visibleCount && (
                        <div className="mt-16 flex justify-center">
                            <Button
                                variant="outline"
                                icon="keyboard_arrow_down"
                                iconPosition="right"
                                className="rounded-full"
                                onClick={handleLoadMore}
                            >
                                Load More ({filteredAnimes.length - visibleCount} remaining)
                            </Button>
                        </div>
                    )}
                </section>

                {/* Watch History Timeline */}
                <section className="w-full bg-[#181e29] border-t border-[#282e39] py-16 overflow-hidden">
                    <div className="max-w-[1400px] mx-auto px-6">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-2">Watch History</h2>
                                <p className="text-slate-400">Tracking the journey through the seasons.</p>
                            </div>
                            <button className="text-[#2b6cee] text-sm font-bold uppercase tracking-wider hover:text-white transition-colors">
                                View Full Log
                            </button>
                        </div>

                        <div className="relative py-10">
                            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2" />
                            <div className="relative flex justify-between items-center overflow-x-auto pb-8 gap-12 md:gap-0">
                                {timelineData.map((item, index) => (
                                    <TimelineItem key={index} {...item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

// Anime Card Component
interface AnimeCardProps {
    title: string;
    genres: string[];
    badge?: { text: string; color: 'primary' | 'yellow' | 'green' | 'purple'; pulse?: boolean };
    imageUrl: string;
    description: string;
    rating?: string;
    ratingBars?: number;
    status?: string;
    progress?: { current: number; total: number };
    isWatching?: boolean;
    showArrow?: boolean;
    grayscale?: boolean;
}

function AnimeCard({
    title,
    genres,
    badge,
    imageUrl,
    description,
    rating,
    ratingBars = 0,
    status,
    progress,
    isWatching,
    showArrow,
    grayscale
}: AnimeCardProps) {
    return (
        <div className={`group relative aspect-[3/4] rounded-xl overflow-hidden bg-[#181e29] cursor-pointer transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.5)] hover:z-10 ${isWatching ? 'border border-[#2b6cee]/20 shadow-[0_0_10px_rgba(43,108,238,0.5),0_0_20px_rgba(43,108,238,0.3)]' : ''}`}>
            <div
                className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 ${grayscale ? 'grayscale group-hover:grayscale-0' : ''}`}
                style={{ backgroundImage: `url('${imageUrl}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111318] via-[#111318]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            {badge && (
                <div className="absolute top-4 left-4">
                    <Badge variant={badge.color} pulse={badge.pulse}>{badge.text}</Badge>
                </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end h-full">
                <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                    <h3 className="text-2xl font-bold text-white leading-tight mb-1">{title}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {genres.map((genre, index) => (
                            <span key={index} className="text-xs text-slate-300 bg-white/10 px-2 py-0.5 rounded">{genre}</span>
                        ))}
                    </div>

                    {progress && (
                        <>
                            <ProgressBar value={(progress.current / progress.total) * 100} className="mt-2 group-hover:hidden" />
                            <p className="text-xs text-[#2b6cee] font-mono mt-1 group-hover:hidden">Ep {progress.current} / {progress.total}</p>
                        </>
                    )}
                </div>

                <div className="h-0 overflow-hidden opacity-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-300 translate-y-full group-hover:translate-y-0">
                    <p className="text-sm text-slate-300 line-clamp-3 mb-4">{description}</p>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                                {status ? 'STATUS' : 'MY RATING'}
                            </span>
                            {status ? (
                                <span className="text-white font-bold text-sm">{status}</span>
                            ) : (
                                <div className="flex items-center gap-1">
                                    <span className="text-[#2b6cee] font-bold">{rating}</span>
                                    <RatingBars filled={ratingBars} />
                                </div>
                            )}
                        </div>
                        {showArrow && (
                            <button className="size-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#2b6cee] hover:text-white transition-colors">
                                <Icon name="arrow_forward" size="sm" className="!text-[18px]" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Timeline Item Component
interface TimelineItemProps {
    date: string;
    title: string;
    status: string;
    imageUrl?: string;
    isActive?: boolean;
    isFuture?: boolean;
}

function TimelineItem({ date, title, status, imageUrl, isActive, isFuture }: TimelineItemProps) {
    return (
        <div className="relative flex-shrink-0 flex flex-col items-center group cursor-pointer w-48">
            <div className={`mb-6 ${isActive ? '' : isFuture ? 'opacity-30 group-hover:opacity-80' : 'opacity-50 group-hover:opacity-100'} transition-opacity`}>
                {isFuture ? (
                    <div className="w-32 h-20 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center transform group-hover:-translate-y-2 transition-transform duration-300">
                        <Icon name="schedule" className="text-slate-500" />
                    </div>
                ) : (
                    <div
                        className={`w-32 h-20 rounded-lg bg-cover bg-center shadow-lg transform ${isActive ? '-translate-y-2 shadow-[0_0_10px_rgba(43,108,238,0.5),0_0_20px_rgba(43,108,238,0.3)] ring-2 ring-[#2b6cee]' : 'group-hover:-translate-y-2'} transition-transform duration-300`}
                        style={{ backgroundImage: `url('${imageUrl}')` }}
                    />
                )}
            </div>

            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full z-10 ${isActive
                ? 'bg-[#2b6cee] border-4 border-[#181e29] scale-125 shadow-lg shadow-[#2b6cee]/50'
                : isFuture
                    ? 'bg-[#181e29] border-2 border-slate-700 border-dashed group-hover:border-white group-hover:scale-125'
                    : 'bg-[#181e29] border-2 border-slate-600 group-hover:border-[#2b6cee] group-hover:scale-125'
                } transition-all`} />

            <div className={`mt-6 text-center ${isActive ? '' : isFuture ? 'opacity-30 group-hover:opacity-80' : 'opacity-50 group-hover:opacity-100'} transition-opacity`}>
                <p className={`text-xs font-mono mb-1 ${isActive ? 'text-slate-400' : 'text-slate-500'}`}>{date}</p>
                <p className="text-white font-bold text-sm">{title}</p>
                <p className={`text-xs mt-1 ${isFuture ? 'text-slate-400' : 'text-[#2b6cee]'}`}>{status}</p>
            </div>
        </div>
    );
}
