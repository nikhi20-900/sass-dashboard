import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Create account | Pulse",
  description: "Create a new Pulse Analytics account.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
