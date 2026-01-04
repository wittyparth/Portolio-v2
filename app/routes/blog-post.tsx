import type { Route } from "./+types/blog-post";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Scaling Microservices - Partha.dev" },
        { name: "description", content: "A deep dive into distributed systems and microservices architecture." },
    ];
}

const relatedPosts = [
    {
        title: 'Database Sharding Strategies for High Traffic Apps',
        category: 'Database',
        readTime: '6 min read',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVQY4dW81mthPD56QzGGy6hJfGNtzNl5ycJKcWumvnUcbsc4WqRlHZVeFwRJLWK-Bz87sjPo5DrNbkAJq6CSgz66DldB7V0z_oWVqiC0yHtYWybxqvlhJrmpf2B50uqdunx1sf7qHFpXCDVhZL6CmTLz1WqfgcqUFq9WzW72G3smBsBqDKbRX0B3EY3MAa5sD0ykLfZqxoCtkXSwLH4K-rN1gn-OVhscWLQCxB3WLZDggMxl2v4H4dB7aiqp_qR_LnmDW-4Jd2sW_s',
        desc: 'Exploring horizontal scaling techniques to handle millions of transactions without downtime.',
    },
    {
        title: 'Mastering Kubernetes: Pod Lifecycle Explained',
        category: 'DevOps',
        readTime: '10 min read',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0GlJ35b8PRuH7X-G9Bvp-X-VZqNoESUYGYS3QBNYjU8g29m4XkAdQ5iQpTxP7nBmcbNOdPR51wrTVb867IsSNoi6w6lUV909MDvgiLMKdvHkp7K9GqmJ15Db5cj4LkISc89kfeMClfkIODlyrclXh1vTasBxjRmoTol8o0aObBo1XY_c-peXtOSbfcdhTeydhGKRpfDXn53r9M9PAx9u0oWPXN4QSiv-JYuq4Nt2Vlr58QHm8bxbqEjcAyJUcFKhHuwV6zlxu0kie',
        desc: 'A deep dive into how K8s manages container states, probes, and graceful shutdowns.',
    },
];

const tocItems = [
    { label: 'Intro', active: true },
    { label: 'The Fallacy of Network', active: false },
    { label: 'Circuit Breaker Pattern', active: false },
    { label: 'Event-Driven Consistency', active: false },
    { label: 'Conclusion', active: false },
];

