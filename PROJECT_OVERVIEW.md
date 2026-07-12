# Pulse Project Overview

## What Pulse Is

Pulse is a fictional SaaS analytics product built as a complete landing page and dashboard experience. It is designed to show how a modern analytics platform could present product, revenue, user, and signup data in a polished interface.

The project has two main experiences:

- A public marketing landing page at `/`
- A private-style analytics dashboard at `/dashboard`

The app is built with a real Next.js 15 App Router setup, TypeScript, Tailwind CSS, shadcn/ui components installed through the shadcn CLI, dark mode support, mock analytics data, table interactions, form validation, dialogs, dropdowns, and toast notifications.

## What The Project Does

Pulse demonstrates a complete front-end SaaS product flow:

1. A visitor lands on the homepage and sees the Pulse brand, value proposition, feature cards, product mockup, pricing, FAQ, and footer.
2. The visitor can switch pricing between monthly and yearly billing using tabs.
3. The visitor can open the dashboard from the landing page CTA.
4. Inside the dashboard, the user sees key analytics stats, recent signups, table controls, and settings.
5. The user can search and sort recent signup data.
6. The user can open row action menus for each signup.
7. The user can delete a signup after confirming in a dialog.
8. The app shows a Sonner toast after successful delete actions.
9. The user can edit a profile form in the settings section.
10. The settings form validates input on the client using `react-hook-form` and `zod`.
11. The app shows a success toast after a valid profile save.
12. The app supports light mode, dark mode, and system theme preference through `next-themes`.

## Tech Stack

### Framework

- **Next.js 15.5.20**
  - Uses the App Router.
  - Uses server components by default.
  - Uses client components only where browser interactivity is required.
  - Uses Turbopack for development and build scripts.

### Language

- **TypeScript**
  - Used across the project.
  - Mock data is typed with interfaces in `src/lib/data.ts`.
  - Component props and table sorting types are strongly typed.

### Styling

- **Tailwind CSS v4**
  - Used for layout, spacing, colors, responsive behavior, and theme-aware styling.
  - Global theme variables are defined in `src/app/globals.css`.

### UI System

- **shadcn/ui**
  - Initialized through the official shadcn CLI.
  - Configured with `components.json`.
  - Uses the Radix-backed shadcn component library style.
  - Uses generated components from `src/components/ui`.

Installed shadcn/ui components include:

- `Button`
- `Card`
- `Dialog`
- `Dropdown Menu`
- `Tabs`
- `Table`
- `Badge`
- `Avatar`
- `Input`
- `Sonner`
- `Accordion`
- `Sheet`
- `Sidebar`
- `Separator`
- `Label`
- `Tooltip`

### Theme Handling

- **next-themes**
  - Provides light mode, dark mode, and system preference support.
  - The root HTML element uses `suppressHydrationWarning`.
  - The app uses a mounted-state theme toggle to avoid hydration mismatch.
  - Theme changes are handled through a reusable `ThemeToggle` component.

### Forms And Validation

- **react-hook-form**
  - Manages the dashboard profile form state.

- **zod**
  - Defines the validation schema for profile form fields.

- **@hookform/resolvers**
  - Connects zod validation to react-hook-form.

### Icons

- **lucide-react**
  - Used throughout the landing page, navbar, dashboard, table actions, stat cards, and sidebar.

### Toasts

- **Sonner**
  - Used for delete confirmations, row action feedback, and successful profile saves.

## Project Structure

```text
.
├── components.json
├── package.json
├── src
│   ├── app
│   │   ├── dashboard
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components
│   │   ├── dashboard
│   │   │   └── dashboard-shell.tsx
│   │   ├── landing
│   │   │   ├── landing-page.tsx
│   │   │   ├── navbar.tsx
│   │   │   └── pricing-tabs.tsx
│   │   ├── providers.tsx
│   │   ├── theme-toggle.tsx
│   │   └── ui
│   │       └── shadcn/ui generated components
│   ├── hooks
│   │   └── use-mobile.ts
│   └── lib
│       ├── data.ts
│       └── utils.ts
```

## Main Files

### `src/app/layout.tsx`

Defines the root application layout.

Responsibilities:

- Loads Geist fonts.
- Defines app metadata.
- Adds `suppressHydrationWarning` for theme support.
- Wraps the app in shared providers.
- Mounts the global Sonner toaster.

### `src/components/providers.tsx`

Defines client-side providers used across the app.

Responsibilities:

- Configures `ThemeProvider` from `next-themes`.
- Enables system theme preference.
- Disables theme transition flicker during theme changes.
- Wraps the app with `TooltipProvider`.

