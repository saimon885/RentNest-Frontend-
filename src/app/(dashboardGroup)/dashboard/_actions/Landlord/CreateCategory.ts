"use server";

import { revalidateTag, revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const createCategoryAction = async (payload: { name: string }) => {
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
      `${process.env.SERVER_API_URL}/api/properties/categories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` ${accessToken}`,
        },
        body: JSON.stringify(payload),
      },
    );

    const result = await res.json();

    if (result?.success || res.ok) {
      revalidatePath("/dashboard/landlord/category");
    }

    return result;
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong while creating category.",
    };
  }
};