export default function BlogPostPage() {
    return (
        <div className="bg-[#111c21] text-slate-100 font-body antialiased selection:bg-[#19a1e6]/30 selection:text-white overflow-x-hidden min-h-screen">
            {/* Main Layout */}
            <div className="relative pt-8 pb-20 min-h-screen">
                <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(25,161,230,0.15)_0%,rgba(17,28,33,0)_70%)] pointer-events-none opacity-50 z-0" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-[80px_1fr_300px] gap-8 xl:gap-12">
                    {/* Left Sidebar */}
                    <aside className="hidden lg:flex flex-col items-center gap-6 sticky top-32 h-fit">
                        <div className="flex flex-col gap-3">
                            <button className="size-10 rounded-full bg-[#18242b] border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#19a1e6] hover:border-[#19a1e6]/50 hover:bg-[#19a1e6]/10 transition-all duration-300">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </button>
                            <button className="size-10 rounded-full bg-[#18242b] border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#0077b5] hover:border-[#0077b5]/50 hover:bg-[#0077b5]/10 transition-all duration-300">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg>
                            </button>
                            <button className="size-10 rounded-full bg-[#18242b] border border-white/10 flex items-center justify-center text-slate-400 hover:text-green-500 hover:border-green-500/50 hover:bg-green-500/10 transition-all duration-300">
                                <span className="material-symbols-outlined text-[20px]">link</span>
                            </button>
                        </div>
                        <div className="w-px h-24 bg-gradient-to-b from-slate-700 to-transparent" />
                        <button className="size-10 rounded-full bg-[#18242b] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300">
                            <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                        </button>
                        <span className="text-xs font-mono text-slate-500">24</span>
                    </aside>

                    {/* Main Content */}
                    <main className="w-full max-w-3xl mx-auto">
                        {/* Hero */}
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-3 py-1 rounded-full bg-[#19a1e6]/10 text-[#19a1e6] text-xs font-bold uppercase tracking-wider border border-[#19a1e6]/20">Backend Engineering</span>
                                <span className="text-slate-500 text-sm">•</span>
                                <span className="text-slate-400 text-sm font-medium">8 min read</span>
                            </div>
                            <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-white tracking-tight mb-8">
                                Scaling Microservices: A Deep Dive into Distributed Systems
                            </h1>
                            <div className="flex items-center justify-between border-b border-white/10 pb-8">
                                <div className="flex items-center gap-4">
                                    <div className="size-12 rounded-full overflow-hidden border-2 border-[#18242b] ring-2 ring-white/10">
                                        <div
                                            className="w-full h-full bg-slate-700 bg-center bg-cover"
                                            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC1qiFBaSffc4GPcGLPYIQ3h8eKwQe62gW_t9DpTZ8yJVPWuK1Ssei1DXMtX5ON20_uUXEvb9dmNUpziNEswShmztGRqOQnISeSjasxXBc3XxPFLPRUnosbTalk2jRR_czb7iPRjChDVp7dLM4xuvAmkKIpVLr2qRqwRUow0nvbPEfxIap84KthFjHGK4AhUjj0Fg74NKZwd8-D6TUpcpkQJL74rgFer1g3ljgyoklMGC6nUAg4_hPsqoE4rRz62JKIzAgd4YHp1cem')" }}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold font-display text-lg leading-none">Partha Saradhi</p>
                                        <p className="text-slate-500 text-sm mt-1">Backend Lead @ TechCorp • Oct 24, 2023</p>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#18242b] hover:bg-white/5 border border-white/10 text-xs font-medium text-slate-300 transition-colors">
                                    <span className="material-symbols-outlined text-[16px]">bookmark_add</span>
                                    Save
                                </button>
                            </div>
                        </div>

                        {/* Article Content */}
                        <article className="prose prose-invert prose-lg max-w-none font-body text-slate-300">
                            <p className="lead text-xl leading-relaxed font-light text-slate-200 mb-8">
                                Microservices architecture has become the de facto standard for building scalable, resilient applications. However, as your system grows, so does the complexity of managing communication between services. In this deep dive, we will explore advanced patterns for service discovery, load balancing, and fault tolerance.
                            </p>

                            <div className="w-full aspect-video rounded-xl overflow-hidden mb-10 border border-white/10 shadow-2xl relative group">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#111c21]/80 to-transparent z-10 opacity-60" />
                                <div
                                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA_3DCPMzc0eWPkxU9U0fx85Sh8saKZI_3E-V7cEe6eEbriMbI4WLtb9n201zf76cGlJ0zgrcvH8m26Sg8mFMEhmZDcC1g_fzP8Y12MGbW1nk2OV7OMuryH-nfNcSjVeLopg66SN9cVFaeVI4b_E6bX-7_oDiJ7Uj9Uj-_HUt8REVIFO_only_FkRIH1ofnD_b8Gky2rtcAndMkyFzRw2SIGNwwuS1W0pPjxy86EKtwn2td6lAA5FdrF-OOwaP2OoHXexhko_Phf9lo')" }}
                                />
                                <div className="absolute bottom-4 left-4 z-20">
                                    <p className="text-xs text-white/70 bg-black/50 px-2 py-1 rounded backdrop-blur-sm">Figure 1: Visualizing Distributed Nodes</p>
                                </div>
                            </div>

                            <h2 className="text-3xl font-bold font-display text-white mt-12 mb-6 flex items-center gap-3">
                                <span className="text-[#19a1e6] text-2xl">#</span> The Fallacy of Network Reliability
                            </h2>
                            <p className="mb-6 leading-7">
                                One of the first things you learn when moving from a monolith to microservices is that the network is unreliable. Packets get lost, latency spikes unexpectedly, and services go down. If your application assumes instant, guaranteed communication, it is destined to fail.
                            </p>

                            {/* Warning Callout */}
                            <div className="my-8 p-6 rounded-lg bg-yellow-500/5 border-l-4 border-yellow-500/50 flex gap-4">
                                <span className="material-symbols-outlined text-yellow-500 shrink-0">warning</span>
                                <div>
                                    <h4 className="text-yellow-500 font-bold mb-1 text-sm uppercase tracking-wide">Warning: Latency is inevitable</h4>
                                    <p className="text-sm text-yellow-100/80 m-0">
                                        Never assume 0ms latency. Always implement timeouts and retries with exponential backoff to prevent cascading failures in your distributed system.
                                    </p>
                                </div>
                            </div>

                            <p className="mb-6 leading-7">
                                To mitigate this, we employ patterns like the <strong>Circuit Breaker</strong>. It prevents an application from repeatedly trying to execute an operation that's likely to fail. Let's look at a basic implementation in Go.
                            </p>

                            {/* Code Block */}
                            <div className="my-10 rounded-xl bg-[#0d1117] border border-white/10 overflow-hidden shadow-2xl group">
                                <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                                    <div className="flex gap-2">
                                        <div className="size-3 rounded-full bg-red-500/80" />
                                        <div className="size-3 rounded-full bg-yellow-500/80" />
                                        <div className="size-3 rounded-full bg-green-500/80" />
                                    </div>
                                    <span className="text-xs font-mono text-slate-500">circuit_breaker.go</span>
                                    <button className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-[#19a1e6] hover:text-white flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">content_copy</span> Copy
                                    </button>
                                </div>
                                <div className="p-6 overflow-x-auto">
                                    <pre className="font-mono text-sm leading-6">
                                        <code>
                                            <span className="text-[#ff7b72]">package</span> main{'\n\n'}
                                            <span className="text-[#ff7b72]">import</span> ({'\n'}
                                            {'    '}<span className="text-[#a5d6ff]">"github.com/sony/gobreaker"</span>{'\n'}
                                            {'    '}<span className="text-[#a5d6ff]">"net/http"</span>{'\n'}
                                            {'    '}<span className="text-[#a5d6ff]">"io/ioutil"</span>{'\n'}
                                            ){'\n\n'}
                                            <span className="text-[#8b949e] italic">// Custom breaker settings</span>{'\n'}
                                            <span className="text-[#ff7b72]">var</span> cbSettings = gobreaker.Settings{'{'}
                                            {'\n    '}Name: <span className="text-[#a5d6ff]">"HTTP Client"</span>,
                                            {'\n    '}MaxRequests: <span className="text-[#d2a8ff]">5</span>,
                                            {'\n    '}Timeout: <span className="text-[#d2a8ff]">60</span>,
                                            {'\n}'}
                                        </code>
                                    </pre>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold font-display text-white mt-12 mb-4">Event-Driven Consistency</h3>
                            <p className="mb-6 leading-7">
                                When dealing with distributed transactions, ACID properties are hard to maintain. Instead, we embrace <strong>BASE</strong> (Basically Available, Soft state, Eventual consistency). Using an event bus like Kafka or RabbitMQ allows services to decouple and process updates asynchronously.
                            </p>

                            <ul className="list-none space-y-3 pl-0 mb-8">
                                {['Decouples services reducing direct dependencies.', 'Allows for load leveling during traffic spikes.', 'Enables replayability of events for debugging.'].map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-[#19a1e6] text-xl mt-0.5">check_circle</span>
                                        <span className="text-slate-300">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <p className="mb-6 leading-7">
                                In conclusion, scaling isn't just about adding more servers. It's about architecting for failure and embracing the chaotic nature of distributed systems.
                            </p>
                        </article>

                        {/* Tags & Engagement */}
                        <div className="mt-16 pt-8 border-t border-white/10">
                            <div className="flex flex-wrap gap-2 mb-8">
                                {['#microservices', '#golang', '#systemdesign', '#distributed'].map((tag) => (
                                    <a key={tag} className="px-3 py-1 bg-[#18242b] hover:bg-white/5 border border-white/10 rounded-full text-xs text-slate-400 hover:text-white transition-colors" href="#">{tag}</a>
                                ))}
                            </div>
                            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-[#18242b] to-transparent border border-white/5 rounded-xl">
                                <div>
                                    <h4 className="text-white font-bold mb-1">Enjoyed this read?</h4>
                                    <p className="text-sm text-slate-400">Share it with your network or drop a comment.</p>
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 bg-[#19a1e6] hover:bg-blue-500 text-white rounded-lg text-sm font-bold shadow-[0_0_15px_-3px_rgba(25,161,230,0.5)] transition-all transform hover:scale-105">
                                    <span className="material-symbols-outlined text-[18px]">share</span>
                                    Share Article
                                </button>
                            </div>
                        </div>

                        {/* Related Posts */}
                        <div className="mt-20">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-bold font-display text-white">Recommended Reads</h3>
                                <a className="text-sm text-[#19a1e6] hover:text-white transition-colors flex items-center gap-1 group" href="/blog">
                                    View all <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </a>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {relatedPosts.map((post) => (
                                    <div key={post.title} className="group relative bg-[#18242b] border border-white/5 rounded-xl overflow-hidden hover:border-[#19a1e6]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[#19a1e6]/10">
                                        <div className="h-48 overflow-hidden relative">
                                            <div
                                                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                                style={{ backgroundImage: `url('${post.imageUrl}')` }}
                                            />
                                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-xs font-mono text-[#19a1e6]">{post.category}</span>
                                                <span className="size-1 bg-slate-600 rounded-full" />
                                                <span className="text-xs text-slate-500">{post.readTime}</span>
                                            </div>
                                            <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#19a1e6] transition-colors">{post.title}</h4>
                                            <p className="text-sm text-slate-400 line-clamp-2">{post.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </main>

                    {/* Right Sidebar */}
                    <aside className="hidden xl:block sticky top-32 h-fit">
                        <div className="mb-8">
                            <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Table of Contents</h5>
                            <nav className="flex flex-col gap-1 border-l border-white/10">
                                {tocItems.map((item) => (
                                    <a
                                        key={item.label}
                                        className={`pl-4 py-1.5 text-sm -ml-[2px] transition-all ${item.active
                                            ? 'text-[#19a1e6] border-l-2 border-[#19a1e6] font-medium'
                                            : 'text-slate-400 hover:text-white hover:border-l-2 hover:border-white/20'
                                            }`}
                                        href="#"
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </nav>
                        </div>

                        <div className="p-5 rounded-xl bg-gradient-to-br from-[#18242b] to-slate-900 border border-white/5">
                            <h5 className="text-white font-bold text-sm mb-2">Subscribe to Newsletter</h5>
                            <p className="text-xs text-slate-400 mb-4">Get the latest backend tips straight to your inbox.</p>
                            <div className="flex flex-col gap-3">
                                <input
                                    className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#19a1e6]/50 focus:ring-1 focus:ring-[#19a1e6]/50 placeholder-slate-600"
                                    placeholder="email@example.com"
                                    type="email"
                                />
                                <button className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold rounded-lg transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
