Ecommerce Fullstack Design

A full-stack eCommerce web application built as part of an internship project. Features a React frontend, Node.js/Express REST API, MongoDB database, and JWT-based authentication with role-based access control.

---

Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Routes](#routes)
- [Deployment](#deployment)

---

Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router v6, Tailwind CSS v4, Axios |
| Backend | Node.js, Express 5 |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| Build Tool | Vite 7 |
| Deployment | Railway (Nixpacks) |

---

Project Structure

```
ecommerce-fullstack-design/
├── client/
│   └── src/
│       ├── Pages/
│       │   ├── Home.jsx
│       │   ├── productListing.jsx
│       │   ├── productDetails.jsx
│       │   ├── Cart.jsx
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   └── Admin/
│       │       ├── AdminDashboard.jsx
│       │       ├── AdminProducts.jsx
│       │       ├── AdminInquiries.jsx
│       │       └── ProductForm.jsx
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── InquiryModal.jsx
│       │   └── ProtectedRoute.jsx
│       ├── context/
│       │   ├── AuthContext.jsx
│       │   └── CartContext.jsx
│       └── services/
│           └── api.js
│
└── server/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    │   └── auth.js
    ├── createAdmin.js
    ├── seed.js
    └── index.js
```

---

Getting Started

Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)

1. Clone the Repository

```bash
git clone https://github.com/farzeen-code/ecommerce-fullstack-design.git
cd ecommerce-fullstack-design
```

2. Backend Setup

```bash
cd server
npm install
npm run dev
```

Server runs on `http://localhost:5000`.

3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

Client runs on `http://localhost:5173`.

4. Seed the Database (Optional)

```bash
# Seed sample products
node server/seed.js

# Create an admin user
node server/createAdmin.js
```

---

Environment Variables

Create a `.env` file inside `server/`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
```

---

API Reference

Auth — `/api/auth`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/register` | Register a new user | No |
| POST | `/login` | Login, returns JWT | No |
| GET | `/me` | Get current user | Yes |

Products — `/api/products`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/` | List all products | No |
| GET | `/:id` | Get single product | No |
| POST | `/` | Create product | Admin |
| PUT | `/:id` | Update product | Admin |
| DELETE | `/:id` | Delete product | Admin |

Newsletter — `/api/newsletter`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/subscribe` | Subscribe with email | No |

Inquiries — `/api/inquiries`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/` | Submit an inquiry | No |
| GET | `/` | List all inquiries | Admin |

---

Routes

| Path | Page | Access |
|---|---|---|
| `/` | Home | Public |
| `/products` | Product Listing | Public |
| `/product/:id` | Product Detail | Public |
| `/cart` | Cart | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/admin` | Admin Dashboard | Admin only |
| `/admin/products` | Manage Products | Admin only |
| `/admin/products/new` | Add Product | Admin only |
| `/admin/products/edit/:id` | Edit Product | Admin only |
| `/admin/inquiries` | Manage Inquiries | Admin only |

Admin routes are protected via `ProtectedRoute`, which checks the JWT and verifies `role: "admin"`.

---

Deployment

Configured for [Railway](https://railway.app) via `railway.json`:

```json
{
  "build": { "builder": "NIXPACKS" },
  "deploy": {
    "startCommand": "cd server && npm start",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

For the frontend, build and deploy to any static host (Vercel, Netlify, etc.):

```bash
cd client
npm run build
```

Update `CLIENT_URL` in the server environment to match the deployed frontend URL.



Author

Farzeen — [github.com/farzeen-code](https://github.com/farzeen-code)
