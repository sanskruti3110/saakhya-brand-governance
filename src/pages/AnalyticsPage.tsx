import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { useStore } from '../hooks/useStore';

export const AnalyticsPage: React.FC = () => {
  const { submissions, guidelines } = useStore();

  const total = submissions.length + 124;
  const approved = submissions.filter(s => s.status === 'Approved').length + 80;
  const compliantPct = Math.round((approved / total) * 100);

  // Common violation distribution
  const violations = [
    { cat: 'Promotional Claims (ASCI / CCPA)', pct: 38, count: 42, color: '#1F3B2E' },
    { cat: 'Prohibited / Deprecated Terminology', pct: 26, count: 29, color: '#CBB3E8' },
    { cat: 'Tone & Hyperbole Consistency', pct: 18, count: 20, color: '#9F79CE' },
    { cat: 'Accessibility & WCAG Readability', pct: 12, count: 13, color: '#D4C6AB' },
    { cat: 'Regional Translation Fidelity', pct: 6, count: 7, color: '#E8A598' }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="pb-6 border-b border-[#1F3B2E]/10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#1F3B2E] text-[#E8DCC6] flex items-center justify-center shadow-sm">
            <BarChart3 className="w-5 h-5 text-[#CBB3E8]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1F3B2E]">Governance Intelligence & Analytics</h1>
            <p className="text-xs text-[#1F3B2E]/70 mt-1 max-w-xl">
              Real-time telemetry on organizational brand alignment, common friction points, reviewer speed, and continuous governance trends.
            </p>
          </div>
        </div>
      </div>

      {/* Top 3 High-Level Metric Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/15 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#1F3B2E]/70">Overall Compliance Rate</span>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center">
              +4.2% MoM
            </span>
          </div>
          <div className="text-4xl font-black text-[#1F3B2E] mb-2">{compliantPct}%</div>
          <p className="text-xs text-[#1F3B2E]/70 leading-relaxed">
            Content adhering fully to Brand DNA before external distribution.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/15 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#1F3B2E]/70">Avg. Review Turnaround</span>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center">
              -62% faster
            </span>
          </div>
          <div className="text-4xl font-black text-[#1F3B2E] mb-2">4.5 hrs</div>
          <p className="text-xs text-[#1F3B2E]/70 leading-relaxed">
            Down from 12 hours prior to SAAKHYA AI Detection & Explanation deployment.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/15 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#1F3B2E]/70">Suggestion Acceptance</span>
            <span className="text-xs font-bold text-[#9F79CE] bg-[#CBB3E8]/30 px-2 py-0.5 rounded-full flex items-center">
              High Utility
            </span>
          </div>
          <div className="text-4xl font-black text-[#1F3B2E] mb-2">91.4%</div>
          <p className="text-xs text-[#1F3B2E]/70 leading-relaxed">
            Creators accept or edit AI suggestions rather than dismissing them.
          </p>
        </div>
      </div>

      {/* Breakdown Section: Common Violation Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/15 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#1F3B2E]/10">
            <h3 className="text-sm font-bold text-[#1F3B2E]">Most Common Brand Friction Categories</h3>
            <span className="text-xs text-[#1F3B2E]/60">Cumulative YTD</span>
          </div>

          <div className="space-y-4">
            {violations.map((v, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1F3B2E]">{v.cat}</span>
                  <span className="font-mono text-[#1F3B2E]/80">{v.count} incidents ({v.pct}%)</span>
                </div>
                <div className="h-2 rounded-full bg-[#E8DCC6]/60 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${v.pct}%`, backgroundColor: v.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-[#1F3B2E]/60 italic pt-2">
            Insight: Promotional claims represent the highest risk factor under ASCI and CCPA advertising regulations.
          </div>
        </div>

        {/* Team Compliance Comparison */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/15 shadow-sm space-y-4">
          <div className="pb-3 border-b border-[#1F3B2E]/10">
            <h3 className="text-sm font-bold text-[#1F3B2E]">Department Compliance Index</h3>
            <p className="text-xs text-[#1F3B2E]/60">Comparative adherence across business units</p>
          </div>

          <div className="space-y-3">
            {[
              { dept: 'Product Communications', score: 96, state: 'Exemplary' },
              { dept: 'Horizon Marketing Agency', score: 78, state: 'Needs Training' },
              { dept: 'Regional Outreach (Western)', score: 91, state: 'Strong' },
              { dept: 'Enterprise Sales Team', score: 84, state: 'Good' }
            ].map((d, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#1F3B2E]/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#1F3B2E]">{d.dept}</div>
                  <div className="text-[10px] text-[#1F3B2E]/60">{d.state}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-[#1F3B2E]">{d.score}%</div>
                  <div className="text-[9px] text-[#1F3B2E]/50">Score</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
