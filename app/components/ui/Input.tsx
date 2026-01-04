import { Icon } from './Icon';

interface SearchInputProps {
    placeholder?: string;
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
}

export function SearchInput({
    placeholder = 'Search...',
    className = '',
    value,
    onChange
}: SearchInputProps) {
    return (
        <div className={`relative group ${className}`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon
                    name="search"
                    className="text-slate-500 group-focus-within:text-[#2b6cee] transition-colors"
                />
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 bg-[#181e29] border border-[#3b4354] rounded-lg leading-5 text-white placeholder-slate-500 focus:outline-none focus:bg-[#181e29] focus:border-[#2b6cee] focus:ring-1 focus:ring-[#2b6cee] sm:text-sm transition-all"
                placeholder={placeholder}
            />
        </div>
    );
}

// Text input with label
interface TextInputProps {
    label?: string;
    placeholder?: string;
    type?: 'text' | 'email' | 'password';
    icon?: string;
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
}

export function TextInput({
    label,
    placeholder,
    type = 'text',
    icon,
    className = '',
    value,
    onChange
}: TextInputProps) {
    return (
        <div className={`input-group flex flex-col gap-2 group ${className}`}>
            {label && (
                <label className="text-xs font-bold tracking-widest text-slate-400 transition-colors uppercase pl-1 group-focus-within:text-[#2b6cee]">
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon name={icon} className="text-[#282e39] group-focus-within:text-[#2b6cee] transition-colors !text-lg" />
                    </div>
                )}
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    className={`w-full bg-[#151c2f]/80 border border-[#282e39] text-white text-sm rounded-lg focus:ring-1 focus:ring-[#2b6cee] focus:border-[#2b6cee] block p-3.5 placeholder-gray-600 transition-all shadow-[0_0_0_1px_rgba(0,0,0,0)] focus:shadow-[0_0_15px_rgba(43,108,238,0.15)] outline-none backdrop-blur-sm ${icon ? 'pl-10' : ''}`}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
}

// Textarea input
interface TextAreaProps {
    label?: string;
    placeholder?: string;
    className?: string;
    rows?: number;
    value?: string;
    onChange?: (value: string) => void;
}

export function TextArea({
    label,
    placeholder,
    className = '',
    rows = 4,
    value,
    onChange
}: TextAreaProps) {
    return (
        <div className={`input-group flex flex-col gap-2 flex-1 group ${className}`}>
            {label && (
                <label className="text-xs font-bold tracking-widest text-slate-400 transition-colors uppercase pl-1 group-focus-within:text-[#2b6cee]">
                    {label}
                </label>
            )}
            <div className="relative flex-1">
                <textarea
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    rows={rows}
                    className="w-full h-full min-h-[160px] bg-[#151c2f]/80 border border-[#282e39] text-white text-sm rounded-lg focus:ring-1 focus:ring-[#2b6cee] focus:border-[#2b6cee] block p-4 placeholder-gray-600 transition-all resize-none shadow-[0_0_0_1px_rgba(0,0,0,0)] focus:shadow-[0_0_15px_rgba(43,108,238,0.15)] outline-none font-mono backdrop-blur-sm"
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
}
