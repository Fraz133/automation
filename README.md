# WorkPro Social Media Automation SaaS Platform

## Project Overview

WorkPro is an industry-grade infrastructure SaaS platform designed to streamline social media content creation. It allows users to generate, preview, and schedule AI-driven content across multiple platforms, focusing on clean design and robust technical architecture.

A core differentiator is the Bring Your Own Key (BYOK) model. Instead of paying ongoing subscription fees for AI usage, users securely provide their own Google Gemini or OpenAI API keys. All keys are encrypted at rest using AES-256-GCM.

## Key Features

- **BYOK AI Integration**: Secure local and remote encryption for user-provided Gemini and OpenAI keys.
- **Creator Studio**: Advanced prompt studios separated for Text Captions and Visual Images, supporting multiple brand tones.
- **Multi-Platform Previews**: Live, pixel-perfect rendering of content for Instagram, Facebook, X (Twitter), Reddit, and TikTok.
- **Secure Authentication**: Robust registration and login flows utilizing JWT httpOnly cookies and Bcrypt password hashing.
- **Minimalist UI**: Built on a modern, professional design system focusing on typography (Inter font), whitespace, and functional clarity.

## Technical Architecture

The repository is structured as a decoupled monorepo:

### Frontend
- **Framework**: React 19 (via Vite)
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Location**: `/frontend`

### Backend
- **Environment**: Node.js with Express
- **Language**: TypeScript
- **Database & ORM**: Prisma ORM 7 with a local SQLite database (better-sqlite3)
- **Security**: AES encryption for API keys, JWT for session management
- **Location**: `/server`

## Quick Start Guide

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Starting the Backend Server

Navigate to the server directory, install dependencies, and start the development server.

```bash
cd server
npm install
npm run db:push
npm run dev
```
The backend API will run on http://localhost:5000.

### 2. Starting the Frontend Application

In a new terminal window, navigate to the frontend directory, install dependencies, and launch the Vite server.

```bash
cd frontend
npm install
npm run dev
```
The frontend interface will be accessible at http://localhost:3000.

## Environment Variables

When deploying or cloning the project for the first time, ensure the `.env` file in the `/server` directory is configured with secure credentials:

- `JWT_SECRET`: Secret key for signing authentication tokens.
- `ENCRYPTION_KEY`: 32-byte key used for AES-256-GCM encryption of third-party API keys.
- `DATABASE_URL`: Connection string for Prisma.
