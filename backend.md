# 🔧 SW Technologies — Backend Integration Guide (Final)

> **Stack:** Next.js 14 API Routes · MongoDB Atlas · JWT (HttpOnly Cookie, 7d) · Zod · bcryptjs · RBAC
> **Deployment:** Full-stack on **Vercel** — frontend + API routes in one project, one deploy
> **Recruiter confirmed:** Next.js API Routes are fully acceptable — no separate Express server needed

---

## 📁 Complete File Structure (New Files to Add)

```
sw-technologies/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/route.js
│   │   │   ├── login/route.js
│   │   │   ├── logout/route.js
│   │   │   └── profile/route.js
│   │   ├── contact/route.js
│   │   ├── quote/route.js
│   │   ├── newsletter/route.js
│   │   └── admin/
│   │       ├── contacts/
│   │       │   ├── route.js            ← GET all
│   │       │   └── [id]/route.js       ← DELETE by id
│   │       ├── users/route.js          ← GET all
│   │       └── quotes/route.js         ← GET all
│   ├── login/page.jsx                  ← new page
│   ├── register/page.jsx               ← new page
│   └── admin/page.jsx                  ← new page (RBAC protected)
│
├── lib/
│   ├── db.js                           ← MongoDB cached connection
│   ├── jwt.js                          ← signToken / verifyToken / COOKIE_OPTIONS
│   └── schemas.js                      ← add new schemas to existing file
│
├── middleware/
│   ├── authMiddleware.js               ← requireAuth()
│   └── adminMiddleware.js              ← requireAdmin() — RBAC
│
├── models/
│   ├── User.js
│   ├── Contact.js
│   ├── Newsletter.js
│   └── Quote.js
│
├── scripts/
│   └── seedAdmin.js
│
├── next.config.js                      ← update with CORS headers
└── .env.local
```

---

## ⚙️ Environment Variables (`.env.local`)

```bash
# MongoDB Atlas — get from: Atlas → Connect → Drivers
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/sw-technologies?retryWrites=true&w=majority

# JWT — minimum 32 random characters
JWT_SECRET=sw_tech_super_secret_jwt_key_change_this_2025

# Your deployed domain — used for CORS
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> On **Vercel**: add all three in Project → Settings → Environment Variables.
> Change `NEXT_PUBLIC_APP_URL` to `https://your-project.vercel.app` after deploy.

---

## 📦 Install Dependencies

```bash
npm install mongoose bcryptjs jsonwebtoken
# zod is already installed from Round 1
```

---

## 🗄️ Collections — Exact Field Spec (as per assignment)

### 1. `users`
| Field | Type | Notes |
|-------|------|-------|
| `_id` | ObjectId | auto |
| `name` | String | required |
| `email` | String | required, unique, lowercase |
| `password` | String | bcrypt hashed — never plain text |
| `role` | String | `'user'` \| `'admin'`, default `'user'` |
| `createdAt` | Date | auto via timestamps |

### 2. `contacts`
| Field | Type | Notes |
|-------|------|-------|
| `_id` | ObjectId | auto |
| `name` | String | required |
| `email` | String | required |
| `phone` | String | optional |
| `subject` | String | required |
| `message` | String | required |
| `createdAt` | Date | auto via timestamps |

### 3. `newsletters`
| Field | Type | Notes |
|-------|------|-------|
| `_id` | ObjectId | auto |
| `email` | String | required, unique, lowercase |
| `subscribedAt` | Date | default: Date.now |

### 4. `quotes`
| Field | Type | Notes |
|-------|------|-------|
| `_id` | ObjectId | auto |
| `name` | String | required |
| `email` | String | required |
| `phone` | String | required |
| `serviceRequired` | String | required — exact field name from spec |
| `budget` | String | required |
| `message` | String | optional |
| `createdAt` | Date | auto via timestamps |

---

## 🔌 `lib/db.js` — MongoDB Cached Connection

