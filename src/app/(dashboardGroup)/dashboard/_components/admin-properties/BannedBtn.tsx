"use client";

import { Button } from "@/components/ui/button";
import { Ban, CheckCircle2, Loader2 } from "lucide-react";
import React, { useTransition } from "react";
import { toast } from "sonner";
import { ButtonStatus } from "./_actions/BanBActions";

type bannedprop = {
  id: string;
  isBanned: boolean;
};

const BannedBtn = ({ id, isBanned }: bannedprop) => {
  const [isPending, startTransition] = useTransition();

  const handleToggleBan = () => {
    startTransition(async () => {
      const res = await ButtonStatus({
        id,
        payload: { isBanned: !isBanned },
      });

      if (res?.success) {
        toast.success(
          res?.message ||
            `User ${isBanned ? "unbanned" : "banned"} successfully`,
        );
      } else {
        toast.error(res?.message || "Failed to update status");
      }
    });
  };

  return (
    <Button
      onClick={() => handleToggleBan()}
      disabled={isPending}
      size="sm"
      variant={isBanned ? "outline" : "destructive"}
      className="h-8 text-xs font-medium cursor-pointer min-w-[80px]"
    >
      {isPending ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : isBanned ? (
        <>
          <CheckCircle2 className="mr-1 h-3.5 w-3.5 text-emerald-600" />
          Unban
        </>
      ) : (
        <>
          <Ban className="mr-1 h-3.5 w-3.5" />
          Ban
        </>
      )}
    </Button>
  );
};

export default BannedBtn;
