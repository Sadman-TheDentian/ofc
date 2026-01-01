'use client';

import React from 'react';

interface GlitchTextProps {
    text: string;
    className?: string;
}

export default function GlitchText({ text, className = "" }: GlitchTextProps) {
    return (
        <span className={`inline-block ${className}`}>
            {text}
        </span>
    );
}
