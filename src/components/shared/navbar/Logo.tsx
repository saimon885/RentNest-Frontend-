import Link from "next/link";
import { Building2, Home, Sparkles } from "lucide-react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <Link href="/" className="inline-flex items-center gap-2">
      <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold">
        <Building2 className="h-5 w-5" />
      </div>
      <span className="text-2xl font-extrabold tracking-tight ">
        Rent<span className="text-primary">Nest</span>
      </span>
    </Link>
  );
}
