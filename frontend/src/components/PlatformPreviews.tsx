import React from 'react';
import type { Platform } from '../types';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Repeat2, Send, ArrowUp, ArrowDown, Music, ThumbsUp, Search, Globe } from 'lucide-react';

interface PlatformPreviewsProps {
  caption: string;
  imageUrl?: string;
  activePlatform: Platform;
}

export const PlatformPreviews: React.FC<PlatformPreviewsProps> = ({
  caption,
  imageUrl,
  activePlatform,
}) => {

  const renderInstagram = () => (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg max-w-md mx-auto text-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
            <div className="w-full h-full bg-white rounded-full p-[1px]">
              <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                WP
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold leading-none">workpro_official</p>
            <p className="text-[10px] text-slate-500">Sponsored</p>
          </div>
        </div>
        <MoreHorizontal size={16} className="text-slate-600 cursor-pointer" />
      </div>

      {/* Media Container */}
      <div className="relative aspect-square bg-slate-100 overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt="Instagram Post" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-6 text-center">
            <span className="text-sm font-semibold">Generating visual preview...</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4 text-slate-700">
            <Heart size={20} className="hover:text-red-500 cursor-pointer" />
            <MessageCircle size={20} className="hover:text-slate-900 cursor-pointer" />
            <Send size={20} className="hover:text-slate-900 cursor-pointer" />
          </div>
          <Bookmark size={20} className="text-slate-700 hover:text-slate-900 cursor-pointer" />
        </div>
        
        {/* Likes */}
        <p className="text-xs font-bold mb-1.5">1,428 likes</p>

        {/* Caption */}
        <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
          <span className="font-bold mr-1.5">workpro_official</span>
          {caption}
        </p>

        <p className="text-[10px] uppercase text-slate-400 mt-2 font-medium">2 hours ago</p>
      </div>
    </div>
  );

  const renderFacebook = () => (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg max-w-md mx-auto text-slate-900 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
            WP
          </div>
          <div>
            <p className="text-xs font-bold leading-none">WorkPro Automation</p>
            <p className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">Just now <Globe size={10} /></p>
          </div>
        </div>
        <MoreHorizontal size={16} className="text-slate-500" />
      </div>

      <p className="text-xs text-slate-800 mb-3 whitespace-pre-wrap leading-relaxed">{caption}</p>

      {imageUrl && (
        <div className="rounded-xl overflow-hidden aspect-video bg-slate-100 mb-3">
          <img src={imageUrl} alt="FB Post" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-semibold text-slate-500">
        <button className="flex items-center gap-1.5 py-1 px-3 rounded-lg hover:bg-slate-100">
          <ThumbsUp size={14} /> Like
        </button>
        <button className="flex items-center gap-1.5 py-1 px-3 rounded-lg hover:bg-slate-100">
          <MessageCircle size={14} /> Comment
        </button>
        <button className="flex items-center gap-1.5 py-1 px-3 rounded-lg hover:bg-slate-100">
          <Share2 size={14} /> Share
        </button>
      </div>
    </div>
  );

  const renderTwitter = () => {
    const charCount = caption.length;
    const isOverLimit = charCount > 280;

    return (
      <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-4 max-w-md mx-auto shadow-xl">
        {/* Character Limit Alert */}
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
          <span className="text-[11px] font-mono text-slate-400">X (Twitter) Preview</span>
          <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${isOverLimit ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
            {charCount} / 280 chars
          </span>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs">
            X
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold">WorkPro</span>
              <span className="text-xs text-slate-500">@workpro_app · 1m</span>
            </div>

            <p className="text-xs text-slate-200 mt-1 whitespace-pre-wrap leading-relaxed">{caption}</p>

            {imageUrl && (
              <div className="mt-3 rounded-2xl overflow-hidden aspect-video bg-slate-800 border border-slate-800">
                <img src={imageUrl} alt="Tweet media" className="w-full h-full object-cover" />
              </div>
            )}

            <div className="flex items-center justify-between text-slate-500 text-xs mt-3 pt-1">
              <span className="flex items-center gap-1 hover:text-cyan-400"><MessageCircle size={14} /> 12</span>
              <span className="flex items-center gap-1 hover:text-emerald-400"><Repeat2 size={14} /> 48</span>
              <span className="flex items-center gap-1 hover:text-pink-400"><Heart size={14} /> 310</span>
              <span className="flex items-center gap-1 hover:text-cyan-400"><Share2 size={14} /></span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderReddit = () => (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 max-w-md mx-auto shadow-lg text-slate-900">
      <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
        <span className="font-bold text-orange-600">r/SocialMediaMarketing</span>
        <span>• Posted by u/WorkProDev 3 hours ago</span>
      </div>

      <h3 className="text-sm font-bold text-slate-900 mb-2">Automate your entire campaign workflow with BYOK AI keys</h3>
      <p className="text-xs text-slate-700 whitespace-pre-wrap leading-relaxed mb-3">{caption}</p>

      {imageUrl && (
        <div className="rounded-xl overflow-hidden aspect-video bg-slate-100 mb-3">
          <img src={imageUrl} alt="Reddit Media" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-full text-slate-800">
          <ArrowUp size={14} className="text-orange-500" />
          <span>482</span>
          <ArrowDown size={14} />
        </div>
        <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full">
          <MessageCircle size={14} /> 84 Comments
        </span>
      </div>
    </div>
  );

  const renderTikTok = () => (
    <div className="relative bg-slate-950 text-white rounded-2xl border border-slate-800 max-w-xs mx-auto aspect-[9/16] overflow-hidden shadow-2xl flex flex-col justify-between p-4">
      {/* Background Image */}
      {imageUrl ? (
        <img src={imageUrl} alt="TikTok Cover" className="absolute inset-0 w-full h-full object-cover opacity-80" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black" />
      )}
      
      <div className="relative z-10 flex items-center justify-between text-xs font-bold text-white/80">
        <span>Following | <strong className="text-white">For You</strong></span>
        <Search size={16} />
      </div>

      {/* Right Action Bar */}
      <div className="relative z-10 self-end flex flex-col items-center gap-4 text-white text-xs font-semibold">
        <div className="w-9 h-9 rounded-full bg-[#dfff00] text-slate-900 font-bold flex items-center justify-center shadow-lg">
          WP
        </div>
        <div className="flex flex-col items-center gap-0.5"><Heart size={22} /> 12.4K</div>
        <div className="flex flex-col items-center gap-0.5"><MessageCircle size={22} /> 842</div>
        <div className="flex flex-col items-center gap-0.5"><Bookmark size={22} /> 1.1K</div>
        <div className="flex flex-col items-center gap-0.5"><Share2 size={22} /> 390</div>
        <div className="w-7 h-7 rounded-full bg-slate-800 animate-spin flex items-center justify-center border border-white/20">
          <Music size={12} />
        </div>
      </div>

      {/* Bottom Caption Overlay */}
      <div className="relative z-10 text-left bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2 rounded-xl">
        <p className="text-xs font-bold mb-1">@workpro_app</p>
        <p className="text-[11px] text-slate-200 line-clamp-3 leading-relaxed">{caption}</p>
        <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-300">
          <Music size={12} /> <span>Original Sound - WorkPro AI Studio</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {activePlatform === 'instagram' && renderInstagram()}
      {activePlatform === 'facebook' && renderFacebook()}
      {activePlatform === 'twitter' && renderTwitter()}
      {activePlatform === 'reddit' && renderReddit()}
      {activePlatform === 'tiktok' && renderTikTok()}
    </div>
  );
};
