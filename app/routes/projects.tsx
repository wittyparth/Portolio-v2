import type { Route } from "./+types/projects";
import { useState, useMemo } from 'react';
import { projects as projectsData, profile } from "~/data";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: `All Projects - ${profile.name}` },
        { name: "description", content: "A collection of backend systems, distributed architectures, and experimental code. Designed for scale, built for performance." },
    ];
}

const navLinks = [
    { label: 'Projects', href: '/projects', isActive: true },
    { label: 'Anime', href: '/animes' },
    { label: 'Books', href: '/books' },
    { label: 'Failures', href: '/failures' },
    { label: 'Recommendations', href: '/recommendations' },
];

export default function ProjectsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    const allProjects = projectsData.projects;
    const filterTags = projectsData.filterTags;
    const junkyardProjects = projectsData.junkyardProjects;
    const { totalProjects, totalLoc, activeProjects } = projectsData.archiveStats;

    // Filter projects
    const filteredProjects = useMemo(() => {
        let result = [...allProjects];

        // Tag filter
        if (activeFilter !== 'all') {
            result = result.filter(p => p.tags.includes(activeFilter) || p.tech.some(t => t.toLowerCase() === activeFilter));
        }

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.title.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.tech.some(t => t.toLowerCase().includes(query)) ||
                p.category.toLowerCase().includes(query)
            );
        }

        return result;
    }, [searchQuery, activeFilter, allProjects]);

    const featuredProject = filteredProjects.find(p => p.featured);
    const regularProjects = filteredProjects.filter(p => !p.featured);

    return (
        <div className="bg-[#111318] overflow-x-hidden flex flex-col min-h-screen">
            <main className="flex-grow flex flex-col items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
                {/* Hero Section: Heading + Stats */}
                <section className="w-full flex flex-col lg:flex-row gap-8 justify-between items-start lg:items-end border-b border-[#282e39] pb-10">
                    <div className="flex-1 space-y-4 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#282e39]/50 border border-[#282e39] text-xs font-mono text-[#2b6cee]">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            SYSTEMS OPERATIONAL
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
                            Engineering <br />Archive
                        </h1>
                        <p className="text-[#9da6b9] text-lg max-w-lg leading-relaxed">
                            A collection of backend systems, distributed architectures, and experimental code. Designed for scale, built for performance.
                        </p>
                        <div className="pt-4 flex gap-4">
                            <a
                                href={profile.social.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-[#282e39] hover:bg-[#3b4354] transition-colors rounded-lg text-sm font-bold border border-[#3b4354]"
                            >
                                <span className="material-symbols-outlined text-[20px]">code</span>
                                View Github Profile
                            </a>
                        </div>
                    </div>
                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 w-full lg:w-auto">
                        <div className="bg-[#1c2029] border border-[#282e39] p-4 rounded-xl flex flex-col items-center justify-center min-w-[100px] hover:border-[#2b6cee]/50 transition-colors cursor-default group">
                            <span className="text-3xl font-bold font-mono group-hover:text-[#2b6cee] transition-colors">{allProjects.length}</span>
                            <span className="text-xs text-[#9da6b9] uppercase tracking-wider font-semibold">Projects</span>
                        </div>
                        <div className="bg-[#1c2029] border border-[#282e39] p-4 rounded-xl flex flex-col items-center justify-center min-w-[100px] hover:border-[#2b6cee]/50 transition-colors cursor-default group">
                            <span className="text-3xl font-bold font-mono group-hover:text-[#2b6cee] transition-colors">{totalLoc}</span>
                            <span className="text-xs text-[#9da6b9] uppercase tracking-wider font-semibold">LOC</span>
                        </div>
                        <div className="bg-[#1c2029] border border-[#282e39] p-4 rounded-xl flex flex-col items-center justify-center min-w-[100px] hover:border-[#2b6cee]/50 transition-colors cursor-default group">
                            <span className="text-3xl font-bold font-mono group-hover:text-[#2b6cee] transition-colors">{activeProjects}</span>
                            <span className="text-xs text-[#9da6b9] uppercase tracking-wider font-semibold">Active</span>
                        </div>
                    </div>
                </section>

                {/* Search & Filter Controls */}
                <section className="w-full sticky top-[64px] z-40 bg-[#111318]/80 backdrop-blur-xl py-4 border-b border-[#282e39]/50 -mx-4 px-4 md:px-0 md:mx-0">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center w-full">
                        {/* Search Input */}
                        <div className="relative w-full md:w-96 group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-[#9da6b9] group-focus-within:text-[#2b6cee] transition-colors">search</span>
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="block w-full pl-10 pr-10 py-2.5 border border-[#282e39] rounded-lg leading-5 bg-[#1c2029] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2b6cee] focus:border-[#2b6cee] sm:text-sm transition-all shadow-lg"
                                placeholder="Search by tech stack, name, complexity..."
                            />
                            <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                                <span className="text-xs text-[#586070] border border-[#3b4354] rounded px-1.5 py-0.5">⌘K</span>
                            </div>
                        </div>
                        {/* Scrollable Chips */}
                        <div className="flex-1 w-full overflow-x-auto scrollbar-hide">
                            <div className="flex gap-2 min-w-max px-1">
                                {filterTags.map(tag => (
                                    <button
                                        key={tag.value}
                                        onClick={() => setActiveFilter(tag.value)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeFilter === tag.value
                                            ? 'bg-[#2b6cee] text-white shadow-[0_0_10px_rgba(43,108,238,0.2)]'
                                            : 'bg-[#1c2029] border border-[#282e39] hover:border-[#586070] text-[#9da6b9] hover:text-white'
                                            }`}
                                    >
                                        {tag.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Results Summary */}
                {(searchQuery || activeFilter !== 'all') && (
                    <div className="w-full">
                        <p className="text-[#9da6b9] text-sm">
                            Showing {filteredProjects.length} of {allProjects.length} projects
                            {searchQuery && <span className="text-[#2b6cee]"> matching "{searchQuery}"</span>}
                            {activeFilter !== 'all' && <span className="text-[#2b6cee]"> in {filterTags.find(f => f.value === activeFilter)?.label}</span>}
                        </p>
                    </div>
                )}

                {/* Projects Grid (Bento Box Style) */}
                <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                    {/* Featured Project (Spans 2 cols on LG) */}
                    {featuredProject && (
                        <div className="group relative md:col-span-2 lg:col-span-2 bg-[#1c2029] rounded-2xl border border-[#282e39] overflow-hidden hover:border-[#2b6cee]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(43,108,238,0.1)] flex flex-col md:flex-row h-full">
                            {/* Image Side */}
                            <div className="relative w-full md:w-1/2 overflow-hidden h-64 md:h-auto">
                                <img
                                    alt={featuredProject.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                    src={featuredProject.imageUrl}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#1c2029] via-transparent to-transparent md:bg-gradient-to-l opacity-90"></div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
                                    <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full p-4 hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-4xl">play_circle</span>
                                    </button>
                                </div>
                            </div>
                            {/* Content Side */}
                            <div className="flex-1 p-8 flex flex-col justify-between relative">
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="px-2 py-1 bg-[#2b6cee]/20 text-[#2b6cee] text-xs font-mono font-bold rounded uppercase tracking-wider">Featured</span>
                                        <span className="text-[#586070] text-sm font-mono">{featuredProject.version}</span>
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-2 font-display group-hover:text-[#2b6cee] transition-colors">{featuredProject.title}</h3>
                                    <p className="text-[#9da6b9] mb-6 leading-relaxed">{featuredProject.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {featuredProject.tech.map(t => (
                                            <span key={t} className="px-2 py-1 bg-[#111318] border border-[#282e39] rounded text-xs text-[#9da6b9] font-mono">{t}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-4 mt-auto border-t border-[#282e39] pt-6">
                                    <a className="flex items-center gap-2 text-white hover:text-[#2b6cee] transition-colors text-sm font-bold" href={featuredProject.githubUrl}>
                                        <span className="material-symbols-outlined text-[18px]">code</span>
                                        Source Code
                                    </a>
                                    <a className="flex items-center gap-2 text-white hover:text-[#2b6cee] transition-colors text-sm font-bold" href={featuredProject.liveUrl}>
                                        <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                                        Live Demo
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Standard Cards */}
                    {regularProjects.map(project => (
                        <div key={project.id} className="group relative bg-[#1c2029] rounded-2xl border border-[#282e39] overflow-hidden hover:border-[#2b6cee]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col">
                            <div className="relative h-48 overflow-hidden border-b border-[#282e39]">
                                <img
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                    src={project.imageUrl}
                                />
                                <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-mono text-white">{project.category}</div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-white mb-2 font-display">{project.title}</h3>
                                <p className="text-[#9da6b9] text-sm mb-4 line-clamp-3">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                                    {project.tech.map(t => (
                                        <span key={t} className="px-2 py-1 bg-[#111318] border border-[#282e39] rounded text-xs text-[#9da6b9] font-mono">{t}</span>
                                    ))}
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-[#282e39]">
                                    <span className="text-xs text-[#586070]">Last updated: {project.lastUpdated}</span>
                                    <div className="flex gap-3">
                                        <a className="text-white hover:text-[#2b6cee] transition-colors" href={project.githubUrl}>
                                            <span className="material-symbols-outlined text-[20px]">code</span>
                                        </a>
                                        <a className="text-white hover:text-[#2b6cee] transition-colors" href={project.liveUrl}>
                                            <span className="material-symbols-outlined text-[20px]">visibility</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                {/* No Results */}
                {filteredProjects.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <span className="material-symbols-outlined text-[#586070] text-6xl mb-4">search_off</span>
                        <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
                        <p className="text-[#9da6b9]">Try adjusting your search or filter.</p>
                        <button
                            onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
                            className="mt-4 text-[#2b6cee] hover:underline"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

                {/* Micro Projects / Archive Section (The Junkyard) */}
                <section className="w-full py-8">
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-2xl font-bold text-white">The Junkyard</h2>
                        <div className="h-px bg-[#282e39] flex-1"></div>
                        <span className="text-xs text-[#9da6b9] uppercase tracking-widest">Experimental / Scripts / Gists</span>
                    </div>
                    <div className="bg-[#1c2029] border border-[#282e39] rounded-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#111318] border-b border-[#282e39]">
                                        <th className="p-4 text-xs font-mono text-[#586070] uppercase">Project Name</th>
                                        <th className="p-4 text-xs font-mono text-[#586070] uppercase">Tech</th>
                                        <th className="p-4 text-xs font-mono text-[#586070] uppercase w-1/2">Description</th>
                                        <th className="p-4 text-xs font-mono text-[#586070] uppercase text-right">Link</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {junkyardProjects.map((project, index) => (
                                        <tr key={index} className={`group hover:bg-[#282e39]/30 transition-colors ${index < junkyardProjects.length - 1 ? 'border-b border-[#282e39]' : ''}`}>
                                            <td className="p-4 font-bold text-white group-hover:text-[#2b6cee] transition-colors">{project.name}</td>
                                            <td className="p-4"><span className="text-[#9da6b9] font-mono text-xs">{project.tech}</span></td>
                                            <td className="p-4 text-[#9da6b9] truncate max-w-xs">{project.description}</td>
                                            <td className="p-4 text-right">
                                                <a className="text-white hover:text-[#2b6cee]" href={project.link}>
                                                    <span className="material-symbols-outlined text-sm">north_east</span>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </main>

            {/* Custom Style for scrollbar hide */}
            <style>{`
            .scrollbar-hide::-webkit-scrollbar {
                display: none;
            }
            .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
        `}</style>
        </div>
    );
}
