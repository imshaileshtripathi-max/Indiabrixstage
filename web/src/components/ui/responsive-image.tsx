"use client";

import Image from "next/image";
import { Building2 } from "lucide-react";
import { useState } from "react";

type ResponsiveImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

export function ResponsiveImage({
  src,
  alt,
  sizes,
  className,
  priority = false,
}: ResponsiveImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`overflow-hidden bg-[#F0FDFA] ${className ?? "relative"}`}>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-[#CCFBF1] via-[#CCFBF1] to-[#99F6E4]"
      />
      {hasError ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center text-[#0C9B87]/45"
        >
          <Building2 size={40} strokeWidth={1.3} />
        </div>
      ) : (
        <Image
          alt={alt}
          className="absolute inset-0 size-full object-cover"
          fill
          onError={() => setHasError(true)}
          priority={priority}
          sizes={sizes}
          src={src}
        />
      )}
    </div>
  );
}
