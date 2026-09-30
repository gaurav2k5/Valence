# Valence

Valence is a modern web application built with Next.js, Tailwind CSS, and Framer Motion. It provides a beautiful and interactive platform for users to connect, collaborate on projects, and discover new opportunities.

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS (v4)
- **Animations:** Framer Motion for fluid, interactive micro-animations
- **Authentication:** NextAuth.js (v5 / Auth.js)
- **Database:** Drizzle ORM with Neon (PostgreSQL)
- **Icons:** Lucide React
- **Email:** Nodemailer

## 🌟 Key Features

- **Engaging Landing Page:** Dynamic hero sections with rich 3D-like and video backgrounds, features overview, testimonials, and interactive pricing.
- **User Dashboard:** Comprehensive hub for managing projects, viewing activity feeds, and quick actions with a sleek sidebar layout.
- **Authentication:** Secure login and signup flows with visual flair.
- **Project Management:** Seamlessly create, view, and manage your projects.
- **Discovery Engine:** Find talented people and exciting projects to collaborate with.
- **Messaging:** Built-in interface for user-to-user communication.
- **Premium UI/UX:** Prioritizes high-end aesthetics, vibrant colors, glassmorphism, and responsive design.

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/valence.git
   cd valence
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and configure the required keys:
   ```env
   AUTH_SECRET="your-nextauth-secret" # Run `npx auth secret` to generate one
   DATABASE_URL="your-neon-postgres-url"
   # Add other required environment variables (e.g. SMTP settings)
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

- `/src/app`: Next.js App Router pages (Dashboard, Auth, Landing) and API routes.
- `/src/components`: Reusable UI components grouped by domain (Dashboard, Auth, Landing Page sections).
- `/src/db`: Drizzle ORM schema definitions and database connection setup.
- `/src/lib`: Shared utility functions.
- `/public`: Static assets, images, and video backgrounds.

## 🎨 Design Philosophy
Valence is designed to wow users from the first glance. It leverages best practices in modern web design, utilizing harmonious color palettes, modern typography, smooth gradients, and interactive hover states. The interface is built to feel responsive and alive, encouraging user interaction and engagement.

## 🚀 Deployment

Deploying to Vercel is the easiest and most seamless option:
1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com/) and import your repository.
3. Configure your environment variables in the Vercel dashboard.
4. Click Deploy.

Vercel will automatically handle the build and deployment process, updating your site whenever you push to the `main` branch.
