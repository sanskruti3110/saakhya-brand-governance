import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, User, Building, Shield, Check, ArrowRight, X } from 'lucide-react';
import { UserRole } from '../types';
import { useStore } from '../hooks/useStore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { updateUser, setUserRole } = useStore();
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Form Fields
  const [fullName, setFullName] = useState('Sanskruti Shinde');
  const [email, setEmail] = useState('sanskruti@saakhya.horizon');
  const [organisation, setOrganisation] = useState('Horizon Enterprise');
  const [role, setRole] = useState<UserRole>('admin');
  const [password, setPassword] = useState('••••••••••••');
  const [confirmPassword, setConfirmPassword] = useState('••••••••••••');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (isRegister) {
      if (!fullName.trim() || !email.trim() || !organisation.trim()) {
        setErrorMsg('Please complete all required fields.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }
      if (!agreeTerms) {
        setErrorMsg('Please accept the Terms of Governance and Privacy Policy.');
        return;
      }
    }

    // Persist user & role
    updateUser({
      name: fullName,
      email,
      organisation,
      role
    });
    setUserRole(role);

    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/15 shadow-2xl p-6 sm:p-10 overflow-hidden"
        style={{
          backgroundImage: 'radial-gradient(circle at 10% 10%, #FFFFFF 0%, #F7F3EB 80%)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-[#1F3B2E]/60 hover:text-[#1F3B2E] hover:bg-[#1F3B2E]/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo and Header */}
        <div className="text-center mb-8">
          <img 
            src="/assets/saakhya-logo.png" 
            alt="SAAKHYA Official Logo" 
            className="h-10 w-auto mx-auto object-contain mb-3"
          />
          <h2 className="text-2xl font-bold text-[#1F3B2E]">
            {isRegister ? 'Join SAAKHYA Governance' : 'Welcome to SAAKHYA'}
          </h2>
          <p className="text-xs text-[#1F3B2E]/70 mt-1">
            {isRegister 
              ? 'Create an enterprise workspace for your organization' 
              : 'Sign in to access your brand guidelines and review dashboard'}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#1F3B2E] mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1F3B2E]/40" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#E8DCC6]/30 border border-[#1F3B2E]/15 text-sm text-[#1F3B2E] focus:outline-none focus:ring-2 focus:ring-[#1F3B2E]/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3B2E] mb-1.5">Organisation Name</label>
                <div className="relative">
                  <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1F3B2E]/40" />
                  <input
                    type="text"
                    required
                    value={organisation}
                    onChange={(e) => setOrganisation(e.target.value)}
                    placeholder="e.g. Horizon Enterprise"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#E8DCC6]/30 border border-[#1F3B2E]/15 text-sm text-[#1F3B2E] focus:outline-none focus:ring-2 focus:ring-[#1F3B2E]/30"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#1F3B2E] mb-1.5">Work Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1F3B2E]/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#E8DCC6]/30 border border-[#1F3B2E]/15 text-sm text-[#1F3B2E] focus:outline-none focus:ring-2 focus:ring-[#1F3B2E]/30"
              />
            </div>
          </div>

          {/* Role Selector */}
          <div>
            <label className="block text-xs font-semibold text-[#1F3B2E] mb-1.5">
              Access Role <span className="text-[#9F79CE] font-normal">(Demo Switcher)</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { r: 'admin' as UserRole, label: 'Admin / Manager' },
                { r: 'creator' as UserRole, label: 'Creator' },
                { r: 'reviewer' as UserRole, label: 'Approver' }
              ].map(item => (
                <button
                  type="button"
                  key={item.r}
                  onClick={() => setRole(item.r)}
                  className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all text-center ${
                    role === item.r
                      ? 'bg-[#1F3B2E] text-[#E8DCC6] border-[#1F3B2E] shadow-sm'
                      : 'bg-[#E8DCC6]/30 text-[#1F3B2E]/80 border-[#1F3B2E]/15 hover:bg-[#E8DCC6]/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1F3B2E] mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1F3B2E]/40" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#E8DCC6]/30 border border-[#1F3B2E]/15 text-sm text-[#1F3B2E] focus:outline-none focus:ring-2 focus:ring-[#1F3B2E]/30"
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

          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-[#1F3B2E] mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1F3B2E]/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#E8DCC6]/30 border border-[#1F3B2E]/15 text-sm text-[#1F3B2E] focus:outline-none focus:ring-2 focus:ring-[#1F3B2E]/30"
                />
              </div>
            </div>
          )}

          {!isRegister ? (
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-[#1F3B2E]/80">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-[#1F3B2E] focus:ring-0"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => alert('Password reset link sent to registered email.')}
                className="text-[#1F3B2E] font-semibold hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          ) : (
            <label className="flex items-start gap-2 cursor-pointer text-xs text-[#1F3B2E]/80 pt-1">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 rounded text-[#1F3B2E] focus:ring-0"
              />
              <span>
                I agree to the <a href="#terms" className="text-[#1F3B2E] font-semibold underline">Terms of Governance</a> and <a href="#privacy" className="text-[#1F3B2E] font-semibold underline">Privacy Policy</a>.
              </span>
            </label>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-[#1F3B2E] hover:bg-[#14271E] text-[#E8DCC6] font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-6"
          >
            <span>{isRegister ? 'Create Enterprise Account' : 'Sign In to Workspace'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center mt-6 pt-4 border-t border-[#1F3B2E]/10 text-xs text-[#1F3B2E]/70">
          {isRegister ? (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => { setIsRegister(false); setErrorMsg(''); }}
                className="font-bold text-[#1F3B2E] hover:underline"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              Don't have an enterprise account?{' '}
              <button
                type="button"
                onClick={() => { setIsRegister(true); setErrorMsg(''); }}
                className="font-bold text-[#1F3B2E] hover:underline"
              >
                Create Account
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
