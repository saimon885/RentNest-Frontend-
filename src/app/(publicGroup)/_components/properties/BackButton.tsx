"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      size="lg"
      variant="outline"
      onClick={() => router.back()}
      className="mb-4 gap-2 bg-background hover:bg-muted text-foreground border-slate-200 dark:border-slate-800 shadow-2xs rounded-xl cursor-pointer -ml-2"
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </Button>
  );
}
