import React, { useState } from 'react';
import { Search, Bell, Menu, Shield, ChevronDown, Check, User } from 'lucide-react';
import { useStore } from '../hooks/useStore';
import { UserRole } from '../types';

interface HeaderProps {
  onOpenMobile: () => void;
  onSearchFocus: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenMobile, 
  onSearchFocus, 
  onOpenProfile 
}) => {
  const { user, setUserRole } = useStore();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const roles: { role: UserRole; title: string; desc: string }[] = [
    { role: 'admin', title: 'Admin / Brand Manager', desc: 'Full Brand DNA governance, rules, analytics, & evolution' },
    { role: 'creator', title: 'Content Creator', desc: 'Submit copy/PDFs, view AI reports, & accept corrections' },
    { role: 'reviewer', title: 'Reviewer / Approver', desc: 'Pending approvals queue, review citations, & sign-off' }
  ];

  return (
    <header className="h-20 px-6 sm:px-8 border-b border-[#1F3B2E]/10 bg-[#E8DCC6]/60 backdrop-blur-md flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button
          onClick={onOpenMobile}
          className="lg:hidden p-2 rounded-xl text-[#1F3B2E] hover:bg-[#1F3B2E]/10"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar - matching UI Reference (⌘ + K) */}
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1F3B2E]/40" />
          <input
            type="text"
            placeholder="Search anything... (⌘ + K)"
            onClick={onSearchFocus}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-[#F7F3EB] border border-[#1F3B2E]/15 text-xs text-[#1F3B2E] placeholder-[#1F3B2E]/40 focus:outline-none focus:ring-2 focus:ring-[#1F3B2E]/20 transition-all shadow-inner"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Role Switcher Pill */}
        <div className="relative">
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1F3B2E] text-[#E8DCC6] text-xs font-semibold shadow-sm hover:bg-[#14271E] transition-all"
          >
            <Shield className="w-3.5 h-3.5 text-[#CBB3E8]" />
            <span className="hidden sm:inline">Role:</span>
            <span className="capitalize font-bold text-[#CBB3E8]">
              {user.role === 'admin' ? 'Admin' : user.role === 'creator' ? 'Creator' : 'Reviewer'}
            </span>
            <ChevronDown className="w-3 h-3 text-[#E8DCC6]/70" />
          </button>

          {roleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#F7F3EB] border border-[#1F3B2E]/15 shadow-xl p-2 z-50 animate-fade-in">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#1F3B2E]/60 px-3 py-2 border-b border-[#1F3B2E]/10">
                Switch Role Context
              </div>
              {roles.map(r => (
                <button
                  key={r.role}
                  onClick={() => {
                    setUserRole(r.role);
                    setRoleDropdownOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start justify-between ${
                    user.role === r.role ? 'bg-[#1F3B2E] text-[#E8DCC6]' : 'hover:bg-[#E8DCC6]/50 text-[#1F3B2E]'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold">{r.title}</div>
                    <div className={`text-[10px] mt-0.5 ${user.role === r.role ? 'text-[#E8DCC6]/80' : 'text-[#1F3B2E]/70'}`}>
                      {r.desc}
                    </div>
                  </div>
                  {user.role === r.role && <Check className="w-4 h-4 text-[#CBB3E8] shrink-0 mt-0.5" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2.5 rounded-full bg-[#F7F3EB] border border-[#1F3B2E]/15 text-[#1F3B2E] hover:bg-[#FFFFFF] transition-all shadow-sm"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#F7F3EB] border border-[#1F3B2E]/15 shadow-xl p-3 z-50">
              <div className="text-xs font-bold text-[#1F3B2E] pb-2 border-b border-[#1F3B2E]/10 flex items-center justify-between">
                <span>Recent Notifications</span>
                <span className="text-[10px] font-normal text-[#1F3B2E]/60">3 unread</span>
              </div>
              <div className="space-y-2 mt-2 text-xs">
                <div className="p-2 rounded-lg bg-[#E8DCC6]/40 text-[#1F3B2E]">
                  <p className="font-bold">New Issue Detected</p>
                  <p className="text-[11px] text-[#1F3B2E]/80">"Product Ad Banner" flagged for unsupported guarantee.</p>
                  <span className="text-[9px] text-[#1F3B2E]/50">8m ago</span>
                </div>
                <div className="p-2 rounded-lg bg-[#E8DCC6]/40 text-[#1F3B2E]">
                  <p className="font-bold">Content Approved</p>
                  <p className="text-[11px] text-[#1F3B2E]/80">"Website Copy Update" officially approved by Kshitij.</p>
                  <span className="text-[9px] text-[#1F3B2E]/50">25m ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Working User Profile Pill - Clicking opens ProfileModal */}
        <button
          onClick={onOpenProfile}
          className="flex items-center gap-3 pl-2 border-l border-[#1F3B2E]/15 hover:opacity-85 transition-opacity"
        >
          <img
            src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
            alt={user.name}
            className="w-9 h-9 rounded-full object-cover border border-[#1F3B2E]/20 shadow-sm"
          />
          <div className="hidden md:block text-left">
            <div className="text-xs font-bold text-[#1F3B2E]">{user.name}</div>
            <div className="text-[10px] text-[#1F3B2E]/70">{user.organisation}</div>
          </div>
        </button>
      </div>
    </header>
  );
};
