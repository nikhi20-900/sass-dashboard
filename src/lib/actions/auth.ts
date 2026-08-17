"use server";

import bcryptjs from "bcryptjs";
import { AuthError } from "next-auth";
import { Prisma } from "@prisma/client";
import { signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { loginSchema, registerSchema } from "@/lib/validators/auth";

export interface AuthActionResult {
  error?: string;
}

function isNextRedirect(error: unknown): boolean {
  if (typeof error === "object" && error !== null) {
    if ("digest" in error && typeof (error as { digest: unknown }).digest === "string") {
      return (error as { digest: string }).digest.startsWith("NEXT_REDIRECT");
    }
    if ("message" in error && typeof (error as { message: unknown }).message === "string") {
      return (error as { message: string }).message.includes("NEXT_REDIRECT");
    }
  }
  return false;
}

/**
 * Register a new user.
 * Creates a VIEWER with no org/workspace assignment.
 */
export async function registerUser(
  _prevState: AuthActionResult | undefined,
  formData: FormData
): Promise<AuthActionResult | undefined> {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { name, email, password } = parsed.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "Unable to create account. Please try again or sign in." };
    }

    const passwordHash = await bcryptjs.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: "VIEWER",
        organizationId: null,
        workspaceId: null,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { error: "Unable to create account. Please try again or sign in." };
    }
    console.error("Register database error:", error);
    return { error: "Unable to create account. Please check your connection and try again." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (isNextRedirect(error)) {
      throw error;
    }
    if (error instanceof AuthError) {
      return { error: "Failed to sign in automatically. Please head to the login page." };
    }
    console.error("Auto sign-in error after registration:", error);
    return { error: "Account created! Please sign in with your credentials." };
  }
}

/**
 * Log in an existing user.
 */
export async function loginUser(
  _prevState: AuthActionResult | undefined,
  formData: FormData
): Promise<AuthActionResult | undefined> {
  const raw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (isNextRedirect(error)) {
      throw error;
    }
    if (error instanceof AuthError) {
      return { error: "Invalid email or password. Please check your credentials." };
    }
    console.error("Login server error:", error);
    return { error: "Unable to sign in right now. Please try again." };
  }
}

/**
 * Log out the current user.
 */
export async function logoutUser(): Promise<void> {
  await signOut({ redirectTo: "/" });
}
