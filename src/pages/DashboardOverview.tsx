import React from 'react';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ChevronRight, 
  Sparkles, 
  Dna, 
  Wand2, 
  GitFork, 
  BarChart3, 
  FileCheck2,
  TrendingUp,
  Send,
  ClipboardCheck,
  Shield,
  BookOpen
} from 'lucide-react';
import { useStore } from '../hooks/useStore';
import { NavSection } from '../components/Sidebar';

interface DashboardOverviewProps {
  onNavigate: (section: NavSection) => void;
  onOpenSubmission: (id: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ 
  onNavigate, 
  onOpenSubmission 
}) => {
  const { user, submissions, guidelines } = useStore();

  const totalSubmissions = submissions.length + 124;
  const awaitingReview = submissions.filter(s => s.status === 'Pending Approval').length + 35;
  const approvedCount = submissions.filter(s => s.status === 'Approved').length + 80;
  const flaggedCount = submissions.filter(s => s.status === 'Needs Changes').length + 7;

  // Creator specific statistics
  const mySubmissions = submissions;
  const myPending = submissions.filter(s => s.status === 'Pending Approval');
  const myFlagged = submissions.filter(s => s.status === 'Needs Changes');
  const myApproved = submissions.filter(s => s.status === 'Approved');

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Hero Welcome Banner - matching reference mockup with role-tailored CTAs */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#F7F3EB] via-[#EFE7D7] to-[#E8DCC6] border border-[#1F3B2E]/15 p-8 sm:p-10 overflow-hidden shadow-sm">
        {/* Decorative background abstract ribbons */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none hidden md:block overflow-hidden">
          <svg viewBox="0 0 400 200" className="w-full h-full object-cover opacity-85">
            <defs>
              <linearGradient id="ribbonGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1F3B2E" />
                <stop offset="100%" stopColor="#2D5442" />
              </linearGradient>
              <linearGradient id="ribbonLilac" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#CBB3E8" />
                <stop offset="100%" stopColor="#9F79CE" />
              </linearGradient>
            </defs>
            <path d="M50,180 C150,20 250,190 380,40" fill="none" stroke="url(#ribbonGreen)" strokeWidth="32" strokeLinecap="round" className="opacity-90" />
            <path d="M80,190 C180,40 280,210 390,70" fill="none" stroke="url(#ribbonLilac)" strokeWidth="16" strokeLinecap="round" className="opacity-75" />
          </svg>
        </div>

        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F3B2E]">
              {user.role === 'admin' && 'Welcome back, Brand Manager! ✨'}
              {user.role === 'creator' && 'Welcome back, Content Creator! ✨'}
              {user.role === 'reviewer' && 'Welcome back, Reviewer! ✨'}
            </h1>
          </div>

          <p className="text-sm text-[#1F3B2E]/80 mb-6 font-normal">
            {user.role === 'admin' && 'Oversee enterprise brand consistency, manage Brand DNA, and simulate rule impact.'}
            {user.role === 'creator' && 'Submit copy or PDF assets for AI Brand DNA review and refine suggested corrections.'}
            {user.role === 'reviewer' && 'Review pending submissions, inspect AI evidence, and make authoritative approval decisions.'}
          </p>

          <div className="flex items-center gap-3">
            {user.role === 'creator' && (
              <button
                onClick={() => onNavigate('content-review')}
                className="px-6 py-3 rounded-full bg-[#1F3B2E] hover:bg-[#14271E] text-[#E8DCC6] font-bold text-xs tracking-wide shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 group"
              >
                <span>Submit New Content</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            {user.role === 'reviewer' && (
              <button
                onClick={() => onNavigate('approvals-hub')}
                className="px-6 py-3 rounded-full bg-[#1F3B2E] hover:bg-[#14271E] text-[#E8DCC6] font-bold text-xs tracking-wide shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 group"
              >
                <span>Open Approvals Queue</span>
                <ClipboardCheck className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            {user.role === 'admin' && (
              <button
                onClick={() => onNavigate('content-review')}
                className="px-6 py-3 rounded-full bg-[#1F3B2E] hover:bg-[#14271E] text-[#E8DCC6] font-bold text-xs tracking-wide shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 group"
              >
                <span>Review New Content</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        </div>

        {/* Brand Tagline in Ribbon */}
        <div className="absolute right-8 bottom-6 hidden lg:block text-right">
          <div className="text-xs font-mono font-bold tracking-widest text-[#1F3B2E]/80">
            SAAKHYA //
          </div>
          <div className="text-[10px] tracking-wider uppercase text-[#1F3B2E]/60 font-semibold">
            AI DETECTS. AI EXPLAINS. HUMANS DECIDE.
          </div>
        </div>
      </div>

      {/* 4 Role-Specific KPI Cards */}
      {user.role === 'admin' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-2xl bg-[#F7F3EB] border border-[#1F3B2E]/10 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#1F3B2E]/10 text-[#1F3B2E] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +12%
              </span>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#1F3B2E]">{totalSubmissions}</div>
              <div className="text-xs font-medium text-[#1F3B2E]/70 mt-1">Total Submissions</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#F7F3EB] border border-[#1F3B2E]/10 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#CBB3E8]/30 text-[#9F79CE] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#9F79CE] bg-[#CBB3E8]/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +5%
              </span>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#1F3B2E]">{awaitingReview}</div>
              <div className="text-xs font-medium text-[#1F3B2E]/70 mt-1">Awaiting Review</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#F7F3EB] border border-[#1F3B2E]/10 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +18%
              </span>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#1F3B2E]">{approvedCount}</div>
              <div className="text-xs font-medium text-[#1F3B2E]/70 mt-1">Approved Content</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#F7F3EB] border border-[#1F3B2E]/10 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +2%
              </span>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#1F3B2E]">{flaggedCount}</div>
              <div className="text-xs font-medium text-[#1F3B2E]/70 mt-1">Flagged Content</div>
            </div>
          </div>
        </div>
      )}

      {user.role === 'creator' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-2xl bg-[#F7F3EB] border border-[#1F3B2E]/10 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#1F3B2E]/10 text-[#1F3B2E] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#1F3B2E] bg-[#E8DCC6] px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#1F3B2E]">{mySubmissions.length}</div>
              <div className="text-xs font-medium text-[#1F3B2E]/70 mt-1">My Submissions</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#F7F3EB] border border-[#1F3B2E]/10 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                Action Required
              </span>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#1F3B2E]">{myFlagged.length}</div>
              <div className="text-xs font-medium text-[#1F3B2E]/70 mt-1">Flagged Issues Needing Fixes</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#F7F3EB] border border-[#1F3B2E]/10 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#CBB3E8]/30 text-[#9F79CE] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#9F79CE] bg-[#CBB3E8]/20 px-2 py-0.5 rounded-full">
                In Review
              </span>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#1F3B2E]">{myPending.length}</div>
              <div className="text-xs font-medium text-[#1F3B2E]/70 mt-1">Awaiting Reviewer Sign-Off</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#F7F3EB] border border-[#1F3B2E]/10 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                Ready to Publish
              </span>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#1F3B2E]">{myApproved.length}</div>
              <div className="text-xs font-medium text-[#1F3B2E]/70 mt-1">Approved Content</div>
            </div>
          </div>
        </div>
      )}

      {user.role === 'reviewer' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-2xl bg-[#F7F3EB] border border-amber-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                Immediate Triage
              </span>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#1F3B2E]">{myPending.length}</div>
              <div className="text-xs font-medium text-[#1F3B2E]/70 mt-1">Pending In Review Queue</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#F7F3EB] border border-[#1F3B2E]/10 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                This Week
              </span>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#1F3B2E]">{approvedCount}</div>
              <div className="text-xs font-medium text-[#1F3B2E]/70 mt-1">Approved Submissions</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#F7F3EB] border border-[#1F3B2E]/10 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                Changes Requested
              </span>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#1F3B2E]">{myFlagged.length}</div>
              <div className="text-xs font-medium text-[#1F3B2E]/70 mt-1">Returned for Revisions</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#F7F3EB] border border-[#1F3B2E]/10 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#1F3B2E]/10 text-[#1F3B2E] flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                High Speed
              </span>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#1F3B2E]">1.4 hrs</div>
              <div className="text-xs font-medium text-[#1F3B2E]/70 mt-1">Avg. Reviewer Turnaround</div>
            </div>
          </div>
        </div>
      )}

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Brand Compliance Overview (Donut Chart) */}
        <div className="p-6 rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#1F3B2E]">Brand Compliance Overview</h3>
            {user.role === 'admin' && (
              <button 
                onClick={() => onNavigate('analytics')}
                className="p-1 rounded-full text-[#1F3B2E]/60 hover:text-[#1F3B2E]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-center py-4">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#E8DCC6" strokeWidth="12" />
                <circle
                  cx="50" cy="50" r="38"
                  fill="transparent"
                  stroke="#1F3B2E"
                  strokeWidth="12"
                  strokeDasharray="208 238"
                  strokeDashoffset="0"
                />
                <circle
                  cx="50" cy="50" r="38"
                  fill="transparent"
                  stroke="#CBB3E8"
                  strokeWidth="12"
                  strokeDasharray="19 238"
                  strokeDashoffset="-208"
                />
                <circle
                  cx="50" cy="50" r="38"
                  fill="transparent"
                  stroke="#E8A598"
                  strokeWidth="12"
                  strokeDasharray="12 238"
                  strokeDashoffset="-227"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-[#1F3B2E]">87%</span>
                <span className="text-[10px] text-[#1F3B2E]/70 font-medium">Compliance Index</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#1F3B2E]/10 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1F3B2E]" />
                <span className="text-[#1F3B2E]/80">Compliant Content</span>
              </div>
              <span className="font-bold text-[#1F3B2E]">87%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#CBB3E8]" />
                <span className="text-[#1F3B2E]/80">Needs Revision</span>
              </div>
              <span className="font-bold text-[#1F3B2E]">8%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#E8A598]" />
                <span className="text-[#1F3B2E]/80">Critical Policy Issues</span>
              </div>
              <span className="font-bold text-[#1F3B2E]">5%</span>
            </div>
          </div>
        </div>

        {/* Recent Activity or Creator Focus */}
        <div className="p-6 rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#1F3B2E]">
              {user.role === 'creator' ? 'My Recent Drafts' : 'Recent Activity Stream'}
            </h3>
            {user.role === 'admin' && (
              <button 
                onClick={() => onNavigate('approvals-hub')}
                className="text-xs font-semibold text-[#1F3B2E]/70 hover:text-[#1F3B2E] flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="space-y-4 my-auto">
            <div className="flex items-start gap-3 relative">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-[#1F3B2E]/50">2m ago</div>
                <div className="text-xs font-bold text-[#1F3B2E]">Content approved</div>
                <div className="text-[11px] text-[#1F3B2E]/70">Social Media Post • Summer Series</div>
              </div>
            </div>

            <div className="flex items-start gap-3 relative">
              <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-[#1F3B2E]/50">8m ago</div>
                <div className="text-xs font-bold text-[#1F3B2E]">New issue detected</div>
                <div className="text-[11px] text-[#1F3B2E]/70">Product Ad Banner (unsupported guarantee)</div>
              </div>
            </div>

            <div className="flex items-start gap-3 relative">
              <div className="w-7 h-7 rounded-full bg-[#CBB3E8]/30 text-[#9F79CE] flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-[#1F3B2E]/50">12m ago</div>
                <div className="text-xs font-bold text-[#1F3B2E]">Brand DNA updated</div>
                <div className="text-[11px] text-[#1F3B2E]/70">Approved Specifications v2.0</div>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-[#1F3B2E]/50 text-right pt-2 border-t border-[#1F3B2E]/10">
            Real-time audit stream active
          </div>
        </div>

        {/* Upcoming Approvals Queue */}
        <div className="p-6 rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#1F3B2E]">
              {user.role === 'reviewer' ? 'Priority Review Queue' : 'Upcoming Approvals'}
            </h3>
            <button 
              onClick={() => onNavigate(user.role === 'creator' ? 'content-review' : 'approvals-hub')}
              className="text-xs font-semibold text-[#1F3B2E]/70 hover:text-[#1F3B2E] flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3 my-auto">
            {submissions.slice(0, 3).map((sub) => (
              <div 
                key={sub.id}
                onClick={() => onOpenSubmission(sub.id)}
                className="p-2.5 rounded-xl bg-[#E8DCC6]/40 hover:bg-[#E8DCC6]/70 border border-[#1F3B2E]/10 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={sub.thumbnail || 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=250'}
                    alt={sub.title}
                    className="w-10 h-10 rounded-lg object-cover border border-[#1F3B2E]/15"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#1F3B2E] line-clamp-1">{sub.title}</div>
                    <div className="text-[10px] text-[#1F3B2E]/60">{sub.organisation}</div>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  sub.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                  sub.status === 'Needs Changes' ? 'bg-amber-100 text-amber-800' :
                  'bg-[#CBB3E8]/30 text-[#1F3B2E]'
                }`}>
                  {sub.status}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigate(user.role === 'creator' ? 'content-review' : 'approvals-hub')}
            className="w-full py-2 text-center text-xs font-bold text-[#1F3B2E] hover:bg-[#E8DCC6]/40 rounded-xl transition-colors mt-2"
          >
            {user.role === 'creator' ? 'Manage My Submissions →' : 'Open Approvals Queue →'}
          </button>
        </div>

      </div>

      {/* Bottom Section: Role-Specific Shortcuts */}
      {user.role === 'admin' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-[#1F3B2E] mb-3">Governance Quick Access</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { id: 'brand-dna' as NavSection, label: 'Brand DNA Engine', icon: Dna },
                { id: 'content-review' as NavSection, label: 'Content Review', icon: FileCheck2 },
                { id: 'correction-studio' as NavSection, label: 'AI Correction Studio', icon: Wand2 },
                { id: 'butterfly-effect' as NavSection, label: 'Brand Butterfly Effect', icon: GitFork },
                { id: 'analytics' as NavSection, label: 'Analytics', icon: BarChart3 }
              ].map(qa => (
                <button
                  key={qa.id}
                  onClick={() => onNavigate(qa.id)}
                  className="p-4 rounded-2xl bg-[#F7F3EB] border border-[#1F3B2E]/10 hover:border-[#1F3B2E]/30 transition-all hover:-translate-y-1 text-left flex flex-col justify-between h-28 shadow-sm group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#1F3B2E]/10 text-[#1F3B2E] flex items-center justify-center group-hover:bg-[#1F3B2E] group-hover:text-[#E8DCC6] transition-colors">
                    <qa.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1F3B2E] leading-tight">{qa.label}</div>
                    <ArrowRight className="w-3 h-3 text-[#1F3B2E]/40 group-hover:text-[#1F3B2E] group-hover:translate-x-1 transition-all mt-1" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-[#14271E] text-[#E8DCC6] p-6 border border-[#CBB3E8]/20 flex flex-col justify-between shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#CBB3E8]/20 text-[#CBB3E8] uppercase tracking-wider">
                ADMIN INNOVATION
              </span>
              <h4 className="text-xl font-bold text-[#E8DCC6] mt-2 mb-2">
                Test My New Rules
              </h4>
              <p className="text-xs text-[#E8DCC6]/80 leading-relaxed mb-4">
                Simulate your brand guidelines before you implement them against all historical content.
              </p>
            </div>

            <div className="relative z-10">
              <button
                onClick={() => onNavigate('test-rules')}
                className="px-5 py-2.5 rounded-full bg-[#E8DCC6] text-[#1F3B2E] font-bold text-xs hover:bg-[#FFFFFF] transition-all flex items-center gap-2 group shadow-sm"
              >
                <span>Try Simulation Now</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      ) : user.role === 'creator' ? (
        <div className="p-6 rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/15 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1F3B2E]">
            <BookOpen className="w-4 h-4 text-[#9F79CE]" />
            <span>Essential Brand DNA Rules for Creators</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/10">
              <span className="font-bold text-red-800 block mb-1">✕ Prohibited Claims:</span>
              <p className="text-[11px] text-[#1F3B2E]/80">Never use "100% Guaranteed" or "World's Best" without accredited third-party validation.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/10">
              <span className="font-bold text-emerald-800 block mb-1">✓ Approved Terminology:</span>
              <p className="text-[11px] text-[#1F3B2E]/80">Use "Autonomous Agent Layer" and "Governed Workflow" instead of "Magic Bot".</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/10">
              <span className="font-bold text-blue-800 block mb-1">Verified Specifications:</span>
              <p className="text-[11px] text-[#1F3B2E]/80">Official benchmark SLA is 99.95% enterprise uptime with SOC-2 Type II certification.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/15 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1F3B2E]">
            <Shield className="w-4 h-4 text-[#9F79CE]" />
            <span>Reviewer Decision Guidelines</span>
          </div>
          <p className="text-xs text-[#1F3B2E]/80 leading-relaxed">
            As a designated brand reviewer, all approvals must verify regulatory compliance under ASCI Code Chapter 1 and CCPA advertisement rules. Always provide actionable revision feedback when requesting changes.
          </p>
        </div>
      )}
    </div>
  );
};
