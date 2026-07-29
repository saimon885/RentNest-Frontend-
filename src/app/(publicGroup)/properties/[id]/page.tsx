import React, { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, CheckCircle2, ShieldCheck, Mail } from "lucide-react";
import PropertyGallery from "../../_components/properties/PropertyGallery";
import PropertyDetailsSkeleton from "../../_components/properties/PropertyDetailsSkeleton";
import BackButton from "../../_components/properties/BackButton";

interface PropertiesProp {
  params: Promise<{
    id: string;
  }>;
}

interface PropertyData {
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
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-destructive">
          Property Not Found
        </h2>
      </div>
    );
  }

  const response = await res.json();
  const property: PropertyData = response.data;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-8">
      {/* Back Button added here */}
      <div>
        <BackButton />
        <PropertyGallery images={property.images} title={property.title} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="px-3 py-1 text-sm font-medium"
              >
                {property.category.name}
              </Badge>
              <Badge
                variant={property.isAvailable ? "default" : "destructive"}
                className="px-3 py-1 text-sm font-medium"
              >
                {property.isAvailable ? "Available" : "Rented Out"}
              </Badge>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
              {property.title}
            </h1>

            <div className="flex items-center text-muted-foreground text-sm md:text-base">
              <MapPin className="h-4 w-4 mr-1 text-primary" />
              <span>{property.location}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-muted/50 border flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium">
                Rent Price
              </p>
              <p className="text-2xl md:text-3xl font-extrabold text-primary">
                ৳{property.pricePerMonth.toLocaleString()}
                <span className="text-sm font-normal text-muted-foreground">
                  {" "}
                  / month
                </span>
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-emerald-500" /> Verified
              Listing
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold">About Details</h2>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base whitespace-pre-line">
              {property.description}
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t">
            <h2 className="text-xl font-semibold">Amenities & Features</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {property.amenities.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-lg border bg-card text-card-foreground text-sm"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Card className="sticky top-6 shadow-md border-muted">
            <CardContent className="p-6 space-y-5">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Rent</p>
                <p className="text-3xl font-bold">
                  ৳{property.pricePerMonth.toLocaleString()}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <Button
                  className="w-full text-base font-semibold py-6 rounded-xl"
                  size="lg"
                >
                  Request Booking
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2 rounded-xl"
                  size="lg"
                >
                  <Mail className="h-4 w-4" /> Contact Landlord
                </Button>
              </div>

              <div className="pt-4 border-t space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Category</span>
                  <span className="font-medium text-foreground">
                    {property.category.name}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Listed Date</span>
                  <span className="font-medium text-foreground">
                    {new Date(property.category.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      },
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
