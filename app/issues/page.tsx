"use client";

import { useState } from "react";
import CreateIssueModal from "../components/CreateIssueModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import EditIssueModal from "../components/EditIssueModal";
import { useIssueStore } from "../store/issuestore";
import IssueCard from "../components/IssueCard";
import { Issue } from "../types/issue";

export default function Issues() {
  const issues = useIssueStore((state) => state.issues);
  const addIssue = useIssueStore((state) => state.addIssue);
  const updateIssue = useIssueStore((state) => state.updateIssue);
  const deleteIssue = useIssueStore((state) => state.deleteIssue);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [issueToDelete, setIssueToDelete] = useState<Issue | null>(null);

  return (
    <main className="flex min-h-screen flex-col">
      {issues.length > 0 ? (
        <>
          <div className="flex w-full items-center justify-between border-b border-gray-600 p-7">
            <h1>Issues</h1>
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="rounded bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-200"
            >
              + New Issue
            </button>
          </div>

          <div className="p-7">
            {issues.map((issue) => (
              <IssueCard
                key={issue.id}
                issue={issue}
                onEdit={setSelectedIssue}
                onDelete={setIssueToDelete}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-7 text-center">
          <p className="text-gray-400">No issues listed currently</p>
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="rounded bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-200"
          >
            Create Issue
          </button>
        </div>
      )}

      {isCreateModalOpen && (
        <CreateIssueModal
          onCreate={addIssue}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}

      {selectedIssue && (
        <EditIssueModal
          issue={selectedIssue}
          onSave={updateIssue}
          onClose={() => setSelectedIssue(null)}
        />
      )}

      {issueToDelete && (
        <ConfirmDeleteModal
          issue={issueToDelete}
          onConfirm={deleteIssue}
          onClose={() => setIssueToDelete(null)}
        />
      )}
    </main>
  );
}
