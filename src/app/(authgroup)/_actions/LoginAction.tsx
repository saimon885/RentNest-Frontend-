"use server";

import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";

export type LoginResponse = {
  success: boolean;
  message: string;
};

const LoginAction = async (
  prevState: LoginResponse | null,
  formData: FormData,
): Promise<LoginResponse> => {
  const email = formData.get("email");
  const password = formData.get("password")?.toString();

  const payload = { email, password };

  if (!email || !password) {
    return { success: false, message: "Email and password must be required!" };
  }

  const res = await fetch(`${process.env.SERVER_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await res.json();
  if (result.success) {
    const cookieStore = await cookies();
    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });
  }
  const deccodedToken = jwt.decode(result.data.accessToken) as JwtPayload;
  //   console.log(deccodedToken);
  if (deccodedToken.role === "TENANT") {
    redirect("/dashboard/tenant");
  } else if (deccodedToken.role === "LANDLORD") {
    redirect("/dashboard/landlord");
  } else if (deccodedToken.role === "ADMIN") {
    redirect("/dashboard/admin");
  }
  return result;
};

export default LoginAction;
