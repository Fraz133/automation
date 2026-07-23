import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { toast } from 'react-hot-toast';
import { Link2, Unlink, RefreshCw, ExternalLink, Shield, Zap } from 'lucide-react';

// Social platform brand data
const socialPlatforms = [
  {
    id: 'instagram',
    name: 'Instagram',
    description: 'Photo & video sharing',
    brandColor: '#E1306C',
    gradient: 'from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    id: 'facebook',
    name: 'Facebook',
    description: 'Social networking',
    brandColor: '#1877F2',
    gradient: 'from-[#1877F2] to-[#0C5DC7]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    description: 'Microblogging & news',
    brandColor: '#000000',
    gradient: 'from-slate-800 to-slate-950',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    id: 'reddit',
    name: 'Reddit',
    description: 'Community discussions',
    brandColor: '#FF4500',
    gradient: 'from-[#FF4500] to-[#FF6B35]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
      </svg>
    ),
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    description: 'Short-form video',
    brandColor: '#000000',
    gradient: 'from-[#25F4EE] via-[#FE2C55] to-[#000000]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    ),
  },
];

export const SocialHubView: React.FC = () => {
  const { user, setActiveTab } = useAppStore();
  const [connectedPlatforms, setConnectedPlatforms] = useState<Record<string, boolean>>({});
  const [connectingId, setConnectingId] = useState<string | null>(null);

  const handleConnect = async (platformId: string) => {
    if (!user) {
      toast('Please log in to connect social accounts.', { icon: '🔒' });
      return;
    }

    setConnectingId(platformId);

    // Simulate OAuth flow delay
    setTimeout(() => {
      setConnectedPlatforms((prev) => ({
        ...prev,
        [platformId]: !prev[platformId],
      }));
      setConnectingId(null);

      const platform = socialPlatforms.find((p) => p.id === platformId);
      if (!connectedPlatforms[platformId]) {
        toast.success(`${platform?.name} connected successfully!`);
      } else {
        toast(`${platform?.name} disconnected.`, { icon: '🔗' });
      }
    }, 1500);
  };

  return (
    <div className="p-8 md:p-12 text-slate-900">
      
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Social Hub</h2>
            <p className="text-sm text-slate-500 font-medium mt-2">
              Connect your social accounts to publish content directly from WorkPro.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-xs font-bold">
            <Shield size={14} />
            <span>OAuth 2.0 Secured</span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200/80 rounded-2xl p-6 text-center">
          <p className="text-3xl font-black text-slate-900">{Object.values(connectedPlatforms).filter(Boolean).length}</p>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Connected</p>
        </div>
        <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200/80 rounded-2xl p-6 text-center">
          <p className="text-3xl font-black text-slate-900">{socialPlatforms.length}</p>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Available</p>
        </div>
        <div className="bg-gradient-to-br from-[#dfff00]/10 to-white border border-[#dfff00]/30 rounded-2xl p-6 text-center">
          <div className="flex items-center justify-center gap-1.5 text-slate-900">
            <Zap size={18} className="text-[#c4e600]" />
            <p className="text-3xl font-black">BYOK</p>
          </div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Mode Active</p>
        </div>
      </div>

      {/* Platforms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {socialPlatforms.map((platform) => {
          const isConnected = connectedPlatforms[platform.id] || false;
          const isConnecting = connectingId === platform.id;

          return (
            <div
              key={platform.id}
              className={`group relative bg-white border rounded-3xl p-6 transition-all duration-300 hover:shadow-lg ${
                isConnected
                  ? 'border-emerald-200 shadow-sm shadow-emerald-100/50'
                  : 'border-slate-200/80 hover:border-slate-300'
              }`}
            >
              {/* Connected indicator glow */}
              {isConnected && (
                <div className="absolute top-4 right-4">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                </div>
              )}

              <div className="flex items-start gap-4 mb-5">
                {/* Platform Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shrink-0 bg-gradient-to-br ${platform.gradient} shadow-md`}
                >
                  {platform.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-extrabold text-slate-900">{platform.name}</h3>
                  <p className="text-xs font-medium text-slate-500">{platform.description}</p>
                </div>
              </div>

              {/* Status Row */}
              <div className="flex items-center justify-between mb-5 py-3 px-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                  <span className={`text-xs font-bold ${isConnected ? 'text-emerald-700' : 'text-slate-500'}`}>
                    {isConnected ? 'Connected' : 'Not Connected'}
                  </span>
                </div>
                {isConnected && (
                  <a href="#" className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors">
                    <ExternalLink size={12} />
                    <span>View Profile</span>
                  </a>
                )}
              </div>

              {/* Connect Button */}
              <button
                onClick={() => handleConnect(platform.id)}
                disabled={isConnecting}
                className={`w-full py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-60 ${
                  isConnected
                    ? 'bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-600 border border-slate-200'
                    : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md'
                }`}
              >
                {isConnecting ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    <span>{isConnected ? 'Disconnecting...' : 'Connecting...'}</span>
                  </>
                ) : isConnected ? (
                  <>
                    <Unlink size={14} />
                    <span>Disconnect</span>
                  </>
                ) : (
                  <>
                    <Link2 size={14} />
                    <span>Connect Account</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom Info */}
      <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center shrink-0">
          <Shield size={18} className="text-slate-600" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900 mb-1">Your data stays yours</h4>
          <p className="text-xs font-medium text-slate-500 leading-relaxed">
            WorkPro uses OAuth 2.0 authentication. We never store your social media passwords. 
            Access tokens are encrypted and can be revoked anytime from this page.
          </p>
        </div>
      </div>

    </div>
  );
};
