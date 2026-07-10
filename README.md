# Stoodeo Dashboard 🚀

A modern, highly-responsive SaaS client portal and administrative dashboard. Built with Next.js, this application offers a premium user interface for managing clients, tracking project progress, monitoring payments, and handling support tickets.

![Stoodeo Dashboard](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000&h=600)

## ✨ Features

- **Secure Authentication:** Complete login and signup flows powered by Supabase.
- **Client Management:** Add, edit, and track clients with detailed revenue and status metrics.
- **Project Tracking:** Monitor ongoing projects with progress bars, due dates, and financial data.
- **Financial Overview:** Track payments, generate records, and visualize total revenue.
- **Support Ticketing:** Built-in ticketing system to manage client requests and communication.
- **Modern UI/UX:** Built with Tailwind CSS, Lucide icons, and a custom glassmorphism design system for a premium feel.
- **Route Protection:** Next.js Middleware ensures secure routes are only accessible to authenticated administrators.

## 🛠️ Technology Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database & Auth:** [Supabase](https://supabase.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Forms & Validation:** React Hook Form + Zod
- **Deployment:** [Netlify](https://www.netlify.com/)

## 🚀 Deployment

This project is optimized for Edge deployment and is proudly hosted on **Netlify**. 

The deployment pipeline is configured to automatically build and deploy the Next.js application, utilizing Netlify Edge Functions for optimal performance and secure route middleware.

Live URL: [https://saas-cliet-dashboard.netlify.app](https://saas-cliet-dashboard.netlify.app)

## 💻 Local Development

To run this project locally, follow these steps:

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd stoodeo-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

*Built with ❤️ by Demola AI*
