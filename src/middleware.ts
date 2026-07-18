import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/lib/auth/auth.config";
import { hasAnyPermission, ADMIN_PERMISSIONS } from "@/lib/permissions/rbac";
import type { Role } from "@prisma/client";

const { auth } = NextAuth(authConfig);

/**
 * Route protection middleware.
 * Uses Edge-compatible auth config only — no Prisma.
 * Permission checks use the centralized RBAC module (pure TypeScript, Edge-safe).
 */
export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isAuthenticated = !!req.auth?.user;
  const userRole = req.auth?.user?.role as Role | undefined;

  // Auth pages — redirect to dashboard if already authenticated
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
    }
    return NextResponse.next();
  }

  // Dashboard routes — require authentication
  if (pathname.startsWith("/dashboard")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
    }
    return NextResponse.next();
  }

  // Admin routes — require authentication + admin permissions
  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
    }

    if (!userRole || !hasAnyPermission(userRole, ADMIN_PERMISSIONS)) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
    }

    return NextResponse.next();
  }

  // Custom API routes — require authentication
  // (NextAuth API routes at /api/auth are excluded by the matcher below)
  if (pathname.startsWith("/api")) {
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - api/auth (NextAuth handlers)
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public assets
     */
    "/((?!api/auth|_next/static|_next/image|favicon\\.ico).*)",
  ],
};
