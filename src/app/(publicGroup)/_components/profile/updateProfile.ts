"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function updateProfileName(formData: FormData) {
  const cookkieStore = await cookies();
  const accessToken = await cookkieStore.get("accessToken")?.value;
  const name = formData.get("name") as string;

  if (!name || name.trim() === "") {
    return { success: false, error: "Name is required" };
  }

  try {
    const res = await fetch(
      `${process.env.SERVER_API_URL}/api/auth/me/update`,
      {
        method: "PATCH",
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      },
    );

    if (!res.ok) {
      return { success: false, error: "Failed to update profile" };
    }

    revalidatePath("/profile");

    return { success: true };
  } catch (error) {
    console.error("Profile update error:", error);
    return { success: false, error: "Something went wrong" };
  }
}
