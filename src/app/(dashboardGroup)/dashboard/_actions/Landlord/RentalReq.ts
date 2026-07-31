"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
interface RentalProp {
  id: string;
  status: string;
}

export const rentalReq = async ({ id, status }: RentalProp) => {
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
      `${process.env.SERVER_API_URL}/api/landlord/requests/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify({ status }),
      },
    );

    const result = await res.json();
    revalidatePath("/dashboard/landlord/requests");
    return result;
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong while updating property.",
    };
  }
};
