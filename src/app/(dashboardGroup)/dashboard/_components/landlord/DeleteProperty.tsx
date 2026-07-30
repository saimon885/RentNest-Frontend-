"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React from "react";
import Swal from "sweetalert2";
import { deleteProperty } from "../../_actions/Landlord/DeletePropertyAction";

export type ProprertyProp = {
  propertyId: string;
};

const DeleteProperty = ({ propertyId }: ProprertyProp) => {
  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this property!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      const res = await deleteProperty({ propertyId });

      if (res?.success) {
        Swal.fire({
          title: "Deleted!",
          text: res?.message || "Property has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: res?.message || res?.messege || "Failed to delete property.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div>
      <Button
        onClick={handleDelete}
        variant="destructive"
        size="sm"
        className="flex-1 h-8 text-xs font-medium cursor-pointer"
      >
        <Trash2 className="h-3.5 w-3.5 mr-1" />
        Delete
      </Button>
    </div>
  );
};

export default DeleteProperty;
