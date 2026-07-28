import Link from "next/link";
import { Home, Sparkles } from "lucide-react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 group transition-transform duration-200 active:scale-95 ${className}`}
    >
      {/* Icon Wrapper */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F4C81] to-[#0A365C] dark:from-sky-500 dark:to-blue-600 text-white shadow-md group-hover:shadow-lg transition-all duration-300">
        <Home className="w-5 h-5 text-white transition-transform group-hover:scale-110" />

        {/* Accent badge / Sparkle */}
        <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-[#FF5A5F] rounded-full text-white ring-2 ring-white dark:ring-slate-900 shadow-sm">
          <Sparkles className="w-2.5 h-2.5" />
        </span>
      </div>

      {/* Brand Name Text */}
      {showText && (
        <span className="font-bold tracking-tight text-xl text-slate-900 dark:text-white">
          Rent<span className="text-[#FF5A5F]">Nest</span>
        </span>
      )}
    </Link>
  );
}
