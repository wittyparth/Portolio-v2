import type { Route } from "./+types/terminal";
import { useRef, useState, useEffect } from 'react';
import {
    Icon,
    Button
} from '~/components/ui';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Partha Saradhi // Interactive Terminal" },
        { name: "description", content: "Interactive terminal portfolio experience. Navigate using command-line interface." },
    ];
}

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Work', href: '/projects' },
    { label: 'Contact', href: '/contact' },
];

const quickCommands = [
    { icon: 'info', command: 'about', label: 'Profile' },
    { icon: 'rocket_launch', command: 'projects', label: 'Portfolio' },
    { icon: 'memory', command: 'skills', label: 'Stack' },
    { icon: 'mail', command: 'contact', label: 'Email' },
];

// Custom Terminal Component
function CustomTerminal() {
    const [history, setHistory] = useState<{ type: 'input' | 'output'; content: string }[]>([
        {
            type: 'output', content: `Welcome to Partha's Interactive Terminal v2.4
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type 'help' to see available commands.
Type 'about' to learn more about me.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━` }
    ]);
    const [input, setInput] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Command definitions
    const commands: Record<string, () => string> = {
        help: () => `
Available Commands:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  about      - Display information about Partha
  skills     - List technical skills and expertise
  projects   - Show portfolio projects
  experience - View work experience
  education  - Show educational background
  contact    - Get contact information
  social     - Display social media links
  resume     - Download resume
  clear      - Clear the terminal screen
  whoami     - Display current user
  date       - Show current date and time
  neofetch   - Display system info (fun!)
  help       - Show this help message

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tip: Use ↑ and ↓ arrows to navigate command history
`,
        about: () => `
╔══════════════════════════════════════════════════════════════╗
║                    PARTHA SARADHI                            ║
║                Backend Engineer & Developer                  ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  👋 Hello! I'm Partha Saradhi                                ║
║                                                              ║
║  A passionate Backend Engineer specializing in building      ║
║  scalable, high-performance systems. I love working with     ║
║  distributed architectures, databases, and cloud-native      ║
║  technologies.                                               ║
║                                                              ║
║  🌍 Location: India                                          ║
║  💼 Role: Backend Engineer                                   ║
║  🎯 Focus: System Design & Architecture                      ║
║  ☕ Fuel: Coffee (42 cups this month)                        ║
║                                                              ║
║  "Code is poetry, architecture is art."                      ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
`,
        skills: () => `
┌─────────────────────────────────────────────────────────────┐
│                    TECHNICAL SKILLS                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🔧 Languages                                               │
│  ├── Python ████████████████████░░░░ 85%                    │
│  ├── JavaScript/TypeScript ██████████████████░░ 90%         │
│  ├── Go ████████████████░░░░░░░░ 70%                        │
│  ├── Rust █████████████░░░░░░░░░ 55%                        │
│  └── SQL ██████████████████████░░ 95%                       │
│                                                             │
│  🛠️ Frameworks & Tools                                      │
│  ├── Node.js / Express / Fastify                            │
│  ├── Django / FastAPI / Flask                               │
│  ├── React / Next.js / Remix                                │
│  └── GraphQL / REST / gRPC                                  │
│                                                             │
│  ☁️ Cloud & DevOps                                          │
│  ├── AWS (EC2, Lambda, S3, RDS, DynamoDB)                   │
│  ├── Docker & Kubernetes                                    │
│  ├── Terraform / Ansible                                    │
│  └── CI/CD (GitHub Actions, Jenkins)                        │
│                                                             │
│  🗄️ Databases                                               │
│  ├── PostgreSQL / MySQL                                     │
│  ├── MongoDB / Redis                                        │
│  └── Elasticsearch / ClickHouse                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
`,
        projects: () => `
┌─────────────────────────────────────────────────────────────┐
│                    FEATURED PROJECTS                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🚀 Hydra API Gateway                                       │
│     High-performance API gateway handling 1M+ req/day       │
│     Tech: Go, Redis, PostgreSQL, Kubernetes                 │
│     Status: ■ LIVE                                          │
│                                                             │
│  ⚡ ScaleDB Proxy                                           │
│     Database connection pooler with auto-scaling            │
│     Tech: Rust, PostgreSQL, Docker                          │
│     Status: ■ LIVE                                          │
│                                                             │
│  🔐 Auth Service V3                                         │
│     OAuth2/OIDC compliant authentication service            │
│     Tech: Node.js, TypeScript, Redis, JWT                   │
│     Status: ● BETA                                          │
│                                                             │
│  📊 Real-time Analytics Engine                              │
│     Event streaming and analytics pipeline                  │
│     Tech: Python, Kafka, ClickHouse, Grafana                │
│     Status: ■ LIVE                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
`,
        experience: () => `
┌─────────────────────────────────────────────────────────────┐
│                    WORK EXPERIENCE                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  💼 Senior Backend Engineer @ TechCorp                      │
│     📅 2022 - Present                                       │
│     • Led migration to microservices architecture           │
│     • Reduced API latency by 40%                            │
│     • Mentored junior developers                            │
│                                                             │
│  💼 Backend Developer @ StartupXYZ                          │
│     📅 2020 - 2022                                          │
│     • Built core payment processing system                  │
│     • Implemented event-driven architecture                 │
│     • Scaled system to handle 100k daily users              │
│                                                             │
│  💼 Software Engineer @ CodeFactory                         │
│     📅 2018 - 2020                                          │
│     • Developed RESTful APIs for mobile apps                │
│     • Optimized database queries (60% improvement)          │
│     • Contributed to open-source projects                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
`,
        education: () => `
┌─────────────────────────────────────────────────────────────┐
│                      EDUCATION                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🎓 Bachelor of Technology - Computer Science               │
│     📍 University Name                                      │
│     📅 2014 - 2018                                          │
│     • Major: Computer Science & Engineering                 │
│     • Minor: Data Science                                   │
│     • GPA: 3.8/4.0                                          │
│                                                             │
│  📜 Certifications                                          │
│     • AWS Solutions Architect - Professional                │
│     • Kubernetes Administrator (CKA)                        │
│     • PostgreSQL Professional                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
`,
        contact: () => `
┌─────────────────────────────────────────────────────────────┐
│                    CONTACT INFO                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📧 Email:    partha@example.dev                            │
│  🌐 Website:  https://partha.dev                            │
│  📍 Location: India                                         │
│  ⏰ Timezone: IST (UTC+5:30)                                │
│                                                             │
│  💬 Open for:                                               │
│     • Full-time opportunities                               │
│     • Freelance projects                                    │
│     • Technical consulting                                  │
│     • Speaking engagements                                  │
│                                                             │
│  Run 'social' to see social media links                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
`,
        social: () => `
┌─────────────────────────────────────────────────────────────┐
│                    SOCIAL LINKS                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🐙 GitHub:   github.com/partha                             │
│  🔗 LinkedIn: linkedin.com/in/partha                        │
│  🐦 Twitter:  twitter.com/partha_dev                        │
│  📝 Blog:     blog.partha.dev                               │
│  📺 YouTube:  youtube.com/@partha_codes                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
`,
        resume: () => `
📄 Resume Download
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Visit: partha.dev/resume.pdf to download my resume.
`,
        whoami: () => `guest_user@portfolio.web`,
        date: () => new Date().toLocaleString(),
        neofetch: () => `
                   .::.                      partha@portfolio
              .:'  .:                       ─────────────────
                  .: ' _,=._                OS: Portfolio OS v2.4
           .:.   :'  ::::::.''..             Host: partha.dev
           ':'  ::::::::::::.''              Kernel: React 18.x
            .:'::::::::::::::.               Uptime: 4 years, 3 months
              ::::::::::::::.                Packages: 142 (npm)
              ::::::::::::: '                Shell: zsh 5.9
              ':::::::::'                    Terminal: custom-react
                '.googO:;                    CPU: TypeScript @ 125 WPM
                  .googO.                    Memory: 12.4k LOC / month
                   'googl.                   
                    'googol                  █████████████████████░░ 92%
                     'g:o:'                  Coffee Consumption
`,
        matrix: () => '🔴 Access Denied: The Matrix has you, Neo...',
        sudo: () => '🚫 nice try, but no root access for you!',
        coffee: () => '☕ Brewing a fresh cup of code fuel... Done!',
        ping: () => `PING partha.dev (127.0.0.1): 56 data bytes
64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.042 ms
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.041 ms
64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.038 ms

--- partha.dev ping statistics ---
3 packets transmitted, 3 packets received, 0% packet loss`,
        ls: () => `drwxr-xr-x  about/
drwxr-xr-x  projects/
drwxr-xr-x  blog/
drwxr-xr-x  skills/
-rw-r--r--  resume.pdf
-rw-r--r--  contact.txt`,
        pwd: () => `/home/guest/portfolio`,
        clear: () => 'CLEAR_TERMINAL',
        echo: () => '',
        exit: () => 'Goodbye! Redirecting to home...',
    };

    const executeCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        const parts = trimmedCmd.split(' ');
        const command = parts[0];
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

        if (command === 'echo') {
            setHistory(prev => [...prev, { type: 'output', content: args.join(' ') }]);
            return;
        }

        if (command === 'exit') {
            setHistory(prev => [...prev, { type: 'output', content: 'Goodbye! Redirecting to home...' }]);
            setTimeout(() => window.location.href = '/', 1500);
            return;
        }

        // Handle navigation commands
        if (command === 'open' || command === 'goto' || command === 'cd') {
            const page = args[0];
            if (page) {
                const routes: Record<string, string> = {
                    'projects': '/projects',
                    'blog': '/blog',
                    'contact': '/contact',
                    'home': '/',
                    'about': '/about',
                    'typing': '/typing-test',
                };
                if (routes[page]) {
                    setHistory(prev => [...prev, { type: 'output', content: `Opening ${page}...` }]);
                    setTimeout(() => window.location.href = routes[page], 1000);
                    return;
                }
            }
            setHistory(prev => [...prev, { type: 'output', content: `Usage: ${command} [projects|blog|contact|home|about|typing|speed]` }]);
            return;
        }

        // Execute regular command
        if (commands[command]) {
            const output = commands[command]();
            setHistory(prev => [...prev, { type: 'output', content: output }]);
        } else if (command) {
            setHistory(prev => [...prev, {
                type: 'output',
                content: `Command '${command}' not found. Type 'help' for available commands.`
            }]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
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
            // Simple tab completion
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
        }
    };

    // Scroll to bottom on new content
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [history]);

    // Focus input on click
    const focusInput = () => inputRef.current?.focus();

    return (
        <div
            ref={containerRef}
            className="flex-1 p-4 md:p-6 font-mono text-sm overflow-y-auto bg-[#0d1114] cursor-text"
            onClick={focusInput}
            style={{ minHeight: '400px' }}
        >
            {/* History */}
            {history.map((item, index) => (
                <div key={index} className="mb-2">
                    {item.type === 'input' ? (
                        <div className="flex items-center gap-2">
                            <span className="text-green-400 font-bold">➜</span>
                            <span className="text-blue-400 font-bold">~</span>
                            <span className="text-white">{item.content}</span>
                        </div>
                    ) : (
                        <pre className="text-[#9dafb8] whitespace-pre-wrap break-words leading-relaxed">
                            {item.content}
                        </pre>
                    )}
                </div>
            ))}

            {/* Active Input Line */}
            <div className="flex items-center gap-2">
                <span className="text-green-400 font-bold">➜</span>
                <span className="text-blue-400 font-bold">~</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    autoFocus
                    className="flex-1 bg-transparent border-none outline-none text-white p-0 m-0 font-mono focus:ring-0"
                    placeholder=""
                    style={{ caretColor: '#19a1e6' }}
                />
                <span className="w-2 h-5 bg-[#19a1e6] animate-pulse" />
            </div>
        </div>
    );
}