```js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error('MONGODB_URI not set in .env.local');

let cached = global.mongoose ?? { conn: null, promise: null };
global.mongoose = cached;

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
```

---

## 🔑 `lib/jwt.js` — Token Helpers

```js
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

export function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' });   // assignment: 7 days
}

export function verifyToken(token) {
  try   { return jwt.verify(token, SECRET); }
  catch { return null; }
}

export const COOKIE_OPTIONS = {
  httpOnly: true,                                         // JS cannot read — XSS safe
  secure:   process.env.NODE_ENV === 'production',       // HTTPS only in prod
  sameSite: 'lax',
  maxAge:   7 * 24 * 60 * 60,                           // 7 days in seconds
  path:     '/',
};
```

---

## 🗃️ Mongoose Models

### `models/User.js`
```js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

// Strip password from ALL responses automatically — can never leak
userSchema.set('toJSON', {
  transform: (_, obj) => { delete obj.password; return obj; }
});

export default mongoose.models.User || mongoose.model('User', userSchema);
```

### `models/Contact.js`
```js
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name:    { type: String, required: true, trim: true },
  email:   { type: String, required: true, trim: true },
  phone:   { type: String, default: '' },
  subject: { type: String, required: true, trim: true },
  message: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Contact || mongoose.model('Contact', contactSchema);
```

### `models/Newsletter.js`
```js
import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema({
  email:        { type: String, required: true, unique: true, lowercase: true, trim: true },
  subscribedAt: { type: Date, default: Date.now },
});

// No timestamps: true — spec only lists subscribedAt, not updatedAt
export default mongoose.models.Newsletter || mongoose.model('Newsletter', newsletterSchema);
```

### `models/Quote.js`
```js
import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  name:            { type: String, required: true, trim: true },
  email:           { type: String, required: true, trim: true },
  phone:           { type: String, required: true },
  serviceRequired: { type: String, required: true },   // matches spec exactly
  budget:          { type: String, required: true },
  message:         { type: String, default: '' },
}, { timestamps: true });

export default mongoose.models.Quote || mongoose.model('Quote', quoteSchema);
```

---

## ✅ Updated Zod Schemas — Add to `lib/schemas.js`

```js
// ── Auth ──────────────────────────────────────────────────────────────────────
export const registerSchema = z.object({
  name:     z.string().min(2, 'Name must be at least 2 characters').max(50),
  email:    z.string().email('Enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must include at least one uppercase letter')
    .regex(/[0-9]/, 'Must include at least one number'),
});

export const loginSchema = z.object({
  email:    z.string().email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

// ── Quote ─────────────────────────────────────────────────────────────────────
export const quoteSchema = z.object({
  name:  z.string().min(2).max(50),
  email: z.string().email('Enter a valid email'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  serviceRequired: z.enum([          // field name matches model
    'Website Design',
    'Website Development',
    'E-Commerce Development',
    'SEO & Digital Marketing',
    'Other',
  ]),
  budget: z.enum([
    'Under ₹25K',
    '₹25K–₹50K',
    '₹50K–₹1L',
    '₹1L+',
    "Let's discuss",
  ]),
  message: z.string().max(500).optional().or(z.literal('')),
});

// ── Newsletter ────────────────────────────────────────────────────────────────
export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

// contactSchema already exists from Round 1 — no change needed
```

---

## 🛡️ Middleware

### `middleware/authMiddleware.js`
```js
import { verifyToken } from '@/lib/jwt';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * Call at top of any protected Route Handler.
 * Returns decoded payload OR NextResponse 401.
 *
 * Usage:
 *   const auth = await requireAuth();
 *   if (auth instanceof NextResponse) return auth;
 *   // auth.id / auth.email / auth.role available
 */
export async function requireAuth() {
  const token = cookies().get('auth_token')?.value;

  if (!token)
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });

  const payload = verifyToken(token);
  if (!payload)
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });

  return payload;
}
```

