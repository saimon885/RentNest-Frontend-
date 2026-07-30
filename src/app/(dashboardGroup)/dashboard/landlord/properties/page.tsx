// app/dashboard/landlord/create-property/page.tsx
import { cookies } from "next/headers";
import React from "react";
import CreatePropertyForm from "../../_components/landlord/CreatePropertyForm";

const Createproperty = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return (
      <div className="p-6 text-center text-sm text-destructive">
        User not logged in
      </div>
    );
  }

  const res = await fetch(
    `${process.env.SERVER_API_URL}/api/properties/categories`,
    {
      cache: "no-store",
    },
  );

  const result = await res.json();
  const categories = result?.data || [];

  return (
    <div className="w-full py-2 p-2  max-w-full space-y-6">
      <CreatePropertyForm categories={categories} />
    </div>
  );
};

export default Createproperty;
