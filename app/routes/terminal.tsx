import type { Route } from "./+types/terminal";
import { useRef, useState, useEffect, useCallback } from 'react';
import { profile } from '~/data';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: `${profile.name} // Interactive Terminal` },
        { name: "description", content: "Interactive terminal portfolio experience. Navigate using command-line interface." },
    ];
}

// Easter Egg Definitions
const EASTER_EGGS = {
    konami: { name: 'Konami Code', hint: 'The classic gamer sequence...', found: false },
    matrix: { name: 'The Matrix', hint: "Follow the white rabbit...", found: false },
    coffee: { name: 'Coffee Addict', hint: "Every developer's fuel.", found: false },
    rickroll: { name: 'Never Gonna...', hint: "You know the rules.", found: false },
    secret: { name: 'The Vault', hint: "Access requires the right key.", found: false },
};

type EasterEggsType = typeof EASTER_EGGS;

// Command sidebar data  
const sidebarCommands = [
    {
        category: 'Core', items: [
            { icon: 'help', command: 'help', desc: 'List all commands', color: 'primary' },
            { icon: 'cleaning_services', command: 'clear', desc: 'Clear terminal output', color: 'primary' },
        ]
    },
    {
        category: 'Profile', items: [
            { icon: 'person', command: 'about', desc: 'Who is Partha?', color: 'blue' },
            { icon: 'rocket_launch', command: 'projects', desc: 'View portfolio work', color: 'purple' },
            { icon: 'memory', command: 'skills', desc: 'Technical capabilities', color: 'indigo' },
            { icon: 'description', command: 'resume', desc: 'Download CV/PDF', color: 'teal' },
            { icon: 'mail', command: 'contact', desc: 'Connect with me', color: 'pink' },
        ]
    },
    {
        category: 'System', items: [
            { icon: 'list', command: 'ls -la', desc: 'List files (Detailed)', color: 'gray' },
            { icon: 'folder_open', command: 'pwd', desc: 'Print working directory', color: 'gray' },
            { icon: 'perm_identity', command: 'whoami', desc: 'Current user session', color: 'gray' },
        ]
    },
    {
        category: 'Restricted', items: [
            { icon: 'dangerous', command: 'sudo rm -rf /', desc: 'DO NOT EXECUTE', color: 'danger', warning: true },
            { icon: 'vpn_key', command: 'secret', desc: 'Encrypted data', color: 'warning' },
            { icon: 'terminal', command: 'vim', desc: 'Text editor', color: 'green' },
        ]
    },
];

