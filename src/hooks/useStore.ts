import { useState, useEffect } from 'react';
import { store } from '../services/store';
import { SubmissionStatus } from '../types';

export function useStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setTick(t => t + 1);
    });
    return unsubscribe;
  }, []);

  return {
    user: store.getUser(),
    setUserRole: (role: 'admin' | 'creator' | 'reviewer') => store.setUserRole(role),
    updateUser: (data: Parameters<typeof store.updateUser>[0]) => store.updateUser(data),
    
    guidelines: store.getGuidelines(),
    addGuideline: (g: Parameters<typeof store.addGuideline>[0]) => store.addGuideline(g),
    updateGuideline: (id: string, u: Parameters<typeof store.updateGuideline>[1]) => store.updateGuideline(id, u),
    
    submissions: store.getSubmissions(),
    getSubmissionById: (id: string) => store.getSubmissionById(id),
    createSubmission: (data: Parameters<typeof store.createSubmission>[0]) => store.createSubmission(data),
    applyIssueAction: (subId: string, issId: string, action: 'accept' | 'reject' | 'edit', text?: string) => 
      store.applyIssueAction(subId, issId, action, text),
    updateSubmissionStatus: (id: string, status: SubmissionStatus, notes?: string) =>
      store.updateSubmissionStatus(id, status, notes),

    simulateRule: (ruleText: string, cat?: Parameters<typeof store.simulateRule>[1]) => 
      store.simulateRule(ruleText, cat),

    butterflyNodes: store.getButterflyNodes(),

    evolutionPatterns: store.getEvolutionPatterns(),
    approveEvolutionPattern: (id: string) => store.approveEvolutionPattern(id),
    dismissEvolutionPattern: (id: string) => store.dismissEvolutionPattern(id)
  };
}
