# 🟢 Ben 10 Universe — MERN Stack

A full-stack Ben 10 fan website built with **MongoDB, Express, React, Node.js**.

---

## 📁 Project Structure

```
ben10-mern/
├── server/                        ← Express + Node.js Backend
│   ├── index.js                   ← Server entry point
│   ├── models/
│   │   ├── Alien.js               ← Alien schema
│   │   ├── Episode.js             ← Episode series schema
│   │   ├── Game.js                ← Game schema
│   │   ├── User.js                ← User schema (with bcrypt)
│   │   └── Favourite.js           ← Favourites (user ↔ alien)
│   ├── controllers/
│   │   ├── alienController.js     ← Alien CRUD logic
│   │   ├── authController.js      ← Register / Login / Me
│   │   ├── episodeController.js   ← Episode CRUD
│   │   ├── gameController.js      ← Game CRUD
│   │   └── favouriteController.js ← Add / Remove / Get favourites
│   ├── routes/
│   │   ├── alienRoutes.js         ← /api/aliens
│   │   ├── authRoutes.js          ← /api/auth
│   │   ├── episodeRoutes.js       ← /api/episodes
│   │   ├── gameRoutes.js          ← /api/games
│   │   └── favouriteRoutes.js     ← /api/favourites
│   ├── middleware/
│   │   └── authMiddleware.js      ← JWT protect + adminOnly
│   └── config/
│       └── seed.js                ← Seed database with initial data
│
├── client/                        ← React + Vite Frontend
│   ├── index.html
│   ├── vite.config.js             ← Vite + API proxy config
│   ├── public/images/             ← All alien + slider + logo images
│   └── src/
│       ├── main.jsx               ← App entry + BrowserRouter
│       ├── App.jsx                ← Routes definition
│       ├── App.css / index.css    ← Global styles
│       ├── context/
│       │   └── AuthContext.jsx    ← Global auth state
│       ├── hooks/
│       │   └── useAliens.js       ← Custom hook for alien API calls
│       ├── utils/
│       │   └── api.js             ← Axios API helpers
│       ├── components/
│       │   ├── Navbar.jsx/.css    ← Navigation with React Router
│       │   ├── Hero.jsx/.css      ← Animated hero section
│       │   ├── AlienSlider.jsx/.css ← Alien showcase slider (homepage)
│       │   ├── AlienCard.jsx/.css ← Reusable card with favourite toggle
│       │   ├── AlienModal.jsx/.css ← Detail popup modal
│       │   └── Footer.jsx/.css    ← Footer with links
│       └── pages/
│           ├── Home.jsx           ← Hero + Slider
│           ├── AliensPage.jsx/.css ← Full alien gallery + search + filter
│           ├── EpisodesPage.jsx/.css ← All series with highlights
│           ├── GamesPage.jsx/.css ← Games grid
│           ├── LoginPage.jsx      ← Login form
│           ├── RegisterPage.jsx   ← Register form
│           ├── AuthPage.css       ← Shared auth styles
│           └── FavouritesPage.jsx/.css ← Saved aliens (protected)
│
├── package.json                   ← Root package (backend + concurrently)
├── .env                           ← Environment variables
└── .gitignore
```

---

## ⚙️ Prerequisites

Install these before starting:

- **Node.js** v18+ → https://nodejs.org
- **MongoDB** (local) → https://www.mongodb.com/try/download/community
  OR use **MongoDB Atlas** (free cloud) → https://www.mongodb.com/atlas

---

## 🚀 Installation & Setup

### Step 1 — Clone / Copy the project

```bash
# If using git
git clone <your-repo-url>
cd ben10-mern

# Or just navigate into the folder
cd ben10-mern
```

### Step 2 — Install Backend Dependencies

```bash
# In the root folder (ben10-mern/)
npm install
```

This installs: `express`, `mongoose`, `cors`, `dotenv`, `bcryptjs`, `jsonwebtoken`, `nodemon`, `concurrently`

### Step 3 — Install Frontend Dependencies

```bash
cd client
npm install
cd ..
```

This installs: `react`, `react-dom`, `react-router-dom`, `axios`, `framer-motion`, `react-icons`, `react-hot-toast`, `vite`

### Step 4 — Set up Environment Variables

Edit the `.env` file in the root folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ben10universe
JWT_SECRET=ben10omnitrix_super_secret_key_2024
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

> **Using MongoDB Atlas?** Replace `MONGO_URI` with your Atlas connection string:
> `MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/ben10universe`

### Step 5 — Add Images

Place all your images inside `client/public/images/`:
```
client/public/images/
  alien1.png  alien2.png  alien3.png
  alien4.png  alien5.png  alien6.png
  slider1.png  slider2.png  slider3.png
  slider4.png  slider5.png  slider6.png
  logo.png
```

### Step 6 — Seed the Database

```bash
# In the root folder
npm run seed
```

This populates MongoDB with:
- 6 aliens (Humungousaur, Alien X, Big Chill, Rath, Swampfire, Echo Echo)
- 4 episode series
- 4 games

### Step 7 — Run the App

```bash
# Runs BOTH backend (port 5000) + frontend (port 5173) together
npm run dev
```

OR run them separately:

```bash
# Terminal 1 — Backend only
npm run server

# Terminal 2 — Frontend only
npm run client
```

### ✅ Open in Browser

```
Frontend → http://localhost:5173
Backend API → http://localhost:5000/api/health
```

---

## 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/aliens` | — | Get all aliens |
| GET | `/api/aliens?featured=true` | — | Get featured aliens |
| GET | `/api/aliens/:id` | — | Get single alien |
| POST | `/api/aliens` | Admin | Create alien |
| PUT | `/api/aliens/:id` | Admin | Update alien |
| DELETE | `/api/aliens/:id` | Admin | Delete alien |
| GET | `/api/episodes` | — | Get all episode series |
| GET | `/api/games` | — | Get all games |
| POST | `/api/auth/register` | — | Register user |
| POST | `/api/auth/login` | — | Login user |
| GET | `/api/auth/me` | JWT | Get current user |
| GET | `/api/favourites` | JWT | Get my favourites |
| POST | `/api/favourites` | JWT | Add favourite |
| DELETE | `/api/favourites/:alienId` | JWT | Remove favourite |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **M** — Database | MongoDB + Mongoose |
| **E** — Backend | Express.js |
| **R** — Frontend | React 18 + React Router v6 |
| **N** — Runtime | Node.js |
| Auth | JWT + bcryptjs |
| Animations | Framer Motion |
| HTTP Client | Axios |
| Styling | CSS Modules (custom) |
| Icons | React Icons |
| Toasts | React Hot Toast |
| Build Tool | Vite |

---

## 🏗️ Production Build

```bash
# Build React client
npm run build

# Start production server
NODE_ENV=production npm start
```

The Express server will serve the built React app from `client/dist/`.

---

## 🌱 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start both server + client (dev mode) |
| `npm run server` | Start backend only (nodemon) |
| `npm run client` | Start frontend only (vite) |
| `npm run seed` | Seed MongoDB with initial data |
| `npm run build` | Build React client for production |
| `npm start` | Start production server |
