"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import CreateIssueModal from "../components/CreateIssueModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import EditIssueModal from "../components/EditIssueModal";
import { useIssueStore } from "../store/issuestore";
import { useProjectStore } from "../store/projectStore";
import IssueCard from "../components/IssueCard";
import { Issue } from "../types/issue";

function IssuesContent() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const projects = useProjectStore((state) => state.projects);
  const allIssues = useIssueStore((state) => state.issues);
  const addIssue = useIssueStore((state) => state.addIssue);
  const updateIssue = useIssueStore((state) => state.updateIssue);
  const deleteIssue = useIssueStore((state) => state.deleteIssue);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [issueToDelete, setIssueToDelete] = useState<Issue | null>(null);
  const issues = projectId
    ? allIssues.filter((issue) => issue.projectId === projectId)
    : allIssues;
  const pageTitle = projectId ? "Project Issues" : "Issues";
  const selectedProjectExists = projectId ? projects.some((project) => project.id === projectId) : true;
  const issueProjectId = projectId ?? projects[0]?.id;

  return (
    <main className="flex min-h-screen flex-col">
      {issues.length > 0 ? (
        <>
          <div className="flex w-full items-center justify-between border-b border-gray-600 p-7">
            <h1>{pageTitle}</h1>
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              disabled={!selectedProjectExists || !issueProjectId}
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
          <p className="text-gray-400">{projectId ? "No issues present" : "No issues listed currently"}</p>
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            disabled={!selectedProjectExists || !issueProjectId}
            className="rounded bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-200"
          >
            Create Issue
          </button>
        </div>
      )}

      {isCreateModalOpen && issueProjectId && (
        <CreateIssueModal
          onCreate={addIssue}
          onClose={() => setIsCreateModalOpen(false)}
          projectId={issueProjectId}
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

export default function Issues() {
  return <Suspense fallback={<main className="p-7 text-zinc-400">Loading issues…</main>}><IssuesContent /></Suspense>;
}
