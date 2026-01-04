import type { Route } from "./+types/typing-test";
import { useState, useEffect, useCallback, useRef } from 'react';
import {
    PageLayout,
    Icon,
    Button
} from '~/components/ui';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Typing Test & Rankings // Partha.dev" },
        { name: "description", content: "Test your typing speed and compete on the global leaderboard." },
    ];
}

const sampleTexts = {
    '15s': "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.",
    '30s': "System architecture requires robust backend solutions to handle scalable requests. Optimization is not just a feature, it is a necessity for modern web applications. Typing proficiency correlates with cognitive throughput and developer efficiency.",
    'Words': "algorithm database encryption microservices kubernetes docker terraform ansible grafana prometheus redis mongodb postgresql elasticsearch nginx apache kubernetes helm istio envoy",
    'Code': "const server = http.createServer((req, res) => { res.writeHead(200, {'Content-Type': 'text/plain'}); res.end('Hello World'); }); server.listen(3000);"
};

const timeLimits: Record<string, number> = { '15s': 15, '30s': 30, 'Words': 60, 'Code': 45 };

const leaderboardData = [
    { rank: 1, name: 'Cyber_Ninja', country: 'USA', accuracy: '100%', wpm: 184, color: 'gold' },
    { rank: 2, name: 'KeyStroke_Legend', country: 'GER', accuracy: '99.8%', wpm: 172, color: 'silver' },
    { rank: 3, name: 'Alex_Dev', country: 'UK', accuracy: '98%', wpm: 165, color: 'bronze' },
    { rank: 4, name: 'Partha Saradhi', country: 'IND', accuracy: '99%', wpm: 142, color: 'primary', isUser: true },
    { rank: 5, name: 'NullPointer', country: 'IND', accuracy: '96%', wpm: 130, color: 'default' },
    { rank: 6, name: 'FastFingers_99', country: 'CAN', accuracy: '95%', wpm: 128, color: 'default' },
];

const achievements = [
    { icon: 'speed', label: '100 WPM', color: 'primary', unlocked: true },
    { icon: 'workspace_premium', label: 'Top 10', color: 'gold', unlocked: true },
    { icon: 'verified', label: 'No Errors', color: 'green', unlocked: true },
    { icon: 'lock', label: '???', color: 'default', unlocked: false },
];

