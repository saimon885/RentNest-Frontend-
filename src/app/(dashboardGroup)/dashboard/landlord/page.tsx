import { cookies } from "next/headers";
import React from "react";
import GetLandlordProperties, {
  LandlordProperty,
} from "../_components/landlord/GetLandlordProperties";

const LandlordOverview = async () => {
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
    `${process.env.SERVER_API_URL}/api/landlord/properties/my`,
    {
      headers: {
        Authorization: `${accessToken}`,
      },
      cache: "force-cache",
      next: {
        tags: ["my-properties"],
      },
    },
  );

  const result = await res.json();
  const properties: LandlordProperty[] = result?.data || [];

  return (
    <div className="w-full max-w-full px-2 my-2 space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          My Properties
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage and monitor all your listed rental properties.
        </p>
      </div>

      <GetLandlordProperties properties={properties} />
    </div>
  );
};

export default LandlordOverview;