// Terminal Component
function InteractiveTerminal({ onEasterEggFound, foundEggs }: {
    onEasterEggFound: (egg: string) => void;
    foundEggs: Record<string, boolean>;
}) {
    const [history, setHistory] = useState<{ type: 'input' | 'output' | 'system' | 'error' | 'success'; content: string }[]>([]);
    const [input, setInput] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [konamiSequence, setKonamiSequence] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    // Initialize with boot sequence
    useEffect(() => {
        const bootSequence = async () => {
            const messages = [
                { type: 'system' as const, content: '[SYSTEM] Kernel loaded successfully.', delay: 200 },
                { type: 'system' as const, content: '[SYSTEM] Interface v4.2.0 initialized.', delay: 400 },
                { type: 'system' as const, content: '[SECURITY] Encryption keys verified.', delay: 600 },
                { type: 'output' as const, content: '> Establishing secure connection...', delay: 900 },
                { type: 'success' as const, content: '> Access granted. Level: Visitor.', delay: 1200 },
                {
                    type: 'output' as const, content: `
   ___            _   _           
  / _ \\__ _ _ __| |_| |__   __ _ 
 / /_)/ _\` | '__| __| '_ \\ / _\` |
/ ___/ (_| | |  | |_| | | | (_| |
\\/    \\__,_|_|   \\__|_| |_|\\__,_|
                `, delay: 1500
                },
                {
                    type: 'output' as const, content: `Welcome to the interactive portfolio environment.
This terminal provides direct access to my projects, skills, and background information.

WARNING: There are 5 hidden Easter Eggs in this system. Use commands to find them.
`, delay: 1800
                },
            ];

            for (const msg of messages) {
                await new Promise(resolve => setTimeout(resolve, msg.delay));
                setHistory(prev => [...prev, { type: msg.type, content: msg.content }]);
            }
        };
        bootSequence();
    }, []);

    // Command definitions with Easter eggs
    const commands: Record<string, (args?: string[]) => string> = {
        help: () => `
AVAILABLE COMMANDS
==================

CORE COMMANDS
  help          Show this help message
  clear         Clear the terminal screen
  history       Show command history

PROFILE COMMANDS
  about         Display information about Partha
  skills        List technical skills and expertise
  projects      Show portfolio projects
  experience    View work experience
  contact       Get contact information
  social        Display social media links
  resume        Download resume

SYSTEM COMMANDS
  whoami        Display current user
  date          Show current date and time
  pwd           Print working directory
  ls            List directory contents
  cat <file>    Display file contents
  neofetch      Display system info

NAVIGATION
  cd <page>     Navigate to a page (home, projects, blog...)
  open <page>   Open a page
  exit          Exit terminal

SECRET COMMANDS - Can you find them all?

Tip: Use arrow keys to navigate command history, Tab for autocomplete
`,
        about: () => `
PARTHA SARADHI
Backend Engineer & Developer
==============================

Hello! I am Partha Saradhi

A passionate Backend Engineer specializing in building
scalable, high-performance systems. I love working with
distributed architectures, databases, and cloud-native
technologies.

Location:  India
Role:      Backend Engineer
Focus:     System Design & Architecture
Fuel:      Coffee (infinite cups/month)

"Code is poetry, architecture is art."

Try: skills, projects, contact for more info
`,
        skills: () => `
TECHNICAL SKILLS
================

Languages
  Python          85%
  TypeScript      90%
  Go              70%
  Rust            55%
  SQL             95%

Frameworks & Tools
  Node.js / Express / Fastify
  Django / FastAPI / Flask
  React / Next.js / Remix
  GraphQL / REST / gRPC

Cloud & DevOps
  AWS (EC2, Lambda, S3, RDS, DynamoDB)
  Docker & Kubernetes
  Terraform / Ansible
  CI/CD (GitHub Actions, Jenkins)

Databases
  PostgreSQL / MySQL
  MongoDB / Redis
  Elasticsearch / ClickHouse
`,
        projects: () => `
FEATURED PROJECTS
=================

Hydra API Gateway
  High-performance API gateway handling 1M+ req/day
  Tech: Go, Redis, PostgreSQL, Kubernetes
  Status: LIVE

ScaleDB Proxy
  Database connection pooler with auto-scaling
  Tech: Rust, PostgreSQL, Docker
  Status: LIVE

Auth Service V3
  OAuth2/OIDC compliant authentication service
  Tech: Node.js, TypeScript, Redis, JWT
  Status: BETA

Real-time Analytics Engine
  Event streaming and analytics pipeline
  Tech: Python, Kafka, ClickHouse, Grafana
  Status: LIVE

Run 'open projects' to see full portfolio
`,
        experience: () => `
WORK EXPERIENCE
===============

Senior Backend Engineer @ TechCorp
  2022 - Present
  - Led migration to microservices architecture
  - Reduced API latency by 40%
  - Mentored junior developers

Backend Developer @ StartupXYZ
  2020 - 2022
  - Built core payment processing system
  - Implemented event-driven architecture
  - Scaled system to handle 100k daily users

Software Engineer @ CodeFactory
  2018 - 2020
  - Developed RESTful APIs for mobile apps
  - Optimized database queries (60% improvement)
  - Contributed to open-source projects
`,
        contact: () => `
CONTACT INFO
============

Email:    partha@example.dev
Website:  https://partha.dev
Location: India
Timezone: IST (UTC+5:30)

Open for:
  - Full-time opportunities
  - Freelance projects
  - Technical consulting
  - Speaking engagements

Run 'social' to see social media links
`,
        social: () => `
SOCIAL LINKS
============

GitHub:   github.com/partha
LinkedIn: linkedin.com/in/partha
Twitter:  twitter.com/partha_dev
Blog:     blog.partha.dev
YouTube:  youtube.com/@partha_codes
`,
        resume: () => `Resume Download
===============
Preparing download... 

Opening resume in new tab...
[partha.dev/resume.pdf]
`,
        whoami: () => 'visitor@partha.dev',
        date: () => new Date().toLocaleString(),
        pwd: () => '/home/visitor/portfolio',
        ls: (args) => {
            if (args?.includes('-la') || args?.includes('-a')) {
                return `total 48
drwxr-xr-x  8 partha staff   256 Jan  6 00:42 .
drwxr-xr-x  5 partha staff   160 Jan  1 12:00 ..
-rw-r--r--  1 partha staff  1024 Jan  5 18:30 .secrets
drwxr-xr-x  4 partha staff   128 Jan  4 10:15 about/
drwxr-xr-x 12 partha staff   384 Jan  5 22:00 projects/
drwxr-xr-x  3 partha staff    96 Jan  3 09:00 blog/
drwxr-xr-x  2 partha staff    64 Jan  2 14:30 skills/
-rw-r--r--  1 partha staff  2048 Jan  6 00:00 resume.pdf
-rw-r--r--  1 partha staff   512 Jan  1 00:00 contact.txt`;
            }
            return `about/     projects/  blog/      skills/    resume.pdf  contact.txt`;
        },
        cat: (args) => {
            const file = args?.[0]?.toLowerCase();
            if (!file) return 'Usage: cat <filename>';

            if (file === '.secrets' || file === 'secrets') {
                return `ACCESS DENIED
This file is encrypted. You need the secret passphrase.
Hint: Try the 'secret' command with the right password...`;
            }
            if (file === 'contact.txt') {
                return `Email: partha@example.dev
Location: India
Status: Open to opportunities`;
            }
            if (file === 'resume.pdf') {
                return 'Binary file. Use "resume" command to download.';
            }
            return `cat: ${file}: No such file or directory`;
        },
        neofetch: () => `
                   .::.                      partha@portfolio
              .:'  .:                       -----------------
                  .: ' _,=._                OS: Portfolio OS v4.2
           .:.   :'  ::::::.                Host: partha.dev
           ':'  ::::::::::::.               Kernel: React 19.x
            .:'::::::::::::::.              Uptime: 4 years, 3 months
              ::::::::::::::.               Packages: 142 (npm)
              ::::::::::::: '               Shell: zsh 5.9
              ':::::::::'                   Terminal: custom-react
                '...:;                      CPU: TypeScript @ 125 WPM
                  ....                      Memory: 12.4k LOC / month
`,
        history: () => {
            if (commandHistory.length === 0) return 'No commands in history.';
            return commandHistory.map((cmd, i) => `  ${i + 1}  ${cmd}`).join('\n');
        },
        clear: () => 'CLEAR_TERMINAL',

        // Easter Egg Commands
        matrix: () => {
            if (!foundEggs.matrix) {
                onEasterEggFound('matrix');
            }
            return `
Follow the white rabbit...

THE MATRIX

EASTER EGG FOUND: "The Matrix"
Wake up, Neo... The Matrix has you.
`;
        },
        coffee: () => {
            if (!foundEggs.coffee) {
                onEasterEggFound('coffee');
            }
            return `
Brewing a fresh cup of code fuel...

    ( (
     ) )
  .______.
  |      |]
  \\      /
   \`----'

EASTER EGG FOUND: "Coffee Addict"
Fun fact: This portfolio was fueled by 42 cups of coffee.
`;
        },
        rickroll: () => {
            if (!foundEggs.rickroll) {
                onEasterEggFound('rickroll');
            }
            return `
Never gonna give you up, never gonna let you down...

EASTER EGG FOUND: "Never Gonna..."
You have been rickrolled!
`;
        },
        secret: (args) => {
            const password = args?.[0]?.toLowerCase();
            if (password === 'opensesame' || password === 'password123' || password === '1337') {
                if (!foundEggs.secret) {
                    onEasterEggFound('secret');
                }
                return `
VAULT UNLOCKED!

THE SECRET VAULT
================

Congratulations! You found the secret vault.

Hidden Stats:
  Lines of code written: 1,247,832
  Bugs squashed: 42,069
  Coffee consumed: Infinity
  Stack Overflow visits: Yes

Secret Message:
  "The best code is no code at all. Every new line is
   just waiting to be debugged."

EASTER EGG FOUND: "The Vault"
`;
            }
            return `ACCESS DENIED
Usage: secret <password>
Hint: Common passwords are never a good idea... or are they?`;
        },
        sudo: (args) => {
            if (args?.join(' ').includes('rm -rf')) {
                return `
PERMISSION DENIED

Nice try! But this terminal is protected.

User 'visitor' is not in the sudoers file.
This incident will be reported.

(Just kidding, I will not tell)
`;
            }
            return 'Permission denied: sudo requires admin privileges';
        },
        vim: () => `
Entering vim...

~
~                       VIM - Vi IMproved
~
~                        version 9.0
~
~              Vim is open source and freely distributable
~
~                     type :q to exit
~
:q

You successfully exited vim on the first try!
Most developers are not so lucky...
`,
        ping: () => `PING partha.dev (127.0.0.1): 56 data bytes
64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.042 ms
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.038 ms
64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.041 ms

--- partha.dev ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss`,
        fortune: () => {
            const fortunes = [
                "First, solve the problem. Then, write the code. - John Johnson",
                "Code is like humor. When you have to explain it, it is bad. - Cory House",
                "Fix the cause, not the symptom. - Steve Maguire",
                "Optimism is an occupational hazard of programming. - Kent Beck",
                "The best error message is the one that never shows up. - Thomas Fuchs",
                "A good programmer always looks both ways before crossing a one-way street. - Doug Linder",
            ];
            return `Fortune says:\n\n"${fortunes[Math.floor(Math.random() * fortunes.length)]}"`;
        },
        uptime: () => {
            const start = new Date('2020-01-01');
            const now = new Date();
            const years = now.getFullYear() - start.getFullYear();
            const months = now.getMonth() - start.getMonth();
            return `up ${years} years, ${months >= 0 ? months : 12 + months} months, actively coding`;
        },
        exit: () => 'EXIT_TERMINAL',
    };

    const executeCommand = useCallback((cmd: string) => {
        const trimmedCmd = cmd.trim();
        if (!trimmedCmd) return;

        const parts = trimmedCmd.split(' ');
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);

        // Add to history
        setCommandHistory(prev => [...prev, cmd]);
        setHistoryIndex(-1);

        // Add input to display
        setHistory(prev => [...prev, { type: 'input', content: cmd }]);

        // Handle special commands
        if (command === 'clear') {
            setHistory([]);
            return;
        }

        if (command === 'exit') {
            setHistory(prev => [...prev, { type: 'output', content: 'Goodbye! Redirecting to home...' }]);
            setTimeout(() => window.location.href = '/', 1500);
            return;
        }

        // Handle navigation commands
        if (command === 'open' || command === 'goto' || command === 'cd') {
            const page = args[0]?.toLowerCase();
            if (page) {
                const routes: Record<string, string> = {
                    'projects': '/projects',
                    'blog': '/blog',
                    'contact': '/contact',
                    'home': '/',
                    'about': '/about',
                    'typing': '/typing-test',
                    'books': '/books',
                    'anime': '/animes',
                    'animes': '/animes',
                    'guestbook': '/guestbook',
                };
                if (routes[page]) {
                    setHistory(prev => [...prev, { type: 'success', content: `Opening /${page}...` }]);
                    setTimeout(() => window.location.href = routes[page], 1000);
                    return;
                }
            }
            setHistory(prev => [...prev, { type: 'error', content: `Usage: ${command} <page>\nAvailable: projects, blog, contact, home, about, typing, books, anime, guestbook` }]);
            return;
        }

        // Handle echo
        if (command === 'echo') {
            const text = args.join(' ');
            setHistory(prev => [...prev, { type: 'output', content: text || '' }]);
            return;
        }

        // Execute regular command
        if (commands[command]) {
            const output = commands[command](args);
            setHistory(prev => [...prev, { type: 'output', content: output }]);
        } else {
            setHistory(prev => [...prev, {
                type: 'error',
                content: `Command '${command}' not found. Type 'help' for available commands.`
            }]);
        }
    }, [commandHistory, foundEggs, onEasterEggFound]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        // Konami code detection
        setKonamiSequence(prev => {
            const newSeq = [...prev, e.key].slice(-10);
            if (newSeq.join(',') === KONAMI_CODE.join(',')) {
                if (!foundEggs.konami) {
                    onEasterEggFound('konami');
                    setHistory(h => [...h, {
                        type: 'success',
                        content: `
KONAMI CODE ACTIVATED!

Up Up Down Down Left Right Left Right B A

EASTER EGG FOUND: "Konami Code"
You are a true gamer! +30 lives unlocked.
`
                    }]);
                }
            }
            return newSeq;
        });

        if (e.key === 'Enter') {
            executeCommand(input);
            setInput('');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
            } else {
                setHistoryIndex(-1);
                setInput('');
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const availableCommands = Object.keys(commands);
            const matches = availableCommands.filter(c => c.startsWith(input.toLowerCase()));
            if (matches.length === 1) {
                setInput(matches[0]);
            } else if (matches.length > 1) {
                setHistory(prev => [...prev, { type: 'output', content: matches.join('  ') }]);
            }
        } else if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            setHistory([]);
        } else if (e.ctrlKey && e.key === 'c') {
            e.preventDefault();
            setInput('');
            setHistory(prev => [...prev, { type: 'output', content: '^C' }]);
        }
    }, [input, commandHistory, historyIndex, executeCommand, foundEggs, onEasterEggFound]);

    // Scroll to bottom on new content
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [history]);

    const focusInput = () => inputRef.current?.focus();

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'error': return 'text-red-400';
            case 'success': return 'text-green-400';
            case 'system': return 'text-[#9dafb8]/50';
            default: return 'text-[#9dafb8]';
        }
    };

    return (
        <div
            ref={containerRef}
            className="flex-1 p-6 font-mono text-sm overflow-y-auto bg-[#090c0f] cursor-text"
            onClick={focusInput}
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#293338 #111518' }}
        >
            {/* History */}
            {history.map((item, index) => (
                <div key={index} className="mb-2">
                    {item.type === 'input' ? (
                        <div className="flex items-center gap-2">
                            <span className="text-green-500 font-bold">➜</span>
                            <span className="text-[#19a1e6] font-bold">~</span>
                            <span className="text-white">{item.content}</span>
                        </div>
                    ) : (
                        <pre className={`whitespace-pre-wrap break-words leading-relaxed ${getTypeColor(item.type)}`}>
                            {item.content}
                        </pre>
                    )}
                </div>
            ))}

            {/* Active Input Line */}
            <div className="flex items-center gap-2">
                <span className="text-green-500 font-bold">➜</span>
                <span className="text-[#19a1e6] font-bold">~</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    autoFocus
                    className="flex-1 bg-transparent border-none outline-none text-white p-0 m-0 font-mono focus:ring-0 text-base font-medium"
                    placeholder="Type a command (e.g., 'help')..."
                    style={{ caretColor: '#19a1e6' }}
                />
            </div>
        </div>
    );
}

