import { personal } from "~/data";

export default function PersonalSection() {
    const { currentRead, currentWatch, nowPlaying, hardware, location } = personal;

    return (
        <main className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-6 px-4 lg:px-8 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 px-2">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-[#2b6cee] animate-pulse" />
                        <h2 className="text-[#2b6cee] text-xs font-bold tracking-[0.2em] uppercase">System Vibe Check</h2>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight text-white/90">PERSONAL RUNTIME</h1>
                </div>

                {/* Weather Widget */}
                <div className="group flex items-center gap-4 bg-[#1c1f27]/80 backdrop-blur-md px-5 py-2.5 rounded-lg border border-white/5 hover:border-[#2b6cee]/30 transition-colors cursor-default shadow-lg shadow-black/20">
                    <div className="flex flex-col items-end">
                        <div className="flex items-center gap-2 text-[11px] text-gray-400 uppercase tracking-wider font-mono">
                            <span className="material-symbols-outlined text-[14px]">my_location</span>
                            <span>{location.city}, {location.country}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <span className="text-white group-hover:text-[#2b6cee] transition-colors">{location.weather.temp}</span>
                            <span className="text-gray-600">//</span>
                            <span className="text-gray-300">{location.weather.condition}</span>
                        </div>
                    </div>
                    <div className="h-9 w-9 rounded-md bg-gradient-to-br from-[#2b6cee]/20 to-transparent border border-white/5 flex items-center justify-center text-[#2b6cee]">
                        <span className="material-symbols-outlined">partly_cloudy_day</span>
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-auto lg:h-[620px]">
                {/* Current Read Card */}
                <div className="lg:col-span-5 glass-panel rounded-2xl p-6 md:p-8 flex flex-col relative overflow-hidden group hover:border-[#2b6cee]/20 transition-all duration-300 border border-white/5">
                    <div className="flex justify-between items-center mb-6 z-10">
                        <div className="flex items-center gap-2.5">
                            <div className="p-1.5 rounded bg-[#2b6cee]/10 text-[#2b6cee]">
                                <span className="material-symbols-outlined text-lg">menu_book</span>
                            </div>
                            <span className="text-xs font-bold tracking-[0.1em] text-gray-400 uppercase">Current_Read_Protocol</span>
                        </div>
                        <span className="text-[10px] text-[#2b6cee] font-mono border border-[#2b6cee]/20 bg-[#2b6cee]/5 px-2 py-1 rounded">STATUS: ACTIVE</span>
                    </div>

                    <div className="flex-1 flex flex-col justify-end z-10 mt-4">
                        <div className="flex gap-6 items-end">
                            <div className="w-32 md:w-36 aspect-[2/3] shrink-0 rounded shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden relative transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-10px_rgba(43,108,238,0.2)]">
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url('${currentRead.imageUrl}')` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10" />
                            </div>
                            <div className="flex flex-col gap-1 pb-1">
                                <h3 className="text-2xl md:text-3xl font-bold leading-none tracking-tight text-white mb-1">{currentRead.title}</h3>
                                <p className="text-gray-400 text-sm font-medium">{currentRead.author}</p>
                                <div className="h-px w-12 bg-white/10 my-2" />
                                <p className="text-[10px] text-[#2b6cee]/80 font-mono tracking-wider">SECTOR: {currentRead.sector}</p>
                                <p className="text-[10px] text-gray-500 font-mono tracking-wider">EPISODE: {String(currentRead.episode).padStart(2, '0')}</p>
                            </div>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-8 flex flex-col gap-2.5">
                            <div className="flex justify-between text-[11px] font-mono text-gray-400 uppercase tracking-wider">
                                <span>Memory Upload</span>
                                <span className="text-white">{currentRead.progress}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-[#111318] rounded-full overflow-hidden border border-white/5">
                                <div className="h-full bg-[#2b6cee] shadow-[0_0_12px_rgba(43,108,238,0.8)] rounded-full relative" style={{ width: `${currentRead.progress}%` }}>
                                    <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/40 blur-[1px]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <a href="/books" className="mt-6 w-full py-3 rounded-lg border border-white/10 bg-[#15171e]/50 hover:bg-[#2b6cee]/10 hover:border-[#2b6cee]/30 transition-all flex items-center justify-center gap-2 text-sm font-medium text-gray-300 hover:text-white z-10 group/btn">
                        <span>View Library Logs</span>
                        <span className="material-symbols-outlined text-[16px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                    </a>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-7 flex flex-col gap-5">
                    {/* Anime Card */}
                    <a href="/animes" className="flex-1 glass-panel rounded-2xl p-6 relative overflow-hidden group cursor-pointer border border-white/5 hover:border-[#2b6cee]/40 transition-all duration-300">
                        <div className="absolute inset-0 z-0">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 grayscale-[30%] group-hover:grayscale-0"
                                style={{ backgroundImage: `url('${currentWatch.imageUrl}')` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#111318] via-[#111318]/90 to-transparent" />
                        </div>

                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1 rounded bg-[#2b6cee]/20 text-[#2b6cee]">
                                            <span className="material-symbols-outlined text-[18px]">smart_display</span>
                                        </div>
                                        <span className="text-[10px] font-bold tracking-[0.15em] text-gray-300 uppercase">Visual_Feed</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">{currentWatch.title.split(':')[0]}:<br />{currentWatch.title.split(':')[1]}</h3>
                                    </div>
                                </div>
                                <button className="h-10 w-10 rounded-full bg-white/10 hover:bg-[#2b6cee] border border-white/10 hover:border-[#2b6cee]/50 flex items-center justify-center transition-all shadow-lg backdrop-blur-sm group-hover:scale-110">
                                    <span className="material-symbols-outlined text-white">play_arrow</span>
                                </button>
                            </div>

                            <div className="flex items-end justify-between mt-4">
                                <div className="flex flex-col gap-1">
                                    <p className="text-xs text-gray-400 font-mono flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        STATUS: {currentWatch.status}
                                    </p>
                                    <p className="text-xs text-gray-500 font-mono pl-3.5">EPISODE: {String(currentWatch.episode).padStart(2, '0')}</p>
                                </div>
                                <span className="text-xs text-[#2b6cee]/80 font-medium group-hover:text-[#2b6cee] transition-colors flex items-center gap-1 bg-[#111318]/80 px-3 py-1.5 rounded-full border border-[#2b6cee]/20">
                                    Open Visual Log <span className="material-symbols-outlined text-[14px]">north_east</span>
                                </span>
                            </div>
                        </div>
                    </a>

                    {/* Spotify Card */}
                    <div className="flex-1 glass-panel rounded-2xl p-6 relative overflow-hidden group border border-white/5 hover:border-[#1DB954]/50 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#111318] via-[#13151b] to-[#1c1f27]/80 z-0" />
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#1DB954]/10 blur-[90px] rounded-full group-hover:bg-[#1DB954]/20 transition-all duration-700" />

                        <div className="relative z-10 flex items-center gap-6 h-full">
                            {/* Album Art */}
                            <div className="relative shrink-0 group-hover:scale-105 transition-transform duration-500 ease-out">
                                <div className="w-24 h-24 rounded-lg bg-black border border-white/10 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.6)] relative overflow-hidden flex items-center justify-center">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${nowPlaying.albumGradient}`} />
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.2),transparent_60%)]" />
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                                </div>
                                {/* Equalizer */}
                                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-end gap-[3px] h-8 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    {[0.8, 1.1, 0.9, 1.3, 1.0].map((dur, i) => (
                                        <div
                                            key={i}
                                            className="w-1 bg-[#1DB954] rounded-full opacity-80"
                                            style={{
                                                animation: `pulse ${dur}s ease-in-out infinite`,
                                                animationDelay: `${i * 0.1}s`,
                                                height: `${20 + Math.random() * 30}%`
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5">
                                <div className="flex justify-between items-center mb-0.5">
                                    <div className="flex items-center gap-2">
                                        <span className="flex h-1.5 w-1.5 relative">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1DB954] opacity-75" />
                                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#1DB954]" />
                                        </span>
                                        <span className="text-[9px] font-bold tracking-[0.25em] text-[#1DB954] uppercase">Spotify_Signal</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="hidden sm:block text-[8px] font-mono text-gray-500 border border-white/5 bg-white/5 px-1.5 py-0.5 rounded tracking-widest">{nowPlaying.codec}</span>
                                    </div>
                                </div>

                                <div className="group/text cursor-default">
                                    <h3 className="text-2xl font-bold text-white leading-none truncate tracking-tight group-hover/text:text-[#1DB954] transition-colors duration-300 drop-shadow-sm">{nowPlaying.title}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <p className="text-sm text-gray-400 font-medium truncate font-mono">{nowPlaying.artist}</p>
                                        <span className="text-gray-600 text-[10px] font-bold">FEAT</span>
                                        <p className="text-sm text-gray-400 font-medium truncate font-mono">{nowPlaying.featuring}</p>
                                    </div>
                                </div>

                                {/* Progress */}
                                <div className="w-full space-y-1.5 mt-2">
                                    <div className="relative h-1 w-full bg-[#111318] rounded-full overflow-hidden border border-white/5 group/bar cursor-pointer">
                                        <div className="absolute top-0 left-0 h-full bg-[#1DB954] shadow-[0_0_8px_rgba(29,185,84,0.5)] rounded-full" style={{ width: `${nowPlaying.progress.percent}%` }} />
                                    </div>
                                    <div className="flex justify-between text-[9px] font-mono text-gray-500 font-medium tracking-wide">
                                        <span>{nowPlaying.progress.current}</span>
                                        <span>{nowPlaying.progress.remaining}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hardware Card */}
                    <div className="flex-1 glass-panel rounded-2xl p-6 relative overflow-hidden group border border-white/5 hover:border-[#2b6cee]/40 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1c1f27] to-[#111318] z-0" />
                        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#2b6cee]/5 blur-[60px] rounded-full group-hover:bg-[#2b6cee]/10 transition-colors" />

                        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 h-full">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-[#111318] border border-white/10 flex items-center justify-center relative overflow-hidden shrink-0 group-hover:border-[#2b6cee]/50 shadow-inner transition-colors">
                                <span className="material-symbols-outlined text-4xl text-gray-400 group-hover:text-[#2b6cee] transition-colors duration-300">keyboard</span>
                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#2b6cee] to-transparent opacity-50" />
                            </div>

                            <div className="flex-1 flex flex-col justify-center gap-1 w-full">
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="material-symbols-outlined text-[#2b6cee] text-lg">memory</span>
                                        <span className="text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase">Core_Hardware</span>
                                    </div>
                                    <button className="shrink-0 h-8 px-3 rounded-lg bg-white/5 hover:bg-[#2b6cee] hover:text-white border border-white/10 flex items-center gap-2 text-xs font-medium transition-all text-gray-400">
                                        <span>Inspect Rig</span>
                                        <span className="material-symbols-outlined text-[14px]">tune</span>
                                    </button>
                                </div>
                                <h3 className="text-xl font-bold text-white">{hardware.keyboard}</h3>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <div className="text-[10px] font-mono bg-[#111318] border border-white/10 px-2 py-1 rounded text-gray-400 flex items-center gap-1">
                                        <span className="w-1 h-1 rounded-full bg-yellow-500" />
                                        SWITCH: {hardware.switches}
                                    </div>
                                    <div className="text-[10px] font-mono bg-[#111318] border border-white/10 px-2 py-1 rounded text-gray-400 flex items-center gap-1">
                                        <span className="w-1 h-1 rounded-full bg-blue-500" />
                                        MODS: {hardware.mods}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Bar */}
            <div className="flex justify-between items-center text-[10px] text-gray-600 font-mono uppercase tracking-widest px-2 opacity-60">
                <span className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-green-500 rounded-full" />
                    System Build v2.4.0
                </span>
                <div className="flex gap-6">
                    <span>Latency: 12ms</span>
                    <span>Uptime: 99.9%</span>
                </div>
            </div>
        </main>
    );
}
