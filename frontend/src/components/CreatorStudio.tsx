import React, { useState } from 'react';
import axios from 'axios';
import { useAppStore } from '../store/useAppStore';
import { PlatformPreviews } from './PlatformPreviews';
import { toast } from 'react-hot-toast';
import type { TonePreset, Platform } from '../types';
import { Send, CheckCircle, Copy, Sparkles, Image, Wand2, Loader2, ChevronDown } from 'lucide-react';

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
    user,
  } = useAppStore();

  const [copied, setCopied] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const toneList: TonePreset[] = ['Professional', 'Casual', 'Funny', 'Motivational', 'Inspirational', 'Bold', 'Minimal'];
  const platformList: { id: Platform; label: string }[] = [
    { id: 'instagram', label: 'Instagram' },
    { id: 'facebook', label: 'Facebook' },
    { id: 'twitter', label: 'X (Twitter)' },
    { id: 'reddit', label: 'Reddit' },
    { id: 'tiktok', label: 'TikTok' },
  ];

  const handleGenerateCaptions = async () => {
    if (!user) {
      toast.error('Please log in to generate captions.');
      return;
    }
    if (!topicPrompt.trim()) {
      toast.error('Please enter a content topic first.');
      return;
    }
    setIsGenerating(true);

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
        toast.success('Captions generated successfully!');
      } else {
        toast.error(resp.data?.message || 'Failed to generate captions');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || 'Generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!user) {
      toast.error('Please log in to generate images.');
      return;
    }
    if (!imagePrompt.trim()) {
      toast.error('Please enter an image prompt first.');
      return;
    }
    setIsGeneratingImage(true);
    try {
      const resp = await axios.post('/api/content/image', {
        prompt: `${imagePrompt}, ${selectedTone} style, high quality social media photo`,
      });
      if (resp.data?.success && resp.data.image_url) {
        // Preload image natively to ensure loader spins until visible
        const img = new window.Image();
        img.src = resp.data.image_url;
        img.onload = () => {
          setGeneratedImageUrl(resp.data.image_url);
          setIsGeneratingImage(false);
          toast.success('Image generated successfully!');
        };
        img.onerror = () => {
          setIsGeneratingImage(false);
          toast.error('Failed to load generated image.');
        };
      } else {
        setIsGeneratingImage(false);
        toast.error(resp.data?.message || 'Failed to generate image');
      }
    } catch (err: any) {
      setIsGeneratingImage(false);
      toast.error(err.response?.data?.message || err.message || 'Image generation failed');
    }
  };

  const currentCaption = generatedCaptions[selectedCaptionIndex] || '';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCaption);
    setCopied(true);
    toast.success('Caption copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 p-8 md:p-10 text-slate-900 bg-[#EBECEE] min-h-screen">
      
      {/* Left Column: Input Form & Controls */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        
        {/* Caption Studio Section */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-200">
                <Sparkles size={18} className="text-slate-900" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Caption Studio</h2>
                <p className="text-xs font-medium text-slate-500">Content generation engine</p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-slate-50 text-slate-600 border border-slate-200 uppercase tracking-wider">
              BYOK Active
            </span>
          </div>

          {/* Topic Prompt Input */}
          <div className="mb-5">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">
              Content Topic
            </label>
            <textarea
              value={topicPrompt}
              onChange={(e) => setTopicPrompt(e.target.value)}
              rows={3}
              className="w-full p-4 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all resize-none font-medium placeholder:text-slate-400"
              placeholder="e.g. Launching our eco-friendly coffee tumbler with 24hr temperature retention..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {/* Tone Dropdown */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                Brand Tone
              </label>
              <div className="relative">
                <select
                  value={selectedTone}
                  onChange={(e) => setSelectedTone(e.target.value as TonePreset)}
                  className="w-full p-3.5 pr-10 text-sm bg-slate-50 border border-slate-200 rounded-2xl appearance-none focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 font-bold text-slate-800 transition-all cursor-pointer"
                >
                  {toneList.map(tone => <option key={tone} value={tone}>{tone}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Platform Dropdown */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                Target Platform
              </label>
              <div className="relative">
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value as Platform)}
                  className="w-full p-3.5 pr-10 text-sm bg-slate-50 border border-slate-200 rounded-2xl appearance-none focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 font-bold text-slate-800 transition-all cursor-pointer"
                >
                  {platformList.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerateCaptions}
            disabled={isGenerating}
            className="w-full py-4 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold tracking-wide flex items-center justify-center gap-2 shadow-sm hover:shadow-md disabled:opacity-70 transition-all"
          >
            {isGenerating ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Generating Variations...</span>
              </>
            ) : (
              <>
                <Wand2 size={16} />
                <span>Generate Captions</span>
              </>
            )}
          </button>
        </div>

        {/* Caption Variations Selector */}
        {generatedCaptions.length > 0 && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles size={14} className="text-slate-500" />
                Select a Caption
              </h3>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors shadow-sm"
              >
                {copied ? <CheckCircle size={14} className="text-emerald-600" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              {generatedCaptions.map((cap, idx) => {
                const isSelected = selectedCaptionIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedCaptionIndex(idx)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
                      isSelected
                        ? 'border-slate-900 bg-slate-50 shadow-sm ring-1 ring-slate-900'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Variation {idx + 1}
                      </span>
                      {isSelected && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded border border-slate-900 bg-slate-900 text-white uppercase tracking-wider">
                          Active
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

        {/* Image Studio Section */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-200">
              <Image size={18} className="text-slate-900" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Visual Studio</h2>
              <p className="text-xs font-medium text-slate-500">Generate post graphics</p>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">
              Image Prompt
            </label>
            <textarea
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
              rows={2}
              className="w-full p-4 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all resize-none font-medium placeholder:text-slate-400"
              placeholder="e.g. A high-quality photo of a smart bottle on a wooden desk..."
            />
          </div>

          <button
            onClick={handleGenerateImage}
            disabled={isGeneratingImage}
            className="w-full py-4 px-6 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 text-sm font-bold tracking-wide transition-all border border-slate-300 flex items-center justify-center gap-2 shadow-sm disabled:opacity-70"
          >
            {isGeneratingImage ? (
              <>
                <Loader2 size={16} className="animate-spin text-slate-500" />
                <span>Rendering Visual...</span>
              </>
            ) : (
              <>
                <Image size={16} />
                <span>Generate Image</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Right Column: Platform Preview */}
      <div className="lg:col-span-5 flex flex-col items-center">
        <div className="w-full bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-sm sticky top-28">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-900">
              Live Preview
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-lg">
              {selectedPlatform}
            </span>
          </div>

          {/* Interactive Live Preview Component */}
          <PlatformPreviews
            caption={currentCaption}
            imageUrl={generatedImageUrl}
            activePlatform={selectedPlatform}
          />

          <div className="mt-6 pt-5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Pixel-perfect responsive render</span>
            <button className="text-slate-900 font-bold hover:underline flex items-center gap-1 transition-colors">
              <Send size={14} />
              Schedule Post
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
