"use server";

import { cookies } from "next/headers";

export const GetMyProfile = async () => {
  const cookieStore = await cookies();
  const accessToken = await cookieStore.get("accessToken")?.value;
  console.log(accessToken);
  if (!accessToken) {
    return {
      success: false,
      messege: "User not loged in",
    };
  }
  const res = await fetch(`${process.env.SERVER_API_URL}/api/auth/me`, {
    headers: {
      Authorization: `${accessToken}`,
    },
  });
  const result = await res.json();
  return result;
};
