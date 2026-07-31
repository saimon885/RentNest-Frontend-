import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtutils } from "./utils/jwt";
const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = ["/", "/properties"];
export async function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const decoddedAccessToken = accessToken
    ? jwtutils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
    : null;

  let UserRole = null;
  if (decoddedAccessToken && decoddedAccessToken.data) {
    UserRole = decoddedAccessToken.data.role;
  }

  if (accessToken && AUTH_ROUTES.includes(pathName)) {
    if (UserRole === "TENANT") {
      return NextResponse.redirect(new URL("/", request.url));
    } else if (UserRole === "LANDLORD") {
      return NextResponse.redirect(new URL("/", request.url));
    } else if (UserRole === "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  // authenticated routes
  const isPublicRoutes = PUBLIC_ROUTES.some((route) => {
    return pathName === route || pathName.startsWith(route + "/");
  });

  const isAuthRoutes = AUTH_ROUTES.some(
    (routes) => pathName === routes || routes.startsWith(routes + "/"),
  );

  if (!accessToken && !isPublicRoutes && !isAuthRoutes) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathName);
    return NextResponse.redirect(loginUrl);
  }

  // Authorized Route access
  if (pathName.startsWith("/dashboard/tenant") && UserRole !== "TENANT") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (pathName.startsWith("/dashboard/admin") && UserRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (
    pathName.startsWith("/dashboard/landlord") &&
    UserRole !== "LANDLORD"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
