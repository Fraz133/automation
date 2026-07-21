import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setActiveTab } = useAppStore();

  return (
    <section className="relative px-6 pt-12 pb-16 text-center max-w-5xl mx-auto overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#dfff00]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Tagline Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#dfff00] text-xs font-semibold uppercase tracking-widest mb-8">
        <Sparkles size={14} />
        <span>Next-Gen Social Media Automation</span>
      </div>

      {/* Main Title matching WorkPro reference */}
      <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl mx-auto mb-6">
        A powerful tool to automate <br />
        <span className="text-[#dfff00] relative">
          your social media
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed mb-10">
        Enhance your ROI with detailed reports. Analyze data that matters to your brand and develop the best marketing strategy effortlessly.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center gap-6 justify-center mb-20 mt-12">
        <button
          onClick={() => setActiveTab('studio')}
          className="workpro-lime-btn px-10 py-5 rounded-full text-base font-bold shadow-xl shadow-[#dfff00]/10"
        >
          Start your free trial
        </button>

        <button
          onClick={() => setActiveTab('studio')}
          className="workpro-glass-pill px-10 py-5 rounded-full text-base font-semibold"
        >
          How it works
        </button>
      </div>

      {/* Supported By Logos Strip */}
      <div className="pt-8 border-t border-white/10">
        <p className="text-xs uppercase tracking-widest text-white/50 mb-6 font-semibold">
          Supported by over 31,000 social media managers worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
          <span className="text-white font-bold text-lg tracking-wider">OCTOPUS</span>
          <span className="text-white font-bold text-lg tracking-wider">#slack</span>
          <span className="text-white font-bold text-lg tracking-wider">Airtable</span>
          <span className="text-white font-bold text-lg tracking-wider">Instagram</span>
          <span className="text-white font-bold text-lg tracking-wider">Google</span>
          <span className="text-white font-bold text-lg tracking-wider">facebook</span>
        </div>
      </div>

    </section>
  );
};
