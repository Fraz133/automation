import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { ChevronUp, ChevronDown, AlertTriangle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import type { NavTab } from '../types';

export const TopNavbar: React.FC = () => {
  const { activeTab, setActiveTab, user, setToken, setUser, setScheduledPosts } = useAppStore();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const navItems: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'studio', label: 'Creator Studio' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'accounts', label: 'Social Hub' },
    { id: 'keys', label: 'API Keys' },
  ];

  if (user && activeTab !== 'login' && activeTab !== 'signup') {
    navItems.push({ id: 'settings', label: 'Settings' });
  }

  const handleTabClick = (id: NavTab) => {
    setActiveTab(id);
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    setToken(null);
    setUser(null);
    setScheduledPosts([]);
    setActiveTab('home');
    setIsLogoutModalOpen(false);
    toast('You have been logged out.', { icon: '⚠️' });
  };

  const isAuthPage = activeTab === 'login' || activeTab === 'signup';

  return (
    <>
      {/* Custom Logout Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">Log Out?</h3>
              <p className="text-sm font-medium text-slate-500 mb-8">
                Are you sure you want to log out of your account? You will need to log back in to access your workspaces.
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setIsLogoutModalOpen(false)}
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 shadow-md transition-colors"
                >
                  Yes, Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 w-full px-8 py-4 bg-[#EBECEE]/90 backdrop-blur-md border-b border-slate-300/60 text-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Chevron Logo (SalesPilot AI Style) */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <ChevronUp size={20} className="stroke-[3]" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1 font-sans">
              WorkPro
            </span>
          </div>

          {/* Centered SalesPilot AI Header Tabs with Dropdown Indicators */}
          {!isAuthPage && (
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`flex items-center gap-1 py-1 transition-colors duration-200 ${
                      isActive ? 'text-slate-950 font-bold' : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown size={14} className="text-slate-400" />
                  </button>
                );
              })}
            </nav>
          )}

          {/* Right Auth Action Pills (SalesPilot AI Style) */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-xs font-semibold px-4 py-2 rounded-full bg-white border border-slate-300 text-slate-800 shadow-sm">
                  {user.name || user.email}
                </span>
                <button
                  onClick={handleLogoutClick}
                  className="px-5 py-2 rounded-full text-xs font-bold border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 transition-all shadow-sm"
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
                      className="px-5 py-2 rounded-full text-xs font-bold border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 transition-all shadow-sm"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => setActiveTab('signup')}
                      className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-all"
                    >
                      Get Started
                    </button>
                  </>
                )}
                {activeTab === 'login' && (
                  <button
                    onClick={() => setActiveTab('signup')}
                    className="bg-slate-900 text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-slate-800 transition-all shadow-md"
                  >
                    Get Started
                  </button>
                )}
                {activeTab === 'signup' && (
                  <button
                    onClick={() => setActiveTab('login')}
                    className="border border-slate-300 bg-white text-slate-800 px-6 py-2 rounded-full text-xs font-bold hover:bg-slate-50 transition-all shadow-sm"
                  >
                    Login
                  </button>
                )}
              </>
            )}
          </div>

        </div>
      </header>
    </>
  );
};
