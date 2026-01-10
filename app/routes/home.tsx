import type { Route } from "./+types/home";
import { useState, useEffect } from "react";
import { Icon } from "~/components/ui";
import {
  Zap, Server, Code2, Palette, Wind, Braces, Atom,
  Package, Cog, Triangle, Figma, Container, Diamond, Database,
  type LucideIcon
} from "lucide-react";

// Import data
import { profile, technologies } from "~/data";

// Import section components (clean, no headers/footers)
import CurrentFocusSection from "~/components/sections/CurrentFocusSection";
import PersonalSection from "~/components/sections/PersonalSection";
import ProjectsSection from "~/components/sections/ProjectsSection";
import SpeedStatsSection from "~/components/sections/SpeedStatsSection";
import LessonsLogsSection from "~/components/sections/LessonsLogsSection";
import ContactSection from "~/components/sections/ContactSection";
import SocialPostsSection from "~/components/sections/SocialPostsSection";

// Rotating roles/taglines for hero section
const heroRoles = [
  { role: "Backend Engineer", tagline: "Building scalable systems for 1→1M users." },
  { role: "IIT Dhanbad", tagline: "Engineering excellence since 2021." },
  { role: "System Architect", tagline: "Designing distributed architectures." },
  { role: "API Designer", tagline: "Crafting performant RESTful services." },
  { role: "Problem Solver", tagline: "Turning complexity into simplicity." },
  { role: "Open Source", tagline: "Contributing to the community." },
];

export function meta({ }: Route.MetaArgs) {
  return [
    { title: `${profile.name} - ${profile.role} & System Architect` },
    { name: "description", content: `${profile.role} specializing in scalable systems, high-performance APIs, and distributed architectures.` },
  ];
}

// Icon mapping for dynamic data
const iconMap: Record<string, LucideIcon> = {
  Zap, Server, Code2, Palette, Wind, Braces, Atom,
  Package, Cog, Triangle, Figma, Container, Diamond, Database,
};

// Tech Card Component with Lucide Icons
function TechCard({ name, icon, color }: { name: string; icon: string; color: string }) {
  const IconComponent = iconMap[icon] || Zap;
  return (
    <div className="flex-shrink-0 group">
      <div className="flex flex-col items-center justify-center w-24 h-20 rounded-lg bg-[#12121a] border border-white/5 hover:border-white/20 transition-all duration-300 hover:scale-105 cursor-default">
        <IconComponent className="w-5 h-5 mb-1.5" style={{ color }} strokeWidth={1.5} />
        <span className="text-[11px] text-gray-400 group-hover:text-white transition-colors font-medium">{name}</span>
      </div>
    </div>
  );
}

// Rotating Role Component with smooth animation
function RotatingRole() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % heroRoles.length);
        setIsAnimating(false);
      }, 400);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const current = heroRoles[currentIndex];

  return (
    <div className="flex items-center gap-2 flex-wrap overflow-hidden">
      <div className="relative h-6 flex items-center">
        <span
          className={`text-white font-bold text-base transition-all duration-300 ease-out ${isAnimating ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
            }`}
        >
          {current.role}
        </span>
      </div>
      <span className="text-gray-500">–</span>
      <div className="relative h-6 flex items-center">
        <span
          className={`text-gray-400 text-base transition-all duration-300 ease-out ${isAnimating ? 'opacity-0 -translate-y-3' : 'opacity-100 translate-y-0'
            }`}
        >
          {current.tagline}
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-80px)] flex flex-col justify-center bg-[#0a0a0f]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 w-full">
          {/* Profile Intro Row */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <span className="text-gray-400 text-base">{profile.name.split(' ')[0]} is</span>
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-[#0a0a0f] flex items-center justify-center overflow-hidden ring-2 ring-white/10">
                <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#0a0a0f] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#2b6cee]/10 border border-[#2b6cee]/30">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2b6cee] animate-pulse" />
              <span className="text-[#2b6cee] text-[11px] font-bold uppercase tracking-wider">{profile.status}</span>
            </div>
            {/* Rotating Role/Tagline */}
            <RotatingRole />
          </div>

          {/* Main Headline - More readable size */}
          <div className="mb-12">
            <h1 className="text-[clamp(2.5rem,10vw,6rem)] font-black italic leading-[0.9] tracking-tight text-white">
              <span className="block text-left"><span className="text-[#2b6cee]">{profile.heroTitle.line1.highlight}</span> {profile.heroTitle.line1.text}</span>
            </h1>
            <h1 className="text-[clamp(2.5rem,10vw,6rem)] font-black italic leading-[0.9] tracking-tight text-white">
              <span className="block text-right pr-[5%]">{profile.heroTitle.line2}</span>
            </h1>
            <h1 className="text-[clamp(2.5rem,10vw,6rem)] font-black italic leading-[0.9] tracking-tight text-white">
              <span className="block text-left">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">{profile.heroTitle.line3}</span>
              </span>
            </h1>
          </div>

          {/* CTA Buttons - Slightly smaller */}
          <div className="flex flex-wrap items-center gap-3">
            <a href={profile.cta.primary.href} className="group flex items-center gap-2.5 h-12 px-6 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-100 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              <Icon name={profile.cta.primary.icon} size="sm" className="text-gray-600" />
              <span>{profile.cta.primary.label}</span>
            </a>
            <a href={profile.cta.secondary.href} className="group flex items-center gap-2.5 h-12 px-6 rounded-full bg-transparent border border-white/20 text-white font-bold text-sm hover:bg-white/5 hover:border-white/40 transition-all">
              <Icon name={profile.cta.secondary.icon} size="sm" className="text-[#2b6cee]" />
              <span>{profile.cta.secondary.label}</span>
            </a>
            <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center size-12 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
            </a>
            <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center size-12 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all">
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
      <section className="relative border-t border-white/5 bg-[#0a0a0f] py-16 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2b6cee] via-purple-500 to-pink-500">Technologies & Tools</h2>
          </div>
          <div className="mb-5 overflow-hidden">
            <div className="flex gap-3 animate-scroll-left">
              {[...technologies.row1, ...technologies.row1].map((tech, index) => <TechCard key={`${tech.name}-${index}`} {...tech} />)}
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="flex gap-3 animate-scroll-right">
              {[...technologies.row2, ...technologies.row2].map((tech, index) => <TechCard key={`${tech.name}-${index}`} {...tech} />)}
            </div>
          </div>
        </div>
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0a0a0f] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0a0a0f] to-transparent pointer-events-none z-10" />
      </section>

      {/* Speed Stats Section */}
      <section className="border-t border-white/5 bg-[#0a0a0f]">
        <SpeedStatsSection />
      </section>

      {/* Projects Section */}
      <section className="border-t border-white/5 bg-[#0a0a0f]">
        <ProjectsSection />
      </section>

      {/* Current Focus - from routes/current-focus.tsx */}
      <section className="border-t border-white/5 bg-[#0a0a0f]">
        <CurrentFocusSection />
      </section>

      {/* Personal - from routes/personal.tsx */}
      <section className="border-t border-white/5 bg-[#0a0a0f]">
        <PersonalSection />
      </section>

      {/* Lessons & Logs Section */}
      <section className="border-t border-white/5 bg-[#0a0a0f]">
        <LessonsLogsSection />
      </section>

      {/* Social Posts / Engineering Logs Section */}
      <section className="border-t border-white/5 bg-[#0a0a0f]">
        <SocialPostsSection />
      </section>

      {/* Contact Section */}
      <section className="border-t border-white/5 bg-[#0a0a0f]">
        <ContactSection />
      </section>
    </>
  );
}
