"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

interface UpdatePayload {
  title: string;
  description: string;
  location: string;
  pricePerMonth: number;
  amenities: string[];
  images: string[];
  categoryId: string;
}

interface EditPropParams {
  id: string;
  payload: UpdatePayload;
}

export const editProperty = async ({ id, payload }: EditPropParams) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "Authentication token missing.",
    };
  }

  try {
    const res = await fetch(
      `${process.env.SERVER_API_URL}/api/landlord/properties/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify(payload),
      },
    );

    const result = await res.json();
    revalidatePath("/dashboard/landlord");
    return result;
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong while updating property.",
    };
  }
};
