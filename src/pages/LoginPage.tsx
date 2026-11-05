import React, { useState } from 'react';
import { Shield, Send, ClipboardCheck, Lock, Mail, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { UserRole } from '../types';
import { useStore } from '../hooks/useStore';

interface LoginPageProps {
  onLoginSuccess: (role: UserRole) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const { updateUser, setUserRole } = useStore();
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  
  // Credentials map for each role
  const roleCredentials: Record<UserRole, { name: string; email: string; org: string; avatar: string }> = {
    admin: {
      name: 'Sanskruti Shinde',
      email: 'sanskruti@saakhya.horizon',
      org: 'Horizon Enterprise',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
    },
    creator: {
      name: 'Arjun Mehta',
      email: 'arjun@horizon.agency',
      org: 'Horizon Marketing Agency',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250'
    },
    reviewer: {
      name: 'Kshitij Laddad',
      email: 'kshitij@saakhya.horizon',
      org: 'Horizon Brand Governance',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250'
    }
  };

  const [name, setName] = useState(roleCredentials.admin.name);
  const [email, setEmail] = useState(roleCredentials.admin.email);
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setName(roleCredentials[role].name);
    setEmail(roleCredentials[role].email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    // Securely set the authenticated user profile with matching role permissions
    const creds = roleCredentials[selectedRole];
    updateUser({
      name: name.trim(),
      email: email.trim(),
      organisation: creds.org,
      role: selectedRole,
      avatarUrl: creds.avatar
    });
    setUserRole(selectedRole);

    onLoginSuccess(selectedRole);
  };

  return (
    <div 
      className="min-h-screen bg-[#E8DCC6] flex items-center justify-center p-6"
      style={{
        backgroundImage: 'radial-gradient(circle at 50% 30%, #F5EFE4 0%, #E8DCC6 75%, #DACAB0 100%)'
      }}
    >
      <div className="w-full max-w-xl rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/15 shadow-2xl p-8 sm:p-10 space-y-6 animate-fade-in">
        
        {/* SAAKHYA Official Brand Logo - Transparent */}
        <div className="text-center">
          <div className="max-w-xs mx-auto mb-4 flex items-center justify-center">
            <img 
              src="/assets/saakhya-logo.png" 
              alt="SAAKHYA Official Brand Logo" 
              className="w-full h-auto max-h-20 object-contain drop-shadow-sm"
            />
          </div>
          <h1 className="text-2xl font-extrabold text-[#1F3B2E]">Sign In to Workspace</h1>
          <p className="text-xs text-[#1F3B2E]/70 mt-1">
            Select your assigned role to access your dedicated governance environment.
          </p>
        </div>

        {/* Step 1: Role Selection Cards */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1F3B2E]/80">
            1. Select Your Role
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                role: 'admin' as UserRole,
                label: 'Admin',
                title: 'Brand Manager',
                icon: Shield,
                desc: 'Full governance, rules & analytics'
              },
              {
                role: 'creator' as UserRole,
                label: 'Creator',
                title: 'Content Creator',
                icon: Send,
                desc: 'Submit copy, review & fix issues'
              },
              {
                role: 'reviewer' as UserRole,
                label: 'Reviewer',
                title: 'Approver',
                icon: ClipboardCheck,
                desc: 'Pending queue & approval sign-off'
              }
            ].map(item => {
              const Icon = item.icon;
              const isSelected = selectedRole === item.role;
              return (
                <button
                  type="button"
                  key={item.role}
                  onClick={() => handleRoleChange(item.role)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between h-28 ${
                    isSelected
                      ? 'bg-[#1F3B2E] text-[#E8DCC6] border-[#1F3B2E] shadow-md scale-102'
                      : 'bg-[#E8DCC6]/40 text-[#1F3B2E] border-[#1F3B2E]/15 hover:bg-[#E8DCC6]/70'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-[#CBB3E8]' : 'text-[#1F3B2E]'}`} />
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                      isSelected ? 'bg-[#CBB3E8]/20 text-[#CBB3E8]' : 'bg-[#1F3B2E]/10 text-[#1F3B2E]'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-tight">{item.title}</div>
                    <div className={`text-[9px] mt-0.5 leading-snug ${isSelected ? 'text-[#E8DCC6]/75' : 'text-[#1F3B2E]/60'}`}>
                      {item.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Login Fields */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-[#1F3B2E] mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1F3B2E]/40" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/15 text-xs text-[#1F3B2E] focus:outline-none focus:ring-2 focus:ring-[#1F3B2E]/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1F3B2E] mb-1">Work Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1F3B2E]/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/15 text-xs text-[#1F3B2E] focus:outline-none focus:ring-2 focus:ring-[#1F3B2E]/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1F3B2E] mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1F3B2E]/40" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/15 text-xs text-[#1F3B2E] focus:outline-none focus:ring-2 focus:ring-[#1F3B2E]/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1F3B2E]/50 hover:text-[#1F3B2E]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-[#1F3B2E]/80">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded text-[#1F3B2E] focus:ring-0"
              />
              <span>Remember me on this workstation</span>
            </label>
            <button
              type="button"
              onClick={() => alert('Security notice: Authorized users can request password resets through their enterprise administrator.')}
              className="text-[#1F3B2E] font-semibold hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-[#1F3B2E] hover:bg-[#14271E] text-[#E8DCC6] font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
          >
            <span>
              Sign In as {selectedRole === 'admin' ? 'Admin' : selectedRole === 'creator' ? 'Content Creator' : 'Reviewer'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#1F3B2E]/10 text-[10px] text-[#1F3B2E]/60 font-mono">
          SAAKHYA Brand Governance Platform • Team HORIZON
        </div>
      </div>
    </div>
  );
};
