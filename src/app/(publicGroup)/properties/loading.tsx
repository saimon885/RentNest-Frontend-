import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function PropertiesCardSkeleton() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-3">
        <Skeleton className="h-8 w-64 rounded-md" />
        <Skeleton className="h-4 w-80 sm:w-96 rounded-md" />
      </div>

      <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-card flex flex-col md:flex-row gap-4 justify-between items-center">
        <Skeleton className="h-12 w-full md:max-w-md rounded-lg" />

        <div className="flex gap-3 w-full md:w-auto overflow-x-auto">
          <Skeleton className="h-10 w-24 shrink-0 rounded-full" />
          <Skeleton className="h-10 w-28 shrink-0 rounded-full" />
          <Skeleton className="h-10 w-28 shrink-0 rounded-full" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="w-full lg:w-1/4 xl:w-[300px] shrink-0">
          <div className="p-5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-card space-y-6 sticky top-24">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-5 w-32 rounded-md" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-4 w-20 rounded" />
              <Skeleton className="h-11 w-full rounded-lg" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-4 w-32 rounded" />
              <div className="flex gap-3">
                <Skeleton className="h-11 w-full rounded-lg" />
                <Skeleton className="h-11 w-full rounded-lg" />
              </div>
            </div>

            <div className="pt-2">
              <Skeleton className="h-11 w-full rounded-full" />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-3/4 flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
      </div>
    </div>
  );
}
