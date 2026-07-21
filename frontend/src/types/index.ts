export type NavTab = 'home' | 'studio' | 'calendar' | 'accounts' | 'keys' | 'settings' | 'login' | 'signup';

export type TonePreset = 'Funny' | 'Casual' | 'Professional' | 'Motivational' | 'Inspirational' | 'Bold' | 'Minimal';

export type Platform = 'instagram' | 'facebook' | 'twitter' | 'reddit' | 'tiktok';

export interface User {
  id: string;
  email: string;
  themePreference: 'dark' | 'light' | 'system';
  onboardingCompleted: boolean;
  createdAt: string;
}

export interface UserApiKeys {
  gemini?: string;
  openai?: string;
}

export interface SocialAccountStatus {
  platform: Platform;
  connected: boolean;
  username?: string;
  linkedAt?: string;
}

export interface PostItem {
  id: string;
  caption: string;
  imageUrl?: string;
  platforms: Platform[];
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  scheduledFor?: string;
  publishedAt?: string;
  createdAt: string;
  reach?: number;
  engagement?: number;
}

export interface StatItem {
  label: string;
  value: string;
  change: string;
  accent: 'lime' | 'blue' | 'purple' | 'cyan';
}
