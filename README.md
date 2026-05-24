# Netflix Clone AI

A Netflix-inspired streaming app with authentication, movie browsing, watch history, and AI-powered movie recommendations.

## Preview

### Sign In

![Sign in page](frontend/netflix_clone/public/auth.png)

### Home And Watch History

![Home page with continue watching](frontend/netflix_clone/public/history.png)

### AI Recommendations

![AI movie recommendations](frontend/netflix_clone/public/airecc.png)

## Features

- User sign up, login, logout, and session restore
- Movie browsing with TMDB data
- Continue watching history
- AI movie recommendation page
- React frontend deployed on Vercel
- Express and MongoDB backend deployed on Railway

## Tech Stack

- React
- Vite
- Tailwind CSS
- Zustand
- Express
- MongoDB
- JWT authentication

## Local Setup

Install frontend dependencies:

```bash
cd frontend/netflix_clone
npm install
npm run dev
```

Install backend dependencies:

```bash
cd backend
npm install
npm run dev
```

Frontend `.env`:

```env
VITE_API_URL=http://localhost:3001
```

Backend `.env`:

```env
CLIENT_URL=http://localhost:5173
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