### `src/components/theme-toggle.tsx`

Reusable light/dark theme toggle.

Responsibilities:

- Reads the resolved theme from `next-themes`.
- Avoids hydration mismatch by waiting until the component is mounted.
- Toggles between light and dark mode.

### `src/lib/data.ts`

Contains all mock application data and TypeScript interfaces.

Includes:

- Feature cards
- Pricing tiers
- FAQ items
- Dashboard stat cards
- Recent signup rows

Types include:

- `Feature`
- `PricingTier`
- `FaqItem`
- `StatCard`
- `Signup`

## Landing Page

Route:

```text
/
```

Main files:

- `src/app/page.tsx`
- `src/components/landing/landing-page.tsx`
- `src/components/landing/navbar.tsx`
- `src/components/landing/pricing-tabs.tsx`

### Landing Page Sections

The landing page includes:

- Sticky navbar
- Pulse logo
- Desktop nav links
- Mobile Sheet menu
- Theme toggle
- CTA button
- Hero headline and supporting text
- Two hero CTA buttons
- Product mockup area
- Six feature cards
- Pricing section with three tiers
- Monthly/yearly pricing tabs
- FAQ accordion
- Footer with link columns

### Sticky Navbar

The navbar changes style when the page scrolls.

Behavior:

- Fixed to the top of the page.
- Transparent/soft background at the top.
- Gains background, border, blur, and shadow after scrolling.
- Desktop navigation uses inline links.
- Mobile navigation uses a shadcn `Sheet` with a hamburger button.

### Hero Section

The hero introduces Pulse as an analytics tool.

It contains:

- Badge
- Headline
- Product description
- Primary CTA to `/dashboard`
- Secondary demo button
- Short trust/value points
- Visual product mockup

### Features Section

Displays six responsive cards using shadcn `Card`.

Features:

- Live revenue pulse
- Journey funnels
- Smart anomaly alerts
- Global cohort lens
- Governed metrics
- Workflow context

### Pricing Section

Uses shadcn `Tabs` to switch billing cadence.

Plans:

- Starter
- Growth
- Scale

The Growth tier is marked as the most popular tier using a `Badge`.

The displayed prices change when switching between:

- Monthly
- Yearly

### FAQ Section

Uses shadcn `Accordion`.

It answers common questions about:

- Warehouse connections
- Fictional pricing
- Non-technical users
- Mock dashboard data

## Dashboard

Route:

```text
/dashboard
```

Main files:

- `src/app/dashboard/page.tsx`
- `src/components/dashboard/dashboard-shell.tsx`

### Dashboard Layout

The dashboard uses the shadcn `Sidebar` component.

Sidebar behavior:

- Collapsible desktop sidebar
- Mobile sidebar support
- Icon tooltips when collapsed
- Navigation items
- User avatar dropdown at the bottom

Sidebar nav items:

- Overview
- Analytics
- Customers
- Alerts
- Billing
- Settings

### Dashboard Header

The dashboard header includes:

- Sidebar trigger
- Home button
- Current dashboard title
- Theme toggle

### Stat Cards

The dashboard shows four stat cards:

- Revenue
- Users
- Conversion
- Active sessions

Each card includes:

- Main value
- Trend text
- Positive or negative indicator
- Badge styling

### Recent Signups Table

The recent signups table contains 15 mock rows initially.

Features:

- Search filter input
- Sortable columns
- Row action dropdown
- View action
- Edit action
- Delete action
- Confirmation dialog before deletion
- Sonner toast after deletion
- Empty state when no rows match the search

Sortable columns:

- Name
- Company
- Plan
- Status
- Joined
- Revenue

Search checks:

- Name
- Email
- Company
- Plan
- Status

### Delete Flow

The delete flow works like this:

1. User opens the row actions dropdown.
2. User clicks Delete.
3. Confirmation dialog opens.
4. User confirms deletion.
5. The row is removed from local table state.
6. A success toast appears.

### Settings Tabs

The dashboard includes a settings section using shadcn `Tabs`.

Tabs:

- Profile
- Workspace
- Alerts

The Profile tab contains a working form.

Fields:

- Name
- Email
- Company

Validation:

- Name must contain at least 2 characters.
- Email must be valid.
- Company must contain at least 2 characters.

On valid submit:

- Form state is saved locally.
- Sonner success toast appears.

## Server And Client Component Split

The project keeps route files simple and server-rendered by default.

Server-oriented files:

- `src/app/page.tsx`
- `src/app/dashboard/page.tsx`
- `src/components/landing/landing-page.tsx`

Client components are used only where browser APIs or interaction state are required.

Client files:

