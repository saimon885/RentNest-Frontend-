import React, { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import RentalReq from "../_components/tenant/RentalReq";
import PaymentHistory from "../_components/tenant/PaymentHistory";

export default function RentalsPage() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Rental Overview</h1>
        <p className="text-sm text-muted-foreground">
          Manage your rental requests and payment history from one place.
        </p>
      </div>

      <Tabs defaultValue="requests" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="requests">Rental Requests</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="mt-0">
          <Suspense fallback={<RentalSkeleton />}>
            <RentalReq />
          </Suspense>
        </TabsContent>

        <TabsContent value="history" className="mt-0">
          <Suspense fallback={<PaymentSkeleton />}>
            <PaymentHistory />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function RentalSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-48 rounded-xl border p-4 space-y-3">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-9 w-full mt-6" />
        </div>
      ))}
    </div>
  );
}

function PaymentSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-12 w-full rounded-md border p-3 flex items-center justify-between"
        >
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/6" />
          <Skeleton className="h-4 w-1/6" />
          <Skeleton className="h-6 w-16" />
        </div>
      ))}
    </div>
  );
}
