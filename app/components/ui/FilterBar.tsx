interface FilterBarProps {
    filters: { label: string; value: string; isActive?: boolean }[];
    onFilterChange?: (value: string) => void;
    className?: string;
}

export function FilterBar({ filters, onFilterChange, className = '' }: FilterBarProps) {
    return (
        <div className={`flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 ${className}`}>
            {filters.map((filter) => (
                <button
                    key={filter.value}
                    onClick={() => onFilterChange?.(filter.value)}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all ${filter.isActive
                            ? 'bg-[#2b6cee] text-white shadow-[0_0_10px_rgba(43,108,238,0.5),0_0_20px_rgba(43,108,238,0.3)]'
                            : 'bg-[#282e39] text-slate-300 hover:text-white hover:bg-[#3b4354] border border-transparent hover:border-white/10'
                        }`}
                >
                    {filter.label}
                </button>
            ))}
        </div>
    );
}

// Tab-style filter bar
interface TabFilterProps {
    tabs: { label: string; value: string; icon?: string; isActive?: boolean }[];
    onTabChange?: (value: string) => void;
    className?: string;
}

export function TabFilter({ tabs, onTabChange, className = '' }: TabFilterProps) {
    return (
        <div className={`flex w-full md:w-auto overflow-x-auto gap-1 p-1 ${className}`} role="tablist">
            {tabs.map((tab) => (
                <button
                    key={tab.value}
                    onClick={() => onTabChange?.(tab.value)}
                    className={`px-5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 border ${tab.isActive
                            ? 'bg-[#1c1d27] text-white border-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.2)]'
                            : 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent'
                        }`}
                >
                    {tab.icon && (
                        <span className="material-symbols-outlined text-base">{tab.icon}</span>
                    )}
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
