# 🏢 SW Technologies - Full Stack Agency Website

A premium, full-stack company website for SW Technologies, built with Next.js 16 (App Router), MongoDB Atlas, and Framer Motion. This project features a complete backend integration with authentication, role-based access control, and persistent data storage.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables (.env)
# MONGODB_URI=your_mongodb_uri
# JWT_SECRET=your_secret
# NODE_ENV=development

# Seed Admin User
npm run seed:admin

# Start development server
npm run dev
```

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: MongoDB Atlas (via Mongoose)
- **Auth**: JWT in HttpOnly Cookies + bcryptjs
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion + Lenis Smooth Scroll
- **Validation**: Zod (Frontend & Backend)
- **State**: Zustand

---

## 🔒 Backend & Security

- **Authentication**: Custom JWT-based auth flow with secure HttpOnly cookie storage (7-day expiry).
- **Security**: Passwords hashed using `bcryptjs` with 12 salt rounds.
- **RBAC**: Role-based access control implemented via custom middleware for protected admin routes.
- **Validation**: Strict schema validation using Zod on both client and server to ensure data integrity.

### 📡 API Endpoints

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| POST | `/api/auth/register` | User registration | Public |
| POST | `/api/auth/login` | Secure login (Sets Cookie) | Public |
| POST | `/api/auth/logout` | Clears auth cookie | Public |
| GET | `/api/auth/profile` | Returns current user info | Protected |
| POST | `/api/contact` | Submits contact form | Public |
| POST | `/api/quote` | Submits quote request | Public |
| POST | `/api/newsletter/subscribe` | Email newsletter subscription | Public |
| GET | `/api/admin/contacts` | List all contact enquiries | Admin Only |
| DELETE | `/api/admin/contacts/:id` | Delete a contact enquiry submission | Admin Only |
| GET | `/api/admin/users` | List all registered users | Admin Only |
| GET | `/api/admin/quotes` | List all quote requests | Admin Only |

---

## 🗂️ Project Structure

```
sw-technologies/
├── app/
│   ├── admin/                  ← Protected Admin Dashboard
│   ├── login/                  ← User Authentication (Login)
│   ├── register/               ← User Registration
│   ├── about/                  ← Company Information
│   ├── contact/                ← Contact Form & Details
│   ├── services/               ← Service Offerings
│   ├── api/                    ← Backend API Routes
│   ├── profile/                ← User Profile Dashboard
│   ├── layout.js               ← Global Layout & Providers
│   └── page.js                 ← Homepage
├── components/                 ← Modular React Components
│   ├── home/                   ← Hero, Testimonials, Overview
│   ├── layout/                 ← Navbar, Footer, providers
│   ├── services/               ← Service-specific components
│   └── ui/                     ← Reusable UI elements
├── lib/                        ← Core Utilities & Shared Logic
│   ├── db.js                   ← MongoDB/Mongoose connection
│   ├── models/                 ← Database Schemas
│   ├── jwt.js                  ← Token handling logic
│   ├── schemas.js              ← Zod validation schemas
│   └── data.js                 ← Static content & link data
├── middleware/                 ← Custom Auth & RBAC logic
├── store/                      ← Global State (Zustand)
│   ├── useAuthStore.js         ← User auth & loading state
│   ├── useContactStore.js      ← Contact form management
│   └── useQuoteStore.js        ← Quote modal state
└── scripts/                    ← Maintenance & Setup scripts
```

---

## 🚀 Deployment

The project is designed to be deployed as a single full-stack application on **Vercel**.
1. Connect repository to Vercel.
2. Add `MONGODB_URI` and `JWT_SECRET` to Environment Variables.
3. Vercel automatically scales the API routes and serves the frontend.

---

## ✅ Pre-deploy Checklist

- [ ] `npm run build` passes with zero errors.
- [ ] Environment variables configured in Vercel dashboard.
- [ ] MongoDB Atlas IP Whitelist configured.
- [ ] Admin user seeded in the production database.
- [ ] Responsive audit completed for 320px/768px/1280px.

---

## 🔑 Admin Access (For Testing)

To explore the admin dashboard and protected routes, use the following credentials:
- **Email**: `admin@swtech.dev`
- **Password**: `Admin@SW2026`

---

<p align="center">Made with ❤️ in Delhi, India · SW Technologies</p>
