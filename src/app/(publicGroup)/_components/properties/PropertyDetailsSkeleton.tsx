import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyDetailsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-8">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="md:col-span-2 aspect-[16/10] rounded-2xl w-full" />
          <div className="flex md:flex-col gap-3 overflow-x-auto">
            <Skeleton className="h-24 w-28 md:w-full flex-shrink-0 rounded-xl" />
            <Skeleton className="h-24 w-28 md:w-full flex-shrink-0 rounded-xl" />
            <Skeleton className="h-24 w-28 md:w-full flex-shrink-0 rounded-xl" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-3">
            <Skeleton className="h-6 w-28 rounded-full" />
            <Skeleton className="h-10 w-3/4 rounded-lg" />
            <Skeleton className="h-5 w-1/2 rounded-lg" />
          </div>
          <Skeleton className="h-10 w-full rounded-xl" />
          <div className="space-y-3 pt-4">
            <Skeleton className="h-7 w-36 rounded-lg" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-3/4 rounded-md" />
          </div>
          <div className="space-y-3 pt-4">
            <Skeleton className="h-7 w-36 rounded-lg" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-28 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
            </div>
          </div>
        </div>

        <div>
          <Skeleton className="h-72 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
