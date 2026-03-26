# 🏠 Buyer Dashboard — Frontend

A modern **Next.js 13+** frontend for managing properties and favourites, built with **TypeScript**, **Tailwind CSS**, and **React Hooks**.

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 13+ | React framework with App Router |
| TypeScript | Type-safe development |
| Tailwind CSS | Utility-first styling |
| React Hooks | State & lifecycle management |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repo-url>
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔄 Example User Flow

### 🔐 Authentication

1. **Sign Up** — Register with your name, email, and password
2. **Login** — Sign in using the same credentials

### 🏘 Browse Properties

3. Navigate to the **Dashboard** to browse available properties
4. Click the **❤️ heart icon** on any property to add it to **My Favourites**

### ⭐ Manage Favourites

5. Go to **My Favourites** to view all saved properties
6. Click the **🗑 trash icon** to remove a property from your favourites

### 🚪 Logout

7. Click **Logout** in the sidebar to end your session securely

---

## 📁 Project Structure

```
buyer-dashboard-frontend/
├── app/                  # Next.js App Router pages
├── components/           # Reusable UI components
├── lib/                  # Utility functions & API helpers
├── public/               # Static assets
├── .env.local            # Environment variables (not committed)
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## ⚙️ Environment Variables

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL for the backend API | `http://localhost:5000/api` |

---

## 📌 Notes

- Ensure the **backend server** is running at the configured `NEXT_PUBLIC_API_URL` before starting the frontend.
- The `.env.local` file should **never** be committed to version control.