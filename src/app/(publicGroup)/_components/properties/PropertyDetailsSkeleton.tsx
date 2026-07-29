import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyDetailsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-4">
      <Skeleton className="h-8 w-20 rounded-lg" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2.5">
            <Skeleton className="w-full h-[240px] sm:h-[320px] md:h-[360px] rounded-xl" />
            <div className="flex gap-2">
              <Skeleton className="h-16 w-24 sm:h-20 sm:w-28 rounded-lg shrink-0" />
              <Skeleton className="h-16 w-24 sm:h-20 sm:w-28 rounded-lg shrink-0" />
            </div>
          </div>

          <div className="space-y-2 border-b pb-4">
            <div className="flex gap-2">
              <Skeleton className="h-5 w-20 rounded" />
              <Skeleton className="h-5 w-16 rounded" />
            </div>
            <Skeleton className="h-7 w-3/4 rounded-md" />
            <Skeleton className="h-4 w-1/3 rounded-md" />
          </div>

          <Skeleton className="h-14 w-full rounded-xl" />

          <div className="space-y-2">
            <Skeleton className="h-5 w-24 rounded" />
            <Skeleton className="h-3.5 w-full rounded" />
            <Skeleton className="h-3.5 w-full rounded" />
          </div>
        </div>

        <div className="lg:col-span-1">
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
