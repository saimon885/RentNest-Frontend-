"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export const PropertyPagination = ({ meta }: PaginationProps) => {
  const { page, totalPage } = meta;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  if (totalPage <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
      <Button
        variant="outline"
        size="sm"
        disabled={page <= 1}
        onClick={() => handlePageChange(page - 1)}
        className="rounded-xl border-slate-200 dark:border-slate-800"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPage }, (_, i) => i + 1).map((pageNum) => (
          <Button
            key={pageNum}
            variant={pageNum === page ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageChange(pageNum)}
            className={`h-9 w-9 p-0 rounded-xl ${
              pageNum === page
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "border-slate-200 dark:border-slate-800"
            }`}
          >
            {pageNum}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        disabled={page >= totalPage}
        onClick={() => handlePageChange(page + 1)}
        className="rounded-xl border-slate-200 dark:border-slate-800"
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
};
