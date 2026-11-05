import React from 'react';
import { 
  Sparkles, 
  Check, 
  X, 
  AlertCircle, 
  TrendingUp, 
  Lightbulb, 
  CheckCircle2, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';
import { useStore } from '../hooks/useStore';

export const BrandEvolutionPage: React.FC = () => {
  const { evolutionPatterns, approveEvolutionPattern, dismissEvolutionPattern } = useStore();

  const activePatterns = evolutionPatterns.filter(p => p.status === 'pending_review');
  const resolvedPatterns = evolutionPatterns.filter(p => p.status !== 'pending_review');

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="pb-6 border-b border-[#1F3B2E]/10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#1F3B2E] text-[#E8DCC6] flex items-center justify-center shadow-sm">
            <Sparkles className="w-5 h-5 text-[#CBB3E8]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#1F3B2E]">Brand Evolution Intelligence</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#CBB3E8]/30 text-[#1F3B2E] uppercase">
                Innovation 03
              </span>
            </div>
            <p className="text-xs text-[#1F3B2E]/70 mt-1 max-w-2xl">
              Adaptive guideline intelligence. The platform aggregates review data to detect recurring creator mistakes, uncovers ambiguous or contradictory guidelines, and recommends targeted improvements for manager approval.
            </p>
          </div>
        </div>
      </div>

      {/* Philosophy Banner */}
      <div className="p-4 rounded-2xl bg-[#1F3B2E] text-[#E8DCC6] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Lightbulb className="w-5 h-5 text-[#CBB3E8] shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-[#CBB3E8]">Human Authority Rule: </span>
            The AI detects friction points and suggests guideline refinements, but will never modify official Brand DNA rules without an authorized manager's approval.
          </div>
        </div>
      </div>

      {/* Active Recommended Improvements */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#1F3B2E]">
            Pending Guideline Refinements ({activePatterns.length})
          </h2>
          <span className="text-xs text-[#1F3B2E]/60">
            Computed from continuous content analysis
          </span>
        </div>

        {activePatterns.length === 0 ? (
          <div className="p-8 rounded-3xl bg-[#F7F3EB] border border-emerald-200 text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-[#1F3B2E]">All Guidelines Up to Date</h4>
            <p className="text-xs text-[#1F3B2E]/70 mt-1">
              No unresolved chronic friction patterns currently detected.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {activePatterns.map(pattern => (
              <div 
                key={pattern.id}
                className="p-6 sm:p-8 rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/15 shadow-sm space-y-4"
              >
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-100 text-red-800 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>{pattern.recurringViolationCount} Recurring Violations</span>
                    </span>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#E8DCC6] text-[#1F3B2E]">
                      Target Rule: {pattern.guidelineTitle}
                    </span>
                  </div>
                </div>

                {/* Pattern Summary */}
                <div>
                  <h3 className="text-base font-bold text-[#1F3B2E] mb-1">
                    Observed Creator Pattern
                  </h3>
                  <p className="text-xs text-[#1F3B2E]/80 leading-relaxed bg-[#FFFFFF] p-3 rounded-xl border border-[#1F3B2E]/10">
                    "{pattern.patternSummary}"
                  </p>
                </div>

                {/* Friction Cause Analysis */}
                <div>
                  <div className="text-xs font-bold text-[#1F3B2E] mb-1">
                    Root Cause Analysis:
                  </div>
                  <p className="text-xs text-[#1F3B2E]/70 leading-relaxed">
                    {pattern.userFrictionReason}
                  </p>
                </div>

                {/* Recommendation Box */}
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                  <div className="text-xs font-bold flex items-center gap-2 mb-1.5 text-emerald-900">
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                    <span>Recommended Guideline Refinement:</span>
                  </div>
                  <p className="text-xs leading-relaxed italic">
                    "{pattern.recommendedImprovement}"
                  </p>
                </div>

                {/* Human Decision Controls */}
                <div className="pt-4 border-t border-[#1F3B2E]/10 flex items-center justify-end gap-3">
                  <button
                    onClick={() => dismissEvolutionPattern(pattern.id)}
                    className="px-4 py-2 text-xs font-semibold text-[#1F3B2E]/70 hover:bg-[#E8DCC6]/40 rounded-xl"
                  >
                    Dismiss Pattern
                  </button>
                  <button
                    onClick={() => approveEvolutionPattern(pattern.id)}
                    className="px-6 py-2.5 rounded-xl bg-[#1F3B2E] hover:bg-[#14271E] text-[#E8DCC6] font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve & Update Guideline</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* History of Evolved Guidelines */}
      {resolvedPatterns.length > 0 && (
        <div className="p-6 rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/10 space-y-4">
          <h3 className="text-sm font-bold text-[#1F3B2E]">Evolution History</h3>
          <div className="space-y-2">
            {resolvedPatterns.map(p => (
              <div 
                key={p.id}
                className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#1F3B2E]/10 text-xs flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-[#1F3B2E]">{p.guidelineTitle}</span>
                  <span className="text-[#1F3B2E]/60 ml-2">({p.patternSummary.substring(0, 50)}...)</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                  p.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'
                }`}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
