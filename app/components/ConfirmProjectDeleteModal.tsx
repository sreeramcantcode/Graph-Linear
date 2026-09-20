"use client";

import { Project } from "../types/project";

type ConfirmProjectDeleteModalProps = { project: Project; onConfirm: () => void; onClose: () => void };

export default function ConfirmProjectDeleteModal({ project, onConfirm, onClose }: ConfirmProjectDeleteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="delete-project-title">
        <h2 id="delete-project-title" className="text-xl font-semibold">Delete project?</h2>
        <p className="mt-2 text-sm text-zinc-400">This will permanently remove &ldquo;{project.name}&rdquo; and every issue in it.</p>
        <div className="mt-6 flex justify-end gap-3"><button type="button" onClick={onClose} className="rounded-md border border-zinc-600 px-4 py-2 text-sm hover:bg-zinc-800">Cancel</button><button type="button" onClick={onConfirm} className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium hover:bg-red-500">Confirm</button></div>
      </div>
    </div>
  );
}
