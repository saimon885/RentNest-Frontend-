import React, { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Mail,
  Building2,
  Calendar,
  Sparkles,
} from "lucide-react";
import PropertyGallery from "../../_components/properties/PropertyGallery";
import PropertyDetailsSkeleton from "../../_components/properties/PropertyDetailsSkeleton";
import BackButton from "../../_components/properties/BackButton";
import RentalReqButton from "../../_components/rental/RentalReqButton";
import { GetMyProfile } from "@/services/GetMyProfie";
import Link from "next/link";

interface PropertiesProp {
  params: Promise<{
    id: string;
  }>;
}

export interface PropertyData {
  id: string;
  title: string;
  description: string;
  location: string;
  pricePerMonth: number;
  amenities: string[];
  images: string[];
  isAvailable: boolean;
  categoryId: string;
  landlordId: string;
  category: {
    id: string;
    name: string;
    createdAt: string;
  };
}

async function PropertyDetailsContent({ id }: { id: string }) {
  const res = await fetch(
    `${process.env.SERVER_API_URL}/api/properties/${id}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-6">
        <div className="p-4 rounded-full bg-destructive/10 text-destructive mb-3">
          <Building2 className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold tracking-tight">Property Not Found</h2>
        <p className="text-muted-foreground text-xs mt-1">
          The requested listing could not be found.
        </p>
      </div>
    );
  }

  const response = await res.json();
  const property: PropertyData = response.data;

  const getuser = await GetMyProfile();
  const userROle = getuser?.data?.role;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-4">
      {/* Top Navigation */}
      <div>
        <BackButton />
      </div>

      {/* Main Grid: Left Side Content (Gallery + Details) & Right Side (Booking) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column (Image + Information) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Gallery Inside Left Column */}
          <PropertyGallery images={property.images} title={property.title} />

          {/* Title & Header Details */}
          <div className="space-y-2 border-b pb-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary border-none rounded-md"
              >
                {property.category.name}
              </Badge>
              <Badge
                variant={property.isAvailable ? "default" : "destructive"}
                className={`px-2.5 py-0.5 text-xs font-semibold border-none rounded-md ${
                  property.isAvailable
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                    : "bg-red-500/15 text-red-600 dark:text-red-400"
                }`}
              >
                {property.isAvailable ? "Available" : "Rented Out"}
              </Badge>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-snug">
              {property.title}
            </h1>

            <div className="flex items-center text-muted-foreground text-xs sm:text-sm font-medium pt-0.5">
              <MapPin className="h-4 w-4 mr-1 text-primary shrink-0" />
              <span>{property.location}</span>
            </div>
          </div>

          {/* Quick Info Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/50 text-xs">
            <div>
              <p className="text-muted-foreground font-medium">Monthly Rent</p>
              <p className="text-base font-bold text-foreground mt-0.5">
                ৳{property.pricePerMonth.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground font-medium">Status</p>
              <p className="font-semibold text-foreground flex items-center gap-1.5 mt-0.5">
                <span
                  className={`h-2 w-2 rounded-full ${
                    property.isAvailable ? "bg-emerald-500" : "bg-red-500"
                  }`}
                />
                {property.isAvailable ? "Ready to Move" : "Occupied"}
              </p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-muted-foreground font-medium">Verification</p>
              <p className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                <ShieldCheck className="h-3.5 w-3.5" /> Verified Listing
              </p>
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-2">
            <h2 className="text-base font-bold tracking-tight text-foreground flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-primary" /> Overview
            </h2>
            <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Amenities */}
          <div className="space-y-3 pt-4 border-t">
            <h2 className="text-base font-bold tracking-tight text-foreground">
              Amenities & Features
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {property.amenities.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-lg border bg-card text-xs font-medium"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="truncate text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Sticky Booking Card) */}
        <div className="lg:col-span-1 lg:sticky lg:top-6">
          <Card className="shadow-xs border-border/80 rounded-xl overflow-hidden bg-card">
            <CardContent className="p-5 space-y-5">
              <div className="border-b pb-3">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Rent Amount
                </p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-bold text-foreground">
                    ৳{property.pricePerMonth.toLocaleString()}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    / month
                  </span>
                </div>
              </div>

              <div className="space-y-2.5">
                {getuser?.success ? (
                  userROle === "TENANT" ? (
                    <RentalReqButton property={property} />
                  ) : (
                    <Button
                      disabled
                      className="w-full font-semibold py-5 rounded-lg shadow-2xs text-sm opacity-60"
                      size="default"
                    >
                      Only Tenants Can Request
                    </Button>
                  )
                ) : (
                  <Link href="/login" className="w-full">
                    <Button
                      className="w-full font-semibold py-5 rounded-lg shadow-2xs cursor-pointer text-sm"
                      size="default"
                    >
                      Login to Request
                    </Button>
                  </Link>
                )}
              </div>

              <div className="rounded-lg bg-muted/50 p-3 space-y-2 text-[11px] text-muted-foreground border border-border/40">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3 w-3" /> Property ID
                  </span>
                  <span className="font-mono text-foreground font-medium uppercase">
                    {property.id.slice(0, 8)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> Listed Date
                  </span>
                  <span className="font-medium text-foreground">
                    {new Date(property.category.createdAt).toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric", year: "numeric" },
                    )}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default async function PropertiesDetails({ params }: PropertiesProp) {
  const { id } = await params;

  return (
    <Suspense fallback={<PropertyDetailsSkeleton />}>
      <PropertyDetailsContent id={id} />
    </Suspense>
  );
}
