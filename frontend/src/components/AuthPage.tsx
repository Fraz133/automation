import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppStore } from '../store/useAppStore';
import { Eye, EyeOff, ChevronLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';

const playSuccessSound = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime);
    osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.5);
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch (e) {
    // Ignore if audio not supported
  }
};

const GeometricPattern = () => {
  const outline = "border-[1.5px] border-gray-300";
  return (
    <div className="w-full h-full bg-white relative overflow-hidden">
      {/*
        Object-cover style: the grid is always at least as tall as the container.
        aspect-ratio 3/7 ensures cells stay square; if width overflows it overflows right (panel clips it).
      */}
      <div
        className="absolute inset-y-0 left-0 grid grid-cols-3 grid-rows-7 gap-0"
        style={{ aspectRatio: '3 / 7', minHeight: '100%', minWidth: '100%' }}
      >
        {/* ── ROW 1 ──────────────────────────────────────────────── */}
        {/* Col 1: leaf outline – top-left & bottom-right curves */}
        <div className={`bg-white ${outline} rounded-tl-full rounded-br-full`} />
        {/* Col 2: golden-yellow half coming down from top */}
        <div className="bg-white overflow-hidden">
          <div className="w-full h-full bg-[#D4933A] rounded-b-full" />
        </div>
        {/* Col 3: dark-green half-circle capping top-right */}
        <div className="bg-[#185A48] rounded-bl-full" />

        {/* ── ROW 2 ──────────────────────────────────────────────── */}
        {/* Col 1: peach full circle */}
        <div className="flex items-center justify-center bg-white">
          <div className="w-[85%] h-[85%] bg-[#F5D5B3] rounded-full" />
        </div>
        {/* Col 2: golden blob continuing from row 1 */}
        <div className="bg-[#D4933A] rounded-t-full" />
        {/* Col 3: dark-green filling bottom */}
        <div className="bg-[#185A48] rounded-tr-full" />

        {/* ── ROW 3 ──────────────────────────────────────────────── */}
        {/* Col 1: outline quarter / leaf – bottom-right curve */}
        <div className={`bg-white ${outline} rounded-tr-full rounded-bl-full`} />
        {/* Col 2: light-blue/lavender half filling from left */}
        <div className="bg-[#C9D2E1] rounded-r-full" />
        {/* Col 3: empty white */}
        <div className="bg-white" />

        {/* ── ROW 4 ──────────────────────────────────────────────── */}
        {/* Col 1: navy/dark-blue half-circle facing right */}
        <div className="bg-[#06427D] rounded-r-full" />
        {/* Col 2: peach full circle */}
        <div className="flex items-center justify-center bg-white">
          <div className="w-[85%] h-[85%] bg-[#F5D5B3] rounded-full" />
        </div>
        {/* Col 3: outline arch facing up */}
        <div className={`bg-white ${outline} rounded-t-full`} />

        {/* ── ROW 5 ──────────────────────────────────────────────── */}
        {/* Col 1: outline leaf – top-right / bottom-left */}
        <div className={`bg-white ${outline} rounded-tr-full rounded-bl-full`} />
        {/* Col 2: bright-blue half-circle (top half of butterfly left wing) */}
        <div className="bg-[#1D6CB0] rounded-tl-full" />
        {/* Col 3: bright-blue half-circle (top half of butterfly right wing) */}
        <div className="bg-[#1D6CB0] rounded-tr-full" />

        {/* ── ROW 6 ──────────────────────────────────────────────── */}
        {/* Col 1: lavender-blue half-circle facing down */}
        <div className="bg-[#C9D2E1] rounded-bl-full" />
        {/* Col 2: bright-blue half-circle (bottom half of butterfly left wing) */}
        <div className="bg-[#1D6CB0] rounded-bl-full" />
        {/* Col 3: bright-blue half-circle (bottom half of butterfly right wing) */}
        <div className="bg-[#1D6CB0] rounded-br-full" />

        {/* ── ROW 7 ──────────────────────────────────────────────── */}
        {/* Col 1: outline quarter arch facing top-right */}
        <div className={`bg-white ${outline} rounded-tr-full`} />
        {/* Col 2: peach half facing up (tl+tr) */}
        <div className="bg-[#F5D5B3] rounded-t-full" />
        {/* Col 3: mint/teal small circle */}
        <div className="flex items-center justify-center bg-white">
          <div className="w-[80%] h-[80%] bg-[#CDE6D6] rounded-full" />
        </div>
      </div>
    </div>
  );
};


