"use client";

import React, { useRef } from "react";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SidebarFilters } from "./LeftSideFilterProperty";

interface Category {
  id: string;
  name: string;
  createdAt: string;
}

type categoryProp = {
  categorys: Category[];
};

export const TopFilterBar = ({ categorys }: categoryProp) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = (value: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("searchTerm", value);
      } else {
        params.delete("searchTerm");
      }
      router.replace(`${pathName}?${params.toString()}`);
    }, 200);
  };

  const handleCategory = (value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set("name", value);
    } else {
      params.delete("name");
    }
    router.replace(`${pathName}?${params.toString()}`);
  };

  const handleSortBy = (value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("sortBy", value);
    } else {
      params.delete("sortBy");
    }
    router.replace(`${pathName}?${params.toString()}`);
  };

  const handleOrder = (value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("sortOrder", value);
    } else {
      params.delete("sortOrder");
    }
    router.replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 sm:p-4 mb-6 shadow-sm flex flex-col xl:flex-row items-center justify-between gap-3">
      {/* Search Input */}
      <div className="relative w-full xl:max-w-xs">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("searchTerm") || ""}
          placeholder="Search properties by title, keywords..."
          className="pl-10 h-10 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl text-sm w-full"
        />
      </div>

      {/* Sorting & Filter Dropdowns */}
      <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto justify-end">
        {/* Category Filter */}
        <div className="w-[calc(50%-4px)] sm:w-40">
          <Select
            value={searchParams.get("categoryId") || "all"}
            onValueChange={handleCategory}
          >
            <SelectTrigger className="h-10 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 truncate">
                <Building2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <SelectValue placeholder="Category" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categorys?.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort By */}
        <div className="w-[calc(50%-4px)] sm:w-40">
          <Select
            value={searchParams.get("sortBy") || ""}
            onValueChange={handleSortBy}
          >
            <SelectTrigger className="h-10 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 truncate">
                <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <SelectValue placeholder="Sort By" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pricePerMonth">Price Per Month</SelectItem>
              <SelectItem value="createdAt">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort Order */}
        <div className="w-[calc(50%-4px)] sm:w-36">
          <Select
            value={searchParams.get("sortOrder") || ""}
            onValueChange={handleOrder}
          >
            <SelectTrigger className="h-10 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 truncate">
                <ArrowUpDown className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <SelectValue placeholder="Order" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Low to High</SelectItem>
              <SelectItem value="desc">High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Mobile Filter Sheet Trigger */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 shrink-0 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl"
              >
                <SlidersHorizontal className="h-4 w-4 text-emerald-600" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <SheetHeader className="pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
                <SheetTitle className="text-left text-base font-bold">
                  Filter Properties
                </SheetTitle>
              </SheetHeader>
              <SidebarFilters />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};
