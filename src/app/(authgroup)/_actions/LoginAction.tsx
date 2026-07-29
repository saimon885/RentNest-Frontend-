"use server";

export type LoginResponse = {
  success: boolean;
  message: string;
};

const LoginAction = async (
  prevState: LoginResponse | null,
  formData: FormData,
): Promise<LoginResponse> => {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  const payload = { email, password };

  if (!email || !password) {
    return { success: false, message: "Email and password must be required!" };
  }

  console.log("Login Action Payload:", payload);

  try {
    return {
      success: true,
      message: "Login Successful!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }
};

export default LoginAction;
