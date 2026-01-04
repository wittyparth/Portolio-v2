import type { Route } from "./+types/home";
import { Icon } from "~/components/ui";
import { GlobalHeader, HeaderSpacer, GlobalFooter } from "~/components/layout";
import {
  Zap, Server, Code2, Palette, Wind, Braces, Atom,
  Package, Cog, Triangle, Figma, Container, Diamond, Database,
  type LucideIcon
} from "lucide-react";

// Import route pages to use as embedded sections
import CurrentFocusPage from "~/routes/current-focus";
import PersonalPage from "~/routes/personal";
import ContactPage from "~/routes/contact";
import SpeedStatsPage from "~/routes/speed-stats";
import ProjectsPage from "~/routes/projects";
import LogsPage from "~/routes/logs";
import GuestbookPage from "~/routes/guestbook";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Partha Saradhi - Backend Engineer & System Architect" },
    { name: "description", content: "Backend Engineer specializing in scalable systems, high-performance APIs, and distributed architectures." },
  ];
}

// Technology data for the scrolling sections with Lucide icons
const techRow1: { name: string; IconComponent: LucideIcon; color: string }[] = [
  { name: 'Next.js', IconComponent: Zap, color: '#ffffff' },
  { name: 'Node.js', IconComponent: Server, color: '#68a063' },
  { name: 'Python', IconComponent: Code2, color: '#3776ab' },
  { name: 'CSS', IconComponent: Palette, color: '#264de4' },
  { name: 'Tailwind', IconComponent: Wind, color: '#06b6d4' },
  { name: 'JavaScript', IconComponent: Braces, color: '#f7df1e' },
  { name: 'React', IconComponent: Atom, color: '#61dafb' },
];

const techRow2: { name: string; IconComponent: LucideIcon; color: string }[] = [
  { name: 'Bun', IconComponent: Package, color: '#fbf0df' },
  { name: 'Rust', IconComponent: Cog, color: '#dea584' },
  { name: 'Vercel', IconComponent: Triangle, color: '#ffffff' },
  { name: 'Figma', IconComponent: Figma, color: '#f24e1e' },
  { name: 'Docker', IconComponent: Container, color: '#2496ed' },
  { name: 'Solidity', IconComponent: Diamond, color: '#7b3fe4' },
  { name: 'PostgreSQL', IconComponent: Database, color: '#336791' },
];

