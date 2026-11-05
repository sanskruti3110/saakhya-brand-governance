import React, { useState } from 'react';
import { 
  GitFork, 
  Sparkles, 
  Layers, 
  Share2, 
  AlertCircle, 
  CheckCircle, 
  ChevronRight,
  Filter,
  Info
} from 'lucide-react';
import { useStore } from '../hooks/useStore';
import { ButterflyNode } from '../types';

export const ButterflyEffectPage: React.FC = () => {
  const { butterflyNodes, guidelines } = useStore();
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-rule-1');
  const [filterImpact, setFilterImpact] = useState<string>('all');

  const selectedNode = butterflyNodes.find(n => n.id === selectedNodeId) || butterflyNodes[0];

  const filteredNodes = butterflyNodes.filter(n => {
    if (filterImpact === 'all') return true;
    return n.impactLevel === filterImpact;
  });

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="pb-6 border-b border-[#1F3B2E]/10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#1F3B2E] text-[#E8DCC6] flex items-center justify-center shadow-sm">
            <GitFork className="w-5 h-5 text-[#CBB3E8]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#1F3B2E]">Brand Butterfly Effect</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#CBB3E8]/30 text-[#1F3B2E] uppercase">
                Innovation 02
              </span>
            </div>
            <p className="text-xs text-[#1F3B2E]/70 mt-1 max-w-2xl">
              Campaign-wide cascading dependency map. Understand how altering a single brand guideline creates ripple effects across connected ad campaigns, social handles, brochures, and sales decks.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {['all', 'direct', 'indirect', 'review'].map(imp => (
            <button
              key={imp}
              onClick={() => setFilterImpact(imp)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                filterImpact === imp 
                  ? 'bg-[#1F3B2E] text-[#E8DCC6]' 
                  : 'bg-[#F7F3EB] text-[#1F3B2E]/70 hover:bg-[#E8DCC6]'
              }`}
            >
              {imp === 'all' ? 'All Impacts' : `${imp} Impact`}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-medium text-[#1F3B2E]/80">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>Direct Violation</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <span>Needs Review</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#1F3B2E]" />
            <span>Governed Root</span>
          </div>
        </div>
      </div>

      {/* Main Visual Dependency Graph & Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Graph Canvas / Interactive Map (Left 8 cols) */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/15 shadow-sm min-h-[480px] relative flex flex-col justify-between">
          <div className="text-xs font-bold uppercase tracking-wider text-[#1F3B2E]/60 mb-4 flex items-center justify-between">
            <span>Enterprise Asset Ripple Topology</span>
            <span className="text-[10px] font-mono">Interactive Click to Inspect</span>
          </div>

          {/* Node Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-auto">
            {/* Tier 1: Guideline Source */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase text-[#1F3B2E]/50 tracking-wider">
                1. Root Guideline
              </span>
              {filteredNodes.filter(n => n.type === 'rule').map(node => (
                <div
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                    selectedNodeId === node.id 
                      ? 'bg-[#1F3B2E] text-[#E8DCC6] border-[#1F3B2E] shadow-md scale-105' 
                      : 'bg-[#FFFFFF] text-[#1F3B2E] border-[#1F3B2E]/15 hover:border-[#1F3B2E]'
                  }`}
                >
                  <div className="text-xs font-bold leading-snug">{node.title}</div>
                  <div className="text-[10px] mt-2 opacity-75">4 Downstream Links</div>
                </div>
              ))}
            </div>

            {/* Tier 2: Connected Campaigns & Channels */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase text-[#1F3B2E]/50 tracking-wider">
                2. Campaigns & Channels
              </span>
              {filteredNodes.filter(n => n.type === 'campaign' || n.type === 'channel').map(node => (
                <div
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`p-3.5 rounded-2xl cursor-pointer transition-all border ${
                    selectedNodeId === node.id 
                      ? 'bg-[#1F3B2E] text-[#E8DCC6] border-[#1F3B2E] shadow-md scale-105' 
                      : 'bg-[#FFFFFF] text-[#1F3B2E] border-[#1F3B2E]/15 hover:border-[#1F3B2E]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#CBB3E8]/30 text-[#1F3B2E]">
                      {node.type}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${
                      node.impactLevel === 'direct' ? 'bg-red-500' : 'bg-amber-400'
                    }`} />
                  </div>
                  <div className="text-xs font-bold leading-tight">{node.title}</div>
                </div>
              ))}
            </div>

            {/* Tier 3: Individual Deployed Assets */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase text-[#1F3B2E]/50 tracking-wider">
                3. High-Risk Collateral
              </span>
              {filteredNodes.filter(n => n.type === 'asset').map(node => (
                <div
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`p-3.5 rounded-2xl cursor-pointer transition-all border ${
                    selectedNodeId === node.id 
                      ? 'bg-[#1F3B2E] text-[#E8DCC6] border-[#1F3B2E] shadow-md scale-105' 
                      : 'bg-[#FFFFFF] text-[#1F3B2E] border-[#1F3B2E]/15 hover:border-[#1F3B2E]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-red-100 text-red-800">
                      Target Asset
                    </span>
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  </div>
                  <div className="text-xs font-bold leading-tight">{node.title}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[10px] text-[#1F3B2E]/60 text-right pt-4 border-t border-[#1F3B2E]/10">
            Topology refreshed based on active Brand DNA rule connections
          </div>
        </div>

        {/* Node Detail Inspector (Right 4 cols) */}
        <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/15 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                selectedNode.impactLevel === 'direct' ? 'bg-red-100 text-red-800' :
                selectedNode.impactLevel === 'review' ? 'bg-amber-100 text-amber-800' :
                'bg-[#1F3B2E] text-[#E8DCC6]'
              }`}>
                {selectedNode.impactLevel} Impact
              </span>
              <span className="text-xs text-[#1F3B2E]/60 capitalize">{selectedNode.type}</span>
            </div>

            <h3 className="text-lg font-bold text-[#1F3B2E] mb-2">{selectedNode.title}</h3>
            
            <div className="p-4 rounded-2xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/10 mb-4 text-xs text-[#1F3B2E]/80 leading-relaxed">
              {selectedNode.details}
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold text-[#1F3B2E]">Mitigation Guidance:</div>
              <p className="text-xs text-[#1F3B2E]/70 leading-relaxed">
                Modifying this policy requires issuing revision alerts to 3 agency copywriters and 2 product marketing owners to update live digital ad creatives.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-[#1F3B2E]/10 space-y-2">
            <button
              onClick={() => alert(`Triggering revision notification to owners connected to ${selectedNode.title}.`)}
              className="w-full py-2.5 rounded-xl bg-[#1F3B2E] hover:bg-[#14271E] text-[#E8DCC6] font-bold text-xs shadow-md transition-all"
            >
              Dispatch Revision Notice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
