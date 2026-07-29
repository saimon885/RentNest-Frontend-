"use server";

export type UserRole = "TENANT" | "LANDLORD";

export type UserData = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isBanned: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UserResponse = {
  success: boolean;
  message: string;
  data?: UserData;
};

const RegisterAction = async (
  prevState: UserResponse | null,
  formData: FormData,
): Promise<UserResponse> => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password")?.toString();
  const role = formData.get("role") as UserRole;

  const payload = {
    name,
    email,
    password,
    role,
  };

  if (!name || !email || !password || !role) {
    return { success: false, message: "Field required!" };
  }

  if (password.length < 6) {
    return {
      success: false,
      message: "Password must be at least 6 characters long!",
    };
  }

  const res = await fetch(`${process.env.SERVER_API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await res.json();

  return result;
};

export default RegisterAction;
