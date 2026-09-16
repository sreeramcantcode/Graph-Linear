"use client";

import { useState } from "react";
import EditStatusModal from "../components/EditStatusModal";
import { useIssueStore } from "../store/issuestore";
import { Issue } from "../types/issue";

const columns = [
  {
    status: "todo",
    label: "Todo",
    emptyMessage: "No work is waiting to start.",
    dotClass: "bg-red-400",
    badgeClass: "bg-slate-400/15 text-slate-200",
  },
  {
    status: "in-progress",
    label: "In Progress",
    emptyMessage: "Nothing is currently in progress.",
    dotClass: "bg-amber-400",
    badgeClass: "bg-amber-400/15 text-amber-200",
  },
  {
    status: "done",
    label: "Done",
    emptyMessage: "No completed work yet.",
    dotClass: "bg-emerald-400",
    badgeClass: "bg-emerald-400/15 text-emerald-200",
  },
] as const;

const supportedStatuses = new Set(columns.map((column) => column.status));

function formatPriority(priority: string) {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
}

function formatStatus(status: string) {
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getStatusBadgeClass(status: string) {
  if (status === "todo") return "bg-red-600 text-slate-200";
  if (status === "in-progress") return "bg-amber-400/15 text-amber-200";
  if (status === "done") return "bg-emerald-400/15 text-emerald-200";

  return "bg-rose-400/15 text-rose-200";
}

function KanbanIssueCard({
  issue,
  onEditStatus,
}: {
  issue: Issue;
  onEditStatus: (issueId: string) => void;
}) {
  return (
    <article className="rounded-xl border border-zinc-700 bg-zinc-900 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h2 className="font-semibold text-white">{issue.title}</h2>
        <span
          className="shrink-0 rounded-full bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-300"
          title={`Priority: ${issue.priority}`}
        >
          ! {formatPriority(issue.priority)}
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-zinc-400">{issue.description}</p>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-zinc-800 pt-3">
        <div className="min-w-0">
          <span className="flex min-w-0 items-center gap-2 text-sm text-zinc-300">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-700 text-xs font-semibold">
              {issue.assignee.charAt(0).toUpperCase() || "?"}
            </span>
            <span className="truncate">{issue.assignee || "Unassigned"}</span>
          </span>
          <span
            className={`mt-3 inline-flex rounded-full px-2 py-0.5 text-xs font-medium sm:mt-4 ${getStatusBadgeClass(issue.status)}`}
          >
            {formatStatus(issue.status)}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onEditStatus(issue.id)}
          className="rounded-md border cursor-pointer border-zinc-600 px-3 py-1.5 text-sm font-medium text-zinc-200 hover:border-zinc-400 hover:bg-zinc-800"
        >
          Update status
        </button>
      </div>
    </article>
  );
}

export default function KanbanPage() {
  const issues = useIssueStore((state) => state.issues);
  const updateIssueStatus = useIssueStore((state) => state.updateIssueStatus);
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);

  const selectedIssue = issues.find((issue) => issue.id === selectedIssueId) ?? null;
  const unsupportedIssues = issues.filter(
    (issue) => !supportedStatuses.has(issue.status as (typeof columns)[number]["status"])
  );

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800 px-5 py-5 sm:px-7">
        <h1 className="text-2xl font-semibold">Kanban</h1>
        <p className="mt-1 text-sm text-zinc-400">
          See where every piece of work stands.
        </p>
      </header>

      <div className="p-5 sm:p-7">
        {issues.length === 0 && (
          <p className="mb-5 rounded-lg border border-dashed border-zinc-700 bg-zinc-900/60 p-4 text-sm text-zinc-400">
            No issues yet. Create an issue to see it in this workflow.
          </p>
        )}

        <section className="grid gap-5 md:grid-cols-3" aria-label="Issue status board">
          {columns.map((column) => {
            const columnIssues = issues.filter((issue) => issue.status === column.status);

            return (
              <section
                key={column.status}
                className="flex min-h-72 flex-col rounded-xl border border-zinc-800 bg-zinc-900/40 p-4"
                aria-labelledby={`${column.status}-heading`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 id={`${column.status}-heading`} className="flex items-center gap-2 font-semibold">
                    <span className={`h-2.5 w-2.5 rounded-full ${column.dotClass}`} />
                    {column.label}
                  </h2>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${column.badgeClass}`}>
                    {columnIssues.length}
                  </span>
                </div>

                <div className="flex max-h-[calc(100vh-15rem)] flex-col gap-4 overflow-y-auto pr-1 sm:gap-5">
                  {columnIssues.length > 0 ? (
                    columnIssues.map((issue) => (
                      <KanbanIssueCard
                        key={issue.id}
                        issue={issue}
                        onEditStatus={setSelectedIssueId}
                      />
                    ))
                  ) : (
                    <p className="rounded-lg border border-dashed border-zinc-700 p-4 text-sm text-zinc-500">
                      {column.emptyMessage}
                    </p>
                  )}
                </div>
              </section>
            );
          })}
        </section>

        {unsupportedIssues.length > 0 && (
          <section
            className="mt-5 rounded-xl border border-rose-900/80 bg-rose-950/20 p-4"
            aria-labelledby="unsupported-statuses-heading"
          >
            <h2 id="unsupported-statuses-heading" className="font-semibold text-rose-200">
              Status needs attention
            </h2>
            <p className="mt-1 text-sm text-rose-200/80">
              These issues use an unsupported status. Update one to place it on the board.
            </p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
              {unsupportedIssues.map((issue) => (
                <KanbanIssueCard key={issue.id} issue={issue} onEditStatus={setSelectedIssueId} />
              ))}
            </div>
          </section>
        )}
      </div>

      {selectedIssue && (
        <EditStatusModal
          key={selectedIssue.id}
          issue={selectedIssue}
          onUpdateStatus={updateIssueStatus}
          onClose={() => setSelectedIssueId(null)}
        />
      )}
    </main>
  );
}
