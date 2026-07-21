import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { CreatorStudio } from './CreatorStudio';
import { ApiKeysView } from './ApiKeysView';

export const DashboardContainer: React.FC = () => {
  const { activeTab } = useAppStore();

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
      
      {/* WorkPro Embedded Floating Viewport Window */}
      <div className="workpro-dashboard-frame overflow-hidden min-h-[750px] flex flex-col">
        
        {/* Main Viewport Content Area */}
        <main className="flex-1 bg-white flex flex-col rounded-2xl">
          
          {/* WorkPro Stat Cards Row (Visible on Home/Overview tab) */}
          {activeTab === 'home' && (
            <div className="p-8 md:p-12">
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                
                {/* Card 1 */}
                <div className="p-6 rounded-3xl bg-[#dfff00]/20 border border-[#dfff00]/40 flex flex-col justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Today's post</span>
                  <div className="flex items-baseline justify-between mt-3">
                    <span className="text-3xl font-black text-slate-900">721K</span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                      +11.01%
                    </span>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100 flex flex-col justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Upcoming post</span>
                  <div className="flex items-baseline justify-between mt-3">
                    <span className="text-3xl font-black text-slate-900">367K</span>
                    <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                      +11.01%
                    </span>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="p-6 rounded-3xl bg-amber-50 border border-amber-100 flex flex-col justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">New Users</span>
                  <div className="flex items-baseline justify-between mt-3">
                    <span className="text-3xl font-black text-slate-900">1,156</span>
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                      +11.01%
                    </span>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="p-6 rounded-3xl bg-cyan-50 border border-cyan-100 flex flex-col justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Active Users</span>
                  <div className="flex items-baseline justify-between mt-3">
                    <span className="text-3xl font-black text-slate-900">239K</span>
                    <span className="text-[11px] font-bold text-cyan-700 bg-cyan-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                      +11.01%
                    </span>
                  </div>
                </div>

              </div>

              {/* Creator Studio embedded directly */}
              <CreatorStudio />

            </div>
          )}

          {/* Other Tabs */}
          {activeTab === 'studio' && <CreatorStudio />}
          {activeTab === 'keys' && <ApiKeysView />}
          {activeTab !== 'home' && activeTab !== 'studio' && activeTab !== 'keys' && (
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
