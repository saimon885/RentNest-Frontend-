"use server";

import { cookies } from "next/headers";

export type RentalActionState = {
  success: boolean;
  message: string;
} | null;

export async function CreateRentalaction(
  previousState: RentalActionState,
  formData: FormData,
) {
  const cookieStore = await cookies();
  const accessToken = await cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    return {
      success: false,
      messege: "User not loged in",
    };
  }
  const propertyId = formData.get("propertyId") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const payload = {
    propertyId,
    startDate,
    endDate,
  };

  const res = await fetch(`${process.env.SERVER_API_URL}/api/rentals`, {
    method: "POST",
    headers: {
      Authorization: `${accessToken}`,
      "content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await res.json();
  return result;
}

export default CreateRentalaction;