export const AuthPage: React.FC = () => {
  const { setToken, setUser, activeTab, setActiveTab } = useAppStore();
  const mode = activeTab === 'login' || activeTab === 'signup' ? activeTab : 'login';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email.trim() || !password.trim() || (mode === 'signup' && (!name.trim() || !confirmPassword.trim()))) {
      setError('Please fill out all required fields.');
      setLoading(false);
      return;
    }

    if (mode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const endpoint = mode === 'signup' ? '/api/auth/register' : '/api/auth/login';

    try {
      const payload = mode === 'signup' ? { name, email, password } : { email, password };
      const resp = await axios.post(endpoint, payload);
      if (resp.data?.success) {
        setTimeout(() => {
          setLoading(false);
          playSuccessSound();
          if (mode === 'signup') {
            toast.success('Successfully signed up! Now please login to continue.');
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setActiveTab('login');
          } else {
            toast.success('Successfully logged in! Redirecting...');
            setTimeout(() => {
              setToken(resp.data.token);
              setUser(resp.data.user);
              setActiveTab('home');
            }, 800);
          }
        }, 1500);
      } else {
        setError(resp.data?.message || 'Authentication failed');
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Authentication failed');
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    alert('Google Authentication is ready.');
  };

  const handleFacebookLogin = () => {
    alert('Facebook Authentication is ready.');
  };

  return (
    <div className="min-h-screen w-full bg-white flex overflow-hidden font-sans">

      {/* LEFT PANEL: Geometric Pattern */}
      <div className="hidden lg:block w-[35%] xl:w-[30%] bg-white relative h-screen">
        <GeometricPattern />
      </div>

      {/* RIGHT PANEL: Form */}
      <div className={`flex-1 flex flex-col h-screen overflow-y-auto px-6 sm:px-16 lg:px-24 xl:px-32 relative ${mode === 'signup' ? 'py-4' : 'py-8'}`}>

        <button
          onClick={() => setActiveTab('home')}
          className={`flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors w-fit ${mode === 'signup' ? 'mb-6 mt-2' : 'mb-12 mt-4'}`}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to website
        </button>

        <div className={`w-full max-w-[420px] mx-auto ${mode === 'login' ? 'mt-8 xl:mt-16' : ''}`}>
          <h1 className={`text-[2.5rem] font-bold text-gray-900 tracking-tight ${mode === 'signup' ? 'mb-6' : 'mb-10'}`}>Welcome!</h1>

          {error && (
            <div className="p-3 mb-6 rounded-lg bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className={`${mode === 'signup' ? 'space-y-4' : 'space-y-5'}`}>
            {mode === 'signup' && (
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1.5 pl-1">Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name here"
                  className="w-full px-4 py-3.5 rounded-full border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none text-sm text-gray-900 transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-[11px] font-medium text-gray-500 mb-1.5 pl-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email here"
                className="w-full px-4 py-3.5 rounded-full border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none text-sm text-gray-900 transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-gray-500 mb-1.5 pl-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3.5 rounded-full border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none text-sm text-gray-900 transition-all pr-12 tracking-widest placeholder:tracking-widest"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1.5 pl-1">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-4 py-3.5 rounded-full border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none text-sm text-gray-900 transition-all pr-12 tracking-widest placeholder:tracking-widest"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div className="flex justify-end pt-1">
                <a href="#" className="text-[13px] font-bold text-gray-800 hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#111111] hover:bg-black text-white font-semibold py-3.5 rounded-full text-sm mt-4 transition-colors"
            >
              {loading ? 'Processing...' : (mode === 'signup' ? 'Sign up' : 'Log in')}
            </button>
          </form>

          <div className="space-y-3 mt-10">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-bold py-3.5 rounded-full text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              Log in with Google
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[13px] text-gray-600">
              {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => setActiveTab(mode === 'signup' ? 'login' : 'signup')}
                className="font-bold text-gray-900 hover:underline"
              >
                {mode === 'signup' ? 'Log in' : 'Sign up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
