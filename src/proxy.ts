import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtutils } from "./utils/jwt";
const AUTH_ROUTES = ["/login", "/register"];
export async function proxy(request: NextRequest) {
  const pathaName = request.nextUrl.pathname;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const decoddedAccessToken = accessToken
    ? jwtutils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
    : null;

  let UserRole = null;
  if (decoddedAccessToken && decoddedAccessToken.data) {
    UserRole = decoddedAccessToken.data.role;
  }

  if (accessToken && AUTH_ROUTES.includes(pathaName)) {
    if (UserRole === "TENANT") {
      return NextResponse.redirect(new URL("/", request.url));
    } else if (UserRole === "LANDLORD") {
      return NextResponse.redirect(new URL("/", request.url));
    } else if (UserRole === "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
