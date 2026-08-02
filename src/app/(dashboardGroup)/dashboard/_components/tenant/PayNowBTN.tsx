"use client";

import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { PayNowActions } from "./payNowActons";
import { toast } from "sonner";

type prop = {
  id: string;
};

const PayNowBTN = ({ id }: prop) => {
  const [isPending, startTransition] = useTransition();

  const handlePayment = () => {
    startTransition(async () => {
      const res = await PayNowActions(id);

      if (res?.success && res?.data) {
        window.location.href = res.data;
      } else {
        toast.error(res?.message || "Something went wrong!");
      }
    });
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={isPending}
      size="sm"
      className="w-full bg-blue-600 hover:bg-blue-700"
    >
      {isPending ? "Processing..." : "Pay Now"}
    </Button>
  );
};

export default PayNowBTN;
