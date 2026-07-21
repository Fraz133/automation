import React, { useState } from 'react';
import axios from 'axios';
import { useAppStore } from '../store/useAppStore';

export const ApiKeysView: React.FC = () => {
  const { geminiKey, setGeminiKey, openaiKey, setOpenaiKey } = useAppStore();

  const [inputGemini, setInputGemini] = useState(geminiKey);
  const [inputOpenai, setInputOpenai] = useState(openaiKey);
  const [verifying, setVerifying] = useState(false);

  const [geminiStatus, setGeminiStatus] = useState<{ ok: boolean | null; error: string }>({
    ok: geminiKey ? true : null,
    error: '',
  });
  const [openaiStatus, setOpenaiStatus] = useState<{ ok: boolean | null; error: string }>({
    ok: openaiKey ? true : null,
    error: '',
  });

  const handleVerifyAndSave = async () => {
    setVerifying(true);
    setGeminiStatus({ ok: null, error: '' });
    setOpenaiStatus({ ok: null, error: '' });

    try {
      const resp = await axios.post('/api/keys/verify', {
        gemini_key: inputGemini,
        openai_key: inputOpenai,
      });

      if (resp.data?.success) {
        setGeminiStatus(resp.data.gemini);
        setOpenaiStatus(resp.data.openai);

        if (resp.data.gemini?.ok) {
          setGeminiKey(inputGemini);
        }
        if (resp.data.openai?.ok) {
          setOpenaiKey(inputOpenai);
        }
      }
    } catch (err: any) {
      console.error('Key verification error:', err);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-slate-900">
      
      <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200/80 shadow-sm mb-8">
        <div className="mb-10">
          <h2 className="text-2xl font-black text-slate-900 mb-2">API Configuration</h2>
          <p className="text-sm text-slate-500 font-medium">
            Bring Your Own Key (BYOK) mode. Your API keys are encrypted locally and stored securely on your account. Zero hidden server markup fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          
          {/* Gemini Key Box */}
          <div className="p-8 rounded-3xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Google Gemini API Key
                </span>
                {geminiStatus.ok === true && (
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                    Connected
                  </span>
                )}
                {geminiStatus.ok === false && (
                  <span className="text-[11px] font-bold text-red-700 bg-red-100 px-3 py-1 rounded-full">
                    Invalid
                  </span>
                )}
              </div>

              <input
                type="password"
                value={inputGemini}
                onChange={(e) => setInputGemini(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full p-4 text-sm font-mono bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#363830] mb-4 transition-all"
              />

              {geminiStatus.error && (
                <p className="text-xs text-red-600 font-medium mb-3">{geminiStatus.error}</p>
              )}
            </div>

            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-slate-500 hover:text-slate-900 underline underline-offset-4 decoration-slate-300"
            >
              Get free Gemini Key
            </a>
          </div>

          {/* OpenAI Key Box */}
          <div className="p-8 rounded-3xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  OpenAI API Key
                </span>
                {openaiStatus.ok === true && (
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                    Connected
                  </span>
                )}
                {openaiStatus.ok === false && (
                  <span className="text-[11px] font-bold text-red-700 bg-red-100 px-3 py-1 rounded-full">
                    Invalid
                  </span>
                )}
              </div>

              <input
                type="password"
                value={inputOpenai}
                onChange={(e) => setInputOpenai(e.target.value)}
                placeholder="sk-proj-..."
                className="w-full p-4 text-sm font-mono bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#363830] mb-4 transition-all"
              />

              {openaiStatus.error && (
                <p className="text-xs text-red-600 font-medium mb-3">{openaiStatus.error}</p>
              )}
            </div>

            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-slate-500 hover:text-slate-900 underline underline-offset-4 decoration-slate-300"
            >
              Get OpenAI Key
            </a>
          </div>

        </div>

        <div className="mt-10 pt-8 border-t border-slate-200 flex justify-end">
          <button
            onClick={handleVerifyAndSave}
            disabled={verifying}
            className="workpro-lime-btn px-10 py-4 rounded-2xl text-sm font-bold tracking-wide shadow-lg"
          >
            {verifying ? 'Testing Connection...' : 'Verify & Save Keys'}
          </button>
        </div>

      </div>

    </div>
  );
};
