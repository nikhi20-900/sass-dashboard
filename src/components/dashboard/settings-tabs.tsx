"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileSchema, type ProfileFormValues } from "@/lib/validators/profile";

interface SettingsUser {
  name: string;
  email: string;
}

export function SettingsTabs({ user }: { user: SettingsUser }) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      company: "Pulse Analytics",
    },
  });

  const onSubmit = (values: ProfileFormValues) => {
    toast.success(`Profile saved for ${values.name}`);
    form.reset(values);
  };

  return (
    <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
      <Tabs defaultValue="profile">
        <CardHeader className="gap-1.5 pb-2">
          <CardTitle className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
            Settings
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground sm:text-sm">
            Manage workspace preferences and profile details.
          </CardDescription>
          <TabsList className="mt-3 w-fit">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="workspace">Workspace</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent className="pt-2">
          <TabsContent value="profile" className="mt-0">
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid max-w-xl gap-4.5">
              <div className="grid gap-1.5">
                <Label htmlFor="profile-name" className="text-sm font-medium">Name</Label>
                <Input
                  id="profile-name"
                  {...form.register("name")}
                  aria-invalid={Boolean(form.formState.errors.name)}
                  aria-describedby={form.formState.errors.name ? "profile-name-error" : undefined}
                />
                {form.formState.errors.name ? (
                  <p id="profile-name-error" role="alert" className="flex items-center gap-1.5 text-xs font-medium text-destructive pt-0.5">
                    <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
                    {form.formState.errors.name.message}
                  </p>
                ) : (
                  <p className="text-[11px] text-muted-foreground">Your display name across workspace activities.</p>
                )}
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="profile-email" className="text-sm font-medium">Email</Label>
                <Input
                  id="profile-email"
                  type="email"
                  {...form.register("email")}
                  aria-invalid={Boolean(form.formState.errors.email)}
                  aria-describedby={form.formState.errors.email ? "profile-email-error" : undefined}
                />
                {form.formState.errors.email ? (
                  <p id="profile-email-error" role="alert" className="flex items-center gap-1.5 text-xs font-medium text-destructive pt-0.5">
                    <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
                    {form.formState.errors.email.message}
                  </p>
                ) : (
                  <p className="text-[11px] text-muted-foreground">Contact email for notifications and security alerts.</p>
                )}
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="profile-company" className="text-sm font-medium">Company</Label>
                <Input
                  id="profile-company"
                  {...form.register("company")}
                  aria-invalid={Boolean(form.formState.errors.company)}
                  aria-describedby={form.formState.errors.company ? "profile-company-error" : undefined}
                />
                {form.formState.errors.company ? (
                  <p id="profile-company-error" role="alert" className="flex items-center gap-1.5 text-xs font-medium text-destructive pt-0.5">
                    <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
                    {form.formState.errors.company.message}
                  </p>
                ) : (
                  <p className="text-[11px] text-muted-foreground">Organization name shown on invoices and reports.</p>
                )}
              </div>
              <Button type="submit" className="mt-1 w-fit shadow-xs">
                Save profile
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="workspace" className="mt-0 py-2 text-sm text-muted-foreground">
            Workspace defaults, roles, and access policies are ready for expansion.
          </TabsContent>
          <TabsContent value="alerts" className="mt-0 py-2 text-sm text-muted-foreground">
            Alert routing is configured for product, revenue, and success teams.
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