### `middleware/adminMiddleware.js`
```js
import { requireAuth } from './authMiddleware';
import { NextResponse } from 'next/server';

/**
 * RBAC guard — role must be 'admin'.
 */
export async function requireAdmin() {
  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;            // 401 bubble-up

  if (auth.role !== 'admin')
    return NextResponse.json({ error: 'Forbidden: admin access only' }, { status: 403 });

  return auth;
}
```

---

## 🚀 API Route Handlers

### `app/api/auth/register/route.js`
```js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { registerSchema } from '@/lib/schemas';

export async function POST(req) {
  try {
    const result = registerSchema.safeParse(await req.json());
    if (!result.success)
      return NextResponse.json(
        { error: 'Validation failed', issues: result.error.flatten().fieldErrors },
        { status: 400 }
      );

    const { name, email, password } = result.data;
    await connectDB();

    if (await User.findOne({ email }))
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });

    const hashed = await bcrypt.hash(password, 12);
    const user   = await User.create({ name, email, password: hashed });

    return NextResponse.json({ message: 'Account created successfully', user }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/auth/register]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
```

### `app/api/auth/login/route.js`
```js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { signToken, COOKIE_OPTIONS } from '@/lib/jwt';
import { loginSchema } from '@/lib/schemas';

export async function POST(req) {
  try {
    const result = loginSchema.safeParse(await req.json());
    if (!result.success)
      return NextResponse.json(
        { error: 'Validation failed', issues: result.error.flatten().fieldErrors },
        { status: 400 }
      );

    const { email, password } = result.data;
    await connectDB();

    // Need raw password field — toJSON strips it, so use lean or addSelect
    const user = await User.findOne({ email }).lean();
    if (!user || !(await bcrypt.compare(password, user.password)))
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });

    const token    = signToken({ id: user._id, email: user.email, role: user.role });
    const response = NextResponse.json({
      message: 'Login successful',
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });

    response.cookies.set('auth_token', token, COOKIE_OPTIONS);
    return response;
  } catch (err) {
    console.error('[POST /api/auth/login]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
```

### `app/api/auth/logout/route.js`
```js
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out successfully' });
  response.cookies.set('auth_token', '', {
    httpOnly: true, secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', maxAge: 0, path: '/',
  });
  return response;
}
```

### `app/api/auth/profile/route.js`
```js
import { NextResponse } from 'next/server';
import { requireAuth } from '@/middleware/authMiddleware';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

export async function GET() {
  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;

  await connectDB();
  const user = await User.findById(auth.id);
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  return NextResponse.json({ user });
}
```

### `app/api/contact/route.js`
```js
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Contact from '@/models/Contact';
import { contactSchema } from '@/lib/schemas';

export async function POST(req) {
  try {
    const result = contactSchema.safeParse(await req.json());
    if (!result.success)
      return NextResponse.json(
        { error: 'Validation failed', issues: result.error.flatten().fieldErrors },
        { status: 400 }
      );

    await connectDB();
    const contact = await Contact.create(result.data);
    return NextResponse.json(
      { message: "Thanks! We'll get back to you within 24 hours.", contact },
      { status: 201 }
    );
  } catch (err) {
    console.error('[POST /api/contact]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
```

### `app/api/quote/route.js`
```js
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Quote from '@/models/Quote';
import { quoteSchema } from '@/lib/schemas';

export async function POST(req) {
  try {
    const result = quoteSchema.safeParse(await req.json());
    if (!result.success)
      return NextResponse.json(
        { error: 'Validation failed', issues: result.error.flatten().fieldErrors },
        { status: 400 }
      );

    await connectDB();
    const quote = await Quote.create(result.data);
    return NextResponse.json(
      { message: "Quote received! We'll send a proposal within 48 hours.", quote },
      { status: 201 }
    );
  } catch (err) {
    console.error('[POST /api/quote]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
```

