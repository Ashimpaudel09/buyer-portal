# 🔧 Buyer Portal — Backend

A **Node.js + TypeScript** backend for the Buyer Portal, providing JWT-based authentication and routes for managing user favourites.

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express | Web framework |
| TypeScript | Type-safe development |
| JWT (jsonwebtoken) | Secure authentication tokens |
| Joi | Request validation |
| Cookie-parser | JWT storage via HTTP-only cookies |
| CORS | Cross-origin request handling |

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` :

```env
PORT=5000
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

| Variable | Description |
|---|---|
| `JWT_SECRET` | Secret key used to sign and verify JWTs |
| `PORT` | Port the backend server listens on |
| `NODE_ENV` | Environment mode (`development` / `production`) |

### 3. Run in Development

```bash
npm run dev
```

Server will start at [http://localhost:5000](http://localhost:5000).

---

## 🌐 CORS Setup

The frontend runs on `http://localhost:3000`. The backend is configured to allow credentialed requests from this origin:

```ts
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
```

> **Note:** The frontend must send credentials (cookies) with every authenticated request.

---

## 🔐 Authentication Flow

### 1. Login — `POST /login`

- Client sends `email` and `password`
- Backend verifies credentials
- JWT is signed with `JWT_SECRET` and stored in an **HTTP-only cookie**
- Response returns user info (`name`, `role`)

### 2. Middleware — `authenticateToken`

- Reads the `token` from the request cookie
- Verifies the JWT using `JWT_SECRET`
- Extracts `userId` and attaches it to `req.user`
- Returns `401` if the token is missing or invalid

### 3. Protected Routes

All protected routes use the `authenticateToken` middleware and access the authenticated user via `req.user.userId`.

**Example:** `/favourite` route

---

## ✅ Request Validation

- **Joi** schemas validate all incoming request bodies
- Only client-supplied fields are validated (e.g., `propertyId`)
- `userId` is **never** accepted from the client — it is always sourced from the verified JWT

---

## 📌 Example: Add Favourite Flow

1. User logs in → receives JWT stored in HTTP-only cookie
2. Client sends:

```http
POST /favourite
Content-Type: application/json
Cookie: token=<jwt>

{
  "propertyId": 123
}
```

3. `authenticateToken` middleware verifies the JWT → attaches `userId` to `req.user`
4. Joi validates `propertyId`
5. Backend saves the favourite for `req.user.userId`

---

## 📁 Project Structure

```
buyer-portal-backend/
├── src/
│   ├── routes/         # Express route handlers
│   ├── middleware/     # Auth middleware (authenticateToken)
│   ├── validation/     # Joi schemas
│   └── index.ts        # App entry point
├── .env                # Environment variables (not committed)
├── .env.example        # Environment variable template
├── tsconfig.json       # TypeScript configuration
└── package.json
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm run start` | Start compiled production server |

---

## 🔒 Security Notes

- JWTs are stored in **HTTP-only cookies** — inaccessible to JavaScript, preventing XSS attacks
- `userId` is always derived from the verified JWT, never from client input
- Joi validation guards against malformed or unexpected payloads