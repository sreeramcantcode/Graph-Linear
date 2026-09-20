"use client";

import { FormEvent, useState } from "react";

type CreateProjectModalProps = {
  onCreate: (name: string) => boolean;
  onClose: () => void;
  creationLimitReached: boolean;
};

export default function CreateProjectModal({
  onCreate,
  onClose,
  creationLimitReached,
}: CreateProjectModalProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) {
      setError("A project name is required.");
      return;
    }

    if (!onCreate(name.trim())) {
      setError("You can create up to 3 projects every 3 minutes.");
      return;
    }

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="create-project-title">
        <h2 id="create-project-title" className="text-xl font-semibold">Create project</h2>
        <p className="mt-2 text-sm text-zinc-400">Give your new project a clear, memorable name.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-sm font-medium">
            Project name
            <input autoFocus value={name} onChange={(event) => { setName(event.target.value); setError(""); }} className="mt-2 w-full rounded-md border border-zinc-700 bg-zinc-800 p-2.5 text-white outline-none focus:border-zinc-400" />
          </label>
          {(error || creationLimitReached) && <p className="text-sm text-rose-300">{error || "You can create up to 3 projects every 3 minutes."}</p>}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-md border border-zinc-600 px-4 py-2 text-sm hover:bg-zinc-800">Discard</button>
            <button type="submit" disabled={creationLimitReached} className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}