// Main Page Component
export default function TerminalPage() {
    const STORAGE_KEY = 'portfolio_terminal_easter_eggs';

    // Initialize Easter eggs from localStorage
    const [easterEggs, setEasterEggs] = useState<EasterEggsType>(() => {
        if (typeof window !== 'undefined') {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (stored) {
                    const parsed = JSON.parse(stored);
                    return Object.keys(EASTER_EGGS).reduce((acc, key) => ({
                        ...acc,
                        [key]: {
                            ...EASTER_EGGS[key as keyof EasterEggsType],
                            found: parsed[key]?.found || false
                        }
                    }), {} as EasterEggsType);
                }
            } catch (e) {
                console.error('Failed to load Easter eggs from localStorage:', e);
            }
        }
        return EASTER_EGGS;
    });

    const [eggsFound, setEggsFound] = useState(() => {
        if (typeof window !== 'undefined') {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (stored) {
                    const parsed = JSON.parse(stored);
                    return Object.values(parsed).filter((egg: any) => egg.found).length;
                }
            } catch (e) {
                console.error('Failed to count Easter eggs:', e);
            }
        }
        return 0;
    });

    // Create a map of found eggs for the terminal
    const foundEggs = Object.keys(easterEggs).reduce((acc, key) => ({
        ...acc,
        [key]: easterEggs[key as keyof EasterEggsType].found
    }), {} as Record<string, boolean>);

    // Save Easter eggs to localStorage whenever they change
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(easterEggs));
            } catch (e) {
                console.error('Failed to save Easter eggs to localStorage:', e);
            }
        }
    }, [easterEggs]);

    const handleEasterEggFound = useCallback((egg: string) => {
        if (!easterEggs[egg as keyof EasterEggsType]?.found) {
            setEasterEggs(prev => ({
                ...prev,
                [egg]: { ...prev[egg as keyof typeof prev], found: true }
            }));
            setEggsFound(prev => prev + 1);
        }
    }, [easterEggs]);

    const colorClasses: Record<string, string> = {
        primary: 'bg-[#19a1e6]/10 text-[#19a1e6] group-hover:bg-[#19a1e6]',
        blue: 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500',
        purple: 'bg-purple-500/10 text-purple-400 group-hover:bg-purple-500',
        indigo: 'bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500',
        teal: 'bg-teal-500/10 text-teal-400 group-hover:bg-teal-500',
        pink: 'bg-pink-500/10 text-pink-400 group-hover:bg-pink-500',
        gray: 'bg-gray-700/30 text-gray-400 group-hover:bg-gray-600',
        danger: 'bg-red-500/10 text-red-500 group-hover:bg-red-500',
        warning: 'bg-yellow-500/10 text-yellow-500 group-hover:bg-yellow-500',
        green: 'bg-gray-700/30 text-gray-400 group-hover:bg-green-600',
    };

    return (
        <div className="bg-[#0b0e11] min-h-screen text-white font-sans">

            {/* Background Effects */}
            <div className="fixed inset-0 top-[60px] pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_#162026_0%,_#0b0e11_80%)] opacity-60" />
                <div
                    className="w-full h-full opacity-40 mix-blend-overlay"
                    style={{
                        background: `linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.04), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.04))`,
                        backgroundSize: '100% 2px, 3px 100%',
                    }}
                />
            </div>

            {/* Main Layout */}
            <main className="relative z-10 flex flex-col flex-grow px-4 py-6 lg:px-10 max-w-[1600px] mx-auto w-full h-[calc(100vh-80px)] gap-6">
                <div className="flex flex-col lg:flex-row w-full h-full gap-6 lg:gap-8 items-stretch overflow-hidden">
                    {/* Terminal Window */}
                    <div className="flex-1 flex flex-col bg-[#0d1114]/95 backdrop-blur-md border border-[#293338] rounded-xl shadow-[0_0_40px_rgba(25,161,230,0.15)] overflow-hidden relative h-full">
                        {/* Window Controls */}
                        <div className="flex items-center justify-between px-4 py-3 bg-[#151a1e] border-b border-[#293338] select-none z-20">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#ff3b30] transition-colors shadow-sm cursor-pointer" />
                                <div className="w-3 h-3 rounded-full bg-[#FEBC2E] hover:bg-[#ffcc00] transition-colors shadow-sm cursor-pointer" />
                                <div className="w-3 h-3 rounded-full bg-[#28C840] hover:bg-[#34c759] transition-colors shadow-sm cursor-pointer" />
                            </div>
                            <div className="flex items-center gap-3 text-[#9dafb8] text-xs font-mono opacity-60">
                                <span className="material-symbols-outlined text-[14px]">lock</span>
                                <span>partha@portfolio: ~</span>
                            </div>
                            <div className="w-12 text-right">
                                <span className="material-symbols-outlined text-[#9dafb8] text-[16px] hover:text-white cursor-pointer">settings</span>
                            </div>
                        </div>

                        {/* Terminal Content */}
                        <InteractiveTerminal onEasterEggFound={handleEasterEggFound} foundEggs={foundEggs} />
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-96 flex flex-col gap-0 shrink-0 bg-[#0d1114] border border-[#293338] rounded-xl shadow-xl overflow-hidden h-full">
                        {/* Easter Egg Progress */}
                        <div className="bg-[#111518] p-5 border-b border-[#293338] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="material-symbols-outlined text-4xl">egg</span>
                            </div>
                            <div className="flex justify-between items-end mb-3 relative z-10">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-yellow-500 text-sm animate-pulse">stars</span>
                                    <span className="text-xs uppercase tracking-widest text-[#9dafb8] font-bold">Easter Eggs</span>
                                </div>
                                <span className="font-mono text-white font-bold text-sm">{eggsFound} <span className="text-[#9dafb8] font-normal">/ 5</span></span>
                            </div>
                            <div className="h-2 w-full bg-[#1c2326] rounded-full overflow-hidden relative z-10 border border-white/5">
                                <div
                                    className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 shadow-[0_0_10px_rgba(234,179,8,0.4)] transition-all duration-500"
                                    style={{ width: `${(eggsFound / 5) * 100}%` }}
                                />
                            </div>
                            <p className="text-[10px] text-[#9dafb8]/60 mt-3 font-mono">
                                &gt; Hint: Try commands that don't exist, or look for secrets...
                            </p>
                        </div>

                        {/* Commands Header */}
                        <div className="bg-[#151a1e] px-5 py-3 border-b border-[#293338] flex justify-between items-center shadow-md z-10">
                            <h3 className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#19a1e6] text-sm">code</span>
                                Available Directives
                            </h3>
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            </div>
                        </div>

                        {/* Commands List */}
                        <div className="flex-1 overflow-y-auto p-2 bg-[#161b1f]/50" style={{ scrollbarWidth: 'thin', scrollbarColor: '#293338 #111518' }}>
                            <div className="flex flex-col gap-1">
                                {sidebarCommands.map((section) => (
                                    <div key={section.category}>
                                        <div className={`px-3 py-2 text-[10px] uppercase font-bold tracking-widest mt-1 ${section.category === 'Restricted' ? 'text-red-500/60' : 'text-[#9dafb8]/40'}`}>
                                            {section.category}
                                        </div>
                                        {section.items.map((item) => (
                                            <button
                                                key={item.command}
                                                className={`flex items-center justify-between p-3 rounded-lg transition-all group text-left w-full border border-transparent ${item.warning ? 'hover:bg-red-500/10 hover:border-red-500/30' : 'hover:bg-[#1c2326] hover:border-[#293338]/50'}`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className={`p-1.5 rounded ${colorClasses[item.color]} group-hover:text-white transition-colors ${item.warning ? 'shadow-[0_0_15px_rgba(239,68,68,0.4)]' : ''}`}>
                                                        <span className="material-symbols-outlined text-sm">{item.icon}</span>
                                                    </span>
                                                    <div>
                                                        <span className={`font-mono text-sm font-bold block transition-colors ${item.warning ? 'text-red-500 group-hover:text-white' : item.color === 'warning' ? 'text-yellow-500 group-hover:text-white' : 'text-white group-hover:text-[#19a1e6]'}`}>
                                                            {item.command}
                                                        </span>
                                                        <span className={`text-[10px] block ${item.warning ? 'text-[#9dafb8] group-hover:text-red-500/80' : 'text-[#9dafb8]'}`}>
                                                            {item.desc}
                                                        </span>
                                                    </div>
                                                </div>
                                                {item.warning && (
                                                    <span className="material-symbols-outlined text-red-500 text-sm animate-pulse">warning</span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-3 bg-[#111518] border-t border-[#293338] text-center">
                            <p className="text-[10px] text-[#9dafb8]/40 font-mono">System Build v4.2.0 // {profile.name}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
