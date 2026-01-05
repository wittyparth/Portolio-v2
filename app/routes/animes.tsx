import type { Route } from "./+types/animes";
import { useState, useMemo } from 'react';
import { animes as animesData, profile } from "~/data";
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
        { title: `${profile.name} | The Anime Archive` },
        { name: "description", content: "A curated collection of psychological thrillers, cyberpunk dystopias, and slice-of-life masterpieces." },
    ];
}

export default function AnimesPage() {
    const { animes: animeList, timeline: timelineData, filters, heroImage, stats } = animesData;

    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [sortBy, setSortBy] = useState<'default' | 'rating' | 'title'>('default');
    const [showFilters, setShowFilters] = useState(false);
    const [visibleCount, setVisibleCount] = useState(8);

    // Filter logic
    const filteredAnimes = useMemo(() => {
        let result = [...animeList];

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
    }, [searchQuery, activeFilter, sortBy, animeList]);

    // Random pick function
    const handleRandomPick = () => {
        const randomIndex = Math.floor(Math.random() * animeList.length);
        const randomAnime = animeList[randomIndex];
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
                        style={{ backgroundImage: `url('${heroImage}')` }}
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
                                { label: 'WATCH_TIME', value: stats.watchTime },
                                { label: 'COMPLETED', value: String(stats.completed) },
                                { label: 'AVG_RATING', value: stats.avgRating, icon: 'star' },
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