// Tech Card Component with Lucide Icons
function TechCard({ name, IconComponent, color }: { name: string; IconComponent: LucideIcon; color: string }) {
  return (
    <div className="flex-shrink-0 group">
      <div className="flex flex-col items-center justify-center w-28 h-24 rounded-xl bg-[#12121a] border border-white/5 hover:border-white/20 transition-all duration-300 hover:scale-105 cursor-default">
        <IconComponent className="w-6 h-6 mb-2" style={{ color }} strokeWidth={1.5} />
        <span className="text-xs text-gray-400 group-hover:text-white transition-colors font-medium">{name}</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-[Space_Grotesk,sans-serif] overflow-x-hidden selection:bg-[#2b6cee] selection:text-white">
      {/* Global Header Component */}
      <GlobalHeader />
      <HeaderSpacer />

      {/* Hero Section */}
      <section className="min-h-[calc(100vh-80px)] flex flex-col justify-center">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 w-full">
          {/* Profile Intro Row */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <span className="text-gray-400 text-lg">Partha is</span>
            <div className="">
              <div className="w-full h-full rounded-full bg-[#0a0a0f] flex items-center justify-center overflow-hidden">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXbRbB2RYxtT7SPBVFZZHoKhje0RDUO06s6y8efWqyjS5MMMGKdE-j8Y_o45gVtHXkctCH1AWHlQ8JpxNwesJUz2b2zfeT9c-eL_CXEOUwt3O96mETSKFs1h0MP_tFvPYvv-s_GeIrwqviJf-TSRGrVNOSYeIK6v-5EBsd4pBx1LFcWHjVVzQxewv9wEypCb6aRVW7LtGhNRZUTk0fFxy8a2RK_1UXC8GfQD0SdNK-Jem7_FbpYpIx_wfs9xnNQ02u1q-qoVFm3nWB" alt="Partha Saradhi" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0a0a0f] flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2b6cee]/10 border border-[#2b6cee]/30">
              <div className="w-2 h-2 rounded-full bg-[#2b6cee] animate-pulse" />
              <span className="text-[#2b6cee] text-xs font-bold uppercase tracking-wider">Open to Work</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-white font-bold text-lg">Backend Engineer</span>
              <span className="text-gray-500">–</span>
              <span className="text-gray-400 text-lg">Building scalable systems for 1→1M users.</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className=" mb-16">
            <h1 className="text-[clamp(3rem,12vw,9rem)] font-black italic leading-[0.85] tracking-tight text-white">
              <span className="block text-left"><span className="text-[#2b6cee]">ASYNC</span> BACKEND</span>
            </h1>
            <h1 className="text-[clamp(3rem,12vw,9rem)] font-black italic leading-[0.85] tracking-tight text-white">
              <span className="block text-right pr-[5%]">ENGINEER FOR</span>
            </h1>
            <h1 className="text-[clamp(3rem,12vw,9rem)] font-black italic leading-[0.85] tracking-tight text-white">
              <span className="block text-left">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">SCALE-UPS</span>
              </span>
            </h1>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <a href="/contact" className="group flex items-center gap-3 h-14 px-8 rounded-full bg-white text-black font-bold text-base hover:bg-gray-100 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              <Icon name="calendar_today" size="sm" className="text-gray-600" />
              <span>Book intro</span>
            </a>
            <a href="/projects" className="group flex items-center gap-3 h-14 px-8 rounded-full bg-transparent border border-white/20 text-white font-bold text-base hover:bg-white/5 hover:border-white/40 transition-all">
              <Icon name="grid_view" size="sm" className="text-[#2b6cee]" />
              <span>View work</span>
            </a>
            <a href="https://github.com/parthasaradhi" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center size-14 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
            </a>
            <a href="https://linkedin.com/in/parthasaradhi" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center size-14 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
            </a>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-bounce">
            <span className="text-xs font-mono uppercase tracking-widest text-gray-500">Scroll</span>
            <Icon name="keyboard_arrow_down" className="text-gray-500" />
          </div>
        </div>
      </section>



      {/* Technologies Section */}
      <section className="relative border-t border-white/5 bg-[#0a0a0f] py-20 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2b6cee] via-purple-500 to-pink-500">Technologies & Tools</h2>
          </div>
          <div className=" mb-6 overflow-hidden">
            <div className="flex gap-4 animate-scrol~l-left">
              {[...techRow1, ...techRow1].map((tech, index) => <TechCard key={`${tech.name}-${index}`} {...tech} />)}
            </div>
          </div>
          <div className=" overflow-hidden">
            <div className="flex gap-4 animate-scroll-right">
              {[...techRow2, ...techRow2].map((tech, index) => <TechCard key={`${tech.name}-${index}`} {...tech} />)}
            </div>
          </div>
        </div>
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0f] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0f] to-transparent pointer-events-none z-10" />
      </section>

      {/* Speed Stats - from routes/speed-stats.tsx */}
      <section className="border-t border-white/5 bg-[#0a0a0f]">
        <SpeedStatsPage embedded={true} />
      </section>

      {/* Projects - from routes/projects.tsx */}
      <section className="border-t border-white/5 bg-[#0a0a0f]">
        <ProjectsPage embedded={true} />
      </section>

      {/* Current Focus - from routes/current-focus.tsx */}
      <section className="border-t border-white/5 bg-[#0a0a0f]">
        <CurrentFocusPage embedded={true} />
      </section>

      {/* Personal - from routes/personal.tsx */}
      <section className="border-t border-white/5 bg-[#0a0a0f]">
        <PersonalPage embedded={true} />
      </section>

      {/* Lessons & Logs - from routes/logs.tsx */}
      <section className="border-t border-white/5 bg-[#0a0a0f]">
        <LogsPage embedded={true} />
      </section>

      {/* Guestbook/Social - from routes/guestbook.tsx */}
      <section className="border-t border-white/5 bg-[#0a0a0f]">
        <GuestbookPage embedded={true} />
      </section>

      {/* Contact - from routes/contact.tsx */}
      <section className="border-t border-white/5 bg-[#0a0a0f]">
        <ContactPage embedded={true} />
      </section>

      {/* Global Footer Component */}
      <GlobalFooter />

      {/* CSS Animations */}
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left { animation: scroll-left 30s linear infinite; }
        .animate-scroll-right { animation: scroll-right 30s linear infinite; }
        .animate-scroll-left:hover, .animate-scroll-right:hover { animation-play-state: paused; }
      `}
      </style>
    </div>
  );
}
