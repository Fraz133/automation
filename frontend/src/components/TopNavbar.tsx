import React from 'react';
import { useAppStore } from '../store/useAppStore';
import type { NavTab } from '../types';

export const TopNavbar: React.FC = () => {
  const { activeTab, setActiveTab, user, setToken, setUser } = useAppStore();

  const navItems: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'studio', label: 'Creator Studio' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'accounts', label: 'Social Hub' },
    { id: 'keys', label: 'API Keys' },
    { id: 'settings', label: 'Settings' },
  ];

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setActiveTab('home');
  };

  const isAuthPage = activeTab === 'login' || activeTab === 'signup';

  return (
    <header className="sticky top-0 z-50 w-full px-8 py-5 bg-[#363830]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#dfff00] flex items-center justify-center text-[#181a14] font-black shadow-lg group-hover:scale-105 transition-transform">
            <span className="text-sm">WP</span>
          </div>
          <span className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
            WorkPro
          </span>
        </div>

        {/* Centered Sleek Tabs */}
        {!isAuthPage && (
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center py-1 text-[15px] font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-[#dfff00]'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-[#dfff00] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>
        )}

        {/* Right Auth Action Pills */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-sm font-medium text-white/80 px-4 py-2 rounded-full border border-white/10">
                {user.name || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="workpro-glass-pill px-6 py-2.5 rounded-full text-sm font-bold"
              >
                Log Out
              </button>
            </div>
          ) : (
            <>
              {!isAuthPage && (
                <>
                  <button
                    onClick={() => setActiveTab('login')}
                    className="workpro-glass-pill px-6 py-2.5 rounded-full text-sm font-semibold"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => setActiveTab('signup')}
                    className="workpro-lime-btn px-8 py-2.5 rounded-full text-sm font-bold"
                  >
                    Sign up
                  </button>
                </>
              )}
              {activeTab === 'login' && (
                <button
                  onClick={() => setActiveTab('signup')}
                  className="workpro-lime-btn px-8 py-2.5 rounded-full text-sm font-bold"
                >
                  Sign up
                </button>
              )}
              {activeTab === 'signup' && (
                <button
                  onClick={() => setActiveTab('login')}
                  className="workpro-glass-pill px-6 py-2.5 rounded-full text-sm font-semibold"
                >
                  Log in
                </button>
              )}
            </>
          )}
        </div>

      </div>
    </header>
  );
};
