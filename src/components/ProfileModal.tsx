import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Building, 
  Shield, 
  Edit3, 
  Save, 
  LogOut, 
  Check, 
  Camera, 
  Calendar, 
  Key,
  ShieldCheck
} from 'lucide-react';
import { useStore } from '../hooks/useStore';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onLogout }) => {
  const { user, updateUser } = useStore();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [organisation, setOrganisation] = useState(user.organisation);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name: name.trim(),
      email: email.trim(),
      organisation: organisation.trim(),
      avatarUrl: avatarUrl.trim() || undefined
    });
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleCancel = () => {
    setName(user.name);
    setEmail(user.email);
    setOrganisation(user.organisation);
    setAvatarUrl(user.avatarUrl || '');
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/15 shadow-2xl p-6 sm:p-8 overflow-hidden space-y-6">
        
        {/* Header & Close */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1F3B2E]/10">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#1F3B2E]" />
            <h2 className="text-base font-bold text-[#1F3B2E]">User Profile & Account</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#1F3B2E]/60 hover:text-[#1F3B2E] hover:bg-[#1F3B2E]/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {savedSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Profile changes saved and persisted successfully.</span>
          </div>
        )}

        {/* Profile Card Header */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/10">
          <div className="relative">
            <img
              src={avatarUrl || user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#1F3B2E]/20 shadow-md"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-[#1F3B2E]">{user.name}</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1F3B2E] text-[#E8DCC6] uppercase tracking-wider">
                {user.role}
              </span>
            </div>
            <p className="text-xs text-[#1F3B2E]/70">{user.email}</p>
            <p className="text-[11px] text-[#1F3B2E]/60 mt-0.5">{user.organisation}</p>
          </div>
        </div>

        {/* Profile Details or Edit Form */}
        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1F3B2E] mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/15 text-xs text-[#1F3B2E] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1F3B2E] mb-1">Work Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/15 text-xs text-[#1F3B2E] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1F3B2E] mb-1">Organisation</label>
              <input
                type="text"
                required
                value={organisation}
                onChange={(e) => setOrganisation(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/15 text-xs text-[#1F3B2E] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1F3B2E] mb-1">Avatar Image URL</label>
              <input
                type="text"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3.5 py-2 rounded-xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/15 text-xs text-[#1F3B2E] focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1F3B2E]/10">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-xs font-semibold text-[#1F3B2E]/70 hover:bg-[#E8DCC6]/40 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-[#1F3B2E] text-[#E8DCC6] font-bold text-xs shadow-md hover:bg-[#14271E] flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#1F3B2E]/10">
                <span className="text-[10px] text-[#1F3B2E]/60 block mb-0.5">Assigned Governance Role</span>
                <span className="font-bold text-[#1F3B2E] capitalize">
                  {user.role === 'admin' ? 'Administrator / Brand Manager' : user.role === 'creator' ? 'Content Creator' : 'Reviewer / Approver'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#1F3B2E]/10">
                <span className="text-[10px] text-[#1F3B2E]/60 block mb-0.5">Account Status</span>
                <span className="font-bold text-emerald-800 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Active & Verified
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#1F3B2E]/10">
                <span className="text-[10px] text-[#1F3B2E]/60 block mb-0.5">Member Since</span>
                <span className="font-bold text-[#1F3B2E]">October 2026</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#1F3B2E]/10">
                <span className="text-[10px] text-[#1F3B2E]/60 block mb-0.5">Enterprise License</span>
                <span className="font-bold text-[#1F3B2E]">CODENEXUS Team HORIZON</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#1F3B2E]/10">
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-red-700 hover:bg-red-50 flex items-center gap-1.5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>

              <button
                onClick={() => setIsEditing(true)}
                className="px-5 py-2 rounded-xl bg-[#1F3B2E] text-[#E8DCC6] font-bold text-xs shadow-md hover:bg-[#14271E] flex items-center gap-1.5 transition-all"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
