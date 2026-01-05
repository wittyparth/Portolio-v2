import { useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from './client';
import type { ContactSubmission } from './types';

export interface UseContactFormReturn {
    submitting: boolean;
    submitted: boolean;
    error: string | null;
    submitContact: (data: Omit<ContactSubmission, 'id' | 'created_at' | 'read_status' | 'replied'>) => Promise<boolean>;
    reset: () => void;
}

export function useContactForm(): UseContactFormReturn {
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submitContact = useCallback(
        async (data: Omit<ContactSubmission, 'id' | 'created_at' | 'read_status' | 'replied'>): Promise<boolean> => {
            if (!isSupabaseConfigured()) {
                // Simulate submission for demo
                setSubmitting(true);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setSubmitting(false);
                setSubmitted(true);
                console.log('Contact form submission (demo):', data);
                return true;
            }

            try {
                setSubmitting(true);
                setError(null);

                const { error: insertError } = await supabase.from('contact_submissions').insert({
                    name: data.name,
                    email: data.email,
                    message: data.message,
                    inquiry_type: data.inquiry_type || 'general',
                });

                if (insertError) throw insertError;

                setSubmitted(true);
                return true;
            } catch (err) {
                console.error('Error submitting contact form:', err);
                setError('Failed to send message. Please try again.');
                return false;
            } finally {
                setSubmitting(false);
            }
        },
        []
    );

    const reset = useCallback(() => {
        setSubmitting(false);
        setSubmitted(false);
        setError(null);
    }, []);

    return {
        submitting,
        submitted,
        error,
        submitContact,
        reset,
    };
}
