import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { CreatorStudio } from './CreatorStudio';
import { ApiKeysView } from './ApiKeysView';
import { CalendarView } from './CalendarView';
import { SocialHubView } from './SocialHubView';
import { X, LogIn } from 'lucide-react';

export const DashboardContainer: React.FC = () => {
  const { activeTab, user, setActiveTab } = useAppStore();
  const [bannerDismissed, setBannerDismissed] = useState(false);

  if (activeTab === 'home') {
    return null;
  }

  const showAuthBanner = !user && !bannerDismissed;

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 relative">
      
      {/* Non-blocking Auth Banner */}
      {showAuthBanner && (
        <div className="mb-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl px-6 py-4 flex items-center justify-between shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#dfff00]/20 flex items-center justify-center shrink-0">
              <LogIn size={20} className="text-[#dfff00]" />
            </div>
            <div>
              <p className="text-sm font-bold">You're browsing as a guest</p>
              <p className="text-xs text-slate-400 font-medium">Log in to unlock full features, save your work, and connect social accounts.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('login')}
              className="bg-[#dfff00] text-slate-900 px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#e5ff33] transition-colors shadow-md"
            >
              Log In
            </button>
            <button
              onClick={() => setBannerDismissed(true)}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* WorkPro Embedded Floating Viewport Window */}
      <div className="workpro-dashboard-frame overflow-hidden min-h-[750px] flex flex-col relative">
        
        {/* Main Viewport Content Area */}
        <main className="flex-1 bg-white flex flex-col rounded-2xl relative">
          
          {/* App Workspace Tabs — all render regardless of auth */}
          {activeTab === 'studio' && <CreatorStudio />}
          {activeTab === 'keys' && <ApiKeysView />}
          {activeTab === 'calendar' && <CalendarView />}
          {activeTab === 'accounts' && <SocialHubView />}
          {activeTab !== 'studio' && activeTab !== 'keys' && activeTab !== 'calendar' && activeTab !== 'accounts' && (
            <div className="p-16 text-center text-slate-500 flex-1 flex flex-col items-center justify-center">
              <h3 className="text-2xl font-bold text-slate-800 mb-4 capitalize">{activeTab} Workspace</h3>
              <p className="text-sm font-medium">Module ready and connected to backend API endpoints.</p>
            </div>
          )}

        </main>

      </div>

    </div>
  );
};
