"use client";

import React, { useRef } from "react";
import { MapPin, SlidersHorizontal, RotateCcw, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Sidebar Filter Component
export const SidebarFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const locationDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const minPriceDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const maxPriceDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  // ১. Location Handler
  const handleSearchLocation = (value: string) => {
    if (locationDebounceRef.current) {
      clearTimeout(locationDebounceRef.current);
    }

    locationDebounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("location", value);
      } else {
        params.delete("location");
      }
      router.replace(`${pathName}?${params.toString()}`);
    }, 300);
  };

  // ২. Min Price Handler
  const handleMinPrice = (value: string) => {
    if (minPriceDebounceRef.current) {
      clearTimeout(minPriceDebounceRef.current);
    }

    minPriceDebounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("minPrice", value);
      } else {
        params.delete("minPrice");
      }
      router.replace(`${pathName}?${params.toString()}`);
    }, 300);
  };

  // ৩. Max Price Handler
  const handleMaxPrice = (value: string) => {
    if (maxPriceDebounceRef.current) clearTimeout(maxPriceDebounceRef.current);

    maxPriceDebounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("maxPrice", value);
      } else {
        params.delete("maxPrice");
      }
      router.replace(`${pathName}?${params.toString()}`);
    }, 200);
  };

  // ৪. Reset All Filters Handler
  const handleResetFilters = () => {
    router.replace(pathName);
  };

  return (
    <div className="space-y-4 p-4 md:p-0">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <h3 className="font-semibold text-sm text-slate-900 dark:text-white flex items-center gap-2 uppercase tracking-wider">
          <SlidersHorizontal className="h-4 w-4 text-emerald-600" />
          Filter Options
        </h3>
      </div>

      {/* Location Filter */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Location
        </Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 z-10" />
          <Input
            type="text"
            onChange={(e) => handleSearchLocation(e.target.value)}
            defaultValue={searchParams.get("location") || ""}
            placeholder="e.g. Dhaka, Banani"
            className="pl-9 h-10 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl text-sm"
          />
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Price Range (BDT)
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {/* Min Price */}
          <div className="relative">
            <Banknote className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input
              type="number"
              onChange={(e) => handleMinPrice(e.target.value)}
              defaultValue={searchParams.get("minPrice") || ""}
              placeholder="Min"
              className="pl-8 h-10 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl text-sm"
            />
          </div>

          {/* Max Price */}
          <div className="relative">
            <Banknote className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input
              type="number"
              onChange={(e) => handleMaxPrice(e.target.value)}
              defaultValue={searchParams.get("maxPrice") || ""}
              placeholder="Max"
              className="pl-8 h-10 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl text-sm"
            />
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <div className="pt-2">
        <Button
          onClick={handleResetFilters}
          variant="outline"
          className="w-full h-10 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center gap-2"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset Filters</span>
        </Button>
      </div>
    </div>
  );
};
