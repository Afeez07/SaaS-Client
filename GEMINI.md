# Demola AI - Admin Dashboard & Landing Page (Vibe-Coded Prototype)

## Project Overview
This project is a modern, highly interactive Admin Dashboard and Marketing Landing Page built for **Demola AI**. It is a Next.js (App Router) web application that serves as a premium, "vibe-coded" product.

Originally a frontend-only mockup, the application has recently started integrating real backend services. It now features a real **Supabase** database connection for managing client data, and integrates the **Resend API** for sending actual emails from the contact form.

## Technical Stack
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS v4 (with custom CSS variables in `globals.css` for branding)
- **Icons**: `lucide-react`
- **Charts**: `recharts`
- **Database / Auth**: `@supabase/ssr`, `@supabase/supabase-js`
- **Email**: `resend` (via Next.js Server Actions)

## What Has Been Accomplished
We have successfully built a massive suite of features:

1. **Marketing Landing Page (`/`)**: A gorgeous, Dribbble-quality landing page featuring smooth scrolling navigation, dynamic UI mockups, and highly polished "Use Cases", "Features", and "Pricing" sections tailored to an Analytics platform.
2. **Contact Page (`/contact`)**: A fully functional enterprise contact form that physically dispatches emails via a Resend Server Action (`src/app/contact/actions.ts`), complete with loading states and success animations.
3. **Authentication UI (`/login`, `/signup`)**: Polished authentication screens. *Note: Supabase auth logic is built in `actions.ts`, but the middleware is currently configured to bypass auth checks so the dashboard can be previewed without an account.*
4. **Clients (`/dashboard/clients`)**: A robust data table connected to a live **Supabase** database. Features full CRUD (Create, Read, Update, Delete) interacting with the backend, alongside a currency formatting utility for the revenue field.
5. **Main Dashboard (`/dashboard`)**: Features interactive Recharts (line and donut), dynamic filtering, and mock "Users" and "Locations" lists.
6. **Other Mocked Dashboard Routes**: Mail, Documents, Users, Customer Reviews, and Settings all feature highly interactive, state-driven UI prototypes that feel native and premium.

## Instructions for Future AI Models

If you are picking up this project to continue development, please adhere to the following guidelines:

### 1. Understanding the Current Architecture
- **Supabase Integration**: We have started wiring up Supabase. The `clients` page uses `@supabase/supabase-js` to fetch and mutate real data. `middleware.ts` contains the Supabase SSR auth logic, but it is **currently commented out/bypassed** to allow easy prototyping. If you need to secure the routes, re-enable the middleware checks.
- **Email Integration**: The `/contact` form uses a Next.js Server Action with the `resend` SDK. Ensure the `RESEND_API_KEY` in `.env.local` is present for it to work. Due to free-tier limits, it sends test emails to the verified account owner.
- **Local State**: Many routes (like `/mail` and `/reviews`) still rely on local React `useState`. If asked to make these functional, wire them up to Supabase just like the `/clients` route.

### 2. Styling and Aesthetics
This app was "vibe-coded" to look premium, sleek, and modern.
- **Colors**: Rely heavily on the Tailwind `slate` palette for layout (`slate-50` background, `slate-800`/`900` text) and use the custom `--brand` CSS variable (defined in `globals.css`) for primary accents. Avoid primary blue/red generic colors; use `emerald-500` for success/growth and `rose-500` for destructive/decline actions.
- **Animations**: Many interactive elements use Tailwind's `animate-in`, `fade-in`, and `zoom-in-95` to create smooth, native-feeling dropdowns and modals. Preserve these micro-interactions.

### 3. Component Architecture
- Reusable UI elements (Buttons, Inputs, Cards, Badges, Modals/Dialogs) are manually constructed in `src/components/ui/`. If you need a new UI primitive, check there first before building from scratch.
- Icons must strictly be imported from `lucide-react`.

### 4. Layout Structure
- The overarching dashboard shell is defined in `src/app/dashboard/layout.tsx`, which imports the `Sidebar` and `Header`.
- Page content should be wrapped in the existing container structures to maintain consistent max-widths and padding.
