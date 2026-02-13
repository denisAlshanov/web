import { auth } from "@/lib/auth";

export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  const isLoginPage = pathname === "/login";
  const isAuthErrorPage = pathname === "/auth-error";
  const isPublicPage = isLoginPage || isAuthErrorPage;

  // Redirect authenticated users away from login and auth-error pages
  if (req.auth && !req.auth.error && isPublicPage) {
    return Response.redirect(new URL("/", req.nextUrl.origin));
  }

  // Redirect users with BackendAuthError to /auth-error
  if (req.auth?.error === "BackendAuthError" && !isAuthErrorPage) {
    return Response.redirect(new URL("/auth-error", req.nextUrl.origin));
  }

  // Only BackendAuthError users may access /auth-error; others go to /login
  if (isAuthErrorPage && req.auth?.error !== "BackendAuthError") {
    return Response.redirect(new URL("/login", req.nextUrl.origin));
  }

  if ((!req.auth || req.auth.error) && !isPublicPage) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    const callback = pathname + req.nextUrl.search;
    // Only set callbackUrl for safe, same-origin relative paths
    if (callback.startsWith("/") && !callback.startsWith("//") && pathname !== "/api" && !pathname.startsWith("/api/") && !pathname.includes("\\") && !pathname.includes("%5C") && !pathname.includes("%5c")) {
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
