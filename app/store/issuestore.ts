import { create } from 'zustand';
import { mockIssues } from '../lib/mockIssues';
import { Issue } from '../types/issue';

export type IssueUpdates = Pick<
  Issue,
  'title' | 'description' | 'status' | 'priority' | 'assignee'
>;

type IssueStore = {
  issues: Issue[];
  addIssue: (issue: Issue) => void;
  updateIssue: (id: string, updates: IssueUpdates) => void;
  updateIssueStatus: (id: string, status: Issue["status"]) => void;
  deleteIssue: (id: string) => void;
};

export const useIssueStore = create<IssueStore>((set) => ({
  issues: mockIssues, // entire issues array is stored in the state

  addIssue: (issue) => set((state) => ({ issues: [...state.issues, issue] })),

  updateIssue: (id, updates) =>
    set((state) => ({
      issues: state.issues.map((issue) =>
        issue.id === id ? { ...issue, ...updates } : issue
      ),
    })),

  updateIssueStatus: (id, status) =>
    set((state) => {
      const issue = state.issues.find((currentIssue) => currentIssue.id === id);

      if (!issue || issue.status === status) {
        return state;
      }

      return {
        issues: state.issues.map((currentIssue) =>
          currentIssue.id === id ? { ...currentIssue, status } : currentIssue
        ),
      };
    }),

  deleteIssue: (id) =>
    set((state) => ({
      issues: state.issues.filter((issue) => issue.id !== id),
    })),
}));
