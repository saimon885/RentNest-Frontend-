import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function PropertiesCardSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-card p-0 overflow-hidden flex flex-col justify-between"
        >
          <div>
            <Skeleton className="w-full h-52 rounded-none" />

            <div className="p-5 space-y-3">
              <Skeleton className="h-3.5 w-1/3 rounded-md" />
              <Skeleton className="h-6 w-5/6 rounded-md" />

              <div className="flex flex-wrap gap-1.5 pt-1">
                <Skeleton className="h-5 w-16 rounded-md" />
                <Skeleton className="h-5 w-20 rounded-md" />
                <Skeleton className="h-5 w-14 rounded-md" />
              </div>
            </div>
          </div>

          <div className="px-5 pb-5 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 mt-4">
            <div className="pt-3 space-y-1">
              <Skeleton className="h-3 w-8 rounded" />
              <Skeleton className="h-6 w-20 rounded-md" />
            </div>
            <Skeleton className="h-10 w-24 rounded-lg mt-3" />
          </div>
        </div>
      ))}
    </div>
  );
}
