import type { Route } from "./+types/books";
import {
    PageLayout,
    Navigation,
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
        { title: "Partha Saradhi - The Library" },
        { name: "description", content: "Curating knowledge, one page at a time. An immersive timeline of my intellectual journey." },
    ];
}

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Library', href: '/books', isActive: true },
    { label: 'About', href: '/about' },
];

const filters = [
    { label: 'All Books', value: 'all', isActive: true },
    { label: 'Finished (38)', value: 'finished' },
    { label: 'To Read (12)', value: 'to-read' },
    { label: 'Favorites', value: 'favorites' },
];

const booksData = [
    {
        id: 1,
        title: "Clean Code",
        author: "Robert C. Martin",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQ8dQ0nsICIoVnvjy2wDkSCzAHF8-4McI29SwK2lKLWIiESJL0AEP7WP3GSDaAZJW1UzmZqlB1wrUTA3irLnciI7a6vEk4OrpBdjg41ycu2Uui3ap9YM2IOy5H241StMtakttJSxKvcVY6yFezmcbM_0PqmF6a9RUvBZxCaiskDMOvAkB4QZdsiVsTBiEhblVi-DzuuPkchxJExDOz1cKAc65rT8Mlr54RefllFFVusrhjZaJwTjsarHq8HkvHS2iHvAHtxcwEz8uI",
        takeaway: '"Code is read much more often than it is written. Optimize for the reader."',
        finishedDate: "Oct 12, 2023",
        category: "ENGINEERING",
        rating: 5,
        status: "Finished",
    },
    {
        id: 2,
        title: "Dune",
        author: "Frank Herbert",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAq-ZFzASV_454IdFG4crRMCR6I6J6BP4LYZP_9BVukusdv-rmdajjr_nhDn8orUQzmySOh2JX3su8ZGbCZr_AvxoDt0pPITdI4kbW3MvSvUzisAyLMVCgk1BVlNXezK0jYwDKGKvhlwdguwP59gAFW3__xvIDQec1bfnwM9mbv3OrN9Zt41rxruycrnKwW0zFWCRxXHEGWS8PZwlx7AulDdMC2RHF-v4HFYHHbjjitoKcVvjcryWiZyWy2_ldPlS93x0EqzpVBFvsV",
        takeaway: '"A masterclass in ecology, politics, and the danger of charismatic leaders."',
        finishedDate: "Sep 04, 2023",
        category: "SCI-FI",
        rating: 5,
        status: "Finished",
    },
    {
        id: 3,
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5FRxZzJy9guatfJojnl0b5yPQcHzrO1S2-rDS6UXoV3teopIWGuZOe_KymbO7B4dyejmSFqWQ0E7wRkQILd04f37T24sDhz_MECsouDHXRZiZpbu4JDRB-V0VzM0aEOv__zrJwmtwAI9hfDK9LZqhNI7YBLwoTjSxzvSm0f9sUs08xBNR7Bvhm4sP9KLAse4kVJpb3KQFhscWEv2_Zuky3x8xbuehR5rvKzTvcCNnVu2DB9swsx8ONnF3KfFFUyy4H0KiG-W65vrV",
        takeaway: '"Don\'t live with broken windows. Be a catalyst for change."',
        finishedDate: "Aug 15, 2023",
        category: "CAREER",
        rating: 4,
        status: "Finished",
    },
    {
        id: 4,
        title: "Atomic Habits",
        author: "James Clear",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFl53ZjQV9LpYWhYaLSb8rbQWxIQwc-B2qvhhCPf--AXNN4ZIhg324AcomUJ4j81B63IuswKKFgTNw0UT7hrRNmRNoSj5DvlvPP4yesIkNvXoYVJTQs_YQTfaPG_G1lGlR73u0I13OVRfTJ2R8KeqY5jRUXKE9sEEukr35Twu7DznhG_4m-lYGbc6fw_7s0wY_a05AcrjcpfQuXwTbv30kef_P1gHHgPbheYr2vboItU89K1erikTNKJiYL4h9XfnlxmQvXe0Gm2yU",
        takeaway: '"You do not rise to the level of your goals. You fall to the level of your systems."',
        finishedDate: "Jan 10, 2023",
        category: "GROWTH",
        rating: 5,
        status: "Finished",
    },
    {
        id: 5,
        title: "Data Intensive Apps",
        author: "Martin Kleppmann",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAy7_XazDh60NiB7AGqN4m9C45-PRE7WzrW8jRFqKbuYNSjRGHQYrpT1rdONWm70gKRTMi53r5HM5Zzs6OuDkW5ImVo92rk1nTBZrfg7_VX79g6r7BlV4DLqCqQkIAEv_0qzqRPgTFmW9PIvgFaeVPVpVcKm7DUqGoHm839Ii5bSd4EPZKJ9nARfF5PYxdWuX74WgV44psHDkzuGRE6hDLcZ-sQcAVi0eyqHOBBTb4PGMRqJJfRdeoqbbtJQDBkHL4IkuilveCFkm-P",
        category: "DATABASE",
        status: "Waitlist",
        isWaitlist: true,
    },
];