- `src/components/providers.tsx`
- `src/components/theme-toggle.tsx`
- `src/components/landing/navbar.tsx`
- `src/components/landing/pricing-tabs.tsx`
- `src/components/dashboard/dashboard-shell.tsx`
- Generated shadcn components that require client behavior

Client behavior includes:

- Theme toggling
- Scroll-aware navbar state
- Mobile sheet menu
- Pricing tab state
- Dashboard sidebar state
- Table sorting and searching
- Row dropdown actions
- Delete dialog state
- Toast notifications
- Form validation and submission

## How The Project Was Created From Start To Finish

### 1. Next.js Project Setup

The project was scaffolded with Next.js 15 using:

```bash
npm create next-app@15
```

The setup includes:

- TypeScript
- App Router
- Tailwind CSS
- ESLint
- `src/` directory
- Import alias using `@/*`

Because the workspace folder name contains a space, the app was first scaffolded in a temporary URL-safe folder and then copied into the final project directory without overwriting the existing Git repository.

### 2. shadcn/ui Initialization

shadcn/ui was initialized with the official CLI:

```bash
npx shadcn@latest init
```

The project uses:

- `components.json`
- Radix-backed component style
- Tailwind v4 configuration
- CSS variables
- Lucide icon library
- `@/components`, `@/lib`, `@/hooks`, and `@/components/ui` aliases

### 3. shadcn/ui Components Added

Components were installed through the shadcn CLI:

```bash
npx shadcn@latest add button card dialog dropdown-menu tabs table badge avatar input sonner accordion sheet sidebar separator label tooltip
```

This generated reusable UI components under:

```text
src/components/ui
```

### 4. Additional Dependencies Installed

The following runtime dependencies were added:

```bash
npm install next-themes react-hook-form zod @hookform/resolvers
```

Purpose:

- `next-themes` handles dark mode.
- `react-hook-form` manages dashboard form state.
- `zod` validates form data.
- `@hookform/resolvers` connects zod to react-hook-form.

### 5. Global Providers Added

The app was wrapped with:

- `ThemeProvider`
- `TooltipProvider`
- `Toaster`

This makes theme handling, tooltips, and toast notifications available throughout the app.

### 6. Mock Data Added

All mock content was placed in:

```text
src/lib/data.ts
```

This keeps the UI components cleaner and makes the data reusable.

### 7. Landing Page Built

The landing page was implemented with:

- Sticky navbar
- Hero
- Product mockup
- Features
- Pricing
- FAQ
- Footer
- Mobile responsive navigation
- Dark mode support

### 8. Dashboard Built

The dashboard was implemented with:

- shadcn Sidebar layout
- Header controls
- Stat cards
- Recent signups table
- Search and sorting
- Dropdown row actions
- Delete dialog
- Toast notifications
- Settings tabs
- Validated profile form

### 9. Validation And Runtime Checks

The app was checked with:

```bash
npm run build
```

The production build passed successfully.

Browser runtime checks confirmed:

- Landing page renders.
- Pricing tabs update prices.
- Dashboard renders.
- Recent signups table starts with 15 rows.
- Search works.
- Delete confirmation dialog opens.
- Delete action removes a row.
- Delete action fires a toast.
- Profile form validation displays errors.
- Valid profile submit fires a success toast.
- Browser console had no warnings or errors during checks.

## Available Scripts

### Start Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Dashboard:

```text
http://localhost:3000/dashboard
```

### Build For Production

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

### Run Linting

```bash
npm run lint
```

## Current Routes

```text
/            Landing page
/dashboard   Dashboard page
```

## Design Notes

Pulse uses a clean SaaS dashboard style:

- Neutral shadcn base theme
- Emerald and cyan accents
- Dense but readable dashboard layout
- Cards for repeated data units
- Sidebar-based application shell
- Responsive mobile navigation
- Theme-aware colors through CSS variables

The landing page is more expressive, while the dashboard is quieter and built for scanning, sorting, and repeated use.

## Important Implementation Details

- The app uses real generated shadcn/ui components, not hand-copied approximations.
- Dark mode respects the system preference by default.
- The root layout avoids theme hydration warnings.
- Browser-only logic is isolated to client components.
- Mock data is centralized and typed.
- Dashboard deletion only affects local client state because this is a front-end mock project.
- No real database, authentication, billing, or external API is connected.

## Future Improvements

Useful next steps could include:

- Add authentication.
- Connect the dashboard to a real database.
- Add API routes for signups and settings.
- Add pagination to the signups table.
- Add charts with a charting library.
- Add real billing flow.
- Add tests for table interactions and form validation.
- Replace mock data with live analytics events.

