# Pulse

Pulse is a **SaaS analytics dashboard** for teams that want revenue, users, and workspace activity in one place.

This repo is a working product demo: a public landing page, a signed-in analytics workspace, and an admin area for organization settings. It is not connected to live billing or a production warehouse. Charts and tables use typed demo data so you can explore the UI immediately.

## What you can do

After you sign in, Pulse shows:

- **Workspace dashboard** (`/dashboard`) — KPI cards, revenue over time, user growth, customer mix, recent activity, and a searchable signups table
- **Workspace pages** — Analytics, Customers, and Reports (some of these are still placeholders)
- **Admin portal** (`/admin`) — team, billing, and organization settings (admin roles only)
- **Public site** (`/`) — product story, pricing, and FAQ

Access depends on role. Managers and viewers see the workspace. Super admins and org admins also see Administration in the sidebar.

## Tech stack

| Area | Choice |
| --- | --- |
| App | Next.js 15 (App Router), React 19, TypeScript |
| UI | Tailwind CSS v4, shadcn/ui, Recharts |
| Auth | NextAuth v5 (credentials + JWT) |
| Data | Prisma + SQLite |
| Access control | Role-based permissions (RBAC) |

Users belong to an **organization** and a **workspace**. Route protection runs in middleware, layouts, and the sidebar so people only see what their role allows.

## Run it locally

You need Node.js and npm.

```bash
npm install
npx prisma db push
npx prisma db seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other useful commands:

```bash
npm run lint
npm run build
npx prisma studio
```

## Demo accounts

The seed script creates three users. On the login page you can fill them in with one click.

| Email | Password | Role | What they can access |
| --- | --- | --- | --- |
| `nikhil@pulse.demo` | `password123` | Super Admin | Workspace + admin |
| `maya@pulse.demo` | `password123` | Manager | Workspace only |
| `viewer@pulse.demo` | `password123` | Viewer | Workspace only (read) |

You can also create an account at `/register`.

## App map

| Path | Who | Purpose |
| --- | --- | --- |
| `/` | Anyone | Marketing site |
| `/login`, `/register` | Guests | Sign in or create an account |
| `/dashboard` | Signed-in users | Main analytics overview |
| `/dashboard/analytics` | Signed-in users | Analytics (coming soon) |
| `/dashboard/customers` | Signed-in users | Customers (coming soon) |
| `/dashboard/reports` | Signed-in users | Reports (coming soon) |
| `/admin` | Admins | Admin home |
| `/admin/users` | Admins | Team members |
| `/admin/billing` | Admins | Billing |
| `/admin/settings` | Admins | Organization settings |

## Project layout

```text
prisma/                 Database schema and demo seed
src/app/(auth)/         Login and register
src/app/(dashboard)/    Workspace (sidebar shell)
src/app/(admin)/        Admin portal
src/components/         Landing, dashboard, and UI
src/lib/auth/           NextAuth
src/lib/permissions/    Roles and navigation
src/lib/data.ts         Demo KPI, revenue, and signup data
```

Dashboard charts and the signups table read from `src/lib/data.ts` and related demo modules. Auth users live in SQLite via Prisma.

## Notes

- This is a **portfolio / demo** app. Pricing is fictional; there are no real payments.
- Passwords for demo accounts are public on purpose. Do not reuse them anywhere else.
- Light and dark theme are available from the header / sidebar toggle.
