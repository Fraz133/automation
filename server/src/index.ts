import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import { register, login, me, logout } from './controllers/authController.js';
import { verifyKeys, saveKey, getKeysStatus } from './controllers/keysController.js';
import { generateCaption, generateImage } from './controllers/contentController.js';
import { authenticateToken } from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Social Media Automation SaaS API', timestamp: new Date().toISOString() });
});

// Auth Routes
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);
app.get('/api/auth/me', authenticateToken, me);
app.post('/api/auth/logout', logout);

// API Keys BYOK Routes
app.post('/api/keys/verify', verifyKeys);
app.post('/api/keys/save', authenticateToken, saveKey);
app.get('/api/keys/status', authenticateToken, getKeysStatus);

// AI Content Generation Routes
app.post('/api/content/caption', generateCaption);
app.post('/api/content/image', generateImage);

app.listen(PORT, () => {
  console.log(`🚀 Social Automation Server running on http://localhost:${PORT}`);
});
