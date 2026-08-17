import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign in | Pulse",
  description: "Sign in to your Pulse Analytics account.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <LoginForm />;
}
