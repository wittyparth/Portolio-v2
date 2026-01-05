// Central export file for all data modules
// This file provides easy imports for all JSON data across the portfolio

import profileData from './profile.json';
import technologiesData from './technologies.json';
import speedStatsData from './speedStats.json';
import projectsData from './projects.json';
import currentFocusData from './currentFocus.json';
import personalData from './personal.json';
import socialPostsData from './socialPosts.json';
import guestbookData from './guestbook.json';
import lessonsLogsData from './lessonsLogs.json';
import logsData from './logs.json';
import failuresData from './failures.json';
import recommendationsData from './recommendations.json';
import booksData from './books.json';
import animesData from './animes.json';
import blogData from './blog.json';

// Type definitions for better TypeScript support
export interface Profile {
  name: string;
  role: string;
  tagline: string;
  heroTitle: {
    line1: { highlight: string; text: string };
    line2: string;
    line3: string;
  };
  avatar: string;
  status: string;
  location: {
    city: string;
    country: string;
    weather: { temp: string; condition: string };
  };
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
  };
  cta: {
    primary: { label: string; href: string; icon: string };
    secondary: { label: string; href: string; icon: string };
  };
  systemStatus: {
    version: string;
    latency: string;
    uptime: string;
  };
}

export interface Technology {
  name: string;
  icon: string;
  color: string;
}

export interface Technologies {
  row1: Technology[];
  row2: Technology[];
}

export interface ShippedProject {
  name: string;
  version: string;
  icon: string;
  status: string;
  statusColor: string;
  description?: string;
  tags?: string[];
}

export interface SpeedStats {
  typingVelocity: {
    wpm: number;
    percentile: string;
    isLive: boolean;
  };
  latency: {
    avg: number;
    unit: string;
    trend: string;
  };
  locPerMonth: {
    current: string;
    growth: string;
    progressPercent: number;
  };
  contributions: {
    total: number;
    year: number;
  };
  caffeineLevel: {
    cups: number;
    fillPercent: number;
  };
  shippedProjects: ShippedProject[];
  shippedCount: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  category: string;
  tags: string[];
  imageUrl: string;
  videoUrl?: string;
  version: string;
  badge: { text: string; color: string };
  icon: string;
  featured: boolean;
  showOnHomepage: boolean;
  install?: boolean;
  lastUpdated: string;
  githubUrl: string;
  liveUrl?: string;
}

export interface Projects {
  projects: Project[];
  filterTags: { label: string; value: string }[];
  archiveStats: {
    totalProjects: number;
    ctaTitle: string;
    ctaDescription: string;
  };
}

export interface CodeLine {
  num: number;
  code: string;
  highlight?: boolean;
  isComment?: boolean;
}

export interface CurrentFocus {
  activeBuild: {
    title: string;
    description: string;
    tech: string[];
    codePreview: {
      filename: string;
      lines: CodeLine[];
    };
  };
  learning: {
    topic: string;
    description: string;
    progress: number;
    resources: string[];
  };
  obsessed: {
    area: string;
    description: string;
    visualBars: number[];
  };
  nextUp: {
    quarter: string;
    title: string;
    description: string;
    avatars: string[];
    tasks: { text: string; status: string | null; completed: boolean; locked?: boolean }[];
  };
  liveUpdates: boolean;
}

export interface Personal {
  currentRead: {
    title: string;
    author: string;
    imageUrl: string;
    sector: string;
    episode: number;
    progress: number;
  };
  currentWatch: {
    title: string;
    imageUrl: string;
    status: string;
    episode: number;
  };
  nowPlaying: {
    title: string;
    artist: string;
    featuring: string;
    albumGradient: string;
    progress: { current: string; remaining: string; percent: number };
    codec: string;
  };
  hardware: {
    keyboard: string;
    switches: string;
    mods: string;
  };
  location: {
    city: string;
    country: string;
    weather: { temp: string; condition: string };
  };
}

export interface SocialPost {
  id: number;
  platform: string;
  platformIcon: string;
  title: string;
  date: string;
  readTime: string;
  url: string;
  showOnHomepage: boolean;
}

export interface SocialPosts {
  posts: SocialPost[];
  stats: {
    totalArticles: number;
  };
  sectionHeader: {
    badge: string;
    title: string;
    description: string;
  };
  ctaCard: {
    title: string;
    description: string;
    buttonText: string;
  };
}

export interface GuestbookEntry {
  id: number;
  name: string;
  initials: string;
  role: string;
  message: string;
  time: string;
  timeDisplay: string;
  likes: number;
  gradient: string;
  featured: boolean;
  showOnHomepage: boolean;
  isAnonymous: boolean;
}

export interface Guestbook {
  entries: GuestbookEntry[];
  stats: {
    totalSignatures: number;
    thisWeek: number;
  };
}

export interface LessonsLogs {
  sectionHeader: {
    badge: string;
    title: string;
    description: string;
  };
  failuresLessons: {
    badge: string;
    title: string;
    description: string;
    ctaText: string;
    href: string;
  };
  curatedRecs: {
    title: string;
    description: string;
    totalItems: number;
    updateFrequency: string;
    href: string;
  };
  devLog: {
    title: string;
    description: string;
    terminalPath: string;
    codeLines: { num: number; code: string; highlight?: string; isComment?: boolean; isCursor?: boolean }[];
    liveUpdates: boolean;
    href: string;
  };
}

export interface LogEntry {
  id: number;
  type: string;
  title: string;
  description: string;
  lesson: string;
  lessonLabel: string;
  category: string;
  period: string;
  tags: string[];
  color: string;
  icon: string;
  badge: string;
}

export interface Logs {
  entries: LogEntry[];
  stats: {
    exceptionsLogged: number;
    criticalCount: number;
    patchRate: string;
    growthCoefficient: string;
  };
  filterButtons: { label: string; icon: string; value: string }[];
}

// Export data with types
export const profile: Profile = profileData as Profile;
export const technologies: Technologies = technologiesData as Technologies;
export const speedStats: SpeedStats = speedStatsData as SpeedStats;
export const projects: Projects = projectsData as Projects;
export const currentFocus: CurrentFocus = currentFocusData as CurrentFocus;
export const personal: Personal = personalData as Personal;
export const socialPosts: SocialPosts = socialPostsData as SocialPosts;
export const guestbook: Guestbook = guestbookData as Guestbook;
export const lessonsLogs: LessonsLogs = lessonsLogsData as LessonsLogs;
export const logs: Logs = logsData as Logs;

// Export new page data (typed as any for flexibility)
export const failures = failuresData;
export const recommendations = recommendationsData;
export const books = booksData;
export const animes = animesData;
export const blog = blogData;

// Helper functions for filtering
export const getHomepageProjects = () => 
  projects.projects.filter(p => p.showOnHomepage);

export const getHomepageSocialPosts = () => 
  socialPosts.posts.filter(p => p.showOnHomepage);

export const getHomepageGuestbookEntries = () => 
  guestbook.entries.filter(e => e.showOnHomepage);

// Default export for convenience
export default {
  profile,
  technologies,
  speedStats,
  projects,
  currentFocus,
  personal,
  socialPosts,
  guestbook,
  lessonsLogs,
  logs,
  failures,
  recommendations,
  books,
  animes,
  blog,
  // Helper functions
  getHomepageProjects,
  getHomepageSocialPosts,
  getHomepageGuestbookEntries,
};
