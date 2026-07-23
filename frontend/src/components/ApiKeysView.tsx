import React, { useState } from 'react';
import axios from 'axios';
import { useAppStore } from '../store/useAppStore';
import { toast } from 'react-hot-toast';
import { Key, ShieldCheck, ExternalLink, Loader2, CheckCircle2, XCircle, Eye, EyeOff } from 'lucide-react';

export const ApiKeysView: React.FC = () => {
  const { geminiKey, setGeminiKey, openaiKey, setOpenaiKey, user, setActiveTab } = useAppStore();

  const [inputGemini, setInputGemini] = useState(geminiKey);
  const [inputOpenai, setInputOpenai] = useState(openaiKey);
  const [verifying, setVerifying] = useState(false);
  const [showGemini, setShowGemini] = useState(false);
  const [showOpenai, setShowOpenai] = useState(false);

  const [geminiStatus, setGeminiStatus] = useState<{ ok: boolean | null; error: string }>({
    ok: geminiKey ? true : null,
    error: '',
  });
  const [openaiStatus, setOpenaiStatus] = useState<{ ok: boolean | null; error: string }>({
    ok: openaiKey ? true : null,
    error: '',
  });

  const handleVerifyAndSave = async () => {
    if (!user) {
      toast('Please log in to verify and save your API keys securely.', { icon: '🔒' });
      return;
    }

    setVerifying(true);
    setGeminiStatus({ ok: null, error: '' });
    setOpenaiStatus({ ok: null, error: '' });

    try {
      const resp = await axios.post('/api/keys/verify', {
        gemini_key: inputGemini,
        openai_key: inputOpenai,
      });

      if (resp.data?.success) {
        let gStatus = resp.data.gemini;
        let oStatus = resp.data.openai;
        
        if (gStatus?.error === 'Not provided') {
          gStatus = { ok: null, error: '' };
        }
        if (oStatus?.error === 'Not provided') {
          oStatus = { ok: null, error: '' };
        }

        setGeminiStatus(gStatus);
        setOpenaiStatus(oStatus);

        if (gStatus?.ok) {
          setGeminiKey(inputGemini);
          toast.success('Gemini API key verified & saved!');
        }
        if (oStatus?.ok) {
          setOpenaiKey(inputOpenai);
          toast.success('OpenAI API key verified & saved!');
        }
        
        if (gStatus?.ok === false || oStatus?.ok === false) {
           toast.error('One or more keys failed validation. Please check them.');
        } else if (!gStatus?.ok && !oStatus?.ok) {
           toast('No keys were provided. Please enter at least one key.', { icon: '⚠️' });
        }
      }
    } catch (err: any) {
      toast.error('Key verification failed. Please check your keys.');
      console.error('Key verification error:', err);
    } finally {
      setVerifying(false);
    }
  };

  const StatusBadge = ({ status }: { status: { ok: boolean | null; error: string } }) => {
    if (status.ok === true) {
      return (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200/50">
          <CheckCircle2 size={12} />
          Connected
        </span>
      );
    }
    if (status.ok === false) {
      return (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-red-700 bg-red-50 px-3 py-1.5 rounded-full border border-red-200/50">
          <XCircle size={12} />
          Invalid
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
        Not Verified
      </span>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-8 md:p-12 text-slate-900">
      
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-sm">
            <Key size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">API Configuration</h2>
            <p className="text-xs font-semibold text-slate-500">Bring Your Own Key (BYOK) mode</p>
          </div>
        </div>
        <p className="text-sm text-slate-500 font-medium mt-3 max-w-lg">
          Your API keys are encrypted locally and stored securely on your account. Zero hidden server markup fees. Full transparency.
        </p>
      </div>

      {/* Keys Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* Gemini Key Card */}
        <div className="bg-gradient-to-br from-white to-blue-50/30 p-7 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                  <path d="M12 2L2 19.5h20L12 2zm0 4l6.5 11.5h-13L12 6z"/>
                </svg>
              </div>
              <span className="text-sm font-bold text-slate-900">Google Gemini</span>
            </div>
            <StatusBadge status={geminiStatus} />
          </div>

          <div className="relative mb-4">
            <input
              type={showGemini ? 'text' : 'password'}
              value={inputGemini}
              onChange={(e) => setInputGemini(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full p-4 pr-12 text-sm font-mono bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
            />
            <button
              onClick={() => setShowGemini(!showGemini)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showGemini ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {geminiStatus.error && (
            <p className="text-xs text-red-600 font-medium mb-3 bg-red-50 px-3 py-2 rounded-xl">{geminiStatus.error}</p>
          )}

          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ExternalLink size={12} />
            Get free Gemini Key
          </a>
        </div>

        {/* OpenAI Key Card */}
        <div className="bg-gradient-to-br from-white to-emerald-50/30 p-7 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-sm">
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                  <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.612-1.5z"/>
                </svg>
              </div>
              <span className="text-sm font-bold text-slate-900">OpenAI</span>
            </div>
            <StatusBadge status={openaiStatus} />
          </div>

          <div className="relative mb-4">
            <input
              type={showOpenai ? 'text' : 'password'}
              value={inputOpenai}
              onChange={(e) => setInputOpenai(e.target.value)}
              placeholder="sk-proj-..."
              className="w-full p-4 pr-12 text-sm font-mono bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-300 transition-all"
            />
            <button
              onClick={() => setShowOpenai(!showOpenai)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showOpenai ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {openaiStatus.error && (
            <p className="text-xs text-red-600 font-medium mb-3 bg-red-50 px-3 py-2 rounded-xl">{openaiStatus.error}</p>
          )}

          <a
            href="https://platform.openai.com/api-keys"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <ExternalLink size={12} />
            Get OpenAI Key
          </a>
        </div>

      </div>

      {/* Action Row */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-slate-50 to-white rounded-2xl border border-slate-200/80">
        <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
          <ShieldCheck size={18} className="text-emerald-500" />
          <span>Keys are encrypted with AES-256 and never leave your browser.</span>
        </div>
        <button
          onClick={handleVerifyAndSave}
          disabled={verifying}
          className="bg-slate-900 hover:bg-slate-800 text-[#dfff00] px-8 py-3.5 rounded-2xl text-sm font-bold tracking-wide shadow-lg disabled:opacity-50 transition-all hover:shadow-xl flex items-center gap-2.5 shrink-0"
        >
          {verifying ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Testing Connection...</span>
            </>
          ) : (
            <>
              <ShieldCheck size={16} />
              <span>Verify & Save Keys</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};
