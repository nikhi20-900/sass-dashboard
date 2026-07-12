import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <Link
        href="/"
        className="mb-8 flex items-center gap-2"
        aria-label="Pulse home"
      >
        <span className="grid size-10 place-items-center rounded-lg bg-emerald-500 text-sm font-semibold text-white shadow-sm shadow-emerald-500/25">
          P
        </span>
        <span className="text-xl font-semibold tracking-tight">Pulse</span>
      </Link>
      {children}
    </div>
  );
}