### `app/api/newsletter/route.js`
```js
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Newsletter from '@/models/Newsletter';
import { newsletterSchema } from '@/lib/schemas';

export async function POST(req) {
  try {
    const result = newsletterSchema.safeParse(await req.json());
    if (!result.success)
      return NextResponse.json(
        { error: result.error.flatten().fieldErrors.email?.[0] || 'Invalid email' },
        { status: 400 }
      );

    await connectDB();

    const exists = await Newsletter.findOne({ email: result.data.email });
    if (exists)
      return NextResponse.json({ error: 'You are already subscribed!' }, { status: 409 });

    await Newsletter.create({ email: result.data.email });
    return NextResponse.json(
      { message: "You're subscribed! Welcome to SW Technologies updates." },
      { status: 201 }
    );
  } catch (err) {
    console.error('[POST /api/newsletter]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
```

### Admin Routes

**`app/api/admin/contacts/route.js`**
```js
import { NextResponse } from 'next/server';
import { requireAdmin } from '@/middleware/adminMiddleware';
import { connectDB } from '@/lib/db';
import Contact from '@/models/Contact';

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;
  await connectDB();
  const contacts = await Contact.find({}).sort({ createdAt: -1 });
  return NextResponse.json({ contacts });
}
```

**`app/api/admin/contacts/[id]/route.js`**
```js
import { NextResponse } from 'next/server';
import { requireAdmin } from '@/middleware/adminMiddleware';
import { connectDB } from '@/lib/db';
import Contact from '@/models/Contact';

export async function DELETE(_, { params }) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;
  await connectDB();
  const deleted = await Contact.findByIdAndDelete(params.id);
  if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ message: 'Deleted successfully' });
}
```

**`app/api/admin/users/route.js`**
```js
import { NextResponse } from 'next/server';
import { requireAdmin } from '@/middleware/adminMiddleware';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;
  await connectDB();
  const users = await User.find({}).sort({ createdAt: -1 }); // toJSON strips passwords
  return NextResponse.json({ users });
}
```

**`app/api/admin/quotes/route.js`**
```js
import { NextResponse } from 'next/server';
import { requireAdmin } from '@/middleware/adminMiddleware';
import { connectDB } from '@/lib/db';
import Quote from '@/models/Quote';

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;
  await connectDB();
  const quotes = await Quote.find({}).sort({ createdAt: -1 });
  return NextResponse.json({ quotes });
}
```

---

## 🌱 Admin Seed Script (`scripts/seedAdmin.js`)

```js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

config({ path: '.env.local' });

const schema = new mongoose.Schema({
  name: String, email: { type: String, unique: true },
  password: String, role: { type: String, default: 'user' },
}, { timestamps: true });

const User = mongoose.models?.User || mongoose.model('User', schema);

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  const email    = 'admin@swtech.dev';
  const password = 'Admin@SW2025';

  if (await User.findOne({ email })) {
    console.log('Admin already exists:', email);
    return process.exit(0);
  }

  await User.create({ name: 'SW Admin', email, password: await bcrypt.hash(password, 12), role: 'admin' });

  console.log('─'.repeat(40));
  console.log('✅ Admin created');
  console.log('   Email   :', email);
  console.log('   Password:', password);
  console.log('─'.repeat(40));
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
```

Add to `package.json` scripts:
```json
"seed:admin": "node --experimental-vm-modules scripts/seedAdmin.js"
```

```bash
# Run once locally with your live Atlas connection string in .env.local
npm run seed:admin
```

---

## 🌐 CORS — `next.config.js`

Since frontend and API are on the **same domain on Vercel**, CORS is a non-issue for normal usage. Add this anyway for Postman testing and future flexibility:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin',  value: process.env.NEXT_PUBLIC_APP_URL || '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

---

## 🖥️ Frontend Wiring

### Zustand Store (`store/useAuthStore.js`)
```js
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user:    null,      // { id, name, email, role }
  loading: true,

  setUser:   (user)    => set({ user, loading: false }),
  clearUser: ()        => set({ user: null, loading: false }),
}));
```

