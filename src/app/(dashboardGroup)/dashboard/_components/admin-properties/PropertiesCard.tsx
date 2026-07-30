
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Star, Building2, CheckCircle2, XCircle } from "lucide-react";

export type Property = {
  id?: string;
  _id?: string;
  title: string;
  location: string;
  pricePerMonth: number;
  isAvailable: boolean;
  category?: {
    name?: string;
  };
  reviews?: {
    comment: string;
    rating: number;
  }[];
};

const PropertiesCard = ({ property }: { property: Property }) => {
  const avgRating =
    property.reviews && property.reviews.length > 0
      ? (
          property.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
          property.reviews.length
        ).toFixed(1)
      : null;

  return (
    <Card className="flex flex-col h-full border-border/50 shadow-xs hover:shadow-md transition-shadow">
      <CardHeader className="space-y-2 pb-3">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="secondary" className="font-semibold text-xs gap-1">
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

            {avgRating ? (
              <div className="flex items-center gap-1 text-sm font-semibold">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span>{avgRating}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  ({property.reviews?.length})
                </span>
              </div>
            ) : (
              <span className="text-xs text-muted-foreground">No reviews</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertiesCard;
