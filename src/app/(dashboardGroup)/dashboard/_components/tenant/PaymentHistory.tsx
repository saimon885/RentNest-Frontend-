import React from "react";
import { cookies } from "next/headers";
import { format } from "date-fns";
import { AlertCircle, CreditCard, Receipt } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type PaymentStatus = "COMPLETED" | "PENDING" | "FAILED" | "REFUNDED";

export type PaymentItem = {
  id: string;
  rentalRequestId: string;
  tenantId: string;
  amount: number;
  transactionId: string;
  provider: string;
  status: PaymentStatus;
  paidAt: string;
  createdAt: string;
  updatedAt: string;
};

const getStatusBadge = (status: PaymentStatus) => {
  switch (status) {
    case "COMPLETED":
      return (
        <Badge className="bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 border-emerald-200">
          Completed
        </Badge>
      );
    case "PENDING":
      return (
        <Badge className="bg-amber-500/15 text-amber-600 hover:bg-amber-500/25 border-amber-200">
          Pending
        </Badge>
      );
    case "FAILED":
      return (
        <Badge className="bg-rose-500/15 text-rose-600 hover:bg-rose-500/25 border-rose-200">
          Failed
        </Badge>
      );
    case "REFUNDED":
      return (
        <Badge className="bg-slate-500/15 text-slate-600 hover:bg-slate-500/25 border-slate-200">
          Refunded
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const PaymentHistory = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
        <AlertCircle className="h-4 w-4 shrink-0" />
        <span>User is not logged in. Please log in to view payments.</span>
      </div>
    );
  }

  let payments: PaymentItem[] = [];
  let isError = false;

  try {
    const res = await fetch(`${process.env.SERVER_API_URL}/api/payments`, {
      headers: {
        Authorization: `${accessToken}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      isError = true;
    } else {
      const result = await res.json();
      payments = result?.data || [];
    }
  } catch (error) {
    isError = true;
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
        Something went wrong while fetching payment history.
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="flex min-h-[250px] flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
        <Receipt className="h-10 w-10 text-muted-foreground/60 mb-3" />
        <p className="text-base font-medium">No payment history found</p>
        <p className="text-sm text-muted-foreground">
          You havent made any transactions yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop View: Table */}
      <div className="hidden rounded-md border md:block overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Paid Date</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-mono text-xs max-w-[180px] truncate">
                  {payment.transactionId}
                </TableCell>
                <TableCell className="text-xs font-semibold">
                  <div className="flex items-center gap-1.5">
                    <CreditCard className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{payment.provider}</span>
                  </div>
                </TableCell>
                <TableCell className="font-semibold text-sm">
                  ৳{payment.amount.toLocaleString("en-BD")}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {format(new Date(payment.paidAt), "MMM dd, yyyy — hh:mm a")}
                </TableCell>
                <TableCell className="text-right">
                  {getStatusBadge(payment.status)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile View: Cards */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {payments.map((payment) => (
          <Card key={payment.id}>
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                  <CreditCard className="h-3.5 w-3.5" />
                  {payment.provider}
                </span>
                {getStatusBadge(payment.status)}
              </div>
              <CardTitle className="text-lg font-bold mt-1">
                ৳{payment.amount.toLocaleString("en-BD")}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-1.5 text-xs">
              <div className="flex justify-between items-center text-muted-foreground">
                <span>TxID:</span>
                <span className="font-mono truncate max-w-[160px]">
                  {payment.transactionId}
                </span>
              </div>
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Date:</span>
                <span>
                  {format(new Date(payment.paidAt), "MMM dd, yyyy — hh:mm a")}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
