import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';

// Step Illustrations
import stepOneImage from '../assets/stepOneImage.svg';
import stepTwoImage from '../assets/stepTwoImage.svg';
import stepThreeImage from '../assets/stepThreeImage.svg';
import stepFourImage from '../assets/stepFourImage.svg';
import { 
  Check, 
  Clock, 
  Calendar, 
  Users, 
  Layers, 
  TrendingUp, 
  Shield, 
  MessageSquare, 
  Plus, 
  ArrowRight, 
  Star, 
  Sparkles,
  ChevronRight,
  Globe,
  Settings,
  Image as ImageIcon,
  Zap
} from 'lucide-react';

// Platform Vector SVGs
const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const RedditIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.85-1.64-6.29-1.72l1.3-4.14 4.19.88c.02.85.73 1.54 1.6 1.54 1.1 0 2-.9 2-2s-.9-2-2-2c-.76 0-1.42.43-1.75 1.05l-4.58-1c-.13-.03-.28.03-.35.15L10.3 7.02c-2.52.05-4.8.7-6.47 1.73A3.003 3.003 0 001.4 7.5c-1.65 0-3 1.35-3 3 0 1.08.58 2.01 1.44 2.53-.04.32-.08.64-.08.97 0 4.14 4.93 7.5 11 7.5s11-3.36 11-7.5c0-.33-.04-.65-.08-.97.86-.52 1.44-1.45 1.44-2.53zM5.9 11.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zm11.5 6c-1.88 1.88-5.47 1.88-7.34 0-.15-.15-.15-.38 0-.53.15-.15.38-.15.53 0 1.56 1.56 4.72 1.56 6.28 0 .15-.15.38-.15.53 0 .15.15.15.38 0 .53zm-.5-4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
  </svg>
);

const TiktokIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <img 
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyw8r40TlCrsvxu4RNy1WsrfbyThyjhiKtCQ&s" 
    alt="TikTok" 
    className={`${className} object-contain rounded-lg`} 
  />
);

const OpenAIStarIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <img 
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMaqLvd5F3HNdNArpJ5UU3FL9vVKnJJLhOLw-Yki6tXwg-XJPiGr6A1Gg&s=10" 
    alt="OpenAI" 
    className={`${className} object-cover rounded-xl shadow-sm`} 
  />
);

const GeminiSparkIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 24c-.2 0-.4-.1-.5-.3L8.8 17.2 2.3 14.5c-.3-.1-.4-.3-.4-.5s.1-.4.4-.5l6.5-2.7 2.7-6.5c.1-.3.3-.4.5-.4s.4.1.5.4l2.7 6.5 6.5 2.7c.3.1.4.3.4.5s-.1.4-.4.5l-6.5 2.7-2.7 6.5c-.1.2-.3.3-.5.3z"/>
  </svg>
);

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const YoutubeIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const DiscordIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.093.252-.19.373-.287a.075.075 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .079.009c.12.098.245.195.372.288a.077.077 0 0 1-.006.128 12.299 12.299 0 0 1-1.873.891.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const WhatsappIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

