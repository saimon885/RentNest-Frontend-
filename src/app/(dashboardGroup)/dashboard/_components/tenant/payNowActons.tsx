"use server";
import { cookies } from "next/headers";

export const PayNowActions = async (id: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in",
    };
  }

  try {
    const res = await fetch(
      `${process.env.SERVER_API_URL}/api/payments/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify({ id }),
      },
    );

    const data = await res.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: "Payment initialization failed",
    };
  }
};
