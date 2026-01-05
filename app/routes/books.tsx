import type { Route } from "./+types/books";
import { books as booksData, profile } from "~/data";
import {
    Badge,
    Button,
    Icon,
    SearchInput,
    FilterBar,
    StatHUD,
    ProgressBar,
    SignalBars
} from '~/components/ui';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: `${profile.name} - The Library` },
        { name: "description", content: "Curating knowledge, one page at a time. An immersive timeline of my intellectual journey." },
    ];
}

export default function BooksPage() {
    const { currently, books, filters, stats } = booksData;

    return (
        <div className="bg-[#101622] min-h-screen text-white font-display">
            {/* Main Content Area */}
            <div className="flex flex-1 justify-center py-10 px-4 md:px-10 relative z-10">
                <div className="flex flex-col max-w-[1280px] flex-1 w-full gap-12">

                    {/* Page Header */}
                    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div className="flex flex-col gap-4 max-w-2xl">
                            <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight leading-[0.9]">
                                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2b6cee] to-blue-400">Archive.</span>
                            </h1>
                            <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-xl">
                                Curating knowledge, one page at a time. An immersive timeline of my intellectual journey through backend engineering, system design, and philosophy.
                            </p>
                        </div>

                        <StatHUD stats={[
                            { label: 'Books Read', value: stats.booksRead },
                            { label: 'Streak', value: stats.streak, suffix: 'days' },
                            { label: 'Pages', value: stats.pages },
                        ]} />
                    </div>

                    {/* Spotlight: Currently Reading */}
                    <section className="flex flex-col gap-6">
                        <div className="flex items-center gap-3 border-b border-[#282e39] pb-4">
                            <Icon name="menu_book" className="text-[#2b6cee] animate-pulse" />
                            <h2 className="text-white tracking-tight text-2xl font-bold">Active Signal</h2>
                        </div>

                        <div className="group relative w-full rounded-2xl bg-[#161b26] border border-[#282e39] p-6 md:p-8 hover:border-[#2b6cee]/50 transition-colors duration-500 overflow-hidden">
                            <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#2b6cee]/5 rounded-full blur-[80px] pointer-events-none" />

                            <div className="flex flex-col md:flex-row gap-8 relative z-10">
                                {/* Book Cover */}
                                <div className="w-full md:w-64 flex-shrink-0">
                                    <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden shadow-2xl shadow-black/50 group-hover:shadow-[#2b6cee]/20 transition-all duration-500 transform group-hover:scale-[1.02]">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                        <img
                                            className="w-full h-full object-cover"
                                            src={currently.imageUrl}
                                            alt={`${currently.title} Book Cover`}
                                        />
                                        <div className="absolute top-3 right-3 z-20 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                                            <span className="block size-2 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-xs font-bold text-white tracking-wide uppercase">Reading</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="flex flex-col flex-1 justify-between gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                {currently.badges.map((badge) => (
                                                    <Badge key={badge} variant={badge === 'Technical' ? 'primary' : 'default'}>{badge}</Badge>
                                                ))}
                                            </div>
                                            <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">{currently.title}</h3>
                                            <p className="text-xl text-slate-400 font-medium">{currently.author}</p>
                                        </div>

                                        <div className="p-6 rounded-xl bg-[#101622]/50 border border-[#282e39]">
                                            <div className="flex justify-between items-end mb-2">
                                                <div className="flex flex-col">
                                                    <span className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-1">Current Progress</span>
                                                    <span className="text-white text-2xl font-bold tabular-nums">{currently.progress.percent}%</span>
                                                </div>
                                                <span className="text-slate-500 text-xs font-mono">Page {currently.progress.currentPage} / {currently.progress.totalPages}</span>
                                            </div>

                                            <ProgressBar value={currently.progress.percent} variant="gradient" showIndicator />

                                            <div className="mt-4 flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-slate-400 text-sm">
                                                    <Icon name="schedule" size="sm" className="!text-[16px]" />
                                                    Last read: {currently.progress.lastRead}
                                                </div>
                                                <button className="text-xs font-bold text-[#2b6cee] hover:text-white transition-colors flex items-center gap-1">
                                                    UPDATE LOG <Icon name="arrow_forward" size="sm" className="!text-[14px]" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-slate-300 italic border-l-2 border-[#2b6cee] pl-4 py-1 leading-relaxed">
                                        "{currently.quote}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Main Library Collection */}
                    <section className="flex flex-col gap-8">
                        {/* Control Bar */}
                        <div className="sticky top-20 z-40 bg-[#101622]/90 backdrop-blur-xl border-y border-[#282e39] py-3 px-1 -mx-4 md:-mx-10 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <FilterBar filters={filters} />
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <SearchInput placeholder="Filter by title, author..." className="flex-1 md:w-64" />
                                <button className="flex items-center justify-center size-9 rounded-lg border border-[#282e39] text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                                    <Icon name="sort" className="!text-[20px]" />
                                </button>
                                <button className="flex items-center justify-center size-9 rounded-lg border border-[#282e39] text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                                    <Icon name="grid_view" className="!text-[20px]" />
                                </button>
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                            {books.map((book) => (
                                <BookCard key={book.id} {...book} />
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="flex justify-center py-12">
                            <Button variant="outline" className="group" icon="keyboard_arrow_down" iconPosition="right">
                                ACCESS ARCHIVE
                            </Button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

// Book Card Component
interface BookCardProps {
    title: string;
    author: string;
    imageUrl: string;
    takeaway?: string;
    finishedDate?: string;
    category: string;
    rating?: number;
    status: string;
    isWaitlist?: boolean;
}

function BookCard({ title, author, imageUrl, takeaway, finishedDate, category, rating = 0, status, isWaitlist }: BookCardProps) {
    if (isWaitlist) {
        return (
            <div className="group relative bg-[#161b26]/30 border border-[#282e39] border-dashed rounded-xl overflow-hidden hover:bg-[#161b26] transition-all duration-300 flex flex-col h-full opacity-70 hover:opacity-100">
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-900 flex items-center justify-center">
                    <img
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-80"
                        src={imageUrl}
                        alt={title}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button className="bg-[#2b6cee] hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                            <Icon name="add" />
                        </button>
                    </div>
                    <div className="absolute top-3 right-3 bg-slate-800/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                        {status}
                    </div>
                </div>
                <div className="p-5 flex flex-col flex-1 gap-3">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-white font-bold text-lg leading-tight">{title}</h3>
                        <p className="text-slate-400 text-sm">{author}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#282e39]">
                        <span className="text-[10px] font-bold text-[#2b6cee] uppercase tracking-wider">Next Up</span>
                        <span className="text-[10px] font-mono text-slate-500">{category}</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="group relative bg-[#161b26] border border-[#282e39] rounded-xl overflow-hidden hover:border-slate-600 transition-all duration-300 flex flex-col h-full">
            <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-900">
                <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    src={imageUrl}
                    alt={title}
                />
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-[#101622]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col p-6 justify-center">
                    <p className="text-[#2b6cee] text-xs font-bold uppercase tracking-wider mb-2">Key Takeaway</p>
                    <p className="text-white text-base font-medium leading-snug">{takeaway}</p>
                    <div className="mt-6 pt-6 border-t border-white/10">
                        <p className="text-slate-400 text-xs">Finished: <span className="text-white">{finishedDate}</span></p>
                    </div>
                </div>
                {/* Status Badge */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider">
                    {status}
                </div>
            </div>
            <div className="p-5 flex flex-col flex-1 gap-3">
                <div className="flex flex-col gap-1">
                    <h3 className="text-white font-bold text-lg leading-tight group-hover:text-[#2b6cee] transition-colors">{title}</h3>
                    <p className="text-slate-400 text-sm">{author}</p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#282e39]">
                    <SignalBars level={rating} />
                    <span className="text-[10px] font-mono text-slate-500">{category}</span>
                </div>
            </div>
        </div>
    );
}