export const HeroSection: React.FC = () => {
  const { setActiveTab } = useAppStore();
  const [emailInput, setEmailInput] = useState('');

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab('signup');
  };

  // Mock schedule posts for preview card
  const mockPosts = [
    { id: '1', title: 'New Ideas for Campaign', progress: 60, color: 'bg-emerald-500', date: 'Sep 10', platforms: ['instagram', 'facebook'] },
    { id: '2', title: 'Design Studio Reels #4', progress: 100, color: 'bg-[#dfff00]', date: 'Sep 18', platforms: ['tiktok'] }
  ];

  return (
    <div className="w-full bg-[#EBECEE] text-[#111315] select-none font-sans overflow-x-hidden">

      {/* ================= SECTION 1: HERO HEADER ================= */}
      <section className="relative px-6 pt-16 pb-24 max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Title Grid Logo Wrapper */}
        <div
          className="mb-8 flex items-center justify-center"
        >
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
            <span className="text-white font-extrabold text-2xl">WP</span>
          </div>
        </div>

        {/* Tagline Badge */}
        <div className="overflow-hidden mb-6">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-300 text-slate-800 text-xs font-semibold shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#dfff00]" />
            <span>BYOK Social Automation Platform</span>
          </div>
        </div>

        {/* Main Headline — two line slices */}
        <div className="overflow-hidden mb-2">
          <div
            className="text-4xl sm:text-7xl font-extrabold text-[#111315] tracking-tight leading-[1.05] max-w-4xl"
          >
            Think, generate, and <span className="relative inline-block text-emerald-600 z-10">
              track
              <svg aria-hidden="true" className="absolute w-[110%] h-[0.4em] -bottom-[0.1em] -left-[5%] text-yellow-400 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none" fill="currentColor">
                <path d="M0,6 Q50,0 100,4 Q50,10 0,6 Z" />
              </svg>
            </span>
          </div>
        </div>
        <div className="overflow-hidden mb-6">
          <div
            className="text-4xl sm:text-7xl font-extrabold text-[#111315] opacity-90 tracking-tight leading-[1.05] max-w-4xl"
          >
            all in one place
          </div>
        </div>

        {/* Subtitle */}
        <div className="overflow-hidden mb-8">
          <p
            className="text-slate-600 text-base sm:text-xl max-w-2xl leading-relaxed"
          >
            Efficiently manage your social channels and boost content productivity. 
            Deploy high-performance posts using your own API keys, secure and local.
          </p>
        </div>

        {/* Email Input / CTA */}
        <form
          onSubmit={handleGetStarted} className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md mb-20"
        >
          <div className="w-full relative">
            <input
              type="email"
              required
              placeholder="What's Your Work Email?"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full px-5 py-3.5 rounded-2xl bg-white border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 shadow-sm transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-2xl text-sm font-bold shrink-0 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Get free demo</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Dynamic Mockup Floating Graphics Area */}
        <div className="relative w-full max-w-5xl h-[380px] sm:h-[480px] border border-slate-300/40 rounded-[2.5rem] bg-white/40 shadow-inner overflow-hidden flex items-center justify-center">
          
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70" />

          {/* Floating Logo Cube (Center) */}
          <div className="z-20 w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center border border-slate-100 relative group animate-float">
            <div className="grid grid-cols-2 gap-1.5 p-5">
              <span className="w-4.5 h-4.5 rounded-full bg-[#dfff00] border border-slate-950/10" />
              <span className="w-4.5 h-4.5 rounded-full bg-slate-900" />
              <span className="w-4.5 h-4.5 rounded-full bg-slate-900" />
              <span className="w-4.5 h-4.5 rounded-full bg-slate-900" />
            </div>
            {/* Soft highlight glow behind */}
            <div className="absolute -inset-1 bg-[#dfff00]/20 rounded-3xl filter blur-sm -z-10 opacity-60" />
          </div>

          {/* Yellow Sticky Note (Top Left) */}
          <div className="absolute top-8 left-8 sm:left-16 z-10 w-48 bg-[#FFF9C4] border border-[#FBC02D]/30 p-5 shadow-lg rounded-sm text-left animate-float-rotate">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400 absolute top-2 left-1/2 transform -translate-x-1/2" />
            <p className="font-serif text-xs text-[#5D4037] leading-relaxed mt-2 select-text">
              Take notes to keep track of crucial campaign details, and generate posts with ease.
            </p>
          </div>

          {/* Blue Checkmark Pill (Left Middle) */}
          <div className="absolute bottom-32 left-4 sm:left-12 z-20 bg-white border border-slate-200 shadow-lg p-3.5 rounded-2xl flex items-center justify-center animate-float-delayed">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <Check size={20} strokeWidth={3} />
            </div>
          </div>

          {/* Today's Tasks Card (Bottom Left) */}
          <div className="absolute bottom-6 left-12 sm:left-24 z-10 w-64 bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 text-left hidden sm:block animate-float">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Today's posts</h4>
            <div className="space-y-3">
              {mockPosts.map(post => (
                <div key={post.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>{post.title}</span>
                    <div className="flex items-center gap-1.5">
                      {post.platforms.map(p => (
                        <span key={p} className="text-slate-400 uppercase text-[9px] border border-slate-200 px-1 rounded-sm">{p}</span>
                      ))}
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className={`${post.color} h-full`} style={{ width: `${post.progress}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>{post.date}</span>
                    <span>{post.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Clock Widget (Top Right) */}
          <div className="absolute top-12 right-12 sm:right-28 z-20 bg-white border border-slate-200 shadow-lg p-3.5 rounded-2xl flex items-center justify-center animate-float">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Clock size={20} />
            </div>
          </div>

          {/* Reminders Card (Right Middle) */}
          <div className="absolute top-28 right-6 sm:right-16 z-10 w-64 bg-white border border-slate-200 shadow-xl rounded-2xl p-4 text-left hidden sm:block animate-float-delayed">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reminders</span>
            <div className="mt-3 border-l-2 border-slate-900 pl-3">
              <h5 className="text-xs font-bold text-slate-800">Launch Campaign Post</h5>
              <p className="text-[10px] text-slate-500 mt-0.5">Caption draft validation</p>
              <div className="flex items-center gap-1.5 text-slate-400 mt-2 text-[10px] font-semibold">
                <Clock size={10} />
                <span>13:00 - 13:45</span>
              </div>
            </div>
          </div>

          {/* 100+ Integrations Widget (Bottom Right) */}
          <div className="absolute bottom-8 right-12 sm:right-24 z-10 w-64 bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 text-left animate-float">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3.5">Linked Platforms</h4>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shadow-sm">
                <InstagramIcon className="w-4.5 h-4.5" />
              </div>
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shadow-sm">
                <FacebookIcon className="w-4.5 h-4.5" />
              </div>
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shadow-sm">
                <TwitterIcon className="w-4.5 h-4.5" />
              </div>
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shadow-sm overflow-hidden">
                <TiktokIcon className="w-full h-full" />
              </div>
            </div>
          </div>

        </div>

      </section>



      {/* ================= SECTION 2: SOLUTIONS ================= */}
      <section className="bg-white border-y border-slate-300/60 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-16 max-w-3xl">
            <div className="overflow-hidden mb-4">
              <span
                className="text-[11px] font-bold uppercase tracking-widest text-slate-500 block"
              >Solutions</span>
            </div>
            <div className="overflow-hidden mb-6">
              <h2
                className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight"
              >
                Solve your team's biggest challenges with a simple <span className="text-emerald-600">workflow</span>
              </h2>
            </div>
            <div className="overflow-hidden">
              <p
                className="text-slate-600 text-lg leading-relaxed font-medium"
              >Simplify your social media operations with a streamlined workflow designed for speed, clarity, and flexibility.</p>
            </div>
          </div>

          {/* Solution Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 text-left">
            
            {/* Card 1 */}
            <div
              className="group p-8 sm:p-10 rounded-[2rem] bg-slate-50 hover:bg-slate-100/80 transition-colors duration-300 flex flex-col"
            >
              <div className="text-8xl font-black text-emerald-600 mb-6 inline-block select-none tracking-tighter leading-none transition-colors duration-300">
                1
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Sync Across Channels</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Ensure your marketing crew is always aligned. Live, pixel-perfect preview renders format specifications for all networks instantly.
              </p>
            </div>

            {/* Card 2 */}
            <div
              className="group p-8 sm:p-10 rounded-[2rem] bg-slate-50 hover:bg-slate-100/80 transition-colors duration-300 flex flex-col"
            >
              <div className="text-8xl font-black text-emerald-600 mb-6 inline-block select-none tracking-tighter leading-none transition-colors duration-300">
                2
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Prioritize Campaigns</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Structure and schedule social pipelines weeks ahead. Avoid rush-hour updates and let the queues launch automatically.
              </p>
            </div>

            {/* Card 3 */}
            <div
              className="group p-8 sm:p-10 rounded-[2rem] bg-slate-50 hover:bg-slate-100/80 transition-colors duration-300 flex flex-col"
            >
              <div className="text-8xl font-black text-emerald-600 mb-6 inline-block select-none tracking-tighter leading-none transition-colors duration-300">
                3
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Complete Transparency</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Empower your collaborators without endless check-in messaging. Everyone sees drafts, logs, and schedules in one clean space.
              </p>
            </div>

          </div>

          {/* ================= THE CURRENT CHAOS SECTION ================= */}
          <div className="relative w-full max-w-7xl mx-auto min-h-[700px] md:min-h-[800px] flex flex-col items-center justify-center my-32 py-24 px-4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-100 via-white to-white rounded-[3rem]">
            
            {/* Background Connecting Curves (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden sm:block opacity-60" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
              {/* Instagram to Center */}
              <path d="M 200,200 Q 400,300 600,250" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
              {/* TikTok to Center */}
              <path d="M 1000,200 Q 800,300 600,250" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
              {/* X to Center-Right */}
              <path d="M 1050,450 Q 850,550 700,450" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
              {/* Reddit to Center */}
              <path d="M 800,650 Q 700,500 600,500" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
              {/* Gemini to Center-Left */}
              <path d="M 300,600 Q 450,500 500,450" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
            </svg>

            {/* Main Content */}
            <div className="relative z-10 w-full text-center">
              <div className="overflow-hidden mb-20">
                <h2
                  className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold text-slate-900 tracking-tight leading-[1.1] max-w-4xl mx-auto"
                >
                  The current way we work is chaotic.
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 text-center md:text-left max-w-5xl mx-auto mt-16 md:mt-32 px-6 sm:px-12">
                <div>
                  <div className="overflow-hidden mb-4">
                    <div className="text-5xl md:text-6xl font-black text-emerald-600 tracking-tighter drop-shadow-sm">2x</div>
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xl md:text-2xl font-semibold text-slate-700 leading-snug tracking-tight max-w-[280px] mx-auto md:mx-0">more errors occur when switching tasks.</p>
                  </div>
                </div>
                <div>
                  <div className="overflow-hidden mb-4">
                    <div className="text-5xl md:text-6xl font-black text-rose-500 tracking-tighter drop-shadow-sm">Burnout</div>
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xl md:text-2xl font-semibold text-slate-700 leading-snug tracking-tight max-w-[280px] mx-auto md:mx-0">Constant multitasking leads directly to burnout.</p>
                  </div>
                </div>
                <div>
                  <div className="overflow-hidden mb-4">
                    <div className="text-5xl md:text-6xl font-black text-amber-500 tracking-tighter drop-shadow-sm">1.2 mo/yr</div>
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xl md:text-2xl font-semibold text-slate-700 leading-snug tracking-tight max-w-[280px] mx-auto md:mx-0">wasted completely due to channel switching.†</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating App Icons - Safely positioned in negative space */}
            
            {/* Top Left - Instagram */}
            <div
              className="absolute top-[10%] left-[5%] lg:left-[10%] bg-white p-4 sm:p-5 rounded-3xl shadow-2xl z-20 hover:scale-110 transition-transform duration-300 -rotate-6"
            >
              <InstagramIcon className="w-10 h-10 sm:w-12 sm:h-12" />
              <div className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full shadow-md border-2 border-white">
                99+
              </div>
            </div>

            {/* Top Right - TikTok */}
            <div
              className="absolute top-[8%] right-[5%] lg:right-[12%] bg-white p-4 sm:p-5 rounded-3xl shadow-2xl z-20 hover:scale-110 transition-transform duration-300 rotate-3"
            >
              <TiktokIcon className="w-10 h-10 sm:w-12 sm:h-12" />
              <div className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full shadow-md border-2 border-white">
                1M+
              </div>
            </div>

            {/* Middle Right - X (Twitter) */}
            <div
              className="absolute top-[45%] right-[3%] lg:right-[8%] bg-[#FFD600] p-4 sm:p-5 rounded-3xl shadow-2xl z-20 hover:scale-110 transition-transform duration-300 rotate-12"
            >
              <TwitterIcon className="w-10 h-10 sm:w-12 sm:h-12 text-slate-900" />
              <div className="absolute -top-3 -right-3 bg-white text-slate-700 text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full shadow-md border-2 border-slate-200 flex items-center gap-1">
                <svg className="w-3 h-3 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
                665
              </div>
            </div>

            {/* Middle Left - Gemini */}
            <div
              className="absolute top-[45%] left-[2%] lg:left-[6%] bg-white p-4 sm:p-5 rounded-3xl shadow-2xl z-20 hover:scale-110 transition-transform duration-300 -rotate-3"
            >
              <GeminiSparkIcon className="w-10 h-10 sm:w-12 sm:h-12 text-[#1A73E8]" />
              <div className="absolute -bottom-3 -right-3 bg-white text-slate-500 text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full shadow-md border-2 border-slate-200 flex items-center gap-1.5">
                <div className="w-3 h-3 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                Syncing
              </div>
            </div>

            {/* Bottom Center - Reddit */}
            <div
              className="absolute bottom-[4%] left-[40%] lg:left-[45%] bg-[#25D366] p-4 sm:p-5 rounded-3xl shadow-2xl z-20 hover:scale-110 transition-transform duration-300 -rotate-12"
            >
              <RedditIcon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              <div className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full shadow-md border-2 border-white">
                420
              </div>
            </div>

            {/* Bottom Right - OpenAI */}
            <div
              className="absolute bottom-[6%] right-[10%] lg:right-[20%] bg-white p-4 sm:p-5 rounded-3xl shadow-2xl z-20 hover:scale-110 transition-transform duration-300 rotate-6"
            >
              <OpenAIStarIcon className="w-10 h-10 sm:w-12 sm:h-12" />
              <div className="absolute -bottom-3 -right-3 bg-slate-900 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full shadow-md border-2 border-white flex items-center gap-1.5">
                100 <span className="w-2 h-2 bg-emerald-400 rounded-full inline-block shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              </div>
            </div>

          </div>

          {/* Interactive 4-Step User Workflow Section */}
          <div className="mt-16 text-center">
            
            {/* Workflow Header */}
            <div className="mb-14 max-w-2xl mx-auto space-y-4">
              <div className="overflow-hidden">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500 bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200 inline-block">
                  Product Workflow
                </span>
              </div>
              <div className="overflow-hidden">
                <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                  How WorkPro works in <span className="text-emerald-600">4 simple steps</span>
                </h2>
              </div>
              <div className="overflow-hidden">
                <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
                  Follow our streamlined pipeline to generate, preview, and auto-schedule your content effortlessly.
                </p>
              </div>
            </div>

            {/* 4-Step Vertical Timeline */}
            <div className="relative w-full max-w-5xl mx-auto mt-24 pb-12">
              
                {/* Central S-Curve SVG for Desktop */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[120px] pointer-events-none hidden md:block">
                <svg className="w-full h-full" viewBox="0 0 120 1000" preserveAspectRatio="none" stroke="#cbd5e1" strokeWidth="2" fill="none">
                  {/* Tight center-corridor S-curve that stays between the two text columns */}
                  <path d="
                    M 60,0
                    C 60,40 90,80 90,130
                    C 90,180 60,200 60,240
                    C 60,280 30,320 30,370
                    C 30,420 60,440 60,480
                    C 60,520 90,560 90,610
                    C 90,660 60,680 60,720
                    C 60,760 30,800 30,850
                    C 30,900 60,940 60,1000
                  " />
                </svg>
              </div>

              {/* Central Straight Line for Mobile */}
              <div className="absolute top-0 bottom-0 left-8 md:hidden w-[2px] bg-slate-200 pointer-events-none z-0"></div>

              <div className="space-y-16 md:space-y-32 relative z-10 text-left">
                
                {/* Step 1: Left (Text Left, Image Right) */}
                <div className="flex flex-col md:flex-row items-center w-full relative">
                  <div className="md:w-1/2 w-full pr-0 md:pr-12 pl-20 md:pl-0 flex justify-start md:justify-end">
                    <div className="w-full max-w-[380px] py-4 md:py-6">
                      {/* Label slice */}
                      <div className="overflow-hidden mb-3">
                        <span
                          className="text-[11px] font-bold uppercase tracking-widest text-slate-400 font-mono block"
                        >Setup</span>
                      </div>
                      {/* Title slice */}
                      <div className="overflow-hidden mb-4">
                        <h3
                          className="text-3xl font-extrabold text-slate-900 tracking-tight"
                        >Configure API Keys</h3>
                      </div>
                      {/* Body slice */}
                      <div className="overflow-hidden">
                        <p
                          className="text-sm md:text-base text-slate-600 leading-relaxed font-medium"
                        >
                          Enter your Gemini or OpenAI API keys. Credentials are stored 100% locally on your device with Zero-Server tracking.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Center Node — scale in */}
                  <div
                    className="absolute left-8 md:left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900 text-white font-mono font-bold text-lg flex items-center justify-center shadow-[0_0_0_8px_rgba(255,255,255,1)] z-20"
                  >01</div>
                  {/* Image Right — wipe reveal from top */}
                  <div className="md:w-1/2 w-full pl-0 md:pl-24 flex justify-start items-center hidden md:flex">
                    <img
                      src={stepOneImage} alt="Configure API Keys"
                      className="w-full max-w-[260px] drop-shadow-xl"
                    />
                  </div>
                </div>

                {/* Step 2: Right (Image Left, Text Right) */}
                <div className="flex flex-col md:flex-row items-center w-full relative">
                  {/* Image Left — wipe reveal */}
                  <div className="md:w-1/2 w-full pr-0 md:pr-16 flex justify-end items-center hidden md:flex">
                    <img
                      src={stepTwoImage} alt="Generate Prompts"
                      className="w-full max-w-[280px] drop-shadow-xl"
                    />
                  </div>
                  {/* Center Node */}
                  <div
                    className="absolute left-8 md:left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900 text-white font-mono font-bold text-lg flex items-center justify-center shadow-[0_0_0_8px_rgba(255,255,255,1)] z-20"
                  >02</div>
                  <div className="md:w-1/2 w-full pl-20 md:pl-12 pr-0 md:pr-0 flex justify-start">
                    <div className="w-full max-w-[380px] py-4 md:py-6">
                      <div className="overflow-hidden mb-3">
                        <span
                          className="text-[11px] font-bold uppercase tracking-widest text-slate-400 font-mono block"
                        >Create</span>
                      </div>
                      <div className="overflow-hidden mb-4">
                        <h3
                          className="text-3xl font-extrabold text-slate-900 tracking-tight"
                        >Generate Prompts</h3>
                      </div>
                      <div className="overflow-hidden">
                        <p
                          className="text-sm md:text-base text-slate-600 leading-relaxed font-medium"
                        >
                          Input your topic prompt and select brand voice parameters. WorkPro generates platform-tailored captions and image ideas.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3: Left (Text Left, Image Right) */}
                <div className="flex flex-col md:flex-row items-center w-full relative">
                  <div className="md:w-1/2 w-full pr-0 md:pr-12 pl-20 md:pl-0 flex justify-start md:justify-end">
                    <div className="w-full max-w-[380px] py-4 md:py-6">
                      <div className="overflow-hidden mb-3">
                        <span
                          className="text-[11px] font-bold uppercase tracking-widest text-slate-400 font-mono block"
                        >Preview</span>
                      </div>
                      <div className="overflow-hidden mb-4">
                        <h3
                          className="text-3xl font-extrabold text-slate-900 tracking-tight"
                        >Format & Preview</h3>
                      </div>
                      <div className="overflow-hidden">
                        <p
                          className="text-sm md:text-base text-slate-600 leading-relaxed font-medium"
                        >
                          Inspect live, pixel-perfect preview renders for Instagram, Facebook, X/Twitter, TikTok, and Reddit before publishing.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Center Node */}
                  <div
                    className="absolute left-8 md:left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900 text-white font-mono font-bold text-lg flex items-center justify-center shadow-[0_0_0_8px_rgba(255,255,255,1)] z-20"
                  >03</div>
                  {/* Image Right — wipe reveal */}
                  <div className="md:w-1/2 w-full pl-0 md:pl-16 flex justify-start items-center hidden md:flex">
                    <img
                      src={stepThreeImage} alt="Format and Preview"
                      className="w-full max-w-[280px] drop-shadow-xl"
                    />
                  </div>
                </div>

                {/* Step 4: Right (Image Left, Text Right) */}
                <div className="flex flex-col md:flex-row items-center w-full relative">
                  {/* Image Left — wipe reveal */}
                  <div className="md:w-1/2 w-full pr-0 md:pr-16 flex justify-end items-center hidden md:flex">
                    <img
                      src={stepFourImage} alt="Cross-Post and Schedule"
                      className="w-full max-w-[280px] drop-shadow-xl"
                    />
                  </div>
                  {/* Center Node */}
                  <div
                    className="absolute left-8 md:left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-emerald-500 text-white font-mono font-bold text-lg flex items-center justify-center shadow-[0_0_0_8px_rgba(255,255,255,1)] z-20"
                  >04</div>
                  <div className="md:w-1/2 w-full pl-20 md:pl-12 pr-0 md:pr-0 flex justify-start">
                    <div className="w-full max-w-[380px] py-4 md:py-6">
                      <div className="overflow-hidden mb-3">
                        <span
                          className="text-[11px] font-bold uppercase tracking-widest text-slate-400 font-mono block"
                        >Publish</span>
                      </div>
                      <div className="overflow-hidden mb-4">
                        <h3
                          className="text-3xl font-extrabold text-slate-900 tracking-tight"
                        >Cross-Post & Schedule</h3>
                      </div>
                      <div className="overflow-hidden">
                        <p
                          className="text-sm md:text-base text-slate-600 leading-relaxed font-medium"
                        >
                          Connect social channels once. One-click cross-post instantly or schedule automated queues across your entire pipeline.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= SECTION 3: FEATURES ================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        
        {/* Header */}
        <div
          className="text-center mb-16 space-y-4"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 bg-white border border-slate-200 px-4 py-1.5 rounded-full">Features</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Keep <span className="text-emerald-600">everything</span> in one place
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto font-medium">
            Forget complex, fragmented social media tools. Connect key variables into a unified system.
          </p>
        </div>

        {/* 4 Card Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          
          {/* Card 1: Collaboration */}
          <div
            className="relative p-8 sm:p-10 rounded-[2rem] flex flex-col justify-between overflow-hidden bg-[#fcffea] border border-[#eaf2b1] min-h-[320px] group hover:shadow-lg transition-all"
          >
            {/* Abstract SVG Background */}
            <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none text-[#dfff00]/50 group-hover:scale-105 transition-transform duration-500 mix-blend-multiply">
              <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full">
                <rect x="100" y="25" width="50" height="50" rx="16" transform="rotate(45 125 50)" />
                <rect x="100" y="95" width="50" height="50" rx="16" transform="rotate(45 125 120)" />
                <rect x="30" y="95" width="50" height="50" rx="16" transform="rotate(45 55 120)" />
                <rect x="100" y="165" width="50" height="50" rx="16" transform="rotate(45 125 190)" />
              </svg>
            </div>
            
            <div className="relative z-10 w-[70%]">
              <span className="inline-block px-3 py-1.5 bg-white rounded-md text-[10px] font-bold text-slate-700 mb-6 shadow-sm uppercase tracking-wide border border-slate-100">
                Team Collaboration
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 leading-tight tracking-tight">Seamless Collaboration</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-8 font-medium">
                Work together with your team effortlessly, share scheduled drafts, and review logs in real-time.
              </p>
              <a href="#" className="inline-flex items-center text-xs font-bold text-slate-900 uppercase tracking-wide border-b-2 border-slate-900 pb-0.5 hover:opacity-70 transition-opacity w-max">
                Get Started <ArrowRight size={14} className="ml-1.5" />
              </a>
            </div>
          </div>

          {/* Card 2: Time Management */}
          <div
            className="relative p-8 sm:p-10 rounded-[2rem] flex flex-col justify-between overflow-hidden bg-blue-50/70 border border-blue-100 min-h-[320px] group hover:shadow-lg transition-all"
          >
            {/* Abstract SVG Background */}
            <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none text-blue-200 group-hover:scale-105 transition-transform duration-500 mix-blend-multiply">
              <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full">
                <path d="M100,40 h50 v50 h-50 z" />
                <path d="M100,100 v50 a50,50 0 0,0 50,-50 z" />
                <path d="M40,100 h50 a50,50 0 0,0 -50,-50 z" />
                <path d="M40,100 v50 h50 v-50 z" />
              </svg>
            </div>
            
            <div className="relative z-10 w-[70%]">
              <span className="inline-block px-3 py-1.5 bg-white rounded-md text-[10px] font-bold text-slate-700 mb-6 shadow-sm uppercase tracking-wide border border-slate-100">
                Scheduling
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 leading-tight tracking-tight">Time Management Tools</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-8 font-medium">
                Optimize your workflow with integrated campaign schedulers, timeline timers, and calendars.
              </p>
              <a href="#" className="inline-flex items-center text-xs font-bold text-slate-900 uppercase tracking-wide border-b-2 border-slate-900 pb-0.5 hover:opacity-70 transition-opacity w-max">
                Try It Now <ArrowRight size={14} className="ml-1.5" />
              </a>
            </div>
          </div>

          {/* Card 3: Advanced Task Tracking */}
          <div
            className="relative p-8 sm:p-10 rounded-[2rem] flex flex-col justify-between overflow-hidden bg-purple-50/70 border border-purple-100 min-h-[320px] group hover:shadow-lg transition-all"
          >
            {/* Abstract SVG Background */}
            <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none text-purple-200 group-hover:scale-105 transition-transform duration-500 mix-blend-multiply">
              <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full">
                <path d="M140,40 A60,60 0 0,0 140,160 L140,100 Z" />
                <path d="M60,40 A60,60 0 0,1 60,160 L60,100 Z" />
              </svg>
            </div>
            
            <div className="relative z-10 w-[70%]">
              <span className="inline-block px-3 py-1.5 bg-white rounded-md text-[10px] font-bold text-slate-700 mb-6 shadow-sm uppercase tracking-wide border border-slate-100">
                Analytics
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 leading-tight tracking-tight">Advanced Content Tracking</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-8 font-medium">
                A bird's eye view of your social media schedule. Track visual assets, caption generation, and publisher cues.
              </p>
              <a href="#" className="inline-flex items-center text-xs font-bold text-slate-900 uppercase tracking-wide border-b-2 border-slate-900 pb-0.5 hover:opacity-70 transition-opacity w-max">
                View Insights <ArrowRight size={14} className="ml-1.5" />
              </a>
            </div>
          </div>

          {/* Card 4: Customizable Workspaces */}
          <div
            className="relative p-8 sm:p-10 rounded-[2rem] flex flex-col justify-between overflow-hidden bg-emerald-50/70 border border-emerald-100 min-h-[320px] group hover:shadow-lg transition-all"
          >
            {/* Abstract SVG Background */}
            <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none text-emerald-200 group-hover:scale-105 transition-transform duration-500 mix-blend-multiply">
              <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full">
                <rect x="50" y="30" width="70" height="70" rx="25" transform="rotate(45 85 65)" />
                <rect x="50" y="100" width="70" height="70" rx="25" transform="rotate(45 85 135)" />
              </svg>
            </div>
            
            <div className="relative z-10 w-[70%]">
              <span className="inline-block px-3 py-1.5 bg-white rounded-md text-[10px] font-bold text-slate-700 mb-6 shadow-sm uppercase tracking-wide border border-slate-100">
                Workspaces
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 leading-tight tracking-tight">Customizable Workspaces</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-8 font-medium">
                Separate brand coordinates, save different Gemini and OpenAI keys, and structure profiles separately.
              </p>
              <a href="#" className="inline-flex items-center text-xs font-bold text-slate-900 uppercase tracking-wide border-b-2 border-slate-900 pb-0.5 hover:opacity-70 transition-opacity w-max">
                Explore Workspaces <ArrowRight size={14} className="ml-1.5" />
              </a>
            </div>
          </div>

        </div>

      </section>

      {/* ================= SECTION 4: INTEGRATIONS ================= */}
      <section className="bg-white border-t border-slate-300/60 py-24 px-6 text-center">
        <div className="max-w-7xl mx-auto">
          
          <div className="overflow-hidden mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-4 py-1.5 rounded-full inline-block">Integrations</span>
          </div>
          <div className="overflow-hidden mb-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Connect <span className="text-emerald-600">integrations</span> you use every day
            </h2>
          </div>
          <div className="overflow-hidden mb-16">
            <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto font-medium">
              Link your local credentials directly to social networks and premium language models.
            </p>
          </div>

          {/* Dual Marquee Track */}
          <div className="flex flex-col gap-6 overflow-hidden relative pt-4">
            {/* Side Mask Gradients */}
            <div className="absolute top-0 bottom-0 left-0 w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

            {/* Row 1: Scrolls LEFT continuously */}
            <div className="flex overflow-hidden group">
              <div
                className="flex items-center gap-6 w-max animate-marquee-left group-hover:[animation-play-state:paused]"
              >
                {/* Copy 1 */}
                {[
                  { name: 'Instagram', icon: <InstagramIcon className="w-6 h-6" />, color: 'text-[#E1306C]' },
                  { name: 'Facebook', icon: <FacebookIcon className="w-6 h-6" />, color: 'text-[#1877F2]' },
                  { name: 'X (Twitter)', icon: <TwitterIcon className="w-6 h-6" />, color: 'text-slate-900' },
                  { name: 'Reddit', icon: <RedditIcon className="w-6 h-6" />, color: 'text-[#FF4500]' },
                  { name: 'TikTok', icon: <TiktokIcon className="w-8 h-8" />, color: 'text-slate-900' },
                  { name: 'Gemini AI', icon: <GeminiSparkIcon className="w-6 h-6" />, color: 'text-[#1A73E8]' },
                  { name: 'OpenAI', icon: <OpenAIStarIcon className="w-8 h-8" />, color: 'text-[#10A37F]' },
                ].map((item, idx) => (
                  <div
                    key={`r1a-${idx}`}
                    className="w-36 h-36 bg-slate-50 border border-slate-100/90 rounded-3xl p-5 flex flex-col items-center justify-center shadow-sm hover:shadow-md hover:border-slate-200 transition-all cursor-pointer select-none shrink-0"
                  >
                    <div className={`w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-inner mb-3 overflow-hidden ${item.color}`}>
                      {item.icon}
                    </div>
                    <span className="text-xs font-bold text-slate-700">{item.name}</span>
                  </div>
                ))}
                {/* Copy 2 — identical, for seamless loop */}
                {[
                  { name: 'Instagram', icon: <InstagramIcon className="w-6 h-6" />, color: 'text-[#E1306C]' },
                  { name: 'Facebook', icon: <FacebookIcon className="w-6 h-6" />, color: 'text-[#1877F2]' },
                  { name: 'X (Twitter)', icon: <TwitterIcon className="w-6 h-6" />, color: 'text-slate-900' },
                  { name: 'Reddit', icon: <RedditIcon className="w-6 h-6" />, color: 'text-[#FF4500]' },
                  { name: 'TikTok', icon: <TiktokIcon className="w-8 h-8" />, color: 'text-slate-900' },
                  { name: 'Gemini AI', icon: <GeminiSparkIcon className="w-6 h-6" />, color: 'text-[#1A73E8]' },
                  { name: 'OpenAI', icon: <OpenAIStarIcon className="w-8 h-8" />, color: 'text-[#10A37F]' },
                ].map((item, idx) => (
                  <div
                    key={`r1b-${idx}`}
                    className="w-36 h-36 bg-slate-50 border border-slate-100/90 rounded-3xl p-5 flex flex-col items-center justify-center shadow-sm hover:shadow-md hover:border-slate-200 transition-all cursor-pointer select-none shrink-0"
                  >
                    <div className={`w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-inner mb-3 overflow-hidden ${item.color}`}>
                      {item.icon}
                    </div>
                    <span className="text-xs font-bold text-slate-700">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Scrolls RIGHT continuously */}
            <div className="flex overflow-hidden group">
              <div
                className="flex items-center gap-6 w-max animate-marquee-right group-hover:[animation-play-state:paused]"
              >
                {/* Copy 1 */}
                {[
                  { name: 'Gemini AI', icon: <GeminiSparkIcon className="w-6 h-6" />, color: 'text-[#1A73E8]' },
                  { name: 'OpenAI', icon: <OpenAIStarIcon className="w-8 h-8" />, color: 'text-[#10A37F]' },
                  { name: 'TikTok', icon: <TiktokIcon className="w-8 h-8" />, color: 'text-slate-900' },
                  { name: 'Reddit', icon: <RedditIcon className="w-6 h-6" />, color: 'text-[#FF4500]' },
                  { name: 'X (Twitter)', icon: <TwitterIcon className="w-6 h-6" />, color: 'text-slate-900' },
                  { name: 'Facebook', icon: <FacebookIcon className="w-6 h-6" />, color: 'text-[#1877F2]' },
                  { name: 'Instagram', icon: <InstagramIcon className="w-6 h-6" />, color: 'text-[#E1306C]' },
                ].map((item, idx) => (
                  <div
                    key={`r2a-${idx}`}
                    className="w-36 h-36 bg-slate-50 border border-slate-100/90 rounded-3xl p-5 flex flex-col items-center justify-center shadow-sm hover:shadow-md hover:border-slate-200 transition-all cursor-pointer select-none shrink-0"
                  >
                    <div className={`w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-inner mb-3 ${item.color}`}>
                      {item.icon}
                    </div>
                    <span className="text-xs font-bold text-slate-700">{item.name}</span>
                  </div>
                ))}
                {/* Copy 2 — identical, for seamless loop */}
                {[
                  { name: 'Gemini AI', icon: <GeminiSparkIcon className="w-6 h-6" />, color: 'text-[#1A73E8]' },
                  { name: 'OpenAI', icon: <OpenAIStarIcon className="w-8 h-8" />, color: 'text-[#10A37F]' },
                  { name: 'TikTok', icon: <TiktokIcon className="w-8 h-8" />, color: 'text-slate-900' },
                  { name: 'Reddit', icon: <RedditIcon className="w-6 h-6" />, color: 'text-[#FF4500]' },
                  { name: 'X (Twitter)', icon: <TwitterIcon className="w-6 h-6" />, color: 'text-slate-900' },
                  { name: 'Facebook', icon: <FacebookIcon className="w-6 h-6" />, color: 'text-[#1877F2]' },
                  { name: 'Instagram', icon: <InstagramIcon className="w-6 h-6" />, color: 'text-[#E1306C]' },
                ].map((item, idx) => (
                  <div
                    key={`r2b-${idx}`}
                    className="w-36 h-36 bg-slate-50 border border-slate-100/90 rounded-3xl p-5 flex flex-col items-center justify-center shadow-sm hover:shadow-md hover:border-slate-200 transition-all cursor-pointer select-none shrink-0"
                  >
                    <div className={`w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-inner mb-3 ${item.color}`}>
                      {item.icon}
                    </div>
                    <span className="text-xs font-bold text-slate-700">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= SECTION 5: PRICING ================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto text-center">
        
        <div className="mb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 bg-white border border-slate-200 px-4 py-1.5 rounded-full inline-block">Pricing</span>
        </div>
        <div className="mb-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">Simple <span className="text-emerald-600">pricing</span> plans</h2>
        </div>
        <div className="mb-16">
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto font-medium">Unlock maximum coordination. Upgrade whenever your campaign demands increase.</p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
          
          {/* Card 1: Basic */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between hover:shadow-lg transition-all h-[520px]">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Basic plan</h3>
              <p className="text-xs text-slate-400 mt-1">Perfect for individuals.</p>
              
              <div className="my-6">
                <span className="text-4xl font-extrabold text-slate-900">Free</span>
                <span className="text-xs text-slate-400 ml-1">currently</span>
              </div>

              <button 
                onClick={() => setActiveTab('signup')}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-xl text-xs transition-colors mb-8 cursor-pointer"
              >
                Get started for free
              </button>

              <ul className="space-y-3.5 text-xs text-slate-600">
                <li className="flex items-center gap-2.5">
                  <Check size={14} className="text-[#dfff00] bg-slate-900 p-0.5 rounded-full shrink-0" />
                  <span>BYOK AI configuration (1 key)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={14} className="text-[#dfff00] bg-slate-900 p-0.5 rounded-full shrink-0" />
                  <span>Unlimited lists & tasks</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={14} className="text-[#dfff00] bg-slate-900 p-0.5 rounded-full shrink-0" />
                  <span>Basic post scheduling</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={14} className="text-[#dfff00] bg-slate-900 p-0.5 rounded-full shrink-0" />
                  <span>Single workspace limit</span>
                </li>
              </ul>
            </div>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('signup'); }} className="text-xs font-bold text-slate-800 hover:underline">Learn more</a>
          </div>

          {/* Card 2: Pro (Highlighted with Green) */}
          <div className="bg-[#111315] border-2 border-slate-700 rounded-3xl p-8 flex flex-col justify-between hover:shadow-2xl transition-all h-[520px] text-white relative opacity-80 grayscale-[20%]">
            <span className="absolute -top-3.5 right-6 bg-slate-700 text-white font-bold text-[10px] tracking-wider uppercase px-4 py-1.5 rounded-full shadow-md">Coming Soon</span>
            <div>
              <h3 className="text-lg font-bold text-white">Pro plan</h3>
              <p className="text-xs text-slate-400 mt-1">Pro features and pricing will be added later.</p>
              
              <div className="my-6">
                <span className="text-4xl font-extrabold text-slate-400">TBA</span>
              </div>

              <button 
                disabled
                className="w-full bg-slate-800 text-slate-400 font-bold py-3 px-4 rounded-xl text-xs mb-8 cursor-not-allowed"
              >
                Available soon
              </button>

              <ul className="space-y-3.5 text-xs text-slate-400">
                <li className="flex items-center gap-2.5 opacity-50">
                  <Check size={14} className="text-slate-500 bg-slate-800 p-0.5 rounded-full shrink-0" />
                  <span>Advanced workflows</span>
                </li>
                <li className="flex items-center gap-2.5 opacity-50">
                  <Check size={14} className="text-slate-500 bg-slate-800 p-0.5 rounded-full shrink-0" />
                  <span>Premium integrations</span>
                </li>
                <li className="flex items-center gap-2.5 opacity-50">
                  <Check size={14} className="text-slate-500 bg-slate-800 p-0.5 rounded-full shrink-0" />
                  <span>Priority support</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 3: Advanced */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between transition-all h-[520px] opacity-70">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Advanced plan</h3>
              <p className="text-xs text-slate-400 mt-1">Enterprise features and pricing will be added later.</p>
              
              <div className="my-6">
                <span className="text-4xl font-extrabold text-slate-400">TBA</span>
              </div>

              <button 
                disabled
                className="w-full bg-slate-200 text-slate-400 font-bold py-3 px-4 rounded-xl text-xs mb-8 cursor-not-allowed"
              >
                Available soon
              </button>

              <ul className="space-y-3.5 text-xs text-slate-400">
                <li className="flex items-center gap-2.5 opacity-50">
                  <Check size={14} className="text-slate-400 bg-slate-200 p-0.5 rounded-full shrink-0" />
                  <span>Unlimited everything</span>
                </li>
                <li className="flex items-center gap-2.5 opacity-50">
                  <Check size={14} className="text-slate-400 bg-slate-200 p-0.5 rounded-full shrink-0" />
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-center gap-2.5 opacity-50">
                  <Check size={14} className="text-slate-400 bg-slate-200 p-0.5 rounded-full shrink-0" />
                  <span>Dedicated support</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </section>

      {/* ================= SECTION 6: TESTIMONIALS ================= */}
      <section className="bg-white border-t border-slate-300/60 py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-4 py-1.5 rounded-full inline-block">Testimonials</span>
          </div>
          <div className="mb-16">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-4">
              People just like you are <span className="text-emerald-600">already</span> using WorkPro
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
            
            {/* Testimonial 1 */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6.5 flex flex-col justify-between shadow-sm">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-6 select-text">
                "This task manager has completely transformed the way my team works. We now collaborate in real-time and always meet campaigns constraints on time."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="John D." className="w-full h-full object-cover" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-800">John D.</h5>
                  <span className="text-[10px] text-slate-400 font-medium">Marketing Lead</span>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6.5 flex flex-col justify-between shadow-sm">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-6 select-text">
                "An essential tool for anyone looking to manage their tasks better. The BYOK encryption ensures our API credentials remain completely private."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Sarah W." className="w-full h-full object-cover" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-800">Sarah W.</h5>
                  <span className="text-[10px] text-slate-400 font-medium">Freelance Designer</span>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6.5 flex flex-col justify-between shadow-sm">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-6 select-text">
                "The built-in analytics give me a complete overview of our team's productivity. It makes multi-platform scheduling simple and satisfying."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="Sam J." className="w-full h-full object-cover" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-800">Sam J.</h5>
                  <span className="text-[10px] text-slate-400 font-medium">Project Coordinator</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= SECTION 7: BOTTOM CTA CARD ================= */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="bg-[#111315] border-2 border-slate-800 rounded-[2.5rem] p-10 sm:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          
          {/* Subtle grid lines background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />

          {/* Floating visual elements */}
          <div className="absolute top-12 left-12 opacity-60 hidden md:block">
            <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-white text-xs font-bold"><Check size={14} className="text-[#dfff00]" /></div>
          </div>
          <div className="absolute bottom-16 left-24 opacity-60 hidden md:block">
            <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-white text-xs font-bold"><Clock size={14} /></div>
          </div>
          <div className="absolute top-20 right-16 opacity-60 hidden md:block">
            <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-white text-xs font-bold"><Calendar size={14} /></div>
          </div>

          <div className="overflow-hidden mb-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-xl mx-auto relative z-10">
              Stay organized and boost your productivity
            </h2>
          </div>
          <div className="overflow-hidden mb-10">
            <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto relative z-10">
              Sign up now and unlock clean social workflow coordination. Use your own keys, remain in control.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('signup')}
            className="bg-[#dfff00] hover:bg-[#e5ff33] text-slate-950 px-8 py-3.5 rounded-2xl text-sm font-bold shadow-md hover:shadow-lg transition-all relative z-10 cursor-pointer"
          >
            Get started for free
          </button>
        </div>
      </section>

    </div>
  );
};
