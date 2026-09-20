"use client";

import Link from "next/link";
import { Project } from "../types/project";

type NoIssueFoundProps = { project: Project; onClose: () => void };

export default function NoIssueFound({ project, onClose }: NoIssueFoundProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-xl border border-zinc-700 bg-zinc-900 p-6 text-center shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="no-issues-title">
        <h2 id="no-issues-title" className="text-xl font-semibold">No issues present</h2>
        <p className="mt-2 text-sm text-zinc-400">Add work to this project before opening a project view.</p>
        <div className="mt-6 flex justify-center gap-3"><button type="button" onClick={onClose} className="rounded-md border border-zinc-600 px-4 py-2 text-sm hover:bg-zinc-800">Cancel</button><Link href={`/issues?projectId=${encodeURIComponent(project.id)}`} className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200">Create Issue</Link></div>
      </div>
    </div>
  );
}
