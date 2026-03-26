# 🏠 Buyer Portal — Full Stack

A full-stack **Buyer Portal** application for browsing and managing property favourites. Built with a **Next.js 13+** frontend and a **Node.js + Express** backend, connected via JWT cookie-based authentication.

---

## 📦 Monorepo Structure

```
buyer-portal/
├── buyer-dashboard-frontend/   # Next.js 13+ frontend
└── buyer-portal-backend/       # Node.js + Express backend
```

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| Next.js 13+ | React framework with App Router |
| TypeScript | Type-safe development |
| Tailwind CSS | Utility-first styling |
| React Hooks | State & lifecycle management |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | Server & REST API |
| TypeScript | Type-safe development |
| JWT (jsonwebtoken) | Secure authentication tokens |
| Joi | Request body validation |
| Cookie-parser | HTTP-only cookie handling |
| CORS | Cross-origin request support |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm v9+
- Backend and frontend running simultaneously

---

### 1. Clone the Repository

```bash
git clone [<repo-url>](https://github.com/Ashimpaudel09/buyer-portal)
cd buyer-portal
```

---

### 2. Backend Setup

```bash
cd buyer-portal-backend
npm install
```

Create a `.env` file:

```env
PORT=5000
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

Start the backend:

```bash
npm run dev
```

Backend runs at → [http://localhost:5000](http://localhost:5000)

---

### 3. Frontend Setup

```bash
cd buyer-dashboard-frontend
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at → [http://localhost:3000](http://localhost:3000)

---

## 🌐 CORS Configuration

The backend is configured to accept credentialed requests from the frontend:

```ts
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
```

> The frontend must send cookies with every authenticated request.

---

## 🔐 Authentication Flow

```
Client                          Backend
  │                                │
  │── POST /login ────────────────▶│
  │   { email, password }          │ Verify credentials
  │                                │ Sign JWT with JWT_SECRET
  │◀── Set-Cookie: token=<jwt> ───│ Store in HTTP-only cookie
  │                                │
  │── POST /favourite ────────────▶│
  │   Cookie: token=<jwt>          │ authenticateToken middleware
  │   { propertyId: 123 }          │ Verify JWT → attach userId
  │                                │ Joi validates propertyId
  │◀── 200 OK ────────────────────│ Save favourite
```

1. **Login** — Client posts credentials; backend returns a signed JWT in an HTTP-only cookie
2. **Middleware** — `authenticateToken` reads and verifies the cookie on every protected request
3. **Protected Routes** — `userId` is always sourced from the JWT, never from client input

---

## 🔄 User Flow

| Step | Action |
|---|---|
| 1 | **Sign Up** — Register with name, email, and password |
| 2 | **Login** — Sign in to receive a JWT cookie |
| 3 | **Browse** — View available properties in the Dashboard |
| 4 | **Favourite** — Click ❤️ to save a property |
| 5 | **View Favourites** — Go to My Favourites to see saved properties |
| 6 | **Remove** — Click 🗑 to remove a property from favourites |
| 7 | **Logout** — Click Logout in the sidebar to end the session |

---

## ⚙️ Environment Variables

### Backend — `.env`

| Variable | Description | Example |
|---|---|---|
| `PORT` | Server port | `5000` |
| `JWT_SECRET` | JWT signing secret | `supersecretkey` |
| `NODE_ENV` | Environment mode | `development` |

### Frontend — `.env.local`

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:5000/api` |

---

## 📜 Available Scripts

### Backend

| Command | Description |
|---|---|
| `npm run dev` | Start with hot reload |
| `npm run build` | Compile TypeScript |
| `npm run start` | Start production server |

### Frontend

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🔒 Security Notes

- JWTs are stored in **HTTP-only cookies** — not accessible via JavaScript, preventing XSS
- `userId` is always derived from the verified JWT, never from client-submitted data
- Joi validation guards all endpoints against malformed payloads
- `.env` and `.env.local` files must **never** be committed to version control
