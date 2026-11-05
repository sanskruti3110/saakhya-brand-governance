import React, { useState } from 'react';
import { 
  FlaskConical, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Layers, 
  ArrowRight,
  TrendingDown,
  ShieldAlert,
  Save,
  Check
} from 'lucide-react';
import { useStore } from '../hooks/useStore';
import { TestRuleSimulation, GuidelineCategory } from '../types';

export const TestNewRulesPage: React.FC = () => {
  const { simulateRule, addGuideline, guidelines, submissions } = useStore();
  
  const [proposedText, setProposedText] = useState('Prohibit all unaccredited absolute guarantee statements including "100% Guaranteed" and "Zero Risk".');
  const [category, setCategory] = useState<GuidelineCategory>('claims');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<TestRuleSimulation | null>(null);
  const [enactedSuccess, setEnactedSuccess] = useState(false);

  const handleRunSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposedText.trim()) return;

    setIsSimulating(true);
    setEnactedSuccess(false);

    setTimeout(() => {
      const res = simulateRule(proposedText, category);
      setSimulationResult(res);
      setIsSimulating(false);
    }, 700);
  };

  const handleEnactRule = () => {
    if (!simulationResult) return;
    addGuideline({
      category: simulationResult.category,
      title: `Simulated Policy: ${simulationResult.proposedRule.substring(0, 45)}...`,
      ruleStatement: simulationResult.proposedRule,
      rationale: 'Enacted following historical impact simulation across enterprise content archive.',
      severity: 'Critical',
      restrictedClaims: ['100% guaranteed', 'zero risk', 'promise']
    });
    setEnactedSuccess(true);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="pb-6 border-b border-[#1F3B2E]/10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#1F3B2E] text-[#E8DCC6] flex items-center justify-center shadow-sm">
            <FlaskConical className="w-5 h-5 text-[#CBB3E8]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#1F3B2E]">Test My New Rules</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#CBB3E8]/30 text-[#1F3B2E] uppercase">
                Innovation 01
              </span>
            </div>
            <p className="text-xs text-[#1F3B2E]/70 mt-1 max-w-2xl">
              Predictive simulation engine. Propose a new brand guideline and simulate its ripple effect against all previously submitted and approved content in your database before enacting it.
            </p>
          </div>
        </div>
      </div>

      {/* Simulation Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/15 shadow-sm">
        <form onSubmit={handleRunSimulation} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#1F3B2E] mb-1">
                Proposed Brand Guideline / Policy Statement
              </label>
              <input
                type="text"
                required
                value={proposedText}
                onChange={(e) => setProposedText(e.target.value)}
                placeholder="e.g. Deprecate the term 'revolutionary' across all copy..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/15 text-xs text-[#1F3B2E] focus:outline-none focus:ring-2 focus:ring-[#1F3B2E]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1F3B2E] mb-1">Target Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/15 text-xs text-[#1F3B2E] focus:outline-none"
              >
                <option value="claims">Claims & Superlatives</option>
                <option value="terminology">Approved Terminology</option>
                <option value="facts">Verified Facts</option>
                <option value="voice">Voice & Tone</option>
                <option value="regional">Regional Rules</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-[#1F3B2E]/70 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#9F79CE]" />
              <span>Will scan against {submissions.length} archived and active assets</span>
            </div>

            <button
              type="submit"
              disabled={isSimulating}
              className="px-6 py-2.5 rounded-full bg-[#1F3B2E] hover:bg-[#14271E] text-[#E8DCC6] font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              {isSimulating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-[#E8DCC6] border-t-transparent rounded-full animate-spin" />
                  <span>Simulating Archive Impact...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Run Predictive Simulation</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Simulation Results Display */}
      {simulationResult && (
        <div className="space-y-6">
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#F7F3EB] border border-[#1F3B2E]/10">
              <div className="text-xs text-[#1F3B2E]/60 mb-1">Scanned Assets</div>
              <div className="text-2xl font-black text-[#1F3B2E]">{simulationResult.totalAssetsScanned}</div>
              <div className="text-[10px] text-[#1F3B2E]/50 mt-1">Total collateral archive</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#F7F3EB] border border-amber-200">
              <div className="text-xs text-amber-800 mb-1">Impacted Assets</div>
              <div className="text-2xl font-black text-amber-900">{simulationResult.affectedAssetsCount}</div>
              <div className="text-[10px] text-amber-700 mt-1">Requires revision if enacted</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#F7F3EB] border border-red-200">
              <div className="text-xs text-red-800 mb-1">Projected Critical Violations</div>
              <div className="text-2xl font-black text-red-900">{simulationResult.severityBreakdown.Critical}</div>
              <div className="text-[10px] text-red-700 mt-1">Regulatory / ASCI exposures</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#F7F3EB] border border-[#1F3B2E]/10">
              <div className="text-xs text-[#1F3B2E]/60 mb-1">Estimated Review Burden</div>
              <div className="text-2xl font-black text-[#1F3B2E]">
                {simulationResult.affectedAssetsCount * 12} mins
              </div>
              <div className="text-[10px] text-[#1F3B2E]/50 mt-1">Total human review time</div>
            </div>
          </div>

          {/* Sample Affected Content Previews */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/15 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1F3B2E]/10">
              <div>
                <h3 className="text-sm font-bold text-[#1F3B2E]">Simulated Impact Breakdown</h3>
                <p className="text-xs text-[#1F3B2E]/60">
                  Detailed inspection of assets that would trigger violations under this proposed guideline:
                </p>
              </div>

              {/* Enact Action */}
              {!enactedSuccess ? (
                <button
                  onClick={handleEnactRule}
                  className="px-5 py-2 rounded-full bg-[#1F3B2E] hover:bg-[#14271E] text-[#E8DCC6] font-bold text-xs shadow-md flex items-center gap-2"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Approve & Enact into Brand DNA</span>
                </button>
              ) : (
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-full">
                  <Check className="w-3.5 h-3.5" />
                  <span>Enacted into Official Brand DNA!</span>
                </span>
              )}
            </div>

            <div className="space-y-3">
              {simulationResult.sampleImpacts.map((impact, i) => (
                <div 
                  key={i}
                  className="p-4 rounded-2xl bg-[#FFFFFF] border border-amber-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-[#1F3B2E]">{impact.assetTitle}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#E8DCC6]/60 text-[#1F3B2E]">
                        {impact.channel}
                      </span>
                    </div>
                    <p className="text-xs text-[#1F3B2E]/80 italic mb-2">
                      "{impact.snippet}"
                    </p>
                    <div className="text-[11px] text-red-800 font-semibold">
                      Violation Cause: {impact.violationReason}
                    </div>
                  </div>

                  <div className="md:w-64 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 shrink-0">
                    <span className="font-bold block mb-0.5">Recommended Change:</span>
                    {impact.recommendedChange}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
