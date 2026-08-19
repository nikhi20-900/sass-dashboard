import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { PulseLogo } from "@/components/pulse-logo";

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
    <main
      id="main-content"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden bg-background p-4 py-8 sm:py-12"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.12),transparent_70%)]" />
      <div className="mb-6 flex flex-col items-center justify-center sm:mb-8">
        <PulseLogo href="/" size="md" />
      </div>
      <div className="w-full max-w-md">
        {children}
      </div>
    </main>
  );
}
