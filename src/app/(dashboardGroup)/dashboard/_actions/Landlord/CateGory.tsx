"use server";

import { cookies } from "next/headers";

export const GetCategory = async () => {
  const cookieStore = await cookies();
  const accessToken = await cookieStore.get("accessToken")?.value;

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
  return result;
};
