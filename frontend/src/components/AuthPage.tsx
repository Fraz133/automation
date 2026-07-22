import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppStore } from '../store/useAppStore';
import { Lock, Mail, ArrowRight, AlertCircle, RefreshCw, User, Eye, EyeOff } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { setToken, setUser, activeTab, setActiveTab } = useAppStore();
  const mode = activeTab === 'login' || activeTab === 'signup' ? activeTab : 'login';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Check for empty fields first
    if (!email.trim() || !password.trim() || (mode === 'signup' && (!name.trim() || !confirmPassword.trim()))) {
      setError('Please fill out all required fields.');
      setLoading(false);
      return;
    }

    // Comprehensive frontend validation
    if (mode === 'signup' && name.trim().length < 2) {
      setError('Name must be at least 2 characters');
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email address');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (mode === 'signup' && !strongPasswordRegex.test(password)) {
      setError('Password must contain uppercase, lowercase, number, and special character');
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
        setToken(resp.data.token);
        setUser(resp.data.user);
        setActiveTab('home'); // Redirect to home on success
      } else {
        setError(resp.data?.message || 'Authentication failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center p-6 bg-[#363830]">
      <div 
        className="bg-white rounded-[2rem] p-10 md:p-14 max-w-xl w-full shadow-2xl text-slate-900 flex flex-col"
      >
        <div className="mb-10 text-center flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-[#dfff00] text-slate-900 flex items-center justify-center mb-6 shadow-sm">
            <Lock size={24} strokeWidth={2.5} />
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-4">
            {mode === 'signup' ? 'Create an account' : 'Welcome back'}
          </h2>
          <p className="text-sm md:text-base text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
            {mode === 'signup' 
              ? 'Join WorkPro to seamlessly automate and scale your social media presence.' 
              : 'Sign in to access your dashboard and manage your social automation campaigns.'}
          </p>
        </div>

        {error && (
          <div className="p-4 mb-8 rounded-2xl bg-red-50/80 border border-red-100 text-red-600 text-sm font-medium flex items-center gap-3">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6 w-full max-w-md mx-auto">
          {mode === 'signup' && (
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest pl-1">
                Company / Creator Name
              </label>
              <div className="flex items-center gap-3 px-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus-within:border-slate-900 focus-within:ring-1 focus-within:ring-slate-900 transition-all duration-300">
                <User size={18} className="text-slate-400" />
                <input
                  type="text"
                  required={mode === 'signup'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name or Brand"
                  className="w-full bg-transparent text-sm text-slate-900 focus:outline-none font-medium placeholder:text-slate-400"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest pl-1">
              Email Address
            </label>
            <div className="flex items-center gap-3 px-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus-within:border-slate-900 focus-within:ring-1 focus-within:ring-slate-900 transition-all duration-300">
              <Mail size={18} className="text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-transparent text-sm text-slate-900 focus:outline-none font-medium placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest pl-1">
              Password
            </label>
            <div className="flex items-center gap-3 px-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus-within:border-slate-900 focus-within:ring-1 focus-within:ring-slate-900 transition-all duration-300">
              <Lock size={18} className="text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-sm text-slate-900 focus:outline-none font-medium placeholder:text-slate-400"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {mode === 'signup' && (
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest pl-1">
                Confirm Password
              </label>
              <div className="flex items-center gap-3 px-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus-within:border-slate-900 focus-within:ring-1 focus-within:ring-slate-900 transition-all duration-300">
                <Lock size={18} className="text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required={mode === 'signup'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm text-slate-900 focus:outline-none font-medium placeholder:text-slate-400"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#dfff00] hover:bg-[#d4f500] text-slate-900 font-bold py-4 mt-4 rounded-2xl text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_8px_20px_-6px_rgba(223,255,0,0.5)] hover:shadow-[0_12px_24px_-6px_rgba(223,255,0,0.6)] transition-all duration-300 ease-out transform hover:-translate-y-0.5"
          >
            {loading ? (
              <RefreshCw size={18} className="animate-spin" />
            ) : (
              <>
                <span>{mode === 'signup' ? 'Create Account' : 'Sign In'}</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-sm text-slate-500 font-medium">
            {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setActiveTab(mode === 'signup' ? 'login' : 'signup')}
              className="text-slate-900 font-semibold hover:text-slate-600 transition-colors duration-200"
            >
              {mode === 'signup' ? 'Sign in instead' : 'Create one now'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
