import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, CheckCircle2, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Type Definition
export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  pricePerMonth: number;
  amenities: string[];
  images: string[];
  isAvailable: boolean;
  categoryId: string;
  landlordId: string;
  category?: {
    name: string;
  };
}

interface PropertiesCardProps {
  property: Property;
}

const PropertiesCard = ({ property }: PropertiesCardProps) => {
  const {
    id,
    title,
    location,
    pricePerMonth,
    amenities,
    images,
    isAvailable,
    category,
  } = property;

  // Fallback image in case images array is empty
  const displayImage =
    images && images.length > 0
      ? images[0]
      : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop";

  return (
    <Card className="group overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800 bg-card hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Image Container with Badge */}
        <div className="relative w-full h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
          <Image
            src={displayImage}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Availability & Category Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            {category?.name && (
              <Badge className="bg-slate-900/80 dark:bg-slate-100/80 text-white dark:text-slate-900 backdrop-blur-md px-2.5 py-1 text-xs border-none font-medium">
                {category.name}
              </Badge>
            )}

            <Badge
              variant={isAvailable ? "default" : "destructive"}
              className={`backdrop-blur-md px-2.5 py-1 text-xs border-none font-medium ${
                isAvailable
                  ? "bg-emerald-600/90 text-white"
                  : "bg-red-600/90 text-white"
              }`}
            >
              {isAvailable ? "Available" : "Rented"}
            </Badge>
          </div>
        </div>

        {/* Card Body */}
        <CardContent className="p-5 space-y-3">
          {/* Location */}
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-medium">
            <MapPin className="h-3.5 w-3.5 text-blue-600 dark:text-sky-400 shrink-0" />
            <span className="truncate">{location}</span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors">
            {title}
          </h3>

          {/* Amenities (Show first 3) */}
          {amenities && amenities.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {amenities.slice(0, 3).map((amenity, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 text-[11px] font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md"
                >
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  {amenity}
                </span>
              ))}
              {amenities.length > 3 && (
                <span className="text-[11px] font-medium text-slate-400 self-center">
                  +{amenities.length - 3} more
                </span>
              )}
            </div>
          )}
        </CardContent>
      </div>

      {/* Card Footer */}
      <CardFooter className="px-5 pb-5 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 mt-4">
        <div className="pt-3">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
            Rent
          </p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">
            ৳{pricePerMonth.toLocaleString()}
            <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
              /mo
            </span>
          </p>
        </div>

        <button className="mt-3 gap-1 rounded-lg">
          <Link
            href={`/properties/${id}`}
            className="mt-4 w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-all shadow-sm active:scale-[0.98]"
          >
            Details
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </button>
      </CardFooter>
    </Card>
  );
};

export default PropertiesCard;