export default function BooksPage() {
    return (
        <PageLayout variant="library">
            {/* Navigation */}
            <div className="w-full flex justify-center sticky top-0 z-50 backdrop-blur-md bg-[#101622]/80 border-b border-[#282e39] transition-all duration-300">
                <div className="w-full max-w-[1280px] px-4 md:px-10">
                    <header className="flex items-center justify-between whitespace-nowrap py-4">
                        <div className="flex items-center gap-4 text-white">
                            <div className="size-8 flex items-center justify-center bg-[#2b6cee]/20 rounded-lg text-[#2b6cee]">
                                <Icon name="terminal" size="lg" />
                            </div>
                            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Partha Saradhi</h2>
                        </div>
                        <div className="flex flex-1 justify-end gap-8">
                            <div className="hidden md:flex items-center gap-9">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        className={`text-sm font-medium leading-normal transition-colors ${link.isActive ? 'text-white border-b-2 border-[#2b6cee] pb-0.5' : 'text-slate-400 hover:text-white'
                                            }`}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                            <button className="flex items-center justify-center overflow-hidden rounded-lg size-10 bg-[#282e39] text-white hover:bg-[#2b6cee] hover:text-white transition-all">
                                <Icon name="light_mode" className="!text-[20px]" />
                            </button>
                        </div>
                    </header>
                </div>
            </div>

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
                            { label: 'Books Read', value: 42 },
                            { label: 'Streak', value: 12, suffix: 'days' },
                            { label: 'Pages', value: '15.4k' },
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
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMhjCDUxNuAxpF3DLH5iSzNxunp-e8U9AUlgdQfkjdH8gqAaUiGHfjbAuPBClqnr8AJKYvL0cDzmpwYSzhkhPO0LE8Qgh6vWM3-hJTNLWOf_ORx3Cv8-bs2bie1D7SmeLMywfre_W41Sayz4pPsMkybjlm6EokXUgRxzgwlqqlW8mNOyPgLRme35gFNrSe6pnBXRcGj34QuQ5xCQfp83M5gPNNJNKoagew-f2iFup1yD6-QiSeMzSY9RqQb42vlOXQsnKNhmlO67xr"
                                            alt="System Design Interview Book Cover"
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
                                                <Badge variant="primary">Technical</Badge>
                                                <Badge>Architecture</Badge>
                                            </div>
                                            <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">System Design Interview</h3>
                                            <p className="text-xl text-slate-400 font-medium">Alex Xu</p>
                                        </div>

                                        <div className="p-6 rounded-xl bg-[#101622]/50 border border-[#282e39]">
                                            <div className="flex justify-between items-end mb-2">
                                                <div className="flex flex-col">
                                                    <span className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-1">Current Progress</span>
                                                    <span className="text-white text-2xl font-bold tabular-nums">45%</span>
                                                </div>
                                                <span className="text-slate-500 text-xs font-mono">Page 142 / 320</span>
                                            </div>

                                            <ProgressBar value={45} variant="gradient" showIndicator />

                                            <div className="mt-4 flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-slate-400 text-sm">
                                                    <Icon name="schedule" size="sm" className="!text-[16px]" />
                                                    Last read: 2 hours ago
                                                </div>
                                                <button className="text-xs font-bold text-[#2b6cee] hover:text-white transition-colors flex items-center gap-1">
                                                    UPDATE LOG <Icon name="arrow_forward" size="sm" className="!text-[14px]" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-slate-300 italic border-l-2 border-[#2b6cee] pl-4 py-1 leading-relaxed">
                                        "Designing a system that scales to millions of users requires looking beyond the code—understanding trade-offs is the real engineering."
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
                            {booksData.map((book) => (
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
        </PageLayout>
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
