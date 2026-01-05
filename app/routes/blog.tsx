import type { Route } from "./+types/blog";
import { useState, useMemo, useEffect } from 'react';
import { blog as blogData, profile } from "~/data";
import {
    Icon,
    Badge,
    Button
} from '~/components/ui';
import { useArticleStats } from '~/lib/supabase';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: `${profile.name} - Thought Stream` },
        { name: "description", content: "A curated feed of backend architecture, system design, and industry rants." },
    ];
}

export default function BlogPage() {
    const { posts: postsData, tabs, hero } = blogData;

    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'popular'>('newest');
    const [visibleCount, setVisibleCount] = useState(5);
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    // Supabase article stats hook
    const { stats: articleStats, getStats, trackView, toggleLike, hasLiked, formatViews } = useArticleStats();

    // Filter and sort posts
    const filteredPosts = useMemo(() => {
        let result = [...postsData];

        // Tab filter
        if (activeTab !== 'all') {
            result = result.filter(post => post.type === activeTab);
        }

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(post =>
                post.title.toLowerCase().includes(query) ||
                post.description.toLowerCase().includes(query) ||
                post.category.toLowerCase().includes(query)
            );
        }

        // Sort
        if (sortOrder === 'oldest') {
            result.reverse();
        } else if (sortOrder === 'popular') {
            result.sort((a, b) => {
                const getPopularity = (post: typeof postsData[0]) => {
                    const views = parseInt(post.views?.replace('k', '000') || '0');
                    const likes = parseInt(post.likes || '0');
                    return views + likes * 10;
                };
                return getPopularity(b) - getPopularity(a);
            });
        }

        return result;
    }, [searchQuery, activeTab, sortOrder, postsData]);

    // Tab click handler
    const handleTabClick = (value: string) => {
        setActiveTab(value);
        setVisibleCount(5);
    };

    // Cycle sort order
    const handleSort = () => {
        setSortOrder(prev => {
            if (prev === 'newest') return 'oldest';
            if (prev === 'oldest') return 'popular';
            return 'newest';
        });
    };

    // Newsletter subscription
    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    // Update tabs with active state
    const tabsWithState = tabs.map(tab => ({
        ...tab,
        isActive: tab.value === activeTab
    }));

    return (
        <div className="min-h-screen bg-[#0a0a0f]">
            {/* Noise overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.4] mix-blend-overlay z-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%3E%3C/svg%3E')]" />

            <main className="relative z-10 flex flex-col items-center w-full pb-20">
                {/* Hero Section */}
                <div className="w-full max-w-[1280px] px-4 md:px-8 pt-12 pb-8">
                    <div className="relative w-full overflow-hidden rounded-2xl min-h-[320px] md:min-h-[400px] bg-[#111218] group border border-white/5 shadow-2xl">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{
                                backgroundImage: `linear-gradient(0deg, #0a0a0f 0%, rgba(10, 10, 15, 0.4) 60%, rgba(0, 0, 0, 0) 100%), url("${hero.imageUrl}")`
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent" />

                        <div className="relative h-full flex flex-col justify-end p-6 md:p-12 z-10">
                            <div className="flex items-center gap-2 mb-3">
                                <Badge variant="primary" className="flex items-center gap-1">
                                    <Icon name="auto_awesome" size="sm" className="!text-[12px]" />
                                    Featured
                                </Badge>
                                <span className="text-slate-400 text-xs">•</span>
                                <span className="text-slate-400 text-xs font-mono">Latest Release</span>
                            </div>
                            <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight max-w-3xl mb-4 tracking-tight drop-shadow-lg">
                                {hero.title.split(':')[0]}: <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">{hero.title.split(':')[1]}</span>
                            </h1>
                            <p className="text-slate-400 text-base md:text-lg max-w-2xl font-light leading-relaxed mb-8">
                                {hero.description}
                            </p>
                            <div className="flex items-center gap-4">
                                <Button variant="outline" icon="arrow_forward" iconPosition="right" className="bg-white/10 border-white/10 backdrop-blur-md">
                                    Subscribe for Updates
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="sticky top-[64px] z-40 w-full max-w-[1280px] px-4 md:px-8 py-4 mb-2">
                    <div className="bg-[rgba(28,29,39,0.6)] backdrop-blur-xl rounded-xl p-1.5 md:p-2 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 border border-white/5">
                        {/* Custom Tab Buttons */}
                        <div className="flex gap-1 overflow-x-auto w-full md:w-auto">
                            {tabsWithState.map((tab) => (
                                <button
                                    key={tab.value}
                                    onClick={() => handleTabClick(tab.value)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${tab.isActive
                                        ? 'bg-[#2b6cee] text-white'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {tab.icon && <Icon name={tab.icon} size="sm" />}
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto justify-end px-1">
                            <div className="relative w-full md:w-64">
                                <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size="sm" />
                                <input
                                    type="text"
                                    placeholder="Search topics..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-[#1c1d27] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#2b6cee] transition-colors"
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
                            <button
                                onClick={handleSort}
                                className="p-2 rounded-lg bg-[#1c1d27] border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all flex items-center gap-2"
                                title={`Sort: ${sortOrder}`}
                            >
                                <Icon name="sort" size="lg" />
                                <span className="hidden sm:inline text-xs capitalize">{sortOrder}</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Summary */}
                <div className="w-full max-w-[1280px] px-4 md:px-8 mb-4">
                    <p className="text-slate-400 text-sm">
                        {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
                        {searchQuery && <span className="text-[#2b6cee]"> for "{searchQuery}"</span>}
                        {activeTab !== 'all' && <span className="text-[#2b6cee]"> in {activeTab}</span>}
                    </p>
                </div>

                {/* Posts Grid */}
                <div className="w-full max-w-[1280px] px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr pb-12">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.slice(0, visibleCount).map((post) => {
                            const stats = getStats(post.id);
                            return (
                                <BlogCard
                                    key={post.id}
                                    {...post}
                                    views={stats ? formatViews(stats.views_count) : post.views}
                                    likes={stats ? String(stats.likes_count) : post.likes}
                                    isLiked={hasLiked(post.id)}
                                    onLike={() => toggleLike(post.id)}
                                    onView={() => trackView(post.id)}
                                />
                            );
                        })
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-20">
                            <Icon name="search_off" className="text-slate-600 !text-6xl mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">No posts found</h3>
                            <p className="text-slate-400">Try adjusting your search or filter criteria.</p>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="mt-4"
                                onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    )}

                    {/* Newsletter Card */}
                    {filteredPosts.length > 0 && (
                        <article className="relative flex flex-col justify-center bg-[#0d0e12] border border-dashed border-[#2b6cee]/30 rounded-xl overflow-hidden p-6 md:p-8 h-full">
                            <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden text-[10px] font-mono text-[#2b6cee] leading-tight p-4">
                                function subscribe(user) {"{"}<br />
                                &nbsp;&nbsp;if (user.isAwesome) {"{"}<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;newsletter.send(user.email);<br />
                                &nbsp;&nbsp;{"}"}<br />
                                {"}"}<br />
              // Join the resistance
                            </div>
                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="size-8 rounded-full bg-[#2b6cee]/20 text-[#2b6cee] flex items-center justify-center">
                                            <Icon name="mail" size="md" />
                                        </span>
                                        <span className="text-[#2b6cee] font-mono text-xs font-bold tracking-widest uppercase">Weekly Intel</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Join the Thought Stream</h3>
                                    <p className="text-slate-400 text-sm mb-6">Get backend engineering tips delivered straight to your inbox.</p>
                                </div>
                                <form className="w-full flex flex-col gap-3" onSubmit={handleSubscribe}>
                                    <input
                                        className="bg-[#1c1d27] border border-white/10 text-white text-sm rounded-lg block w-full p-2.5 focus:ring-[#2b6cee] focus:border-[#2b6cee] placeholder-gray-600 transition-all"
                                        placeholder="dev@example.com"
                                        required
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Button
                                        variant="neon"
                                        className="w-full shadow-lg shadow-[#2b6cee]/20"
                                        icon={subscribed ? "check" : "send"}
                                        iconPosition="right"
                                    >
                                        {subscribed ? 'Subscribed!' : 'Subscribe'}
                                    </Button>
                                </form>
                            </div>
                        </article>
                    )}
                </div>

                {/* Load More */}
                {filteredPosts.length > visibleCount && (
                    <div className="mt-8 flex flex-col items-center justify-center gap-4">
                        <Button
                            variant="outline"
                            icon="expand_more"
                            iconPosition="right"
                            className="bg-[#1c1d27] border-white/10"
                            onClick={() => setVisibleCount(prev => prev + 3)}
                        >
                            Load More ({filteredPosts.length - visibleCount} remaining)
                        </Button>
                    </div>
                )}
            </main>
        </div>
    );
}

interface BlogCardProps {
    id: number;
    title: string;
    description: string;
    category: string;
    categoryColor: string;
    date: string;
    readTime?: string;
    views?: string;
    likes?: string;
    comments?: string;
    retweets?: string;
    type: string;
    imageUrl: string;
    isLiked?: boolean;
    onLike?: () => void;
    onView?: () => void;
}

function BlogCard({ id, title, description, category, categoryColor, date, readTime, views, likes, comments, retweets, type, imageUrl, isLiked, onLike, onView }: BlogCardProps) {
    // Track view when card is clicked
    const handleClick = () => {
        if (onView) onView();
    };
    const getTypeIcon = () => {
        switch (type) {
            case 'medium':
                return <span className="inline-flex items-center justify-center size-8 rounded-full bg-white text-black shadow-lg font-serif font-bold text-lg" title="Medium Article">M</span>;
            case 'linkedin':
                return (
                    <span className="inline-flex items-center justify-center size-8 rounded-full bg-[#0077b5] text-white shadow-lg" title="LinkedIn Post">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                    </span>
                );
            case 'twitter':
                return (
                    <span className="inline-flex items-center justify-center size-8 rounded-full bg-black text-white border border-white/20 shadow-lg" title="X Thread">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center justify-center size-8 rounded-full bg-[#1c1d27]/90 backdrop-blur-md border border-white/10 shadow-lg text-[#2b6cee]" title="Blog Post">
                        <Icon name="article" size="md" />
                    </span>
                );
        }
    };

    const getCategoryColor = () => {
        switch (categoryColor) {
            case 'teal': return 'text-teal-400';
            case 'linkedin': return 'text-[#0077b5]';
            default: return 'text-white';
        }
    };

    // Determine link based on type
    const getLink = () => {
        if (type === 'blog') return `/blog-post?id=${id}`;
        return '#'; // External links would be handled differently
    };

    return (
        <a href={getLink()} className="group relative flex flex-col bg-[#1c1d27] border border-white/5 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(43,75,238,0.2)] hover:border-[rgba(43,75,238,0.4)] h-full">
            <div className="relative w-full aspect-video overflow-hidden bg-[#15151e]">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url("${imageUrl}")` }}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute top-3 right-3 z-10">
                    {getTypeIcon()}
                </div>
            </div>

            <div className="flex flex-col flex-1 p-5 md:p-6">
                <div className="flex items-center justify-between mb-3 text-xs text-slate-400 font-mono">
                    <span className={`uppercase tracking-wider ${getCategoryColor()}`}>{category}</span>
                    <span>{date}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 leading-snug group-hover:text-[#2b6cee] transition-colors line-clamp-2">
                    {title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                    {description}
                </p>
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                        {readTime && (
                            <span className="flex items-center gap-1">
                                <Icon name="schedule" size="sm" className="!text-[14px]" />{readTime}
                            </span>
                        )}
                        {views && (
                            <span className="flex items-center gap-1">
                                <Icon name="visibility" size="sm" className="!text-[14px]" />{views}
                            </span>
                        )}
                        {likes && (
                            <button
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (onLike) onLike(); }}
                                className={`flex items-center gap-1 transition-colors ${isLiked ? 'text-[#2b6cee]' : 'hover:text-[#2b6cee]'}`}
                            >
                                <Icon name={isLiked ? 'thumb_up' : 'thumb_up'} size="sm" className={`!text-[14px] ${isLiked ? 'scale-110' : ''}`} />{likes}
                            </button>
                        )}
                        {comments && (
                            <span className="flex items-center gap-1">
                                <Icon name="comment" size="sm" className="!text-[14px]" />{comments}
                            </span>
                        )}
                        {retweets && (
                            <span className="flex items-center gap-1">
                                <Icon name="repeat" size="sm" className="!text-[14px]" />{retweets}
                            </span>
                        )}
                    </div>
                    <span className="flex items-center gap-1 text-sm font-medium text-white group-hover:text-[#2b6cee] transition-colors">
                        {type === 'blog' ? 'Read Article' : type === 'medium' ? 'Read on Medium' : type === 'linkedin' ? 'View Post' : 'Open Thread'}
                        <Icon name={type === 'blog' ? 'arrow_forward' : 'arrow_outward'} size="sm" className="transition-transform group-hover:translate-x-1" />
                    </span>
                </div>
            </div>
        </a>
    );
}
