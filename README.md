<div align="center">

# 🏠 RentNest — Modern House Rental Application

  ![RentNest Home Page](https://i.ibb.co.com/PvQQtYFH/Screenshot-2026-08-01-153618.png)

  <br />

  [![Live Demo](https://img.shields.io/badge/Live%20Demo-RentNest-emerald?style=for-the-badge&logo=vercel)](https://rent-nest-gamma.vercel.app)
  [![Frontend Repo](https://img.shields.io/badge/Frontend-Repository-blue?style=for-the-badge&logo=github)](https://github.com/saimon885/RentNest-Frontend-)
  [![Backend Repo](https://img.shields.io/badge/Backend-Repository-black?style=for-the-badge&logo=github)](https://github.com/saimon885/RentNest-Backend_B7A4)

  <p align="center">
    <b>A full-stack, enterprise-grade rental property management ecosystem designed to seamlessly connect Tenants, Landlords, and Administrators.</b>
  </p>

</div>

---

## 📖 Overview

**RentNest** bridges the gap between property owners and modern home seekers. It simplifies real estate browsing with full-text search, multi-criteria nested filters, dynamic server-side pagination, role-based dashboards, and a secure automated Stripe payment gateway for rental transactions.

---

## ✨ Core Features & Highlights

### 👤 Multi-Role Dashboard Architecture
* **Tenant Interface:** Browse verified properties, apply advanced search filters, send single-click rental applications, track application status, and process monthly rent payments securely.
* **Landlord Management:** Manage listings, add properties with nested category links, and review or approve pending tenant requests.
* **Admin Control Center:** Manage global user access (Role updates, Ban/Unban capabilities), audit platform listings, and supervise transaction health.

### 🔍 Search, Advanced Filter & Dynamic Pagination
* **Nested Category Querying:** Case-insensitive search supported by Prisma relations (`category.name`).
* **Multi-Param Filtering:** Instant filtering by Location, Price Range (`minPrice`, `maxPrice`), Category, and Keyword Search (`searchTerm`).
* **Server-Side Pagination:** Integrated dynamic pagination metadata (`page`, `limit`, `totalPage`) for fast loading and low memory overhead.

### 🛡️ Authentication & Enterprise Security
* **Role-Based Access Control (RBAC):** Strict middleware-level page and API protection (`TENANT`, `LANDLORD`, `ADMIN`).
* **Secure Tokens:** JWT Authentication delivered via secure, `HTTP-Only` cookies to prevent XSS attacks.

### 💳 Stripe Automated Checkout
* Automated rental agreement status updates triggered upon successful Stripe Checkout events.

---

## 🛠️ Tech Stack

### **Frontend**
* **Framework:** Next.js (App Router, Server Actions, Dynamic Routes)
* **Language:** TypeScript
* **Styling:** Tailwind CSS, Lucide Icons, Shadcn UI Components
* **State & Forms:** React `useActionState`, `useTransition`, `useSearchParams`
* **Notifications:** Sonner / React Hot Toast

### **Backend**
* **Runtime:** Node.js
* **Framework:** Express.js
* **ORM:** Prisma ORM
* **Database:** PostgreSQL
* **Language:** TypeScript
* **Payment Gateway:** Stripe API

---

## 💼 Case Study: Technical Challenges & Solutions

### 1. Complex Relational Querying in Prisma
* **Challenge:** Filtering properties using category names (`category.name`) caused Type Errors and broken queries due to category being a Prisma Relation Object rather than a flat string.
* **Solution:** Refactored the Prisma query engine to utilize nested relation queries (`category: { name: { equals, mode: 'insensitive' } }`) while gracefully supporting direct relational IDs (`categoryId`).

### 2. URL-Driven Dynamic Pagination & Filtering Synchronization
* **Challenge:** Keeping search parameters, filters, page state, and server fetch hooks synchronized without triggering multiple unnecessary re-renders.
* **Solution:** Implemented Next.js dynamic `searchParams` parsing with `URLSearchParams` on the Server Component level. Paired this with a clean client-side Pagination component using `usePathname` and `useSearchParams` for instant routing updates.

### 3. Page Hydration & Parameter Mapping Fix
* **Challenge:** Parameter payload misconfigurations (e.g., mapping `page` value into the `name` query parameter) resulted in broken API meta calculations and silent pagination UI failures.
* **Solution:** Unified search parameter handling across the API route and server actions, enforcing strict parameter parsing for pagination `meta` objects.

---

## 🔗 API Integration Overview

| Module | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/auth/register` | Registers a new user (`TENANT` or `LANDLORD`) |
| **Auth** | `POST` | `/api/auth/login` | Authenticates and sets HTTP-Only JWT |
| **Properties** | `GET` | `/api/properties` | Dynamic search, nested filtering & paginated fetch |
| **Properties** | `GET` | `/api/properties/:id` | Fetches single property & landlord profile |
| **Landlord** | `POST` | `/api/landlord/properties` | Creates new listing with categories and amenities |
| **Rentals** | `POST` | `/api/rentals` | Submits rental application request |
| **Payments** | `POST` | `/api/payments/create` | Initiates Stripe Checkout session |
| **Admin** | `PATCH` | `/api/admin/users/:id` | Updates user permissions, status, or roles |

---

## ⚙️ Local Setup & Installation

### Prerequisites
* **Node.js:** `v18.x` or higher
* **PostgreSQL:** Local or hosted instance (e.g., Neon / Supabase)
* **npm** or **yarn**

### 1. Clone Repositories
```bash
# Clone Backend
git clone [https://github.com/saimon885/RentNest-Backend_B7A4.git](https://github.com/saimon885/RentNest-Backend_B7A4.git)
cd RentNest-Backend_B7A4
npm install

# Clone Frontend
git clone [https://github.com/saimon885/RentNest-Frontend-.git](https://github.com/saimon885/RentNest-Frontend-.git)
cd RentNest-Frontend-
npm install