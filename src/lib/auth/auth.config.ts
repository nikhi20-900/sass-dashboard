import type { NextAuthConfig } from "next-auth";
import type { Role } from "@/lib/permissions/rbac";
import Credentials from "next-auth/providers/credentials";

/**
 * Edge-compatible auth configuration.
 * DO NOT import Prisma or any Node.js-only modules here.
 * This file is imported by middleware.ts which runs in Edge Runtime.
 */
export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // The actual authorize function is overridden in auth.ts
      // This stub is needed for the Edge-compatible config
      authorize: () => null,
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
        token.organizationId = user.organizationId;
        token.workspaceId = user.workspaceId;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as Role;
      session.user.organizationId = (token.organizationId as string) ?? null;
      session.user.workspaceId = (token.workspaceId as string) ?? null;
      return session;
    },
  },
};
