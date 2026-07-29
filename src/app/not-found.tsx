import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Icon Header */}
        <div className="relative flex justify-center items-center">
          <div className="absolute inset-0 flex items-center justify-center opacity-10 blur-xl bg-blue-500 rounded-full w-48 h-48 mx-auto -z-10" />
          <div className="relative bg-slate-100 dark:bg-slate-800 p-6 rounded-full border border-slate-200 dark:border-slate-700 shadow-inner">
            <SearchX className="h-20 w-20 text-blue-600 dark:text-sky-400 stroke-[1.5]" />
          </div>
        </div>

        {/* Text Area */}
        <div className="space-y-3">
          <span className="text-sm font-semibold tracking-widest text-blue-600 dark:text-sky-400 uppercase">
            404 Error
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Page Not Found
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It
            might have been moved, deleted, or never existed.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {/* Go Back Link */}
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Link>

          {/* Back to Home Link */}
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors shadow-sm"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
