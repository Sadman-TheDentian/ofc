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
    glowColor = "#00FF41"
}: TechnicalIconProps) {
    return (
        <div className={cn("relative group/tech-icon", className)}>
            {/* Outer Technical Frame */}
            <div className="absolute -inset-2 border border-white/5 rounded-2xl group-hover/tech-icon:border-[#00FF41]/20 transition-colors duration-500" />

            {/* Corner Crop Marks */}
            <div className="absolute -top-2 -left-2 w-2 h-2 border-t border-l border-white/20 group-hover/tech-icon:border-[#00FF41]/50 transition-colors duration-500" />
            <div className="absolute -top-2 -right-2 w-2 h-2 border-t border-r border-white/20 group-hover/tech-icon:border-[#00FF41]/50 transition-colors duration-500" />
            <div className="absolute -bottom-2 -left-2 w-2 h-2 border-b border-l border-white/20 group-hover/tech-icon:border-[#00FF41]/50 transition-colors duration-500" />
            <div className="absolute -bottom-2 -right-2 w-2 h-2 border-b border-r border-white/20 group-hover/tech-icon:border-[#00FF41]/50 transition-colors duration-500" />

            {/* Internal Grid/Scanline Effect */}
            <div className="relative h-16 w-16 bg-white/[0.02] border border-white/10 rounded-xl flex items-center justify-center overflow-hidden group-hover/tech-icon:bg-white/[0.04] group-hover/tech-icon:border-[#00FF41]/30 transition-all duration-500">
                <div className="absolute inset-0 opacity-[0.03] group-hover/tech-icon:opacity-[0.07] transition-opacity"
                    style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '4px 4px' }} />

                {/* Glow Substrate */}
                <div
                    className="absolute inset-0 blur-[20px] opacity-0 group-hover/tech-icon:opacity-20 transition-opacity duration-700"
                    style={{ backgroundColor: glowColor }}
                />

                <Icon className={cn("h-7 w-7 text-white/40 group-hover/tech-icon:text-white group-hover/tech-icon:scale-110 transition-all duration-500 relative z-10", iconClassName)} />
            </div>

            {/* Status Pip */}
            <div className="absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-white/10 group-hover/tech-icon:bg-[#00FF41] transition-colors duration-500" />
        </div>
    );
}
