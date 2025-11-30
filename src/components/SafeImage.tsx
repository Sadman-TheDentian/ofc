
import Image from "next/image";
import { FC, CSSProperties } from "react";

// Props type
interface SafeImageProps {
  src: any;        // Can be null
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  fallback?: string; // Optional fallback image URL
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
    // Render fallback box or fallback image
    if (fill) {
      return (
        <div className={`bg-gray-200 w-full h-full flex items-center justify-center ${className}`} style={style}>
          <span className="text-black">No image</span>
        </div>
      );
    }
    // This fallback logic for non-fill images might need a placeholder in public folder.
    // For now, it will look for /fallback.png
    return <Image src={fallback} alt={alt} width={width} height={height} className={className} style={style} {...rest} />;
  }

  return <Image src={src} alt={alt} width={width} height={height} className={className} fill={fill} style={style} {...rest} />;
};

export default SafeImage;
