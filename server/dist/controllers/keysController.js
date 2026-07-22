import axios from 'axios';
import { prisma } from '../lib/prisma.js';
import { encryptText } from '../lib/encryption.js';
export async function verifyKeys(req, res) {
    const { gemini_key, openai_key } = req.body;
    let geminiResult = { ok: false, error: 'Not provided' };
    let openaiResult = { ok: false, error: 'Not provided' };
    if (gemini_key && gemini_key.trim().length > 5) {
        try {
            const resp = await axios.get(`https://generativelanguage.googleapis.com/v1beta/models?key=${gemini_key.trim()}`, { timeout: 8000 });
            if (resp.status === 200) {
                geminiResult = { ok: true, error: '' };
            }
        }
        catch (err) {
            const msg = err.response?.data?.error?.message || err.message || 'Gemini key validation failed';
            geminiResult = { ok: false, error: msg };
        }
    }
    if (openai_key && openai_key.trim().length > 5) {
        try {
            const resp = await axios.get('https://api.openai.com/v1/models', {
                headers: { Authorization: `Bearer ${openai_key.trim()}` },
                timeout: 8000,
            });
            if (resp.status === 200) {
                openaiResult = { ok: true, error: '' };
            }
        }
        catch (err) {
            const msg = err.response?.data?.error?.message || err.message || 'OpenAI key validation failed';
            openaiResult = { ok: false, error: msg };
        }
    }
    const anyValid = geminiResult.ok || openaiResult.ok;
    return res.json({
        success: true,
        any_valid: anyValid,
        gemini: geminiResult,
        openai: openaiResult,
    });
}
export async function saveKey(req, res) {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    const { provider, api_key } = req.body;
    if (!provider || !api_key) {
        return res.status(400).json({ success: false, message: 'Provider and api_key are required' });
    }
    try {
        const encryptedKey = encryptText(api_key.trim());
        await prisma.apiKey.upsert({
            where: {
                userId_provider: {
                    userId: req.user.userId,
                    provider: provider.toLowerCase(),
                },
            },
            update: {
                encryptedKey,
                addedAt: new Date(),
            },
            create: {
                userId: req.user.userId,
                provider: provider.toLowerCase(),
                encryptedKey,
            },
        });
        return res.json({ success: true, message: `${provider} API key saved securely` });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message || 'Failed to save key' });
    }
}
export async function getKeysStatus(req, res) {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    try {
        const keys = await prisma.apiKey.findMany({
            where: { userId: req.user.userId },
            select: { provider: true, addedAt: true },
        });
        const statusMap = {
            gemini: false,
            openai: false,
        };
        keys.forEach((k) => {
            statusMap[k.provider] = true;
        });
        return res.json({ success: true, keys: statusMap });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to retrieve keys status' });
    }
}
