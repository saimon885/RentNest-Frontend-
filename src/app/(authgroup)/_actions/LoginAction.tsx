"use server";

import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";

export type LoginResponse = {
  success: boolean;
  message: string;
};

const LoginAction = async (
  redirectTo: string,
  prevState: LoginResponse | null,
  formData: FormData,
): Promise<LoginResponse> => {
  const email = formData.get("email");
  const password = formData.get("password")?.toString();
  const payload = { email, password };

  if (!email || !password) {
    return { success: false, message: "Email and password are required!" };
  }

  let redirectUrl = "";

  try {
    const res = await fetch(`${process.env.SERVER_API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok || !result.success || !result?.data?.accessToken) {
      return {
        success: false,
        message: result?.message || "Invalid email or password!",
      };
    }
    const cookieStore = await cookies();
    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });

    const deccodedToken = jwt.decode(result.data.accessToken) as JwtPayload;
    if (
      redirectTo &&
      typeof redirectTo === "string" &&
      redirectTo.startsWith("/") &&
      !redirectTo.startsWith("//")
    ) {
      redirectUrl = redirectTo;
    } else if (deccodedToken?.role === "TENANT") {
      redirectUrl = "/dashboard/tenant";
    } else if (deccodedToken?.role === "LANDLORD") {
      redirectUrl = "/dashboard/landlord";
    } else if (deccodedToken?.role === "ADMIN") {
      redirectUrl = "/dashboard/admin";
    }
  } catch (error) {
    console.error("Login Error:", error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
  if (redirectUrl) {
    redirect(redirectUrl);
  }

  return { success: true, message: "Login Successful" };
};

export default LoginAction;