export default function TypingTestPage() {
    const [mode, setMode] = useState<string>('15s');
    const [text, setText] = useState(sampleTexts['15s']);
    const [userInput, setUserInput] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [errors, setErrors] = useState(0);
    const [correctChars, setCorrectChars] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(15);
    const [wpm, setWpm] = useState(0);
    const [charStatus, setCharStatus] = useState<('correct' | 'incorrect' | 'pending')[]>([]);
    const [showResults, setShowResults] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const startTimeRef = useRef<number>(0);

    // Initialize char status
    useEffect(() => {
        setCharStatus(Array(text.length).fill('pending'));
    }, [text]);

    // Handle mode change
    const handleModeChange = (newMode: string) => {
        setMode(newMode);
        setText(sampleTexts[newMode as keyof typeof sampleTexts]);
        setTimeLeft(timeLimits[newMode]);
        resetTest();
    };

    // Timer
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isStarted && !isFinished && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setIsFinished(true);
                        setShowResults(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isStarted, isFinished, timeLeft]);

    // Calculate WPM in real-time
    useEffect(() => {
        if (isStarted && !isFinished && startTimeRef.current) {
            const elapsedMinutes = (Date.now() - startTimeRef.current) / 60000;
            if (elapsedMinutes > 0) {
                const wordsTyped = correctChars / 5;
                setWpm(Math.round(wordsTyped / elapsedMinutes));
            }
        }
    }, [correctChars, isStarted, isFinished]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        // Start test on first keystroke
        if (!isStarted && !isFinished && e.key.length === 1) {
            setIsStarted(true);
            startTimeRef.current = Date.now();
        }

        // Tab to restart
        if (e.key === 'Tab') {
            e.preventDefault();
            resetTest();
            return;
        }

        if (isFinished) return;

        // Handle backspace
        if (e.key === 'Backspace') {
            if (currentIndex > 0) {
                const newStatus = [...charStatus];
                newStatus[currentIndex - 1] = 'pending';
                setCharStatus(newStatus);
                setCurrentIndex(currentIndex - 1);
                setUserInput(userInput.slice(0, -1));
            }
            return;
        }

        // Handle regular characters
        if (e.key.length === 1 && currentIndex < text.length) {
            const expectedChar = text[currentIndex];
            const isCorrect = e.key === expectedChar;

            const newStatus = [...charStatus];
            newStatus[currentIndex] = isCorrect ? 'correct' : 'incorrect';
            setCharStatus(newStatus);

            if (isCorrect) {
                setCorrectChars(prev => prev + 1);
            } else {
                setErrors(prev => prev + 1);
            }

            setCurrentIndex(currentIndex + 1);
            setUserInput(userInput + e.key);

            // Check if finished
            if (currentIndex + 1 >= text.length) {
                setIsFinished(true);
                setShowResults(true);
            }
        }
    }, [currentIndex, text, userInput, charStatus, isStarted, isFinished]);

    const resetTest = () => {
        setUserInput('');
        setCurrentIndex(0);
        setErrors(0);
        setCorrectChars(0);
        setIsStarted(false);
        setIsFinished(false);
        setTimeLeft(timeLimits[mode]);
        setWpm(0);
        setCharStatus(Array(text.length).fill('pending'));
        setShowResults(false);
        startTimeRef.current = 0;
        inputRef.current?.focus();
    };

    const accuracy = currentIndex > 0 ? Math.round((correctChars / currentIndex) * 100) : 100;
    const progress = Math.round((currentIndex / text.length) * 100);
    const timeProgress = Math.round((timeLeft / timeLimits[mode]) * 100);

    // Generate downloadable report
    const downloadReport = () => {
        const reportContent = `
╔══════════════════════════════════════════════════════════════╗
║                    TYPING TEST REPORT                        ║
║                      Partha.dev                              ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}                             
║  Mode: ${mode.padEnd(50)}║
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║                     PERFORMANCE METRICS                      ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  ⚡ Words Per Minute (WPM):  ${String(wpm).padStart(3)}                           ║
║  🎯 Accuracy:                ${String(accuracy).padStart(3)}%                          ║
║  ✅ Correct Characters:      ${String(correctChars).padStart(3)}                           ║
║  ❌ Errors:                  ${String(errors).padStart(3)}                           ║
║  📝 Total Characters:        ${String(text.length).padStart(3)}                           ║
║  ⏱️  Time Taken:              ${String(timeLimits[mode] - timeLeft).padStart(2)}s                           ║
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║                     PERFORMANCE RATING                       ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  ${getPerformanceRating(wpm, accuracy).padEnd(58)}║
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║                        BENCHMARKS                            ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  Average Typist:    40 WPM                                   ║
║  Good Typist:       60 WPM                                   ║
║  Fast Typist:       80 WPM                                   ║
║  Professional:     100+ WPM                                  ║
║  Elite:           120+ WPM                                   ║
║                                                              ║
║  Your Speed: ${wpm} WPM - ${getSpeedCategory(wpm).padEnd(38)}║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

Generated by Partha.dev Typing Test
https://partha.dev/typing-test
`;

        const blob = new Blob([reportContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `typing-test-report-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const getPerformanceRating = (wpm: number, accuracy: number): string => {
        if (wpm >= 120 && accuracy >= 98) return "🏆 LEGENDARY - You're in the top 1%!";
        if (wpm >= 100 && accuracy >= 95) return "⭐ EXCELLENT - Professional level typing!";
        if (wpm >= 80 && accuracy >= 90) return "🔥 GREAT - Above average performance!";
        if (wpm >= 60 && accuracy >= 85) return "👍 GOOD - Solid typing skills!";
        if (wpm >= 40) return "📈 AVERAGE - Keep practicing!";
        return "🌱 BEGINNER - Room for improvement!";
    };

    const getSpeedCategory = (wpm: number): string => {
        if (wpm >= 120) return "Elite Typist";
        if (wpm >= 100) return "Professional";
        if (wpm >= 80) return "Fast Typist";
        if (wpm >= 60) return "Good Typist";
        if (wpm >= 40) return "Average Typist";
        return "Beginner";
    };

    return (
        <PageLayout className="bg-[#0f1115]">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[length:40px_40px] opacity-[0.07] pointer-events-none" />
            <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(43,108,238,0.15)_0%,rgba(15,17,21,0)_70%)] pointer-events-none" />

            {/* Header */}
            <header className="relative z-50 flex items-center justify-between border-b border-[#282e39] bg-[#161b22]/90 backdrop-blur-md px-6 py-4 lg:px-12">
                <div className="flex items-center gap-4 text-white">
                    <div className="size-8 flex items-center justify-center text-[#2b6cee]">
                        <Icon name="terminal" className="!text-3xl" />
                    </div>
                    <h2 className="text-xl font-bold tracking-tight">Partha.dev</h2>
                </div>
                <nav className="hidden md:flex items-center gap-8">
                    {[
                        { label: 'Home', href: '/' },
                        { label: 'Projects', href: '/projects' },
                        { label: 'Typing Test', href: '/typing-test', isActive: true },
                        { label: 'About', href: '/about' },
                    ].map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium transition-colors ${link.isActive
                                ? "text-white relative after:content-[''] after:absolute after:-bottom-5 after:left-0 after:w-full after:h-0.5 after:bg-[#2b6cee]"
                                : 'text-[#9da6b9] hover:text-white'
                                }`}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#282e39]/50 border border-white/5">
                        <Icon name="circle" className="text-[#0bda5e] !text-sm" />
                        <span className="text-xs font-mono text-[#9da6b9]">SYSTEM ONLINE</span>
                    </div>
                    <Button variant="neon" size="sm">Hire Me</Button>
                </div>
            </header>

            {/* Results Modal - Improved */}
            {showResults && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
                    <div className="bg-gradient-to-b from-[#1a1f26] to-[#12161c] border border-white/10 rounded-3xl p-6 md:p-10 max-w-2xl w-full mx-4 shadow-[0_0_100px_rgba(43,108,238,0.2)] animate-scale-in relative overflow-hidden">

                        {/* Confetti Background Effect */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {[...Array(20)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-2 h-2 rounded-full animate-confetti"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        top: `-10%`,
                                        backgroundColor: ['#2b6cee', '#8b5cf6', '#0bda5e', '#ffd700', '#ff6b6b'][i % 5],
                                        animationDelay: `${Math.random() * 2}s`,
                                        animationDuration: `${2 + Math.random() * 2}s`,
                                    }}
                                />
                            ))}
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={resetTest}
                            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                        >
                            <Icon name="close" size="md" className="text-gray-400" />
                        </button>

                        {/* Trophy & Title */}
                        <div className="text-center mb-8 relative z-10">
                            <div className="relative inline-block">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#2b6cee] via-[#8b5cf6] to-[#ec4899] p-1 mx-auto mb-4 animate-pulse-slow">
                                    <div className="w-full h-full rounded-full bg-[#1a1f26] flex items-center justify-center">
                                        <Icon name="emoji_events" className="!text-5xl text-[#ffd700]" />
                                    </div>
                                </div>
                                {/* Glow Effect */}
                                <div className="absolute inset-0 blur-2xl bg-gradient-to-br from-[#2b6cee]/30 to-[#8b5cf6]/30 rounded-full -z-10" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-2">
                                Test Complete!
                            </h2>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#2b6cee]/20 to-[#8b5cf6]/20 border border-[#2b6cee]/30">
                                <span className="text-sm font-medium text-white">{getPerformanceRating(wpm, accuracy)}</span>
                            </div>
                        </div>

                        {/* Main Stats - Circular Progress */}
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="flex flex-col items-center">
                                <div className="relative w-32 h-32 mb-3">
                                    {/* Background Circle */}
                                    <svg className="w-full h-full -rotate-90">
                                        <circle cx="64" cy="64" r="56" fill="none" stroke="#282e39" strokeWidth="8" />
                                        <circle
                                            cx="64" cy="64" r="56" fill="none"
                                            stroke="url(#wpmGradient)" strokeWidth="8"
                                            strokeLinecap="round"
                                            strokeDasharray={`${Math.min(wpm / 150 * 352, 352)} 352`}
                                            className="transition-all duration-1000"
                                        />
                                        <defs>
                                            <linearGradient id="wpmGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#2b6cee" />
                                                <stop offset="100%" stopColor="#8b5cf6" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-4xl font-black text-white">{wpm}</span>
                                        <span className="text-xs text-[#9da6b9] uppercase tracking-wider">WPM</span>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-400">Words Per Minute</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="relative w-32 h-32 mb-3">
                                    <svg className="w-full h-full -rotate-90">
                                        <circle cx="64" cy="64" r="56" fill="none" stroke="#282e39" strokeWidth="8" />
                                        <circle
                                            cx="64" cy="64" r="56" fill="none"
                                            stroke={accuracy >= 90 ? "#0bda5e" : accuracy >= 70 ? "#ffd700" : "#ff6b6b"}
                                            strokeWidth="8" strokeLinecap="round"
                                            strokeDasharray={`${accuracy / 100 * 352} 352`}
                                            className="transition-all duration-1000"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-4xl font-black text-white">{accuracy}%</span>
                                        <span className="text-xs text-[#9da6b9] uppercase tracking-wider">ACC</span>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-400">Accuracy</span>
                            </div>
                        </div>

                        {/* Detailed Stats Grid */}
                        <div className="grid grid-cols-4 gap-3 mb-8">
                            <div className="bg-[#282e39]/30 rounded-xl p-3 text-center border border-white/5">
                                <Icon name="keyboard" className="text-[#2b6cee] !text-xl mx-auto mb-1" />
                                <div className="text-xl font-bold text-white">{correctChars}</div>
                                <div className="text-[10px] text-[#9da6b9] uppercase">Correct</div>
                            </div>
                            <div className="bg-[#282e39]/30 rounded-xl p-3 text-center border border-white/5">
                                <Icon name="close" className="text-red-500 !text-xl mx-auto mb-1" />
                                <div className="text-xl font-bold text-white">{errors}</div>
                                <div className="text-[10px] text-[#9da6b9] uppercase">Errors</div>
                            </div>
                            <div className="bg-[#282e39]/30 rounded-xl p-3 text-center border border-white/5">
                                <Icon name="timer" className="text-[#ffd700] !text-xl mx-auto mb-1" />
                                <div className="text-xl font-bold text-white">{timeLimits[mode] - timeLeft}s</div>
                                <div className="text-[10px] text-[#9da6b9] uppercase">Time</div>
                            </div>
                            <div className="bg-[#282e39]/30 rounded-xl p-3 text-center border border-white/5">
                                <Icon name="text_fields" className="text-[#0bda5e] !text-xl mx-auto mb-1" />
                                <div className="text-xl font-bold text-white">{text.length}</div>
                                <div className="text-[10px] text-[#9da6b9] uppercase">Total</div>
                            </div>
                        </div>

                        {/* Performance Comparison Bar */}
                        <div className="mb-8 bg-[#282e39]/20 rounded-xl p-4 border border-white/5">
                            <div className="flex items-center justify-between text-xs text-[#9da6b9] mb-2">
                                <span>Performance vs Average (40 WPM)</span>
                                <span className={wpm >= 40 ? "text-[#0bda5e]" : "text-[#ff6b6b]"}>
                                    {wpm >= 40 ? `+${Math.round((wpm / 40 - 1) * 100)}%` : `-${Math.round((1 - wpm / 40) * 100)}%`}
                                </span>
                            </div>
                            <div className="h-3 bg-[#282e39] rounded-full overflow-hidden relative">
                                <div
                                    className="h-full bg-gradient-to-r from-[#2b6cee] to-[#8b5cf6] rounded-full transition-all duration-1000"
                                    style={{ width: `${Math.min(wpm / 150 * 100, 100)}%` }}
                                />
                                {/* Average Marker */}
                                <div className="absolute top-0 bottom-0 w-0.5 bg-white/50" style={{ left: `${40 / 150 * 100}%` }} />
                            </div>
                            <div className="flex justify-between text-[10px] text-[#9da6b9] mt-1">
                                <span>0</span>
                                <span>40 (Avg)</span>
                                <span>100</span>
                                <span>150+</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={downloadReport}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#2b6cee] to-[#8b5cf6] text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-[#2b6cee]/20 hover:scale-[1.02]"
                            >
                                <Icon name="download" size="md" />
                                Download Report
                            </button>
                            <button
                                onClick={() => {
                                    if (navigator.share) {
                                        navigator.share({
                                            title: 'My Typing Test Result',
                                            text: `I just scored ${wpm} WPM with ${accuracy}% accuracy on Partha.dev typing test!`,
                                            url: window.location.href,
                                        });
                                    }
                                }}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#282e39] text-white font-bold rounded-xl hover:bg-[#282e39]/80 transition-all border border-white/10 hover:scale-[1.02]"
                            >
                                <Icon name="share" size="md" />
                                Share Result
                            </button>
                        </div>

                        {/* Try Again Link */}
                        <button
                            onClick={resetTest}
                            className="w-full mt-4 py-3 text-[#9da6b9] hover:text-white transition-colors text-sm font-medium flex items-center justify-center gap-2"
                        >
                            <Icon name="refresh" size="sm" />
                            Try Again
                        </button>
                    </div>

                    {/* CSS for confetti animation */}
                    <style>{`
                        @keyframes confetti {
                            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
                        }
                        .animate-confetti {
                            animation: confetti 3s ease-out forwards;
                        }
                        @keyframes pulse-slow {
                            0%, 100% { opacity: 1; }
                            50% { opacity: 0.8; }
                        }
                        .animate-pulse-slow {
                            animation: pulse-slow 2s ease-in-out infinite;
                        }
                    `}</style>
                </div>
            )}

            {/* Main Layout */}
            <main className="relative z-10 flex-1 flex flex-col lg:flex-row max-w-[1600px] mx-auto w-full p-4 lg:p-8 gap-6">
                {/* Left Column: Typing Arena & Stats */}
                <section className="flex-1 flex flex-col gap-6 min-w-0">
                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 text-[#2b6cee] mb-1">
                                <Icon name="code" size="sm" />
                                <span className="text-xs font-mono uppercase tracking-widest">Module: Proficiency_Check_v2.4</span>
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                                Neural Input Diagnosis
                            </h1>
                            <p className="text-[#9da6b9] mt-1 max-w-xl">
                                Calibrate your input latency. Start typing to begin the test.
                            </p>
                        </div>

                        {/* Mode Switcher */}
                        <div className="flex p-1 bg-[#282e39]/50 rounded-xl backdrop-blur-sm self-start sm:self-center border border-white/5">
                            {['15s', '30s', 'Words', 'Code'].map((m) => (
                                <label key={m} className="cursor-pointer">
                                    <input
                                        type="radio"
                                        name="mode"
                                        checked={mode === m}
                                        onChange={() => handleModeChange(m)}
                                        className="peer sr-only"
                                    />
                                    <span className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[#9da6b9] peer-checked:bg-[#161b22] peer-checked:text-white peer-checked:shadow-sm transition-all hover:text-white">
                                        <Icon
                                            name={m === 'Words' ? 'text_fields' : m === 'Code' ? 'code' : 'timer'}
                                            size="md"
                                        />
                                        {m}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Stats Dashboard */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatCard icon="speed" label="Current WPM" value={String(wpm).padStart(3, '0')} trend={isStarted ? `+${Math.round(wpm / 10)}%` : ''} progressValue={Math.min(wpm, 150) / 150 * 100} progressColor="bg-[#2b6cee]" />
                        <StatCard icon="check_circle" label="Accuracy" value={String(accuracy)} suffix="%" progressValue={accuracy} progressColor="bg-[#0bda5e]" />
                        <StatCard icon="hourglass_top" label="Time Remaining" value={String(timeLeft)} suffix="s" progressValue={timeProgress} progressColor="bg-white/50" />
                        <StatCard icon="warning" label="Input Errors" value={String(errors)} progressValue={Math.min(errors * 10, 100)} progressColor="bg-red-500" />
                    </div>

                    {/* The Arena */}
                    <div
                        className="bg-[rgba(22,27,34,0.7)] backdrop-blur-xl border border-white/5 flex-1 min-h-[400px] rounded-2xl p-8 lg:p-12 relative flex flex-col items-center justify-center border-t-2 border-t-[#2b6cee]/20 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] cursor-text"
                        onClick={() => inputRef.current?.focus()}
                    >
                        {/* Hidden input for capturing keystrokes */}
                        <input
                            ref={inputRef}
                            type="text"
                            className="absolute opacity-0 w-0 h-0"
                            onKeyDown={handleKeyDown}
                            autoFocus
                        />

                        {/* Background glow */}
                        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-[100px] rounded-full transition-colors duration-500 ${isStarted ? 'bg-[#2b6cee]/10' : 'bg-[#2b6cee]/5'}`} />
                        </div>

                        {/* Status Badges */}
                        <div className="absolute top-4 left-4 flex gap-2">
                            <span className={`px-2 py-1 rounded border text-[10px] font-mono tracking-widest uppercase backdrop-blur-md transition-all ${isStarted && !isFinished
                                ? 'bg-[#0bda5e]/10 border-[#0bda5e]/30 text-[#0bda5e]'
                                : isFinished
                                    ? 'bg-[#ffd700]/10 border-[#ffd700]/30 text-[#ffd700]'
                                    : 'bg-black/40 border-white/5 text-[#9da6b9]'
                                }`}>
                                {!isStarted ? 'Ready to Start' : isFinished ? 'Test Complete' : 'Focus Mode: Active'}
                            </span>
                        </div>

                        {/* Progress indicator */}
                        <div className="absolute top-4 right-4 text-right">
                            <span className="text-xs font-mono text-[#9da6b9]">{currentIndex}/{text.length}</span>
                            <div className="w-24 h-1 bg-[#282e39] rounded-full mt-1 overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-[#2b6cee] to-[#8b5cf6] transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        {/* Typing Text Display */}
                        <div className="relative z-10 w-full max-w-4xl text-2xl lg:text-3xl leading-relaxed font-mono break-words text-center selection:bg-transparent">
                            {text.split('').map((char, index) => {
                                let className = 'text-white/20'; // pending
                                if (charStatus[index] === 'correct') {
                                    className = 'text-white';
                                } else if (charStatus[index] === 'incorrect') {
                                    className = 'bg-red-500/20 text-red-400 underline decoration-red-500 underline-offset-4';
                                }

                                // Current character (cursor)
                                if (index === currentIndex) {
                                    return (
                                        <span key={index} className="relative">
                                            <span className="absolute -left-[2px] top-0 w-[3px] h-full bg-[#2b6cee] animate-pulse rounded-full shadow-[0_0_10px_rgba(43,108,238,0.8)]" />
                                            <span className={className}>{char}</span>
                                        </span>
                                    );
                                }

                                return <span key={index} className={className}>{char}</span>;
                            })}
                        </div>

                        {/* Instructions */}
                        {!isStarted && (
                            <div className="mt-8 text-center animate-pulse">
                                <p className="text-[#9da6b9] text-sm">Click here or start typing to begin...</p>
                            </div>
                        )}

                        {/* Restart Button */}
                        <div className="mt-12 flex items-center gap-4">
                            <Button variant="ghost" icon="refresh" className="bg-[#282e39] hover:bg-[#282e39]/80" onClick={resetTest}>
                                Restart Test
                            </Button>
                            <span className="text-xs text-[#9da6b9] font-mono bg-black/30 px-2 py-1 rounded border border-white/5">
                                Press TAB to restart
                            </span>
                        </div>
                    </div>

                    {/* Keyboard Visualizer */}
                    <div className="hidden lg:flex justify-center mt-2 opacity-50 pointer-events-none select-none">
                        <div className="flex gap-1">
                            {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key) => {
                                const currentChar = text[currentIndex]?.toUpperCase();
                                const isActive = key === currentChar;
                                return (
                                    <div
                                        key={key}
                                        className={`w-10 h-10 border rounded flex items-center justify-center text-xs font-mono transition-all duration-150 ${isActive
                                            ? 'border-[#2b6cee]/40 bg-[#2b6cee]/10 text-[#2b6cee] shadow-[0_0_10px_rgba(43,108,238,0.2)] scale-110'
                                            : 'border-white/10 text-white/20'
                                            }`}
                                    >
                                        {key}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Right Column: Sidebar */}
                <aside className="w-full lg:w-[380px] flex flex-col gap-6 shrink-0">
                    {/* User Profile Card */}
                    <div className="bg-[rgba(22,27,34,0.7)] backdrop-blur-xl border border-white/5 p-6 rounded-xl flex items-center gap-4 relative overflow-hidden">
                        <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-[#2b6cee] to-transparent opacity-50" />
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-[#282e39] p-1">
                                <img
                                    alt="User Avatar"
                                    className="w-full h-full rounded-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXbRbB2RYxtT7SPBVFZZHoKhje0RDUO06s6y8efWqyjS5MMMGKdE-j8Y_o45gVtHXkctCH1AWHlQ8JpxNwesJUz2b2zfeT9c-eL_CXEOUwt3O96mETSKFs1h0MP_tFvPYvv-s_GeIrwqviJf-TSRGrVNOSYeIK6v-5EBsd4pBx1LFcWHjVVzQxewv9wEypCb6aRVW7LtGhNRZUTk0fFxy8a2RK_1UXC8GfQD0SdNK-Jem7_FbpYpIx_wfs9xnNQ02u1q-qoVFm3nWB"
                                />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#161b22] rounded-full flex items-center justify-center border border-white/10 text-[10px] font-bold text-[#ffd700] shadow-lg">
                                #4
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white font-bold text-lg leading-tight">Partha Saradhi</h3>
                            <p className="text-[#9da6b9] text-xs mb-2">Backend Engineer • Pro</p>
                            <div className="flex items-center gap-3">
                                <div className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] font-mono text-white">LVL 42</div>
                                <div className="px-2 py-0.5 rounded bg-[#ffd700]/10 border border-[#ffd700]/20 text-[10px] font-mono text-[#ffd700]">ELITE</div>
                            </div>
                        </div>
                    </div>

                    {/* Leaderboard */}
                    <div className="bg-[rgba(22,27,34,0.7)] backdrop-blur-xl border border-white/5 rounded-xl flex flex-col flex-1 max-h-[600px] overflow-hidden">
                        <div className="p-5 border-b border-white/5 flex items-center justify-between">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <Icon name="trophy" className="text-[#ffd700]" />
                                Global Ranking
                            </h3>
                            <button className="text-xs text-[#2b6cee] hover:text-white transition-colors font-medium">View All</button>
                        </div>
                        <div className="flex-1 overflow-y-auto pr-1">
                            <div className="flex flex-col">
                                {leaderboardData.map((player) => (
                                    <LeaderboardRow key={player.rank} {...player} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Achievements */}
                    <div className="bg-[rgba(22,27,34,0.7)] backdrop-blur-xl border border-white/5 p-5 rounded-xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-white text-sm">Recent Achievements</h3>
                            <span className="text-xs text-[#9da6b9]">3/12 Unlocked</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {achievements.map((achievement, index) => (
                                <AchievementBadge key={index} {...achievement} />
                            ))}
                        </div>
                        <button className="w-full mt-4 py-2 rounded-lg border border-white/10 text-xs font-medium text-[#9da6b9] hover:bg-white/5 hover:text-white transition-colors">
                            View Certificate Gallery
                        </button>
                    </div>
                </aside>
            </main>

            <style>{`
                @keyframes scale-in {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-scale-in {
                    animation: scale-in 0.3s ease-out forwards;
                }
            `}</style>
        </PageLayout>
    );
}

// Stat Card Component
function StatCard({
    icon,
    label,
    value,
    suffix = '',
    trend = '',
    progressValue = 0,
    progressColor = 'bg-[#2b6cee]'
}: {
    icon: string;
    label: string;
    value: string;
    suffix?: string;
    trend?: string;
    progressValue?: number;
    progressColor?: string;
}) {
    return (
        <div className="bg-[rgba(22,27,34,0.7)] backdrop-blur-xl border border-white/5 p-5 rounded-xl flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                <Icon name={icon} className="!text-4xl" />
            </div>
            <p className="text-[#9da6b9] text-xs font-mono uppercase tracking-wider mb-1">{label}</p>
            <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">{value}</span>
                {suffix && <span className="text-lg text-[#9da6b9]">{suffix}</span>}
                {trend && (
                    <span className="text-xs text-[#0bda5e] font-medium flex items-center">
                        <Icon name="arrow_upward" size="sm" />{trend}
                    </span>
                )}
            </div>
            <div className="h-1 w-full bg-[#282e39] mt-4 rounded-full overflow-hidden">
                <div
                    className={`h-full ${progressColor} transition-all duration-300`}
                    style={{ width: `${progressValue}%` }}
                />
            </div>
        </div>
    );
}

// Leaderboard Row Component
function LeaderboardRow({
    rank,
    name,
    country,
    accuracy,
    wpm,
    color,
    isUser = false
}: {
    rank: number;
    name: string;
    country: string;
    accuracy: string;
    wpm: number;
    color: string;
    isUser?: boolean;
}) {
    const getColorClasses = () => {
        switch (color) {
            case 'gold': return { border: 'border-[#ffd700]', bg: 'bg-[#ffd700]/5', text: 'text-[#ffd700]' };
            case 'silver': return { border: 'border-[#c0c0c0]', bg: 'bg-[#c0c0c0]/5', text: 'text-[#c0c0c0]' };
            case 'bronze': return { border: 'border-[#cd7f32]', bg: 'bg-[#cd7f32]/5', text: 'text-[#cd7f32]' };
            case 'primary': return { border: 'border-[#2b6cee]', bg: 'bg-[#2b6cee]/10', text: 'text-[#2b6cee]' };
            default: return { border: 'border-transparent', bg: '', text: 'text-[#9da6b9]' };
        }
    };
    const colors = getColorClasses();

    return (
        <div className={`group flex items-center gap-3 p-4 hover:bg-white/5 transition-colors cursor-pointer border-l-2 ${colors.border} ${colors.bg}`}>
            <div className={`font-bold w-6 text-center ${colors.text}`}>{rank}</div>
            <div className={`w-8 h-8 rounded-full bg-[#282e39] overflow-hidden ${isUser ? 'ring-2 ring-[#2b6cee] ring-offset-1 ring-offset-[#161b22]' : ''}`}>
                <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <p className="text-white text-sm font-bold truncate">{name}</p>
                    {isUser && (
                        <span className="px-1 py-0.5 rounded bg-[#2b6cee] text-[8px] font-bold text-white uppercase">YOU</span>
                    )}
                    {!isUser && <span className="text-[10px] text-white/40 font-mono">{country}</span>}
                </div>
                <p className="text-xs text-[#9da6b9]">{accuracy} Accuracy</p>
            </div>
            <div className="text-right">
                <p className="text-white font-mono font-bold">{wpm}</p>
                <p className="text-[10px] text-[#9da6b9] uppercase">WPM</p>
            </div>
        </div>
    );
}

// Achievement Badge Component
function AchievementBadge({
    icon,
    label,
    color,
    unlocked
}: {
    icon: string;
    label: string;
    color: string;
    unlocked: boolean;
}) {
    const getColorClasses = () => {
        if (!unlocked) return { bg: 'bg-[#282e39]/30', border: 'border-white/5', text: 'text-white' };
        switch (color) {
            case 'primary': return { bg: 'bg-[#2b6cee]/20', border: 'border-[#2b6cee]/50', text: 'text-[#2b6cee]' };
            case 'gold': return { bg: 'bg-[#ffd700]/20', border: 'border-[#ffd700]/50', text: 'text-[#ffd700]' };
            case 'green': return { bg: 'bg-[#0bda5e]/20', border: 'border-[#0bda5e]/50', text: 'text-[#0bda5e]' };
            default: return { bg: 'bg-[#282e39]/30', border: 'border-white/5', text: 'text-[#9da6b9]' };
        }
    };
    const colors = getColorClasses();

    return (
        <div className={`aspect-square rounded-lg ${colors.bg} border ${colors.border} flex flex-col items-center justify-center p-1 ${!unlocked ? 'grayscale opacity-50' : ''} cursor-help`}>
            <Icon name={icon} className={`!text-2xl mb-1 ${colors.text}`} />
            <span className={`text-[8px] font-bold uppercase text-center leading-tight ${colors.text}`}>{label}</span>
        </div>
    );
}
