"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Building2, ShieldCheck, ArrowRight } from "lucide-react";

export const LandlordCTA = () => {
  return (
    <section className="py-12 bg-slate-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-8 sm:p-12 lg:p-16">
          <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-medium">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Trusted Landlord Portal</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                List Your Property on RentNest & Find Verified Tenants Fast!
              </h2>

              <p className="text-primary-foreground/80 text-sm sm:text-base max-w-2xl leading-relaxed">
                Connect with thousands of reliable tenants, automate rent
                collection, and manage lease agreements effortlessly without
                paying hefty agent commissions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300 shrink-0" />
                  <span>Zero Listing Fees</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300 shrink-0" />
                  <span>Verified Profiles</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300 shrink-0" />
                  <span>Automated Contracts</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center items-stretch lg:items-end">
              <Link
                href="/dashboard/landlord/properties/create"
                className="w-full"
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full font-semibold shadow-lg gap-2"
                >
                  <Building2 className="h-4 w-4" />
                  <span>Post Your Property</span>
                </Button>
              </Link>

              <Link href="/about" className="w-full">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full bg-transparent border-white/30 text-white hover:bg-white/10 gap-2"
                >
                  <span>Learn How It Works</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
