# WorkPro Social Media Automation SaaS Platform
**Implementation Plan & Repository Documentation**

Welcome to the WorkPro Social Media Automation Platform. This document serves as the central source of truth for the project's current state, technical architecture, and upcoming roadmap. It is designed to help new team members quickly understand the codebase and start contributing.

---

## 🚀 1. Project Overview
WorkPro is an industry-grade, $0-cost infrastructure SaaS platform that allows users to generate, preview, and schedule AI-driven social media content across multiple platforms.

**Key Differentiators:**
- **Bring Your Own Key (BYOK) Model**: Instead of paying for AI generation, users securely supply their own Google Gemini or OpenAI API keys. The keys are encrypted at rest using AES-256-GCM.
- **Live Pixel-Perfect Previews**: Real-time component rendering for Instagram, Facebook, X (Twitter), Reddit, and TikTok.
- **High-End Design System**: Built with an elegant Olive Slate (`#363830`) and Neon Electric Lime (`#DFFF00`) palette, featuring glassmorphism, rounded containers, and fluid animations.

---

## 🏗️ 2. Technical Architecture & Structure

The project is structured as a clean, decoupled monorepo:

```text
app/
├── frontend/                     # (React 19, Vite, Tailwind CSS v4, Zustand)
│   ├── src/
│   │   ├── components/           # UI Components (AuthModal, TopNavbar, CreatorStudio, etc.)
│   │   ├── store/                # Zustand global state management (useAppStore.ts)
│   │   ├── types/                # TypeScript interface definitions
│   │   └── index.css             # Tailwind v4 theme variables & custom utilities
│   └── package.json
│
└── server/                       # (Node.js, Express, TypeScript, Prisma ORM 7)
    ├── prisma/
    │   ├── schema.prisma         # Database schema defining Users, ApiKeys, Posts, etc.
    │   └── dev.db                # Local SQLite database (better-sqlite3)
    ├── src/
    │   ├── controllers/          # Business logic (authController, keysController, contentController)
    │   ├── middleware/           # JWT Auth middleware
    │   ├── lib/                  # AES encryption helpers and Prisma singleton
    │   └── index.ts              # Express API entry point
    └── package.json
```

### Tech Stack Highlights:
- **Frontend**: Vite 6 ensures rapid hot-module reloading. Tailwind CSS v4 handles styling without extensive custom CSS files. Zustand provides a lightweight, boilerplate-free global state.
- **Backend**: Express handles routing, secured by JWT `httpOnly` cookies. Prisma ORM 7 provides end-to-end type safety against the local SQLite database.

---

## ✅ 3. Current Status: Where We Are Now

We have successfully completed **Phases 1 through 3** of the platform build. The foundational infrastructure and core UI are 100% operational.

**Completed Features:**
- [x] **Full-Stack Monorepo Scaffold**: Frontend and Backend decoupled and compiling with 0 TypeScript errors.
- [x] **Database & Auth**: Prisma schema deployed. Registration and Login flows fully functional with secure JWT cookies and Bcrypt password hashing.
- [x] **BYOK Engine**: Users can input Gemini and OpenAI keys. The backend pings the respective APIs to verify validity before encrypting and saving them to the database.
- [x] **Creator Studio**: The AI prompt generation studio is built, allowing users to select brand tones and generate 3 unique caption variations. Features distinct Caption and Image prompt generation sections.
- [x] **Multi-Platform Preview Engine**: Pixel-perfect previews built for IG, FB, X, Reddit, and TikTok.
- [x] **WorkPro Visual Theme**: Custom UI, sleek top navigation, floating dashboard viewport, and dedicated full-screen auth pages.
- [x] **Premium UI Polish**: Refactored the aesthetic to be hyper-minimalist and professional. Removed decorative emojis, implemented brand-specific styling for platform selection, and significantly expanded component spacing for a clean look.

---

## 🎯 4. Roadmap: What We Have To Do Next

As a team, our immediate next steps involve hooking up the actual external Social Media APIs and finalizing the scheduling logic.

### **Phase 4: Social Account Integrations (Priority 1)**
- **Meta Graph API**: Implement OAuth flow for users to link their Facebook Pages and Instagram Professional accounts.
- **X (Twitter) API v2**: Implement OAuth 2.0 PKCE flow for X account linking and thread publishing.
- **Reddit API**: Implement OAuth flow for subreddit publishing.
- **TikTok Developer API**: Implement connection for direct video/photo carousel publishing.

### **Phase 5: Content Calendar & Cron Jobs (Priority 2)**
- **Calendar UI**: Finalize the drag-and-drop calendar interface on the frontend so users can visualize scheduled posts.
- **Background Task Runner**: Implement a Node.js cron scheduler (e.g., `node-cron` or `bullmq`) in the `server` to check the database for upcoming posts and push them to the respective social APIs at the scheduled time.

### **Phase 6: Telemetry & Polish (Priority 3)**
- **Usage Dashboard**: Track how many API calls a user has made using their BYOK keys and display it on the frontend stat cards.
- **Media Uploads**: Allow users to upload their own images/videos to be attached to posts (currently integrating with AWS S3 or a free-tier Cloudinary setup).

---

## 💻 5. Quick Start Guide for Developers

To get the application running on your local machine:

**1. Start the Backend Server**
```bash
cd app/server
npm install
npm run dev
# The server will run on http://localhost:5000
```

**2. Start the Frontend App**
```bash
cd app/frontend
npm install
npm run dev
# The frontend will run on http://localhost:3000
```

**Note for new members**: Environment variables (`.env`) for the server are currently utilizing local defaults. Ensure your `JWT_SECRET` and `ENCRYPTION_KEY` are consistent if pulling a fresh clone.
