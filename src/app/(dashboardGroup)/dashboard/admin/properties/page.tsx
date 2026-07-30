// app/dashboard/admin/properties/page.tsx
import { cookies } from "next/headers";
import React from "react";

import { Building } from "lucide-react";
import PropertiesCard, {
  Property,
} from "../../_components/admin-properties/PropertiesCard";

const AllProperties = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.SERVER_API_URL}/api/admin/properties`,
    {
      headers: {
        Authorization: `${accessToken}`,
      },
      cache: "no-store",
    },
  );

  const result = await res.json();
  const properties: Property[] = result?.data || [];

  return (
    <div className="w-full max-w-full space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          All Properties
        </h1>
        <p className="text-sm text-muted-foreground">
          View and manage all listed properties across the platform.
        </p>
      </div>

      {properties.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {properties.map((property) => (
            <PropertiesCard
              key={property.id || property._id}
              property={property}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 border border-dashed rounded-lg text-center bg-card">
          <Building className="h-10 w-10 text-muted-foreground mb-3" />
          <h3 className="text-lg font-semibold">No Properties Found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            There are currently no properties listed in the system.
          </p>
        </div>
      )}
    </div>
  );
};

export default AllProperties;
