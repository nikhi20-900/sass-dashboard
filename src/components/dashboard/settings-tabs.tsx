"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
    <Card className="rounded-lg">
      <Tabs defaultValue="profile">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Manage workspace preferences and profile details.
          </CardDescription>
          <TabsList className="mt-4 w-fit">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="workspace">Workspace</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent>
          <TabsContent value="profile" className="mt-0">
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid max-w-xl gap-4">
              <div className="grid gap-2">
                <Label htmlFor="profile-name">Name</Label>
                <Input
                  id="profile-name"
                  {...form.register("name")}
                  aria-invalid={Boolean(form.formState.errors.name)}
                  aria-describedby={form.formState.errors.name ? "profile-name-error" : undefined}
                />
                {form.formState.errors.name ? (
                  <p id="profile-name-error" className="text-sm text-destructive">
                    {form.formState.errors.name.message}
                  </p>
                ) : null}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="profile-email">Email</Label>
                <Input
                  id="profile-email"
                  type="email"
                  {...form.register("email")}
                  aria-invalid={Boolean(form.formState.errors.email)}
                  aria-describedby={form.formState.errors.email ? "profile-email-error" : undefined}
                />
                {form.formState.errors.email ? (
                  <p id="profile-email-error" className="text-sm text-destructive">
                    {form.formState.errors.email.message}
                  </p>
                ) : null}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="profile-company">Company</Label>
                <Input
                  id="profile-company"
                  {...form.register("company")}
                  aria-invalid={Boolean(form.formState.errors.company)}
                  aria-describedby={form.formState.errors.company ? "profile-company-error" : undefined}
                />
                {form.formState.errors.company ? (
                  <p id="profile-company-error" className="text-sm text-destructive">
                    {form.formState.errors.company.message}
                  </p>
                ) : null}
              </div>
              <Button type="submit" className="w-fit">
                Save profile
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="workspace" className="mt-0 text-sm text-muted-foreground">
            Workspace defaults, roles, and access policies are ready for expansion.
          </TabsContent>
          <TabsContent value="alerts" className="mt-0 text-sm text-muted-foreground">
            Alert routing is configured for product, revenue, and success teams.
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
