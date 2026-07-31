"use server";

import { cookies } from "next/headers";
import { ProprertyProp } from "../../_components/landlord/DeleteProperty";
import { revalidatePath } from "next/cache";

export const deleteProperty = async ({ propertyId }: ProprertyProp) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "Token not Found",
    };
  }

  try {
    const res = await fetch(
      `${process.env.SERVER_API_URL}/api/landlord/properties/${propertyId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `${accessToken}`,
        },
      },
    );

    const result = await res.json();
    revalidatePath("/dashboard/landlord");
    return result;
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong while deleting.",
    };
  }
};