export default function TerminalPage() {
    return (
        <div className="bg-[#0b0e11] min-h-screen">
            {/* Main Background with Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_#162026_0%,_#0b0e11_70%)] opacity-80" />
                {/* Scanlines effect */}
                <div
                    className="w-full h-full opacity-30"
                    style={{
                        background: `linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))`,
                        backgroundSize: '100% 2px, 3px 100%',
                    }}
                />
            </div>

            {/* Main Layout Container */}
            <main className="relative z-10 flex flex-col items-center justify-start flex-grow px-4 py-8 lg:px-10 max-w-7xl mx-auto w-full h-full gap-6">
                {/* Header Section */}
                <div className="w-full max-w-[960px] text-center mb-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c2326] border border-[#293338] mb-4 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-mono text-[#9dafb8] uppercase tracking-widest">System Online</span>
                    </div>
                    <h1 className="text-white tracking-tight text-[32px] md:text-5xl font-bold leading-tight px-4 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#19a1e6]/50 to-white/80">
                        Interactive Environment
                    </h1>
                    <p className="text-[#9dafb8] text-sm font-normal leading-normal max-w-2xl mx-auto">
                        Secure connection established. Use the command line interface below to navigate the portfolio database.
                    </p>
                </div>

                {/* Terminal & Sidebar Layout */}
                <div className="flex flex-col lg:flex-row w-full h-auto min-h-[600px] gap-6 lg:gap-8 items-stretch justify-center">
                    {/* Terminal Window (Main) */}
                    <div className="flex-1 flex flex-col bg-[#0d1114]/80 backdrop-blur-xl border border-[#293338] rounded-xl shadow-[0_0_40px_rgba(25,161,230,0.2)] overflow-hidden relative group/terminal w-full min-h-[500px]">
                        {/* Window Controls */}
                        <div className="flex items-center justify-between px-4 py-3 bg-[#151a1e] border-b border-[#293338] select-none">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#ff3b30] transition-colors shadow-sm cursor-pointer" />
                                <div className="w-3 h-3 rounded-full bg-[#FEBC2E] hover:bg-[#ffcc00] transition-colors shadow-sm cursor-pointer" />
                                <div className="w-3 h-3 rounded-full bg-[#28C840] hover:bg-[#34c759] transition-colors shadow-sm cursor-pointer" />
                            </div>
                            <div className="flex items-center gap-2 text-[#9dafb8] text-xs font-mono opacity-60">
                                <Icon name="home" size="sm" className="!text-[14px]" />
                                <span>partha — zsh — 80x24</span>
                            </div>
                            <div className="w-12" />
                        </div>

                        {/* Terminal Content Area */}
                        <CustomTerminal />

                        {/* Status Bar */}
                        <div className="bg-[#111518] border-t border-[#293338] p-2 px-4 flex justify-between items-center text-[10px] uppercase tracking-widest text-[#9dafb8]/60 font-mono">
                            <span className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                Connected
                            </span>
                            <span>Lat: 24ms | Type 'help' for commands</span>
                        </div>
                    </div>

                    {/* HUD / Right Sidebar */}
                    <div className="w-full lg:w-80 flex flex-col gap-5 shrink-0">
                        {/* Commands Panel */}
                        <div className="bg-[#1c2326] border border-[#293338] rounded-xl overflow-hidden shadow-lg">
                            <div className="bg-[#151a1e] px-4 py-3 border-b border-[#293338]">
                                <h3 className="text-white text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                                    <Icon name="code" className="text-[#19a1e6] !text-base" />
                                    Quick Commands
                                </h3>
                            </div>
                            <div className="p-2 flex flex-col gap-1">
                                {quickCommands.map((cmd) => (
                                    <button
                                        key={cmd.command}
                                        className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-all group text-left w-full border border-transparent hover:border-[#293338]"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="p-1.5 rounded bg-[#19a1e6]/10 text-[#19a1e6] group-hover:bg-[#19a1e6] group-hover:text-white transition-colors">
                                                <Icon name={cmd.icon} size="sm" />
                                            </span>
                                            <span className="font-mono text-[#19a1e6] text-sm font-bold group-hover:translate-x-1 transition-transform">{cmd.command}</span>
                                        </div>
                                        <span className="text-[10px] text-[#9dafb8] uppercase tracking-wider group-hover:text-white">{cmd.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Typing Test Widget */}
                        <a href="/typing-test" className="flex flex-col items-stretch justify-start rounded-xl shadow-[0_0_20px_rgba(25,161,230,0.15)] bg-[#151a1e] border border-[#293338] overflow-hidden group hover:border-[#19a1e6]/50 transition-colors cursor-pointer relative">
                            <div className="h-1 w-full bg-[#1c2326]">
                                <div className="h-full bg-[#19a1e6] w-2/3 shadow-[0_0_10px_#19a1e6]" />
                            </div>
                            <div
                                className="w-full bg-center bg-no-repeat bg-cover h-24 relative"
                                style={{ backgroundImage: 'linear-gradient(to bottom right, #111c21, #1c2326)' }}
                            >
                                <div className="absolute inset-0" style={{
                                    background: 'linear-gradient(45deg, transparent 25%, rgba(25,161,230,0.05) 25%, rgba(25,161,230,0.05) 50%, transparent 50%, transparent 75%, rgba(25,161,230,0.05) 75%, rgba(25,161,230,0.05) 100%)',
                                    backgroundSize: '10px 10px'
                                }} />
                                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                                    <div className="bg-black/50 backdrop-blur px-2 py-1 rounded text-[10px] font-mono text-[#19a1e6] border border-[#19a1e6]/20">WPM TEST</div>
                                </div>
                            </div>
                            <div className="flex w-full grow flex-col gap-2 p-4">
                                <div className="flex justify-between items-start">
                                    <p className="text-white text-base font-bold leading-tight tracking-[-0.015em] group-hover:text-[#19a1e6] transition-colors">Test Your Speed</p>
                                    <Icon name="keyboard" className="text-[#9dafb8] group-hover:text-white transition-colors" />
                                </div>
                                <p className="text-[#9dafb8] text-xs font-normal leading-normal">
                                    Challenge your typing efficiency in the terminal environment.
                                </p>
                                <div className="mt-2 flex items-center justify-between">
                                    <div className="flex -space-x-2">
                                        <div className="w-6 h-6 rounded-full bg-gray-700 border border-[#151a1e] flex items-center justify-center text-[8px] text-white">JD</div>
                                        <div className="w-6 h-6 rounded-full bg-gray-600 border border-[#151a1e] flex items-center justify-center text-[8px] text-white">AS</div>
                                        <div className="w-6 h-6 rounded-full bg-[#19a1e6] border border-[#151a1e] flex items-center justify-center text-[8px] text-white font-bold">+42</div>
                                    </div>
                                    <span className="text-[10px] font-bold text-[#19a1e6] uppercase tracking-widest group-hover:translate-x-1 transition-transform">Start →</span>
                                </div>
                            </div>
                        </a>

                        {/* System Stats Mini-Widget */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-[#1c2326] border border-[#293338] p-3 rounded-lg">
                                <div className="text-[10px] text-[#9dafb8] uppercase mb-1">CPU Load</div>
                                <div className="text-lg text-white font-mono font-bold">12%</div>
                                <div className="w-full bg-[#111518] h-1 rounded-full mt-2 overflow-hidden">
                                    <div className="bg-green-500 h-full w-[12%]" />
                                </div>
                            </div>
                            <div className="bg-[#1c2326] border border-[#293338] p-3 rounded-lg">
                                <div className="text-[10px] text-[#9dafb8] uppercase mb-1">Uptime</div>
                                <div className="text-lg text-white font-mono font-bold">04:20</div>
                                <div className="w-full bg-[#111518] h-1 rounded-full mt-2 overflow-hidden">
                                    <div className="bg-[#19a1e6] h-full w-[80%] animate-pulse" />
                                </div>
                            </div>
                        </div>

                        {/* Keyboard Shortcuts */}
                        <div className="bg-[#1c2326] border border-[#293338] p-4 rounded-xl">
                            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                                <Icon name="keyboard" className="text-[#19a1e6]" size="sm" />
                                Keyboard Shortcuts
                            </h4>
                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-[#9dafb8]">Navigate history</span>
                                    <kbd className="px-2 py-0.5 bg-[#111518] rounded text-[#19a1e6] font-mono">↑ ↓</kbd>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#9dafb8]">Clear screen</span>
                                    <kbd className="px-2 py-0.5 bg-[#111518] rounded text-[#19a1e6] font-mono">Ctrl+L</kbd>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#9dafb8]">Autocomplete</span>
                                    <kbd className="px-2 py-0.5 bg-[#111518] rounded text-[#19a1e6] font-mono">Tab</kbd>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
