'use client';

import React from 'react';

interface GlitchTextProps {
    text: string;
    className?: string;
    splitOpacity?: boolean;
}

export default function GlitchText({ text, className = "", splitOpacity = true }: GlitchTextProps) {
    if (!splitOpacity) {
        return <span className={`inline-block ${className}`}>{text}</span>;
    }

    const words = text.split(' ');

    return (
        <span className={`inline-block ${className}`}>
            {words.map((word, i) => (
                <span key={i} className={i % 2 !== 0 ? "text-white/10" : "text-white"}>
                    {word}{i < words.length - 1 ? ' ' : ''}
                </span>
            ))}
        </span>
    );
}
