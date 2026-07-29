"use server";

import { cookies } from "next/headers";

export const LogOutUser = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
};
