import { auth } from "@/lib/auth";

export default auth((req) => {
  const isLoginPage = req.nextUrl.pathname === "/login";

  // Redirect authenticated users away from the login page
  if (req.auth && !req.auth.error && isLoginPage) {
    return Response.redirect(new URL("/", req.nextUrl.origin));
  }

  if ((!req.auth || req.auth.error) && !isLoginPage) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    const callback = req.nextUrl.pathname + req.nextUrl.search;
    // Only set callbackUrl for safe, same-origin relative paths
    if (callback.startsWith("/") && !callback.startsWith("//")) {
      loginUrl.searchParams.set("callbackUrl", callback);
    }
    if (req.auth?.error) {
      loginUrl.searchParams.set("error", req.auth.error);
    }
    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: [
    "/((?!api/auth|_next|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
