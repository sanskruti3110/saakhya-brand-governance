import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Building, 
  Shield, 
  Key, 
  Cpu, 
  Check, 
  Save,
  Lock,
  Sparkles
} from 'lucide-react';
import { useStore } from '../hooks/useStore';
import { UserRole } from '../types';

export const SettingsPage: React.FC = () => {
  const { user, updateUser, setUserRole } = useStore();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [organisation, setOrganisation] = useState(user.organisation);
  const [saved, setSaved] = useState(false);

  // AI settings
  const [useLiveAI, setUseLiveAI] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, email, organisation });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12 max-w-4xl">
      {/* Header */}
      <div className="pb-6 border-b border-[#1F3B2E]/10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#1F3B2E] text-[#E8DCC6] flex items-center justify-center shadow-sm">
            <SettingsIcon className="w-5 h-5 text-[#CBB3E8]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1F3B2E]">Settings & Governance Policies</h1>
            <p className="text-xs text-[#1F3B2E]/70 mt-1">
              Configure user profile, role permissions, organization parameters, and AI model orchestration.
            </p>
          </div>
        </div>
      </div>

      {/* User Profile Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/15 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#1F3B2E]/10">
          <h3 className="text-sm font-bold text-[#1F3B2E]">User Profile & Identity</h3>
          {saved && (
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Changes Saved
            </span>
          )}
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1F3B2E] mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/15 text-xs text-[#1F3B2E] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1F3B2E] mb-1">Work Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/15 text-xs text-[#1F3B2E] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1F3B2E] mb-1">Organisation</label>
            <input
              type="text"
              value={organisation}
              onChange={(e) => setOrganisation(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/15 text-xs text-[#1F3B2E] focus:outline-none"
            />
          </div>

          {/* Quick Role Switcher */}
          <div>
            <label className="block text-xs font-semibold text-[#1F3B2E] mb-2">
              Active Evaluation Role: <span className="text-[#9F79CE] font-bold uppercase">{user.role}</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { r: 'admin' as UserRole, label: 'Admin / Brand Manager' },
                { r: 'creator' as UserRole, label: 'Content Creator' },
                { r: 'reviewer' as UserRole, label: 'Reviewer / Approver' }
              ].map(item => (
                <button
                  type="button"
                  key={item.r}
                  onClick={() => setUserRole(item.r)}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all text-center ${
                    user.role === item.r
                      ? 'bg-[#1F3B2E] text-[#E8DCC6] border-[#1F3B2E] shadow-sm'
                      : 'bg-[#E8DCC6]/30 text-[#1F3B2E]/80 border-[#1F3B2E]/15 hover:bg-[#E8DCC6]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#1F3B2E] hover:bg-[#14271E] text-[#E8DCC6] font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Update Profile</span>
            </button>
          </div>
        </form>
      </div>

      {/* AI Model Orchestration */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/15 shadow-sm space-y-4">
        <div className="pb-3 border-b border-[#1F3B2E]/10">
          <h3 className="text-sm font-bold text-[#1F3B2E]">AI Engine & LLM Configuration</h3>
          <p className="text-xs text-[#1F3B2E]/60">
            SAAKHYA uses a dual-engine architecture: deterministic rule parsing for exact checks + contextual LLM for tone and explainability.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/10">
            <div>
              <div className="text-xs font-bold text-[#1F3B2E]">Deterministic Rule Engine</div>
              <div className="text-[11px] text-[#1F3B2E]/70">Fast regex, terminology, and claim boundaries</div>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              Active / Built-in
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/10">
            <div>
              <div className="text-xs font-bold text-[#1F3B2E]">Contextual LLM (Google Gemini / OpenAI)</div>
              <div className="text-[11px] text-[#1F3B2E]/70">Tone analysis, multilingual nuances, and citation synthesis</div>
            </div>
            <span className="text-xs font-bold text-[#9F79CE] bg-[#CBB3E8]/30 px-3 py-1 rounded-full">
              Integrated & Ready
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
