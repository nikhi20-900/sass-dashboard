import { PrismaClient, Role } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create organization
  const org = await prisma.organization.upsert({
    where: { slug: "pulse" },
    update: {},
    create: {
      name: "Pulse Analytics",
      slug: "pulse",
    },
  });

  console.log(`  ✓ Organization: ${org.name}`);

  // Create default workspace
  const workspace = await prisma.workspace.upsert({
    where: {
      organizationId_slug: {
        organizationId: org.id,
        slug: "default",
      },
    },
    update: {},
    create: {
      name: "Default",
      slug: "default",
      organizationId: org.id,
    },
  });

  console.log(`  ✓ Workspace: ${workspace.name}`);

  // Seed users
  const users: {
    name: string;
    email: string;
    password: string;
    role: Role;
  }[] = [
    {
      name: "Nikhil Chhetri",
      email: "nikhil@pulse.demo",
      password: "password123",
      role: "SUPER_ADMIN",
    },
    {
      name: "Maya Patel",
      email: "maya@pulse.demo",
      password: "password123",
      role: "MANAGER",
    },
    {
      name: "Alex Viewer",
      email: "viewer@pulse.demo",
      password: "password123",
      role: "VIEWER",
    },
  ];

  for (const userData of users) {
    const passwordHash = await bcryptjs.hash(userData.password, 10);
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        name: userData.name,
        email: userData.email,
        passwordHash,
        role: userData.role,
        organizationId: org.id,
        workspaceId: workspace.id,
      },
    });
    console.log(`  ✓ User: ${user.name} (${user.role})`);
  }

  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
