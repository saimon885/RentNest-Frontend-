"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { MapPin, ArrowUpRight } from "lucide-react";

export interface LocationItem {
  id: string;
  name: string;
  city: string;
  propertiesCount: number;
  image: string;
}

const locations: LocationItem[] = [
  {
    id: "gulshan",
    name: "Gulshan",
    city: "Dhaka",
    propertiesCount: 120,
    image:
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "banani",
    name: "Banani",
    city: "Dhaka",
    propertiesCount: 85,
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "dhanmondi",
    name: "Dhanmondi",
    city: "Dhaka",
    propertiesCount: 94,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "uttara",
    name: "Uttara",
    city: "Dhaka",
    propertiesCount: 110,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "chittagong",
    name: "Agrabad",
    city: "Chittagong",
    propertiesCount: 62,
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80",
  },
];

export const PopularLocations = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 max-w-6xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Popular Locations
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Explore available rental homes in Bangladesh top residential hubs.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((item) => (
            <Link
              key={item.id}
              href={`/properties?location=${encodeURIComponent(item.name)}`}
            >
              <Card className="group relative h-64 overflow-hidden border-0 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="h-4 w-4" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-white/80">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{item.city}</span>
                  </div>
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-xs text-white/90 font-medium">
                    {item.propertiesCount}+ Properties Available
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