### `AuthProvider` in `app/layout.jsx`
```jsx
'use client';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

export function AuthProvider({ children }) {
  const { setUser, clearUser } = useAuthStore();

  useEffect(() => {
    fetch('/api/auth/profile')
      .then(r => r.ok ? r.json() : null)
      .then(d => d ? setUser(d.user) : clearUser())
      .catch(clearUser);
  }, []);

  return <>{children}</>;
}
```

### Navbar update
```jsx
const { user, clearUser } = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  await fetch('/api/auth/logout', { method: 'POST' });
  clearUser();
  router.push('/');
  router.refresh();
};

// Render in navbar JSX:
{user ? (
  <div className="flex items-center gap-3">
    <span className="text-sm text-slate-300">Hi, {user.name.split(' ')[0]}</span>
    {user.role === 'admin' && (
      <Link href="/admin" className="text-xs text-brand-400 hover:text-brand-300">
        Admin Panel
      </Link>
    )}
    <button onClick={handleLogout}
            className="text-sm text-slate-400 hover:text-red-400 transition-colors">
      Logout
    </button>
  </div>
) : (
  <div className="flex items-center gap-2">
    <Link href="/login"    className="text-sm text-slate-400 hover:text-white">Login</Link>
    <Link href="/register" className="text-sm bg-brand-500 hover:bg-brand-600 text-white
                                      px-3 py-1.5 rounded-lg transition-colors">
      Register
    </Link>
  </div>
)}
```

### Contact Form (wire existing form to `/api/contact`)
```jsx
const res  = await fetch('/api/contact', {
  method:  'POST',
  headers: { 'Content-Type': 'application/json' },
  body:    JSON.stringify(validatedData),    // from Zod safeParse
});
const data = await res.json();
res.ok ? setStatus('success') : setStatus('error');
setMessage(data.message || data.error);
```

### Quote Modal (note `serviceRequired` field name)
```jsx
const payload = {
  name, email, phone,
  serviceRequired: selectedService,    // ← must match model field name
  budget:          selectedBudget,
  message,
};
const res = await fetch('/api/quote', {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});
if (res.ok) { setStatus('success'); setTimeout(() => setOpen(false), 2500); }
```

### Newsletter Footer
```jsx
const res  = await fetch('/api/newsletter/subscribe', {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email }),
});
const data = await res.json();
setIsError(!res.ok);
setMessage(data.message || data.error);
if (res.ok) setEmail('');
```

---

## 🛡️ Admin Page (`app/admin/page.jsx`) — key logic

```jsx
'use client';
// RBAC redirect — runs on every render
useEffect(() => {
  if (!loading && (!user || user.role !== 'admin')) router.replace('/');
}, [user, loading]);

// Fetch per tab
useEffect(() => {
  if (!user || user.role !== 'admin') return;
  fetch(`/api/admin/${tab}`)
    .then(r => r.json())
    .then(d => setData(d[tab] || []));
}, [tab, user]);

// Fixed columns per tab — shows only spec-defined fields
const COLUMNS = {
  contacts: ['name', 'email', 'phone', 'subject', 'message', 'createdAt'],
  users:    ['name', 'email', 'role', 'createdAt'],
  quotes:   ['name', 'email', 'phone', 'serviceRequired', 'budget', 'message', 'createdAt'],
};
```

---

## 🗺️ API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | Public | Register, bcrypt hash password |
| POST | `/api/auth/login` | Public | Login, sets HttpOnly JWT cookie (7d) |
| POST | `/api/auth/logout` | Public | Clears cookie |
| GET  | `/api/auth/profile` | User | Returns logged-in user |
| POST | `/api/contact` | Public | Save contact form |
| POST | `/api/quote` | Public | Save quote request |
| POST | `/api/newsletter/subscribe` | Public | Subscribe email |
| GET  | `/api/admin/contacts` | Admin | All contact submissions |
| DELETE | `/api/admin/contacts/:id` | Admin | Delete submission |
| GET  | `/api/admin/users` | Admin | All registered users |
| GET  | `/api/admin/quotes` | Admin | All quote requests |

