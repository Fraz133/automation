import { useEffect } from 'react';
import axios from 'axios';
import { TopNavbar } from './components/TopNavbar';
import { HeroSection } from './components/HeroSection';
import { DashboardContainer } from './components/DashboardContainer';
import { AuthPage } from './components/AuthPage';
import { useAppStore } from './store/useAppStore';

export function App() {
  const { activeTab, token, setUser } = useAppStore();
  const isAuthPage = activeTab === 'login' || activeTab === 'signup';

  useEffect(() => {
    if (token) {
      axios
        .get('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          if (res.data?.success) setUser(res.data.user);
        })
        .catch(() => {
          // Token expired or invalid
        });
    }
  }, [token, setUser]);

  return (
    <div className="min-h-screen workpro-hero-bg text-white flex flex-col justify-between selection:bg-[#dfff00] selection:text-slate-900">
      
      <div className="flex flex-col flex-1">
        {/* Sleek Top Navigation Bar */}
        <TopNavbar />

        {/* Content Area */}
        {isAuthPage ? (
          <AuthPage />
        ) : (
          <>
            {/* Hero Section (Visible on Home Tab) */}
            {activeTab === 'home' && <HeroSection />}

            {/* Embedded Floating Dashboard Container */}
            <DashboardContainer />
          </>
        )}
      </div>

      {/* Footer */}
      {!isAuthPage && (
        <footer className="py-8 px-6 text-center border-t border-white/10 text-xs text-white/50 font-medium mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p>© 2026 WorkPro Social Automation Platform. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">API Docs</a>
            </div>
          </div>
        </footer>
      )}

    </div>
  );
}

export default App;
