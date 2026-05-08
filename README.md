# 🏢 SW Technologies - Company Website

A modern, high-performance company website for SW Technologies, built with Next.js 16, Tailwind CSS v4, and Framer Motion.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# View production build locally
npm run build
npm start

# Format code
npm run lint
npm run format
```

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Scrolling**: Lenis Smooth Scroll
- **Validation**: Zod + React Hot Toast
- **State**: Zustand

---

## 🗂️ Project Structure

```
socialwavz/
├── app/
│   ├── api/contact/route.js    ← API for contact form persistence
│   ├── layout.js               ← Root layout (Navbar, Footer, Providers)
│   ├── page.js                 ← Homepage
│   └── (about, contact, services)/page.jsx ← Inner pages
├── components/
│   ├── home/                   ← Hero, Testimonials, WhyChooseUs
│   ├── layout/                 ← Navbar, Footer, LenisProvider
│   ├── services/               ← ServiceCards, MomentumSection
│   └── ui/                     ← Button, PageRevealer, SectionHeading
├── lib/
│   ├── data.js                 ← All static site content
│   ├── schemas.js              ← Zod validation schemas
│   └── utils.js                ← Utility helpers (cn)
├── store/
│   └── useContactStore.js      ← Zustand store for form state
├── public/                     ← Assets (images, icons, fonts)
└── enquires/
    └── data.js                 ← Local storage for form enquiries
```

---

## 📄 Pages

- **Home**: Hero intro, services overview, why choose us, and testimonials.
- **About**: Company story, mission/vision, stats, and team section.
- **Services**: Detailed service breakdown with feature checklists.
- **Contact**: Zod-validated form, location details, and map integration.

---

## 🎨 Typography

- **Display**: [Sora](https://fonts.google.com/specimen/Sora) — Used for headings and primary section titles.
- **Sans**: [Inter](https://fonts.google.com/specimen/Inter) — Used for body text, UI elements, and forms.

---

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 425px (Centered content)
- **Tablet**: 768px (Grid layouts)
- **Desktop**: 1280px+ (Full layout)

---

## 🚀 Deployment

1. Connect repository to **Vercel**.
2. Configure **Environment Variables** in the dashboard.
3. Vercel handles the build and deployment automatically on push.

---

## ✅ Pre-deploy Checklist

- [ ] `npm run build` passes with zero errors.
- [ ] Environment variables configured in production.
- [ ] OG images, Favicon, and Metadata verified.
- [ ] Contact form submission and local storage tested.
- [ ] Responsive audit completed for 320px/768px/1280px.

---

<p align="center">Made with ❤️ in Delhi, India · SW Technologies</p>
