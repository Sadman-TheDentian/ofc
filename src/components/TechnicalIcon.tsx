'use client';

import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TechnicalIconProps {
    icon: LucideIcon;
    className?: string;
    iconClassName?: string;
    glowColor?: string;
}

export default function TechnicalIcon({
    icon: Icon,
    className,
    iconClassName,
}: TechnicalIconProps) {
    return (
        <div className={cn("relative flex items-center justify-center h-16 w-16 bg-white/[0.03] border border-white/10 rounded-2xl group-hover:border-white/30 transition-all duration-300", className)}>
            <Icon className={cn("h-7 w-7 text-white/40 group-hover:text-white transition-all duration-300 relative z-10", iconClassName)} />
        </div>
    );
}
