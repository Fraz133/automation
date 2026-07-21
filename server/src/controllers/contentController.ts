import { Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';
import { prisma } from '../lib/prisma.js';
import { decryptText } from '../lib/encryption.js';
import { AuthenticatedRequest } from '../middleware/auth.js';

export async function generateCaption(req: AuthenticatedRequest, res: Response) {
  const { topic, tone = 'Professional', platform = 'instagram', gemini_key, openai_key, provider = 'gemini' } = req.body;

  if (!topic || topic.trim().length < 3) {
    return res.status(400).json({ success: false, message: 'Topic must be at least 3 characters long' });
  }

  let resolvedGeminiKey = gemini_key;
  let resolvedOpenAIKey = openai_key;

  if (req.user) {
    if (!resolvedGeminiKey) {
      const gKey = await prisma.apiKey.findUnique({
        where: { userId_provider: { userId: req.user.userId, provider: 'gemini' } },
      });
      if (gKey) resolvedGeminiKey = decryptText(gKey.encryptedKey);
    }
    if (!resolvedOpenAIKey) {
      const oKey = await prisma.apiKey.findUnique({
        where: { userId_provider: { userId: req.user.userId, provider: 'openai' } },
      });
      if (oKey) resolvedOpenAIKey = decryptText(oKey.encryptedKey);
    }
  }

  try {
    let captions: string[] = [];

    if (provider.toLowerCase() === 'openai' && resolvedOpenAIKey) {
      const openai = new OpenAI({ apiKey: resolvedOpenAIKey });
      const promptText = `Generate 3 distinct, high-converting social media caption variations for ${platform.toUpperCase()}.
Topic: "${topic}"
Tone: ${tone}
Include relevant hashtags at the end of each caption.
Return format: ONLY a valid JSON array of 3 strings like ["Caption 1...", "Caption 2...", "Caption 3..."] without markdown backticks.`;

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: promptText }],
        temperature: 0.7,
      });

      const raw = completion.choices[0]?.message?.content || '';
      try {
        const cleaned = raw.replace(/```json/g, '').replace(/```/g, '').trim();
        captions = JSON.parse(cleaned);
      } catch {
        captions = [raw];
      }
    } else if (resolvedGeminiKey) {
      const ai = new GoogleGenAI({ apiKey: resolvedGeminiKey });
      const promptText = `Generate 3 distinct, high-converting social media caption variations for ${platform.toUpperCase()}.
Topic: "${topic}"
Tone: ${tone}
Include relevant hashtags at the end of each caption.
Return format: ONLY a valid JSON array of 3 strings like ["Caption 1...", "Caption 2...", "Caption 3..."] without markdown backticks.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: promptText,
      });

      const raw = response.text || '';
      try {
        const cleaned = raw.replace(/```json/g, '').replace(/```/g, '').trim();
        captions = JSON.parse(cleaned);
      } catch {
        captions = [raw];
      }
    } else {
      return res.status(400).json({
        success: false,
        message: 'No API Key found. Please add your Gemini or OpenAI key in Settings/BYOK Hub.',
      });
    }

    if (req.user && captions.length > 0) {
      await prisma.generation.create({
        data: {
          userId: req.user.userId,
          prompt: topic,
          tone,
          platform,
          captionsJson: JSON.stringify(captions),
          providerUsed: provider,
        },
      });
    }

    return res.json({
      success: true,
      captions,
      topic,
      tone,
      platform,
    });
  } catch (error: any) {
    console.error('Caption generation error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate captions. Please check your API key.',
    });
  }
}

export async function generateImage(req: AuthenticatedRequest, res: Response) {
  const { prompt, provider = 'pollinations' } = req.body;

  if (!prompt) {
    return res.status(400).json({ success: false, message: 'Prompt is required' });
  }

  try {
    const encodedPrompt = encodeURIComponent(prompt);
    const seed = Math.floor(Math.random() * 100000);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${seed}&nologo=true`;

    return res.json({
      success: true,
      image_url: imageUrl,
      message: 'Visual preview generated successfully',
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Image generation failed' });
  }
}
