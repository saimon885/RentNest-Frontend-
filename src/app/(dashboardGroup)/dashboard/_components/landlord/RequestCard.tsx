import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Wallet, Home } from "lucide-react";

export type RequestProperty = {
  title: string;
  location: string;
  pricePerMonth: number;
};

export type RentalRequestType = {
  id: string;
  startDate: string;
  endDate: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED";
  property: RequestProperty;
};

type RequestCardProps = {
  request: RentalRequestType;
};

const getStatusBadge = (status: RentalRequestType["status"]) => {
  switch (status) {
    case "APPROVED":
      return (
        <Badge className="bg-emerald-600 hover:bg-emerald-700">Approved</Badge>
      );
    case "COMPLETED":
      return <Badge className="bg-blue-600 hover:bg-blue-700">Completed</Badge>;
    case "REJECTED":
      return <Badge variant="destructive">Rejected</Badge>;
    default:
      return (
        <Badge variant="outline" className="border-amber-500 text-amber-600">
          Pending
        </Badge>
      );
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const RequestCard = ({ request }: RequestCardProps) => {
  const { startDate, endDate, status, property } = request;

  return (
    <Card className="hover:shadow-md transition-shadow border-border/60">
      <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Home className="h-4 w-4 text-primary shrink-0" />
            <span className="line-clamp-1">{property?.title}</span>
          </CardTitle>
          <div className="flex items-center text-xs text-muted-foreground gap-1">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span>{property?.location}</span>
          </div>
        </div>
        <div>{getStatusBadge(status)}</div>
      </CardHeader>

      <CardContent className="space-y-3 pt-0">
        <div className="flex items-center justify-between text-xs py-2 px-3 bg-muted/40 rounded-lg border border-border/40">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>
              {formatDate(startDate)} — {formatDate(endDate)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-muted-foreground">Rent per month</span>
          <div className="flex items-center gap-1 text-sm font-semibold text-primary">
            <Wallet className="h-4 w-4" />
            <span>৳{property?.pricePerMonth?.toLocaleString()}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-border/40 flex gap-2">
          <Button size="sm" className="w-full">
            Change Status
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
