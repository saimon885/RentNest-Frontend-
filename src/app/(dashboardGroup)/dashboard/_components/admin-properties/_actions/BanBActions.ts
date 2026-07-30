"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

type btnProp = {
  id: string;
  payload: { isBanned: boolean };
};

export const ButtonStatus = async ({ id, payload }: btnProp) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    const res = await fetch(
      `${process.env.SERVER_API_URL}/api/admin/users/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify(payload),
      },
    );

    const result = await res.json();
    revalidatePath("/dashboard/admin/users");
    return result;
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
