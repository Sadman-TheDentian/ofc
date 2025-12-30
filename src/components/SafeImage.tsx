import Image from "next/image";
import { FC, CSSProperties } from "react";

// Props type
interface SafeImageProps {
  src?: string | null | undefined;
  alt?: string | null | undefined;
  width?: number;
  height?: number;
  className?: string;
  fallback?: string;
  fill?: boolean;
  style?: CSSProperties;
  'data-ai-hint'?: string;
}

const SafeImage: FC<SafeImageProps> = ({
  src,
  alt = "Image",
  width,
  height,
  className,
  fallback = "/fallback.png",
  fill = false,
  style,
  ...rest
}) => {
  if (!src) {
    // Render a high-fidelity dark placeholder for missing telemetry assets
    return (
      <div
        className={`w-full h-full bg-[#050505] flex flex-col items-center justify-center border border-white/5 relative overflow-hidden ${className || ''}`}
        style={style}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FF41]/10 to-transparent" />
        <span className="text-[8px] font-black text-white/20 tracking-[0.4em] uppercase mb-2">SIGNAL_LOST</span>
        <span className="text-[7px] font-bold text-white/5 tracking-widest uppercase italic">MSN_REF_NULL</span>
      </div>
    );
  }

  return <Image src={src} alt={alt || "Image"} width={width} height={height} className={className} fill={fill} style={style} {...rest} />;
};

export default SafeImage;
