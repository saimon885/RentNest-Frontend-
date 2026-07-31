"use server";

import { cookies } from "next/headers";

export const GetMyProfile = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  //   console.log(accessToken);
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
    cache: "no-store",
  });
  const result = await res.json();
  return result;
};
