import { create } from 'zustand';
import type { NavTab, TonePreset, Platform, User } from '../types';

interface AppState {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;

  geminiKey: string;
  openaiKey: string;
  setGeminiKey: (key: string) => void;
  setOpenaiKey: (key: string) => void;

  topicPrompt: string;
  setTopicPrompt: (prompt: string) => void;
  imagePrompt: string;
  setImagePrompt: (prompt: string) => void;
  selectedTone: TonePreset;
  setSelectedTone: (tone: TonePreset) => void;
  selectedPlatform: Platform;
  setSelectedPlatform: (platform: Platform) => void;

  generatedCaptions: string[];
  setGeneratedCaptions: (captions: string[]) => void;
  selectedCaptionIndex: number;
  setSelectedCaptionIndex: (index: number) => void;
  generatedImageUrl: string;
  setGeneratedImageUrl: (url: string) => void;

  isGenerating: boolean;
  setIsGenerating: (loading: boolean) => void;
  
  theme: 'dark' | 'light';
  toggleTheme: () => void;

  scheduledPosts: import('../types').PostItem[];
  setScheduledPosts: (posts: import('../types').PostItem[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeTab: 'home',
  setActiveTab: (tab) => set({ activeTab: tab }),

  user: null,
  setUser: (user) => set({ user }),
  token: localStorage.getItem('token') || null,
  setToken: (token) => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
    set({ token });
  },

  geminiKey: localStorage.getItem('gemini_key') || '',
  openaiKey: localStorage.getItem('openai_key') || '',
  setGeminiKey: (key) => {
    localStorage.setItem('gemini_key', key);
    set({ geminiKey: key });
  },
  setOpenaiKey: (key) => {
    localStorage.setItem('openai_key', key);
    set({ openaiKey: key });
  },

  topicPrompt: 'Launch of our new eco-friendly smart bottle with real-time temperature tracking',
  setTopicPrompt: (topicPrompt) => set({ topicPrompt }),
  imagePrompt: 'A sleek eco-friendly smart bottle on a wooden table, bright morning sunlight, high quality product photography',
  setImagePrompt: (imagePrompt) => set({ imagePrompt }),
  selectedTone: 'Professional',
  setSelectedTone: (selectedTone) => set({ selectedTone }),
  selectedPlatform: 'instagram',
  setSelectedPlatform: (selectedPlatform) => set({ selectedPlatform }),

  generatedCaptions: [
    "Stay hydrated and smart! Introducing the revolutionary SmartBottle — real-time temperature tracking at your fingertips. #EcoTech #HydrationGoals #SmartLiving #Innovation",
    "Say goodbye to lukewarm water! Our sleek new eco-bottle keeps your drinks at perfection all day long. Ready to elevate your daily routine? #Sustainability #SmartGadgets #EcoFriendly #HealthTech",
    "Meet your new favorite everyday carry. Lightweight, 100% recycled steel, and connected to your fitness goals. Grab yours today! #NextGenTech #HydrationNation #DesignInspiration"
  ],
  setGeneratedCaptions: (generatedCaptions) => set({ generatedCaptions, selectedCaptionIndex: 0 }),
  selectedCaptionIndex: 0,
  setSelectedCaptionIndex: (selectedCaptionIndex) => set({ selectedCaptionIndex }),
  generatedImageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=80',
  setGeneratedImageUrl: (generatedImageUrl) => set({ generatedImageUrl }),

  isGenerating: false,
  setIsGenerating: (isGenerating) => set({ isGenerating }),

  theme: 'dark',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),

  scheduledPosts: [],
  setScheduledPosts: (posts) => set({ scheduledPosts: posts }),
}));
