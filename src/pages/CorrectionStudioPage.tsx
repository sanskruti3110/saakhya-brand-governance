import React, { useState } from 'react';
import { 
  Wand2, 
  Check, 
  X, 
  Edit3, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  History, 
  FileText, 
  SplitSquareVertical, 
  Send,
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../hooks/useStore';
import { AnalysisIssue } from '../types';

interface CorrectionStudioPageProps {
  submissionId: string;
  onBack: () => void;
}

export const CorrectionStudioPage: React.FC<CorrectionStudioPageProps> = ({
  submissionId,
  onBack
}) => {
  const { 
    getSubmissionById, 
    applyIssueAction, 
    updateSubmissionStatus, 
    user 
  } = useStore();

  const submission = getSubmissionById(submissionId);
  const [activeTab, setActiveTab] = useState<'studio' | 'diff' | 'history'>('studio');
  const [editingIssueId, setEditingIssueId] = useState<string | null>(null);
  const [customEditText, setCustomEditText] = useState('');
  const [reviewerComment, setReviewerComment] = useState('');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewAction, setReviewAction] = useState<'Approved' | 'Rejected' | 'Needs Changes'>('Approved');

  if (!submission) {
    return (
      <div className="p-12 text-center text-[#1F3B2E]">
        <h2 className="text-xl font-bold mb-2">Submission Not Found</h2>
        <button onClick={onBack} className="text-xs font-bold underline">
          Return to Queue
        </button>
      </div>
    );
  }

  const report = submission.analysisReport;
  const issues = report?.issues || [];
  const unresolvedIssues = issues.filter(i => i.status === 'unresolved');

  const handleAccept = (issueId: string) => {
    applyIssueAction(submission.id, issueId, 'accept');
  };

  const handleReject = (issueId: string) => {
    applyIssueAction(submission.id, issueId, 'reject');
  };

  const handleStartEdit = (issue: AnalysisIssue) => {
    setEditingIssueId(issue.id);
    setCustomEditText(issue.suggestedReplacement || issue.excerpt);
  };

  const handleSaveEdit = (issueId: string) => {
    if (customEditText.trim()) {
      applyIssueAction(submission.id, issueId, 'edit', customEditText.trim());
    }
    setEditingIssueId(null);
  };

  const handleReviewerDecision = () => {
    updateSubmissionStatus(submission.id, reviewAction, reviewerComment);
    setIsReviewModalOpen(false);
    if (reviewAction === 'Approved') {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#1F3B2E', '#CBB3E8', '#E8DCC6']
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1F3B2E]/10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-[#F7F3EB] border border-[#1F3B2E]/15 hover:bg-[#FFFFFF] text-[#1F3B2E] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#1F3B2E]">{submission.title}</h1>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                submission.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                submission.status === 'Needs Changes' ? 'bg-amber-100 text-amber-800' :
                'bg-[#CBB3E8]/30 text-[#1F3B2E]'
              }`}>
                {submission.status}
              </span>
            </div>
            <p className="text-xs text-[#1F3B2E]/60 mt-0.5">
              Creator: {submission.creatorName} • Channel: {submission.channel} • Language: {submission.language}
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 rounded-full bg-[#F7F3EB] border border-[#1F3B2E]/15">
            <button
              onClick={() => setActiveTab('studio')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'studio' ? 'bg-[#1F3B2E] text-[#E8DCC6] shadow-sm' : 'text-[#1F3B2E]/70 hover:text-[#1F3B2E]'
              }`}
            >
              Correction Studio
            </button>
            <button
              onClick={() => setActiveTab('diff')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'diff' ? 'bg-[#1F3B2E] text-[#E8DCC6] shadow-sm' : 'text-[#1F3B2E]/70 hover:text-[#1F3B2E]'
              }`}
            >
              Side-by-Side Diff
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'history' ? 'bg-[#1F3B2E] text-[#E8DCC6] shadow-sm' : 'text-[#1F3B2E]/70 hover:text-[#1F3B2E]'
              }`}
            >
              Audit Trail ({submission.revisionHistory.length})
            </button>
          </div>
        </div>
      </div>

      {/* Compliance Overview Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F3EB] border border-[#1F3B2E]/15 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#1F3B2E] text-[#E8DCC6] flex flex-col items-center justify-center font-extrabold text-sm">
            <span>{submission.complianceScore}%</span>
            <span className="text-[8px] font-normal tracking-tight text-[#CBB3E8]">SCORE</span>
          </div>
          <div>
            <div className="text-xs font-bold text-[#1F3B2E]">AI Inspection Status</div>
            <div className="text-xs text-[#1F3B2E]/80">
              {report?.summary || 'No issues detected.'}
            </div>
          </div>
        </div>

        {/* Readability & Contrast Badges */}
        <div className="flex items-center gap-3 text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/10">
            <span className="text-[#1F3B2E]/60 text-[10px] block">Readability (WCAG 3.1)</span>
            <span className="font-bold text-[#1F3B2E]">{report?.metrics.readabilityLevel || 'Standard'}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/10">
            <span className="text-[#1F3B2E]/60 text-[10px] block">Contrast Check</span>
            <span className="font-bold text-[#1F3B2E]">{report?.metrics.contrastRatio || '7.2:1 (Passes AAA)'}</span>
          </div>
        </div>
      </div>

      {activeTab === 'studio' ? (
        /* Studio Split View: Current Copy on Left, Issues & Actions on Right */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Live Content Workspace */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/15 shadow-sm h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#1F3B2E]/10 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1F3B2E]/80">
                    Live Governed Content Draft
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#1F3B2E]/10 text-[#1F3B2E] font-mono">
                    Rev #{submission.revisionHistory.length}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#1F3B2E]/10 text-sm text-[#1F3B2E] leading-relaxed font-sans min-h-[220px] whitespace-pre-wrap">
                  {submission.currentContent}
                </div>

                <div className="mt-4 p-3 rounded-xl bg-[#E8DCC6]/30 border border-[#1F3B2E]/10 text-[11px] text-[#1F3B2E]/70">
                  <span className="font-bold text-[#1F3B2E]">Note on Integrity: </span>
                  Original content is permanently archived in the audit log. The platform never silently modifies text without explicit human acceptance.
                </div>
              </div>

              {/* Action Buttons for Creator or Reviewer */}
              <div className="pt-6 border-t border-[#1F3B2E]/10 flex items-center justify-between gap-3">
                {user.role === 'reviewer' || user.role === 'admin' ? (
                  <>
                    <button
                      onClick={() => {
                        setReviewAction('Needs Changes');
                        setIsReviewModalOpen(true);
                      }}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#E8DCC6] hover:bg-[#D4C6AB] text-[#1F3B2E] text-xs font-bold transition-all text-center"
                    >
                      Request Changes
                    </button>
                    <button
                      onClick={() => {
                        setReviewAction('Approved');
                        setIsReviewModalOpen(true);
                      }}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#1F3B2E] hover:bg-[#14271E] text-[#E8DCC6] text-xs font-bold shadow-md hover:shadow-lg transition-all text-center"
                    >
                      Approve Content
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      updateSubmissionStatus(submission.id, 'Pending Approval', 'Creator finalized suggestions and submitted for managerial approval.');
                      alert('Submission sent to Approvals Hub for review.');
                    }}
                    className="w-full py-3 rounded-xl bg-[#1F3B2E] hover:bg-[#14271E] text-[#E8DCC6] text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Revision for Approval</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: AI Issues & Interactive Fixes */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#1F3B2E]">
                Detected Brand Issues ({unresolvedIssues.length} unresolved)
              </h3>
              <span className="text-[10px] text-[#1F3B2E]/60">
                Click Accept or Edit to update copy
              </span>
            </div>

            {issues.length === 0 ? (
              <div className="p-8 rounded-3xl bg-[#F7F3EB] border border-emerald-200 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-[#1F3B2E]">No Brand Violations Detected</h4>
                <p className="text-xs text-[#1F3B2E]/70 mt-1">
                  This content adheres to all approved Brand DNA guidelines, terminology, and verified specifications.
                </p>
              </div>
            ) : (
              issues.map(issue => (
                <div
                  key={issue.id}
                  className={`p-5 rounded-3xl border transition-all shadow-sm ${
                    issue.status === 'accepted' ? 'bg-emerald-50/70 border-emerald-200 opacity-80' :
                    issue.status === 'rejected' ? 'bg-gray-50 border-gray-200 opacity-60' :
                    issue.severity === 'Critical' ? 'bg-[#FFFFFF] border-red-300' :
                    'bg-[#FFFFFF] border-[#1F3B2E]/15'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        issue.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                        issue.severity === 'High' ? 'bg-amber-100 text-amber-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {issue.severity}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#CBB3E8]/30 text-[#1F3B2E]">
                        {issue.category}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-[#1F3B2E]/50">
                      {issue.status.toUpperCase()}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-[#1F3B2E] mb-1">{issue.title}</h4>
                  
                  {/* Flagged passage */}
                  <div className="text-xs bg-red-50 p-2 rounded-lg border border-red-200 text-red-900 mb-2 font-mono">
                    "{issue.excerpt}"
                  </div>

                  {/* Explanation & Citation */}
                  <p className="text-xs text-[#1F3B2E]/80 leading-relaxed mb-3">
                    {issue.explanation}
                  </p>
                  <div className="text-[10px] text-[#1F3B2E]/60 italic mb-3">
                    Citation: {issue.supportingGuideline}
                  </div>

                  {/* Suggested Action & Replacement */}
                  {issue.status === 'unresolved' && (
                    <div className="mt-3 pt-3 border-t border-[#1F3B2E]/10 space-y-3">
                      {editingIssueId === issue.id ? (
                        <div className="space-y-2">
                          <label className="block text-[11px] font-semibold text-[#1F3B2E]">
                            Custom Replacement Text:
                          </label>
                          <input
                            type="text"
                            value={customEditText}
                            onChange={(e) => setCustomEditText(e.target.value)}
                            className="w-full p-2 text-xs rounded-xl border border-[#1F3B2E]/20 bg-[#E8DCC6]/20 focus:outline-none"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setEditingIssueId(null)}
                              className="px-3 py-1 text-xs text-[#1F3B2E]/60 hover:text-[#1F3B2E]"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSaveEdit(issue.id)}
                              className="px-3 py-1 text-xs font-bold bg-[#1F3B2E] text-[#E8DCC6] rounded-lg"
                            >
                              Save & Apply
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {issue.suggestedReplacement && (
                            <div className="text-xs bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 text-emerald-900">
                              <span className="font-bold">AI Suggested Replacement: </span>
                              <span>"{issue.suggestedReplacement}"</span>
                            </div>
                          )}

                          <div className="flex items-center gap-2 pt-1">
                            {issue.suggestedReplacement && (
                              <button
                                onClick={() => handleAccept(issue.id)}
                                className="flex-1 py-1.5 px-3 rounded-lg bg-[#1F3B2E] text-[#E8DCC6] text-xs font-bold hover:bg-[#14271E] flex items-center justify-center gap-1.5 shadow-sm"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Accept Suggestion</span>
                              </button>
                            )}

                            <button
                              onClick={() => handleStartEdit(issue)}
                              className="py-1.5 px-3 rounded-lg bg-[#E8DCC6] text-[#1F3B2E] text-xs font-semibold hover:bg-[#D4C6AB] flex items-center gap-1.5"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>

                            <button
                              onClick={() => handleReject(issue.id)}
                              className="py-1.5 px-3 rounded-lg text-red-700 hover:bg-red-50 text-xs font-semibold"
                            >
                              Reject
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      ) : activeTab === 'diff' ? (
        /* Side by Side Diff Comparison */
        <div className="p-6 rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/15 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#1F3B2E]/10">
            <h3 className="text-sm font-bold text-[#1F3B2E]">Original Submission vs. Current Governed Version</h3>
            <span className="text-xs text-[#1F3B2E]/60">Transparent Comparison</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-2xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/10">
              <div className="text-xs font-bold text-red-800 uppercase mb-2">Original Raw Submission</div>
              <p className="text-xs text-[#1F3B2E] leading-relaxed font-mono whitespace-pre-wrap">
                {submission.rawContent}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
              <div className="text-xs font-bold text-emerald-800 uppercase mb-2">Governed Revised Content</div>
              <p className="text-xs text-[#1F3B2E] leading-relaxed font-mono whitespace-pre-wrap">
                {submission.currentContent}
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Audit Trail & Revision History */
        <div className="p-6 rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/15 shadow-sm space-y-4">
          <div className="pb-3 border-b border-[#1F3B2E]/10">
            <h3 className="text-sm font-bold text-[#1F3B2E]">Immutable Revision & Governance Audit Trail</h3>
            <p className="text-xs text-[#1F3B2E]/60">
              Every creation, AI suggestion action, and reviewer modification is logged with timestamps.
            </p>
          </div>

          <div className="space-y-3">
            {submission.revisionHistory.map((rev, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#1F3B2E]/10 shadow-sm flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-xl bg-[#1F3B2E] text-[#E8DCC6] flex items-center justify-center shrink-0 font-bold text-xs">
                  #{rev.revisionNumber}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1F3B2E]">{rev.action}</span>
                    <span className="text-[10px] text-[#1F3B2E]/50 font-mono">{rev.timestamp}</span>
                  </div>
                  <div className="text-[11px] text-[#1F3B2E]/70 mt-0.5">
                    By {rev.modifiedBy} ({rev.role})
                  </div>
                  {rev.notes && (
                    <div className="mt-2 text-xs p-2 rounded-lg bg-[#E8DCC6]/40 text-[#1F3B2E] italic">
                      "{rev.notes}"
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviewer Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/15 shadow-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-[#1F3B2E] mb-1">
              Confirm Decision: {reviewAction}
            </h3>
            <p className="text-xs text-[#1F3B2E]/70 mb-4">
              {reviewAction === 'Approved' 
                ? 'Approve this content for external publishing and campaign distribution.' 
                : 'Send content back to creator with specific feedback.'}
            </p>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#1F3B2E] mb-1">Reviewer Feedback Note</label>
              <textarea
                rows={3}
                value={reviewerComment}
                onChange={(e) => setReviewerComment(e.target.value)}
                placeholder="Add formal reviewer comments or reasons for decision..."
                className="w-full p-3 rounded-xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/15 text-xs text-[#1F3B2E] focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-[#1F3B2E]/70 hover:bg-[#E8DCC6]/40 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleReviewerDecision}
                className="px-6 py-2 rounded-xl bg-[#1F3B2E] text-[#E8DCC6] font-bold text-xs shadow-md hover:bg-[#14271E]"
              >
                Confirm {reviewAction}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
