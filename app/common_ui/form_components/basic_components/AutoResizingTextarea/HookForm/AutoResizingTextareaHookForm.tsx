import { useCombinedRefs } from '@/app/utils/hooks/useCombinedRefs';
import React, { useEffect, useRef } from 'react';

interface AutoResizingTextareaProps {
    ref: React.Ref<HTMLTextAreaElement>;
    value: string;
    lineHeight?: number;
    padding?: number;
    minRows?: number;
    maxRows?: number;
    [key: string]: any;
}

export default function AutoResizingTextareaHookForm({
    ref: externalRef,
    value,
    lineHeight = 24,
    padding = 24,
    minRows = 1,
    maxRows = 100,
    ...props
}: AutoResizingTextareaProps) {
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const combinedRef = useCombinedRefs<HTMLTextAreaElement>(externalRef, internalRef);

    useEffect(() => {
        const textarea = internalRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            const scrollHeight = textarea.scrollHeight;
            const rowHeight = parseInt(getComputedStyle(textarea).lineHeight) || lineHeight;
            const rows = Math.min(maxRows, Math.max(minRows, Math.floor((scrollHeight - padding * 2) / rowHeight)));
            textarea.style.height = `${rows * rowHeight + padding * 2}px`;
        }
    }, [value, minRows, maxRows, lineHeight, padding]);

    return (
        <textarea
            ref={combinedRef} // Use our stable object ref
            value={value}
            style={{
                resize: 'none',
                overflow: 'hidden',
                minHeight: `${minRows * lineHeight + padding * 2}px`,
            }}
            rows={minRows}
            {...props}
        />
    );
}