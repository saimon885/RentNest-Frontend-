"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export type ReviewPayload = {
  propertyId: string;
  comment: string;
  rating: number;
};

export const createReview = async (payload: ReviewPayload) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "Authentication token missing.",
    };
  }

  try {
    const res = await fetch(`${process.env.SERVER_API_URL}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken.startsWith("Bearer ")
          ? accessToken
          : `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result?.success || res.ok) {
      revalidatePath(`/properties/${payload.propertyId}`);
      revalidatePath("/dashboard/tenant/rentals");
    }

    return result;
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong while submitting review.",
    };
  }
};
