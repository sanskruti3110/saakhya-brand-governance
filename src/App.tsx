import React, { useState } from 'react';
import { OpeningAnimation } from './components/OpeningAnimation';
import { LoginPage } from './pages/LoginPage';
import { ProfileModal } from './components/ProfileModal';
import { Sidebar, NavSection } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardOverview } from './pages/DashboardOverview';
import { BrandDNAPage } from './pages/BrandDNAPage';
import { ContentReviewPage } from './pages/ContentReviewPage';
import { CorrectionStudioPage } from './pages/CorrectionStudioPage';
import { TestNewRulesPage } from './pages/TestNewRulesPage';
import { ButterflyEffectPage } from './pages/ButterflyEffectPage';
import { BrandEvolutionPage } from './pages/BrandEvolutionPage';
import { ApprovalsHubPage } from './pages/ApprovalsHubPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { useStore } from './hooks/useStore';
import { UserRole } from './types';
import { ShieldAlert } from 'lucide-react';

export function App() {
  const { user } = useStore();
  const [showAnimation, setShowAnimation] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Initially false so user logs in after animation
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<NavSection>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmissionId, setActiveSubmissionId] = useState<string>('sub-101');

  const handleAnimationComplete = () => {
    setShowAnimation(false);
  };

  const handleLoginSuccess = (role: UserRole) => {
    setIsAuthenticated(true);
    setCurrentSection('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentSection('dashboard');
  };

  const handleOpenSubmission = (id: string) => {
    setActiveSubmissionId(id);
    setCurrentSection('correction-studio');
  };

  // Check role authorization for current section
  const isAuthorized = () => {
    if (user.role === 'admin') return true;
    if (user.role === 'creator') {
      return ['dashboard', 'content-review', 'correction-studio'].includes(currentSection);
    }
    if (user.role === 'reviewer') {
      return ['dashboard', 'approvals-hub', 'content-review', 'correction-studio'].includes(currentSection);
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-[#E8DCC6] text-[#1F3B2E]">
      {/* 1. Signature Opening Animation (First Screen) */}
      {showAnimation && (
        <OpeningAnimation onComplete={handleAnimationComplete} />
      )}

      {/* 2. Login Page with Role Selection (Appears after animation) */}
      {!showAnimation && !isAuthenticated && (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}

      {/* 3. Authenticated Platform Shell */}
      {!showAnimation && isAuthenticated && (
        <div className="flex min-h-screen bg-[#E8DCC6]">
          {/* Main Sidebar */}
          <Sidebar
            currentSection={currentSection}
            onSelectSection={(section) => setCurrentSection(section)}
            mobileOpen={mobileMenuOpen}
            onCloseMobile={() => setMobileMenuOpen(false)}
            onLogout={handleLogout}
            onOpenProfile={() => setIsProfileOpen(true)}
          />

          {/* Main Content Area */}
          <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
            {/* Top Navigation Header */}
            <Header
              onOpenMobile={() => setMobileMenuOpen(true)}
              onSearchFocus={() => setCurrentSection('content-review')}
              onOpenProfile={() => setIsProfileOpen(true)}
            />

            {/* Dynamic View Route with Role Guard */}
            <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
              {!isAuthorized() ? (
                <div className="p-10 rounded-3xl bg-[#F7F3EB] border border-amber-200 text-center max-w-md mx-auto my-12 space-y-4 shadow-sm">
                  <ShieldAlert className="w-12 h-12 text-amber-700 mx-auto" />
                  <h3 className="text-lg font-bold text-[#1F3B2E]">Administrator Access Required</h3>
                  <p className="text-xs text-[#1F3B2E]/70 leading-relaxed">
                    This governance engine is restricted to authorized Brand Managers and Administrators.
                  </p>
                  <button
                    onClick={() => setCurrentSection('dashboard')}
                    className="px-5 py-2 rounded-xl bg-[#1F3B2E] text-[#E8DCC6] text-xs font-bold"
                  >
                    Return to Dashboard
                  </button>
                </div>
              ) : (
                <>
                  {currentSection === 'dashboard' && (
                    <DashboardOverview
                      onNavigate={(sec) => setCurrentSection(sec)}
                      onOpenSubmission={handleOpenSubmission}
                    />
                  )}

                  {currentSection === 'brand-dna' && (
                    <BrandDNAPage />
                  )}

                  {currentSection === 'content-review' && (
                    <ContentReviewPage
                      onOpenSubmission={handleOpenSubmission}
                      onOpenCorrectionStudio={handleOpenSubmission}
                    />
                  )}

                  {currentSection === 'correction-studio' && (
                    <CorrectionStudioPage
                      submissionId={activeSubmissionId}
                      onBack={() => setCurrentSection(user.role === 'reviewer' ? 'approvals-hub' : 'content-review')}
                    />
                  )}

                  {currentSection === 'approvals-hub' && (
                    <ApprovalsHubPage
                      onOpenCorrectionStudio={handleOpenSubmission}
                    />
                  )}

                  {currentSection === 'test-rules' && (
                    <TestNewRulesPage />
                  )}

                  {currentSection === 'butterfly-effect' && (
                    <ButterflyEffectPage />
                  )}

                  {currentSection === 'evolution-intelligence' && (
                    <BrandEvolutionPage />
                  )}

                  {currentSection === 'analytics' && (
                    <AnalyticsPage />
                  )}

                  {currentSection === 'settings' && (
                    <SettingsPage />
                  )}
                </>
              )}
            </main>
          </div>

          {/* Working Profile Modal */}
          <ProfileModal
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
            onLogout={handleLogout}
          />
        </div>
      )}
    </div>
  );
}

export default App;
