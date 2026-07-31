// app/dashboard/landlord/create-property/page.tsx
import { cookies } from "next/headers";
import React from "react";
import CreatePropertyForm from "../../_components/landlord/CreatePropertyForm";
import { GetCategory } from "../../_actions/Landlord/CateGory";

const Createproperty = async () => {
  const result = await GetCategory();
  const categories = result?.data || [];

  return (
    <div className="w-full py-2 p-2  max-w-full space-y-6">
      <CreatePropertyForm categories={categories} />
    </div>
  );
};

export default Createproperty;
