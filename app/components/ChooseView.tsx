"use client";

import Link from "next/link";
import { Project } from "../types/project";

type ChooseViewProps = { project: Project; onClose: () => void };

const views = ["Issues", "Kanban", "Timeline", "Graph"] as const;

export default function ChooseView({ project, onClose }: ChooseViewProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="choose-view-title">
        <h2 id="choose-view-title" className="text-xl font-semibold">Open {project.name}</h2>
        <p className="mt-2 text-sm text-zinc-400">Choose the way you want to view this project.</p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {views.map((view) => (
            <Link key={view} href={`/${view.toLowerCase()}?projectId=${encodeURIComponent(project.id)}`} className="rounded-lg border border-zinc-700 bg-zinc-800/70 px-4 py-5 text-center font-medium hover:border-zinc-500 hover:bg-zinc-800">{view}</Link>
          ))}
        </div>
        <button type="button" onClick={onClose} className="mt-5 w-full rounded-md border border-zinc-600 px-4 py-2 text-sm hover:bg-zinc-800">Cancel</button>
      </div>
    </div>
  );
}
