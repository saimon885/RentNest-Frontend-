import React from "react";
import { Building2, Home, Key, Loader2 } from "lucide-react";

interface RentNestLoaderProps {
  label?: string;
  className?: string;
}

export default function RentNestLoader({
  label = "Finding your next home...",
  className = "",
}: RentNestLoaderProps) {
  return (
    <div
      className={`min-h-[400px] w-full flex flex-col items-center justify-center gap-4 p-6 ${className}`}
    >
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center relative">
          <Building2 className="h-8 w-8 text-primary" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
        </div>
      </div>

      <div className="text-center space-y-1">
        <h3 className="text-lg font-bold tracking-tight text-foreground">
          Rent<span className="text-primary">Nest</span>
        </h3>
        {label && (
          <p className="text-xs font-medium text-muted-foreground flex items-center justify-center gap-1.5">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
            {label}
          </p>
        )}
      </div>
    </div>
  );
}
