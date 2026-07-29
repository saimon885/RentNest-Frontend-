"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorBoundary = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    // console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="relative flex justify-center items-center">
          <div className="absolute inset-0 flex items-center justify-center opacity-10 blur-xl bg-red-500 rounded-full w-48 h-48 mx-auto -z-10" />
          <div className="relative bg-red-50 dark:bg-red-950/30 p-6 rounded-full border border-red-200 dark:border-red-900 shadow-inner">
            <AlertTriangle className="h-20 w-20 text-red-600 dark:text-red-400 stroke-[1.5]" />
          </div>
        </div>

        <div className="space-y-3">
          <span className="text-sm font-semibold tracking-widest text-red-600 dark:text-red-400 uppercase">
            500 Error
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Something Went Wrong!
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            An unexpected error occurred while loading this page. Please try again or return to the homepage.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => reset()}
            className="w-full sm:w-auto gap-2 px-5 border-slate-300 dark:border-slate-700"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors shadow-sm"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;