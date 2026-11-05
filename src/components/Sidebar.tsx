import React from 'react';
import { 
  LayoutDashboard, 
  Dna, 
  FileCheck2, 
  Wand2, 
  FlaskConical, 
  GitFork, 
  Sparkles, 
  ClipboardCheck, 
  BarChart3, 
  Settings,
  Shield,
  LogOut,
  X,
  UserCheck,
  Send
} from 'lucide-react';
import { useStore } from '../hooks/useStore';

export type NavSection = 
  | 'dashboard'
  | 'brand-dna'
  | 'content-review'
  | 'correction-studio'
  | 'test-rules'
  | 'butterfly-effect'
  | 'evolution-intelligence'
  | 'approvals-hub'
  | 'analytics'
  | 'settings'
  | 'profile';

interface SidebarProps {
  currentSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onLogout: () => void;
  onOpenProfile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  onSelectSection,
  mobileOpen,
  onCloseMobile,
  onLogout,
  onOpenProfile
}) => {
  const { user } = useStore();

  // Role-specific navigation items
  const allNavItems = [
    { 
      id: 'dashboard' as NavSection, 
      label: user.role === 'admin' ? 'Admin Dashboard' : user.role === 'creator' ? 'Creator Dashboard' : 'Reviewer Dashboard', 
      icon: LayoutDashboard,
      roles: ['admin', 'creator', 'reviewer']
    },
    { 
      id: 'brand-dna' as NavSection, 
      label: 'Brand DNA Engine', 
      icon: Dna,
      roles: ['admin'] // Admin only
    },
    { 
      id: 'content-review' as NavSection, 
      label: user.role === 'creator' ? 'Submit Content' : 'Content Submissions', 
      icon: user.role === 'creator' ? Send : FileCheck2,
      roles: ['admin', 'creator', 'reviewer']
    },
    { 
      id: 'correction-studio' as NavSection, 
      label: 'AI Correction Studio', 
      icon: Wand2,
      roles: ['admin', 'creator', 'reviewer']
    },
    { 
      id: 'approvals-hub' as NavSection, 
      label: user.role === 'reviewer' ? 'Pending Approvals Queue' : 'Approvals & Revision Hub', 
      icon: ClipboardCheck,
      roles: ['admin', 'reviewer'] // Admin & Reviewer only
    },
    { 
      id: 'test-rules' as NavSection, 
      label: 'Test My New Rules', 
      icon: FlaskConical, 
      isNew: true,
      roles: ['admin'] // Admin only
    },
    { 
      id: 'butterfly-effect' as NavSection, 
      label: 'Brand Butterfly Effect', 
      icon: GitFork,
      roles: ['admin'] // Admin only
    },
    { 
      id: 'evolution-intelligence' as NavSection, 
      label: 'Brand Evolution Intelligence', 
      icon: Sparkles,
      roles: ['admin'] // Admin only
    },
    { 
      id: 'analytics' as NavSection, 
      label: 'Governance Analytics', 
      icon: BarChart3,
      roles: ['admin'] // Admin only
    },
    { 
      id: 'settings' as NavSection, 
      label: 'Settings & Policies', 
      icon: Settings,
      roles: ['admin'] // Admin only
    }
  ];

  const visibleNavItems = allNavItems.filter(item => item.roles.includes(user.role));

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Main Sidebar */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#1F3B2E] text-[#E8DCC6] flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo Area: SAAKHYA Primary Brand Identity */}
          <div className="p-5 pb-4 border-b border-[#CBB3E8]/10 relative">
            <button 
              onClick={onCloseMobile}
              className="lg:hidden absolute top-4 right-4 p-1.5 text-[#E8DCC6]/70 hover:text-[#E8DCC6]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* SAAKHYA Official Brand Logo - Transparent Background, Prominent & Centered */}
            <div className="w-full flex items-center justify-center py-1">
              <img 
                src="/assets/saakhya-logo.png" 
                alt="SAAKHYA Official Brand Logo" 
                className="w-full h-auto max-h-16 object-contain brightness-110 drop-shadow-sm"
              />
            </div>
          </div>

          {/* Navigation Links - Filtered by Authenticated Role */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-270px)]">
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#CBB3E8]/70">
              {user.role === 'admin' ? 'Administration' : user.role === 'creator' ? 'Creator Workspace' : 'Reviewer Workspace'}
            </div>

            {visibleNavItems.map(item => {
              const active = currentSection === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectSection(item.id);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    active 
                      ? 'bg-[#E8DCC6] text-[#1F3B2E] shadow-sm font-bold' 
                      : 'text-[#E8DCC6]/85 hover:bg-[#14271E] hover:text-[#E8DCC6]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-colors ${active ? 'text-[#1F3B2E]' : 'text-[#CBB3E8]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.isNew && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                      active ? 'bg-[#1F3B2E] text-[#E8DCC6]' : 'bg-[#CBB3E8]/20 text-[#CBB3E8]'
                    }`}>
                      New
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section & Role Badge */}
        <div className="p-4 space-y-2 border-t border-[#CBB3E8]/10 bg-[#14271E]/60">
          {/* Working Profile Button */}
          <button
            onClick={() => {
              onOpenProfile();
              onCloseMobile();
            }}
            className="w-full p-2.5 rounded-2xl bg-[#1F3B2E] hover:bg-[#2D5442] border border-[#CBB3E8]/20 text-left transition-all flex items-center gap-3 group"
          >
            <img
              src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover border border-[#CBB3E8]/40"
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-[#E8DCC6] truncate group-hover:text-white">
                {user.name}
              </div>
              <div className="text-[10px] text-[#CBB3E8] font-mono capitalize">
                {user.role === 'admin' ? 'Admin' : user.role === 'creator' ? 'Content Creator' : 'Reviewer'}
              </div>
            </div>
          </button>

          {/* Logout Action */}
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#E8DCC6]/70 hover:text-red-300 hover:bg-[#14271E] rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
