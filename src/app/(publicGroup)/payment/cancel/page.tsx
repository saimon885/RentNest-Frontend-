import React from "react";
import Link from "next/link";
import { XCircle, RefreshCw, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CancelPay = () => {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center p-4">
      <Card className="w-full max-w-md border-border/40 shadow-xl">
        <CardContent className="flex flex-col items-center p-8 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <XCircle className="h-10 w-10" />
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Payment Cancelled
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Your payment process was cancelled or was not completed. No charges
            were made.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3">
            <Link href="/dashboard/tenant" className="w-full">
              <Button className="w-full font-medium" size="lg">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </Link>

            <Link href="/dashboard" className="w-full">
              <Button
                variant="outline"
                className="w-full font-medium"
                size="lg"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CancelPay;
