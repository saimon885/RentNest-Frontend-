"use client";

import React, { useActionState, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PropertyData } from "../../properties/[id]/page";
import CreateRentalaction from "./CreateRentalaction";
import { toast } from "sonner";

type prop = {
  property: PropertyData;
};

const RentalReqButton = ({ property }: prop) => {
  const [open, setOpen] = useState(false);

  const [state, action, isPending] = useActionState(CreateRentalaction, null);

  useEffect(() => {
    if (state?.success && open) {
      toast.success("Request Submit.");
      setOpen(false);
    }
  }, [state, open]);

  return (
    <>
      <Button
        disabled={!property.isAvailable}
        onClick={() => setOpen(true)}
        className="w-full font-semibold py-5 rounded-lg shadow-2xs cursor-pointer text-sm"
        size="default"
      >
        {property.isAvailable ? "Request Booking" : "Not Available"}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select Rental Dates</DialogTitle>
          </DialogHeader>

          <form action={action} className="space-y-4 pt-2">
            {/* Property ID Hidden Field */}
            <input type="hidden" name="propertyId" value={property.id} />

            <div className="space-y-1">
              <label className="text-sm font-medium">Start Date</label>
              <Input type="date" name="startDate" required />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">End Date</label>
              <Input type="date" name="endDate" required />
            </div>

            {state?.message && !state?.success && (
              <p className="text-xs text-destructive">{state.message}</p>
            )}

            <Button type="submit" disabled={isPending} className="w-full mt-2">
              {isPending ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RentalReqButton;
