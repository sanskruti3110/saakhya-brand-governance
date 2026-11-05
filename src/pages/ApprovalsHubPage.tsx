import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Search, 
  ArrowRight,
  MessageSquare,
  FileText,
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../hooks/useStore';
import { ContentSubmission } from '../types';

interface ApprovalsHubPageProps {
  onOpenCorrectionStudio: (id: string) => void;
}

export const ApprovalsHubPage: React.FC<ApprovalsHubPageProps> = ({ onOpenCorrectionStudio }) => {
  const { submissions, updateSubmissionStatus, user } = useStore();
  const [filter, setFilter] = useState<'Pending Approval' | 'Approved' | 'Needs Changes' | 'all'>('Pending Approval');
  const [search, setSearch] = useState('');

  const filtered = submissions.filter(s => {
    const matchesFilter = filter === 'all' || s.status === filter;
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) ||
                          s.creatorName.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleQuickApprove = (id: string) => {
    updateSubmissionStatus(id, 'Approved', 'Quick approval by reviewer after verifying all Brand DNA requirements.');
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#1F3B2E', '#CBB3E8', '#E8DCC6']
    });
  };

  const handleQuickReject = (id: string) => {
    const note = prompt('Please specify the reason for rejection:');
    if (note) {
      updateSubmissionStatus(id, 'Needs Changes', note);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="pb-6 border-b border-[#1F3B2E]/10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#1F3B2E] text-[#E8DCC6] flex items-center justify-center shadow-sm">
            <ClipboardCheck className="w-5 h-5 text-[#CBB3E8]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1F3B2E]">Approvals & Revision Hub</h1>
            <p className="text-xs text-[#1F3B2E]/70 mt-1 max-w-xl">
              Formal human review and sign-off portal. Authorised reviewers inspect AI findings, add feedback, and make definitive publishing decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {[
            { id: 'Pending Approval', label: 'Pending Approvals' },
            { id: 'Needs Changes', label: 'Needs Changes' },
            { id: 'Approved', label: 'Approved Archive' },
            { id: 'all', label: 'All Items' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                filter === tab.id
                  ? 'bg-[#1F3B2E] text-[#E8DCC6] shadow-sm'
                  : 'bg-[#F7F3EB] text-[#1F3B2E]/70 hover:bg-[#E8DCC6]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1F3B2E]/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search approvals..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-[#F7F3EB] border border-[#1F3B2E]/15 text-xs text-[#1F3B2E] focus:outline-none"
          />
        </div>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="p-8 rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/15 text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-[#1F3B2E]">No Items in this Category</h4>
            <p className="text-xs text-[#1F3B2E]/60 mt-1">Select a different tab or submit new content for review.</p>
          </div>
        ) : (
          filtered.map(sub => (
            <div
              key={sub.id}
              className="p-6 rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/10 hover:border-[#1F3B2E]/30 transition-all shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8DCC6] border border-[#1F3B2E]/10 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-[#1F3B2E]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-[#1F3B2E]">{sub.title}</h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        sub.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                        sub.status === 'Needs Changes' ? 'bg-amber-100 text-amber-800' :
                        'bg-[#CBB3E8]/30 text-[#1F3B2E]'
                      }`}>
                        {sub.status}
                      </span>
                    </div>
                    <div className="text-xs text-[#1F3B2E]/70">
                      Creator: <span className="font-semibold">{sub.creatorName}</span> • Campaign: {sub.campaign} • Submitted: {sub.submittedAt}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenCorrectionStudio(sub.id)}
                    className="px-4 py-2 rounded-xl bg-[#E8DCC6] text-[#1F3B2E] text-xs font-bold hover:bg-[#D4C6AB] transition-colors"
                  >
                    Open Studio
                  </button>

                  {sub.status === 'Pending Approval' && (
                    <>
                      <button
                        onClick={() => handleQuickReject(sub.id)}
                        className="px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold hover:bg-amber-100 transition-colors"
                      >
                        Request Changes
                      </button>
                      <button
                        onClick={() => handleQuickApprove(sub.id)}
                        className="px-5 py-2 rounded-xl bg-[#1F3B2E] hover:bg-[#14271E] text-[#E8DCC6] text-xs font-bold shadow-md hover:shadow-lg transition-all"
                      >
                        Approve
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Content Preview */}
              <div className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#1F3B2E]/10 text-xs text-[#1F3B2E] leading-relaxed">
                "{sub.currentContent}"
              </div>

              {/* Reviewer Note if available */}
              {sub.reviewerNotes && (
                <div className="p-3 rounded-xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/10 text-xs text-[#1F3B2E]/80 flex items-start gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-[#1F3B2E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#1F3B2E]">Reviewer Comment: </span>
                    {sub.reviewerNotes}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
