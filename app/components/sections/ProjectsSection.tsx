/**
 * Projects Section Component
 * Based on project-section.html reference
 * A section component to be embedded in the homepage - NO header/footer
 */

import { getHomepageProjects, projects as projectsData } from "~/data";

export default function ProjectsSection() {
    const projects = getHomepageProjects();
    const { archiveStats } = projectsData;

    const getBadgeClasses = (color: string) => {
        switch (color) {
            case 'green':
                return 'bg-green-500/20 text-green-400 border-green-500/20';
            case 'purple':
                return 'bg-purple-500/20 text-purple-400 border-purple-500/20';
            default:
                return 'bg-[#2b6cee]/20 text-[#2b6cee] border-[#2b6cee]/20';
        }
    };

    return (
        <section className="py-16">
            <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-10 flex flex-col items-start gap-3">
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2b6cee] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2b6cee]" />
                        </span>
                        <span className="text-xs font-medium uppercase tracking-wider text-gray-300">Selected Works</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                        Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Impact</span>
                    </h2>
                    <p className="max-w-xl text-sm md:text-base text-gray-400 leading-relaxed">
                        A curated selection of backend architectures, high-performance APIs, and developer tools built for scale.
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <div key={index} className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#16181D] hover:shadow-[0_0_40px_-10px_rgba(43,108,238,0.15)] hover:border-[rgba(43,108,238,0.3)] hover:-translate-y-1 transition-all duration-400">
                            {/* Video/Image Area */}
                            <div className="relative h-64 w-full overflow-hidden bg-black/40 border-b border-white/5">
                                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-60">
                                    <source src={project.videoUrl} type="video/mp4" />
                                </video>
                                <div
                                    className="absolute inset-0 z-10 h-full w-full bg-cover bg-center transition-opacity duration-500 ease-out group-hover:opacity-0"
                                    style={{ backgroundImage: `url('${project.imageUrl}')` }}
                                >
                                    <div className="absolute inset-0 bg-[#16181D]/30 mix-blend-multiply" />
                                </div>
                                <div className="absolute top-4 right-4 z-20">
                                    <div className="h-10 w-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 text-white shadow-lg">
                                        <span className="material-symbols-outlined text-[20px]">{project.icon}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-1 flex-col justify-between p-8">
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getBadgeClasses(project.badge.color)}`}>
                                            {project.badge.text}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                        {project.description}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 mt-auto border-t border-white/5 pt-6">
                                    <a href={project.githubUrl} className="flex items-center gap-2 text-sm font-medium text-white hover:text-[#2b6cee] transition-colors">
                                        <svg aria-hidden="true" className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                            <path clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fillRule="evenodd" />
                                        </svg>
                                        <span>GitHub</span>
                                    </a>
                                    <div className="h-4 w-[1px] bg-white/10" />
                                    <a href={project.liveUrl || "#"} className="flex items-center gap-2 text-sm font-medium text-white hover:text-[#2b6cee] transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">{project.install ? 'terminal' : 'open_in_new'}</span>
                                        <span>{project.install ? 'Install' : 'Live Demo'}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* View All Projects Card */}
                    <a href="/projects" className="group relative flex flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#2b6cee] to-blue-600 shadow-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-[#2b6cee]/30 min-h-[400px]">
                        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl group-hover:scale-125 transition-transform duration-700" />
                        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-black/10 blur-3xl group-hover:scale-125 transition-transform duration-700" />
                        <div className="relative z-10 flex flex-col items-center gap-6 p-8 text-center">
                            <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 backdrop-blur-sm group-hover:rotate-12 transition-transform duration-500">
                                <span className="material-symbols-outlined text-3xl text-white">grid_view</span>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-2">{archiveStats.ctaTitle}</h3>
                                <p className="text-white/80 font-medium max-w-xs mx-auto">{archiveStats.ctaDescription}</p>
                            </div>
                            <div className="mt-4 flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-[#2b6cee] transition-all hover:bg-white/90">
                                <span>View All Projects</span>
                                <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}
