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
    <main id="main-content" className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="mb-8">
        <PulseLogo href="/" size="md" />
      </div>
      {children}
    </main>
  );
}
