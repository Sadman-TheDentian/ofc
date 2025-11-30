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
    // Render a dark placeholder div when the src is missing
    return (
      <div 
        className={`w-full h-full bg-neutral-900 flex items-center justify-center text-neutral-500 ${className || ''}`} 
        style={style}
      >
        <span>No Image</span>
      </div>
    );
  }

  return <Image src={src} alt={alt || "Image"} width={width} height={height} className={className} fill={fill} style={style} {...rest} />;
};

export default SafeImage;
