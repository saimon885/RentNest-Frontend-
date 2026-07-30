"use server";

import { cookies } from "next/headers";
export interface PropertyPayload {
  title: string;
  description: string;
  location: string;
  pricePerMonth: number;
  categoryId: string;
  amenities: string[];
  images: string[];
}

type CrProp = {
  payload: PropertyPayload;
};
export const crateProperty = async ({ payload }: CrProp) => {
  const cookieStore = await cookies();
  const accessToken = await cookieStore.get("accessToken")?.value;
  console.log(payload);
  if (!accessToken) {
    return {
      success: false,
      messege: "Token not Found",
    };
  }
  const res = await fetch(
    `${process.env.SERVER_API_URL}/api/landlord/properties`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
      body: JSON.stringify(payload),
    },
  );
  const result = await res.json();
  return result;
};
