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
    images[0] || "/placeholder.jpg",
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="relative md:col-span-2 aspect-[16/10] rounded-2xl overflow-hidden border bg-muted shadow-sm">
        <Image
          src={selectedImage}
          alt={title}
          fill
          priority
          className="object-cover transition-all duration-300"
        />
      </div>

      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[450px] pb-2 md:pb-0 scrollbar-thin">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(img)}
            className={cn(
              "relative h-24 w-28 md:w-full flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 focus:outline-none",
              selectedImage === img
                ? "border-primary ring-2 ring-primary/20 scale-[0.98]"
                : "border-transparent opacity-70 hover:opacity-100",
            )}
          >
            <Image
              src={img}
              alt={`${title} view ${idx + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
