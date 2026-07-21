import React, { useState } from 'react';
import axios from 'axios';
import { useAppStore } from '../store/useAppStore';
import { PlatformPreviews } from './PlatformPreviews';
import type { TonePreset, Platform } from '../types';
import { Send, CheckCircle, Copy, AlertCircle } from 'lucide-react';

export const CreatorStudio: React.FC = () => {
  const {
    topicPrompt,
    setTopicPrompt,
    imagePrompt,
    setImagePrompt,
    selectedTone,
    setSelectedTone,
    selectedPlatform,
    setSelectedPlatform,
    generatedCaptions,
    setGeneratedCaptions,
    selectedCaptionIndex,
    setSelectedCaptionIndex,
    generatedImageUrl,
    setGeneratedImageUrl,
    isGenerating,
    setIsGenerating,
    geminiKey,
    openaiKey,
  } = useAppStore();

  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const toneList: TonePreset[] = ['Funny', 'Casual', 'Professional', 'Motivational', 'Inspirational', 'Bold', 'Minimal'];
  const platformList: { id: Platform; label: string }[] = [
    { id: 'instagram', label: 'Instagram' },
    { id: 'facebook', label: 'Facebook' },
    { id: 'twitter', label: 'X (Twitter)' },
    { id: 'reddit', label: 'Reddit' },
    { id: 'tiktok', label: 'TikTok' },
  ];

  const handleGenerateCaptions = async () => {
    setIsGenerating(true);
    setErrorMessage('');

    try {
      const resp = await axios.post('/api/content/caption', {
        topic: topicPrompt,
        tone: selectedTone,
        platform: selectedPlatform,
        gemini_key: geminiKey,
        openai_key: openaiKey,
        provider: geminiKey ? 'gemini' : (openaiKey ? 'openai' : 'gemini'),
      });

      if (resp.data?.success && Array.isArray(resp.data.captions)) {
        setGeneratedCaptions(resp.data.captions);
      } else {
        setErrorMessage(resp.data?.message || 'Failed to generate captions');
      }
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || err.message || 'Generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateImage = async () => {
    try {
      const resp = await axios.post('/api/content/image', {
        prompt: `${imagePrompt}, ${selectedTone} style, high quality social media photo`,
      });
      if (resp.data?.success && resp.data.image_url) {
        setGeneratedImageUrl(resp.data.image_url);
      }
    } catch (err) {
      console.error('Image generation error:', err);
    }
  };

  const currentCaption = generatedCaptions[selectedCaptionIndex] || '';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCaption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 p-8 md:p-12 text-slate-900">
      
      {/* Left Column: Input Form & Controls */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        
        {/* Caption Studio Section */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              Caption Studio
            </h2>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#dfff00]/30 text-slate-800 border border-[#dfff00]">
              BYOK Mode Active
            </span>
          </div>

          {/* Topic Prompt Input */}
          <div className="mb-8">
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">
              Content Topic or Campaign Idea
            </label>
            <textarea
              value={topicPrompt}
              onChange={(e) => setTopicPrompt(e.target.value)}
              rows={3}
              className="w-full p-4 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#363830] transition-all resize-none font-medium"
              placeholder="e.g. Launching our eco-friendly coffee tumbler with 24hr temperature retention..."
            />
          </div>

          {/* Tone Selector Chips */}
          <div className="mb-8">
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">
              Select Brand Tone
            </label>
            <div className="flex flex-wrap gap-2">
              {toneList.map((tone) => {
                const isSelected = selectedTone === tone;
                return (
                  <button
                    key={tone}
                    onClick={() => setSelectedTone(tone)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-[#363830] text-[#dfff00] shadow-md font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tone}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Platform Selector Chips */}
          <div className="mb-8">
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">
              Target Platform
            </label>
            <div className="flex flex-wrap gap-3">
              {platformList.map((p) => {
                const isSelected = selectedPlatform === p.id;
                let activeClass = 'bg-[#dfff00] text-slate-900 shadow-md';
                if (isSelected) {
                  switch (p.id) {
                    case 'instagram': activeClass = 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white shadow-md border-none'; break;
                    case 'facebook': activeClass = 'bg-[#1877F2] text-white shadow-md border-none'; break;
                    case 'twitter': activeClass = 'bg-black text-white shadow-md border-none'; break;
                    case 'reddit': activeClass = 'bg-[#FF4500] text-white shadow-md border-none'; break;
                    case 'tiktok': activeClass = 'bg-slate-900 text-white shadow-md border-none ring-2 ring-cyan-400 ring-offset-1'; break;
                  }
                }
                
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlatform(p.id)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      isSelected
                        ? activeClass
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Error Message if any */}
          {errorMessage && (
            <div className="p-4 mb-6 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={handleGenerateCaptions}
            disabled={isGenerating}
            className="w-full py-4 px-6 rounded-2xl workpro-lime-btn text-sm font-bold tracking-wide flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
          >
            {isGenerating ? (
              <span>Generating Variations...</span>
            ) : (
              <span>Generate Captions (3 Options)</span>
            )}
          </button>
        </div>

        {/* Image Studio Section */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-900 mb-2">Image Studio</h2>
            <p className="text-sm text-slate-500 font-medium">Describe the visual you want to generate to accompany your post.</p>
          </div>

          <div className="mb-8">
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">
              Image Prompt
            </label>
            <textarea
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
              rows={3}
              className="w-full p-4 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#363830] transition-all resize-none font-medium"
              placeholder="e.g. A high-quality photo of a smart bottle on a wooden desk..."
            />
          </div>

          <button
            onClick={handleGenerateImage}
            className="w-full py-4 px-6 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 text-sm font-bold tracking-wide transition-all shadow-lg flex items-center justify-center gap-2"
          >
            Generate Image Visual
          </button>
        </div>

        {/* Caption Variations Selector */}
        {generatedCaptions.length > 0 && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">Generated Variations</h3>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full hover:bg-slate-200"
              >
                {copied ? <CheckCircle size={14} className="text-emerald-600" /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy Selected'}</span>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {generatedCaptions.map((cap, idx) => {
                const isSelected = selectedCaptionIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedCaptionIndex(idx)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#363830] bg-[#363830]/5 ring-2 ring-[#363830]'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Option #{idx + 1}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#dfff00] text-slate-900">
                          Active Selection
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-800 leading-relaxed font-medium">{cap}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Right Column: Platform Preview */}
      <div className="lg:col-span-5 flex flex-col items-center">
        <div className="w-full bg-slate-50 p-6 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>Live Platform Preview</span>
            </h3>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 font-mono">
              {selectedPlatform}
            </span>
          </div>

          {/* Interactive Live Preview Component */}
          <PlatformPreviews
            caption={currentCaption}
            imageUrl={generatedImageUrl}
            activePlatform={selectedPlatform}
          />

          <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Pixel-perfect responsive render</span>
            <button className="text-slate-900 font-bold hover:underline flex items-center gap-1">
              <Send size={14} /> Schedule Post
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