---

## 🚀 Deployment on Vercel (Step by Step)

### 1. MongoDB Atlas Setup
```
1. atlas.mongodb.com → Create free M0 cluster
2. Database Access → Add user with password
3. Network Access → Add IP → 0.0.0.0/0 (allow all — needed for Vercel)
4. Connect → Drivers → copy the connection string
   Replace <password> with your actual DB password
```

### 2. Push to GitHub
```bash
git add .
git commit -m "feat: add full backend integration"
git push origin main
```

### 3. Deploy on Vercel
```
1. vercel.com → New Project → Import your GitHub repo
2. Framework: Next.js (auto-detected)
3. Root Directory: ./ (default)
4. Add Environment Variables:
     MONGODB_URI         → your Atlas connection string
     JWT_SECRET          → sw_tech_super_secret_jwt_key_change_this_2025
     NEXT_PUBLIC_APP_URL → https://your-app.vercel.app
5. Click Deploy
```

### 4. Seed Admin (run once locally pointing at live Atlas)
```bash
# .env.local must point to your live Atlas cluster
npm run seed:admin
```

### 5. Test Live Endpoints
```bash
# Contact form
curl -X POST https://your-app.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","subject":"Hello","message":"This is a test message for validation"}'

# Newsletter
curl -X POST https://your-app.vercel.app/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Admin (will return 401 without cookie — expected)
curl https://your-app.vercel.app/api/admin/contacts
```

---

## ✅ Full Implementation Checklist

**Foundation**
- [ ] `npm install mongoose bcryptjs jsonwebtoken`
- [ ] `.env.local` with all 3 variables
- [ ] `lib/db.js` + `lib/jwt.js`
- [ ] All 4 models created
- [ ] Zod schemas updated in `lib/schemas.js`
- [ ] Both middleware files created

**Auth API + Frontend**
- [ ] 4 auth route handlers
- [ ] `store/useAuthStore.js`
- [ ] `AuthProvider` in `app/layout.jsx`
- [ ] `app/login/page.jsx`
- [ ] `app/register/page.jsx`
- [ ] Navbar updated (user name + logout + admin link)

**Forms API**
- [ ] `/api/contact/route.js` — ContactForm wired
- [ ] `/api/quote/route.js` — Quote modal wired (`serviceRequired` field)
- [ ] `/api/newsletter/route.js` — Footer input wired

**Admin**
- [ ] 4 admin route handlers
- [ ] `npm run seed:admin` executed
- [ ] `app/admin/page.jsx` with 3-tab table
- [ ] RBAC tested: non-admin → 403, non-auth → 401

**Deployment**
- [ ] Atlas cluster created, IP `0.0.0.0/0` whitelisted
- [ ] GitHub push → Vercel deploy
- [ ] Env vars set on Vercel
- [ ] All 11 endpoints tested on live URL
- [ ] Admin panel tested on live URL
- [ ] README updated with admin credentials

---

## 🔐 Security Summary

| Rule | Why It Matters |
|------|----------------|
| JWT in HttpOnly cookie | JS cannot read it — immune to XSS token theft |
| `bcrypt.hash(pw, 12)` | ~250ms/hash — brute force resistant |
| `toJSON` strips password | Can never appear in any API response |
| Zod on client + server | Client = UX; server = security boundary |
| `requireAdmin()` server-side | RBAC enforced in API, not just hidden in UI |
| `secure: true` in production | Cookie only sent over HTTPS on Vercel |

---

## 📝 README Credentials Block

Add to your project README:

```markdown
## 🔑 Admin Credentials

| Field    | Value              |
|----------|--------------------|
| Email    | admin@swtech.dev   |
| Password | Admin@SW2025       |
| Role     | admin              |

Admin Panel: https://your-app.vercel.app/admin
```
