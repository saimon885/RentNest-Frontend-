import React from "react";
import { cookies } from "next/headers";
import { format } from "date-fns";
import { Calendar, Building2, AlertCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PayNowBTN from "./PayNowBTN";

export type RentalStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "ACTIVE"
  | "COMPLETED";

export type RentalItem = {
  id: string;
  startDate: string;
  endDate: string;
  status: RentalStatus;
  createdAt: string;
  updatedAt: string;
  propertyId: string;
  tenantId: string;
};

const getStatusBadge = (status: RentalStatus) => {
  switch (status) {
    case "PENDING":
      return (
        <Badge className="bg-amber-500/15 text-amber-600 hover:bg-amber-500/25 border-amber-200">
          Pending
        </Badge>
      );
    case "APPROVED":
      return (
        <Badge className="bg-blue-500/15 text-blue-600 hover:bg-blue-500/25 border-blue-200">
          Approved
        </Badge>
      );
    case "REJECTED":
      return (
        <Badge className="bg-rose-500/15 text-rose-600 hover:bg-rose-500/25 border-rose-200">
          Rejected
        </Badge>
      );
    case "ACTIVE":
      return (
        <Badge className="bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 border-emerald-200">
          Active
        </Badge>
      );
    case "COMPLETED":
      return (
        <Badge className="bg-slate-500/15 text-slate-600 hover:bg-slate-500/25 border-slate-200">
          Completed
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const RentalReq = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
        <AlertCircle className="h-4 w-4 shrink-0" />
        <span>User is not logged in. Please log in to view requests.</span>
      </div>
    );
  }

  let rentals: RentalItem[] = [];
  let isError = false;

  try {
    const res = await fetch(`${process.env.SERVER_API_URL}/api/rentals`, {
      headers: {
        Authorization: `${accessToken}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      isError = true;
    } else {
      const result = await res.json();
      rentals = result?.data || [];
    }
  } catch (error) {
    isError = true;
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
        Something went wrong while fetching requests.
      </div>
    );
  }

  if (rentals.length === 0) {
    return (
      <div className="flex min-h-[250px] flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
        <Building2 className="h-10 w-10 text-muted-foreground/60 mb-3" />
        <p className="text-base font-medium">No rental requests found</p>
        <p className="text-sm text-muted-foreground">
          You have not submitted any rental requests yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {rentals.map((rental) => {
        const startDate = format(new Date(rental.startDate), "MMM dd, yyyy");
        const endDate = format(new Date(rental.endDate), "MMM dd, yyyy");

        return (
          <Card
            key={rental.id}
            className="flex flex-col justify-between transition-all hover:shadow-md"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono text-muted-foreground truncate">
                  ID: {rental.id.slice(0, 8)}...
                </span>
                {getStatusBadge(rental.status)}
              </div>
              <CardTitle className="text-base font-semibold mt-2 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                Property Request
              </CardTitle>
              <CardDescription className="truncate text-xs">
                Property ID: {rental.propertyId}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3 text-sm py-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4 shrink-0 text-muted-foreground/80" />
                <span className="text-xs">
                  {startDate} — {endDate}
                </span>
              </div>
            </CardContent>

            <CardFooter className="pt-3 border-t bg-muted/20">
              {rental.status === "APPROVED" && (
                <PayNowBTN id={rental.id}></PayNowBTN>
              )}

              {rental.status === "ACTIVE" && (
                <Button size="sm" variant="outline" className="w-full">
                  Leave Review
                </Button>
              )}

              {rental.status !== "APPROVED" && rental.status !== "ACTIVE" && (
                <Button size="sm" variant="ghost" disabled className="w-full">
                  No Action Required
                </Button>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default RentalReq;
