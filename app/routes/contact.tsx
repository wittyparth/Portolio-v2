import type { Route } from "./+types/contact";
import { useState } from 'react';
import { Icon } from '~/components/ui';
import { useContactForm, useGuestbook, formatTimeAgo, useVisitorCount } from '~/lib/supabase';
export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Guestbook & Contact - Partha Saradhi" },
        { name: "description", content: "Get in touch or sign my guestbook." },
    ];
}

// Guestbook entries now come from Supabase hook

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
    const [showGuestbookModal, setShowGuestbookModal] = useState(false);
    const [guestbookMessage, setGuestbookMessage] = useState('');
    const [guestbookName, setGuestbookName] = useState('');

    // Supabase hooks
    const { submitting: isSubmitting, submitted: isSubmitted, error: contactError, submitContact, reset: resetContactForm } = useContactForm();
    const { entries: guestbookEntries, totalCount, addEntry, loading: guestbookLoading } = useGuestbook({ limit: 3, orderBy: 'newest' });
    const { formatted: visitorCount } = useVisitorCount();
    const [guestbookSubmitted, setGuestbookSubmitted] = useState(false);

    // Validate form
    const validateForm = () => {
        const newErrors: typeof errors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const success = await submitContact({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            inquiry_type: 'general',
        });

        if (success) {
            setFormData({ name: '', email: '', message: '' });
            // Reset after 5 seconds
            setTimeout(() => resetContactForm(), 5000);
        }
    };

    // Handle guestbook submission
    const handleGuestbookSubmit = async () => {
        if (!guestbookMessage.trim()) return;

        const entry = await addEntry({
            name: guestbookName.trim() || 'Anonymous Visitor',
            message: guestbookMessage,
            is_anonymous: !guestbookName.trim(),
        });

        if (entry) {
            setGuestbookSubmitted(true);
            setGuestbookMessage('');
            setGuestbookName('');

            setTimeout(() => {
                setShowGuestbookModal(false);
                setGuestbookSubmitted(false);
            }, 2000);
        }
    };

    return (
        <div className="bg-[#0B101B] min-h-screen">

            {/* Guestbook Modal */}
            {showGuestbookModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#151c2f] border border-[#2a3449] rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl animate-scale-in">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Icon name="edit_note" className="text-[#2b6cee]" />
                                Sign the Guestbook
                            </h3>
                            <button
                                onClick={() => setShowGuestbookModal(false)}
                                className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                            >
                                <Icon name="close" />
                            </button>
                        </div>

                        {guestbookSubmitted ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                                    <Icon name="check" className="!text-4xl text-green-500" />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-2">Thanks for signing!</h4>
                                <p className="text-gray-400">Your message has been added to the guestbook.</p>
                            </div>
                        ) : (
                            <>
                                <textarea
                                    value={guestbookMessage}
                                    onChange={(e) => setGuestbookMessage(e.target.value)}
                                    placeholder="Leave a message for future visitors..."
                                    className="w-full h-32 bg-[#0e121b] border border-[#2a3449] rounded-lg p-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#2b6cee] transition-colors resize-none"
                                />
                                <div className="flex justify-end gap-3 mt-4">
                                    <button
                                        onClick={() => setShowGuestbookModal(false)}
                                        className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleGuestbookSubmit}
                                        disabled={!guestbookMessage.trim()}
                                        className="px-6 py-2 bg-[#2b6cee] text-white font-bold rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Sign Guestbook
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full px-4 py-12 md:px-8 lg:px-16">
                <div className="w-full max-w-6xl flex flex-col gap-8">
                    {/* Header */}
                    <div className="flex items-center justify-between w-full border-b border-[#2a3449] pb-4 mb-4 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                            <Icon name="terminal" className="text-[#2b6cee] animate-pulse" />
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                TRANSMISSION &amp; LOGS
                            </h2>
                        </div>
                        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-400 bg-[#151c2f]/80 px-3 py-1 rounded-full border border-[#2a3449] backdrop-blur-sm shadow-lg">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            SYSTEM ONLINE
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full h-full">

                        {/* Guestbook Panel */}
                        <div className="lg:col-span-5 flex flex-col gap-6">
                            <div className="relative flex-1 group rounded-xl border border-[#2a3449] bg-[#151c2f]/60 backdrop-blur-xl p-6 lg:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-[#2b6cee]/50 shadow-2xl">
                                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#2b6cee]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="flex flex-col gap-4 z-10">
                                    <div className="flex items-start justify-between">
                                        <div className="p-3 bg-[#2b6cee]/10 rounded-lg border border-[#2b6cee]/20 text-[#2b6cee] shadow-[0_0_15px_rgba(43,108,238,0.1)]">
                                            <Icon name="history_edu" className="!text-[32px]" />
                                        </div>
                                        <span className="text-[10px] font-mono text-[#2b6cee] bg-[#2b6cee]/5 px-2 py-1 rounded border border-[#2b6cee]/10">LIVE FEED</span>
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold text-white mb-2">Guestbook Activity</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            See who's stopped by recently. Join the list of visitors and leave your mark on the digital log.
                                        </p>
                                    </div>
                                </div>

                                {/* Guestbook Entries */}
                                <div className="mt-8 flex flex-col gap-3 relative">
                                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#151c2f] to-transparent z-20 pointer-events-none" />

                                    {guestbookLoading ? (
                                        <div className="flex items-center justify-center py-6">
                                            <div className="w-6 h-6 border-2 border-[#2a3449] border-t-[#2b6cee] rounded-full animate-spin" />
                                        </div>
                                    ) : guestbookEntries.length > 0 ? (
                                        guestbookEntries.map((entry, index) => (
                                            <div
                                                key={entry.id}
                                                className={`flex items-center gap-4 p-3 rounded-lg bg-[#0f1420]/80 border border-[#2a3449]/50 hover:border-[#2b6cee]/30 transition-colors group/item backdrop-blur-sm ${index === guestbookEntries.length - 1 ? 'opacity-60' : ''}`}
                                            >
                                                {entry.is_anonymous ? (
                                                    <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center border border-[#2a3449] text-gray-400">
                                                        <Icon name="person" size="sm" />
                                                    </div>
                                                ) : (
                                                    <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${entry.gradient} flex items-center justify-center border border-[#2a3449] text-xs font-bold text-white group-hover/item:border-[#2b6cee]/50 transition-colors`}>
                                                        {entry.initials}
                                                    </div>
                                                )}
                                                <div className="flex flex-col flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-bold text-white truncate">{entry.name}</span>
                                                        <span className="text-[10px] font-mono text-slate-400">{formatTimeAgo(entry.created_at)}</span>
                                                    </div>
                                                    <p className="text-xs text-slate-400 truncate italic group-hover/item:text-[#2b6cee]/80 transition-colors">"{entry.message}"</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-6 text-slate-400 text-sm">
                                            Be the first to sign the guestbook!
                                        </div>
                                    )}
                                </div>

                                {/* Sign Guestbook Button */}
                                <div className="mt-8 pt-6 border-t border-[#2a3449]/50 z-20">
                                    <button
                                        onClick={() => setShowGuestbookModal(true)}
                                        className="w-full group/btn relative flex items-center justify-between px-6 py-4 bg-[#2b6cee] rounded-lg overflow-hidden transition-all hover:bg-blue-600 active:scale-[0.98] shadow-lg shadow-[#2b6cee]/20 hover:shadow-[#2b6cee]/40"
                                    >
                                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                                        <div className="flex flex-col items-start relative z-10">
                                            <span className="text-white font-bold text-lg tracking-wide">Sign the Guestbook</span>
                                            <span className="text-blue-100 text-xs font-normal">Join {totalCount > 0 ? totalCount.toLocaleString() : visitorCount} other visitors</span>
                                        </div>
                                        <Icon name="arrow_forward" className="text-white group-hover/btn:translate-x-1 transition-transform relative z-10" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form Panel */}
                        <div className="lg:col-span-7 h-full">
                            <div className="relative h-full rounded-xl border border-[#2a3449] bg-[#151c2f]/40 backdrop-blur-md p-1 shadow-2xl">
                                {/* Corner Decorations */}
                                <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[#2b6cee] rounded-tl-sm -translate-x-[1px] -translate-y-[1px] shadow-[0_0_10px_rgba(43,108,238,0.5)]" />
                                <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-[#2b6cee] rounded-tr-sm translate-x-[1px] -translate-y-[1px] shadow-[0_0_10px_rgba(43,108,238,0.5)]" />
                                <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-[#2b6cee] rounded-bl-sm -translate-x-[1px] translate-y-[1px] shadow-[0_0_10px_rgba(43,108,238,0.5)]" />
                                <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[#2b6cee] rounded-br-sm translate-x-[1px] translate-y-[1px] shadow-[0_0_10px_rgba(43,108,238,0.5)]" />

                                <form onSubmit={handleSubmit} className="h-full flex flex-col gap-6 p-6 lg:p-10 bg-[#0e121b]/80 rounded-lg shadow-inner backdrop-blur-sm">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                            <span className="w-2 h-6 bg-[#2b6cee] rounded-sm shadow-[0_0_8px_rgba(43,108,238,0.6)]" />
                                            INITIALIZE CONTACT
                                        </h3>
                                        {isSubmitted && (
                                            <span className="flex items-center gap-2 text-green-500 text-sm font-bold">
                                                <Icon name="check_circle" size="sm" />
                                                Message Sent!
                                            </span>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs text-slate-400 font-mono uppercase tracking-wider">Identifier (Name)</label>
                                            <div className="relative">
                                                <Icon name="badge" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size="sm" />
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                    placeholder="e.g. Neo Anderson"
                                                    className={`w-full bg-[#1c1d27] border ${errors.name ? 'border-red-500' : 'border-[#2a3449]'} rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#2b6cee] transition-colors`}
                                                />
                                            </div>
                                            {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs text-slate-400 font-mono uppercase tracking-wider">Return Address (Email)</label>
                                            <div className="relative">
                                                <Icon name="alternate_email" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size="sm" />
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                                    placeholder="neo@matrix.com"
                                                    className={`w-full bg-[#1c1d27] border ${errors.email ? 'border-red-500' : 'border-[#2a3449]'} rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#2b6cee] transition-colors`}
                                                />
                                            </div>
                                            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 flex-1">
                                        <label className="text-xs text-slate-400 font-mono uppercase tracking-wider">Payload (Message)</label>
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                            placeholder="Type your transmission here..."
                                            className={`flex-1 min-h-[120px] bg-[#1c1d27] border ${errors.message ? 'border-red-500' : 'border-[#2a3449]'} rounded-lg p-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#2b6cee] transition-colors resize-none`}
                                        />
                                        {errors.message && <span className="text-red-500 text-xs">{errors.message}</span>}
                                    </div>

                                    <div className="flex items-center justify-between pt-2">
                                        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-mono">
                                            <Icon name="encrypted" size="sm" className="!text-[16px]" />
                                            <span>End-to-end encrypted</span>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="group flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-black px-8 py-3.5 rounded-lg font-bold text-sm transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] active:scale-95 ml-auto w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                                    <span className="tracking-widest uppercase">Sending...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="tracking-widest uppercase">Execute Send</span>
                                                    <Icon name="send" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform !text-lg" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="w-full flex justify-between items-center text-[10px] text-gray-600 font-mono uppercase tracking-widest border-t border-[#2a3449] pt-6 mt-2 opacity-50">
                        <span>System_ID: PS_PORTFOLIO_V4</span>
                        <span className="flex items-center gap-2">
                            <span className="animate-ping h-1 w-1 rounded-full bg-green-500" />
                            Network Stable
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

