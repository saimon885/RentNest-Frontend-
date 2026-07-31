import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Building2,
  CheckCircle2,
  XCircle,
  Pencil,
  Trash2,
} from "lucide-react";
import DeleteProperty from "./DeleteProperty";
import EditProperty, { PropertyListing } from "./EditProperty";
import { GetCategory } from "../../_actions/Landlord/CateGory";

export type LandlordProperty = {
  id: string;
  title: string;
  location: string;
  pricePerMonth: number;
  isAvailable: boolean;
  category?: {
    name?: string;
  };
};

const GetLandlordProperties = async ({
  properties,
}: {
  properties: LandlordProperty[];
}) => {
  const result = await GetCategory();
  const categories = result?.data || [];
  if (!properties || properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border border-dashed rounded-lg text-center bg-card">
        <Building2 className="h-10 w-10 text-muted-foreground mb-3" />
        <h3 className="text-lg font-semibold">No Properties Found</h3>
        <p className="text-sm text-muted-foreground mt-1">
          You have not added any properties yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {properties.map((property) => (
        <Card
          key={property.id}
          className="flex flex-col h-full border-border/50 shadow-xs hover:shadow-md transition-shadow"
        >
          <CardHeader className="space-y-2 pb-3">
            <div className="flex items-start justify-between gap-2">
              <Badge
                variant="secondary"
                className="font-semibold text-xs gap-1"
              >
                <Building2 className="h-3 w-3" />
                {property.category?.name || "N/A"}
              </Badge>
              <Badge
                variant={property.isAvailable ? "secondary" : "destructive"}
                className={
                  property.isAvailable
                    ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 gap-1"
                    : "gap-1"
                }
              >
                {property.isAvailable ? (
                  <>
                    <CheckCircle2 className="h-3 w-3" /> Available
                  </>
                ) : (
                  <>
                    <XCircle className="h-3 w-3" /> Booked
                  </>
                )}
              </Badge>
            </div>
            <CardTitle className="text-lg font-bold line-clamp-1">
              {property.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col justify-between flex-1 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="truncate">{property.location}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/40">
                <div>
                  <span className="text-xl font-bold text-foreground">
                    ৳{property.pricePerMonth.toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground"> /month</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-border/40">
              <EditProperty
                categories={categories}
                property={property as PropertyListing}
              ></EditProperty>
              <DeleteProperty propertyId={property.id}></DeleteProperty>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GetLandlordProperties;
