"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export default function PropertyGallery({
  images,
  title,
}: PropertyGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(
    images[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
  );

  return (
    <div className="space-y-2.5">
      {/* Compact Main Image */}
      <div className="relative w-full h-[240px] sm:h-[320px] md:h-[360px] rounded-xl overflow-hidden border bg-muted shadow-xs">
        <Image
          src={selectedImage}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 700px"
          className="object-cover transition-all duration-300"
        />
      </div>

      {/* Thumbnails Row */}
      {images && images.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className={cn(
                "relative h-16 w-24 sm:h-20 sm:w-28 flex-shrink-0 rounded-lg overflow-hidden border transition-all duration-200 focus:outline-none cursor-pointer",
                selectedImage === img
                  ? "border-primary ring-2 ring-primary/20 opacity-100 scale-[0.98]"
                  : "border-transparent opacity-60 hover:opacity-100",
              )}
            >
              <Image
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
