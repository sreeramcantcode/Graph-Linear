"use client";

import { FormEvent, useState } from "react";
import { Issue } from "../types/issue";

const statusOptions = [
  { value: "todo", label: "Todo", description: "Work that has not started" },
  {
    value: "in-progress",
    label: "In Progress",
    description: "Work currently being completed",
  },
  { value: "done", label: "Done", description: "Completed work" },
] as const;

type SupportedStatus = (typeof statusOptions)[number]["value"];

type EditStatusModalProps = {
  issue: Issue;
  onUpdateStatus: (id: string, status: SupportedStatus) => void;
  onClose: () => void;
};

function isSupportedStatus(status: string): status is SupportedStatus {
  return statusOptions.some((option) => option.value === status);
}

export default function EditStatusModal({
  issue,
  onUpdateStatus,
  onClose,
}: EditStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<SupportedStatus>(() =>
    isSupportedStatus(issue.status) ? issue.status : "todo"
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onUpdateStatus(issue.id, selectedStatus);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div
        className="w-full max-w-md rounded-xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-status-title"
      >
        <div className="mb-6">
          <p className="text-sm text-zinc-400">Update status</p>
          <h2 id="edit-status-title" className="mt-1 text-xl font-semibold">
            {issue.title}
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend className="sr-only">Select a status</legend>
            <div className="space-y-3">
              {statusOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition ${
                    selectedStatus === option.value
                      ? "border-blue-400 bg-blue-500/10"
                      : "border-zinc-700 hover:border-zinc-500"
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value={option.value}
                    checked={selectedStatus === option.value}
                    onChange={() => setSelectedStatus(option.value)}
                    className="mt-1 accent-blue-400"
                  />
                  <span>
                    <span className="block font-medium">{option.label}</span>
                    <span className="block text-sm text-zinc-400">
                      {option.description}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-zinc-600 px-4 py-2 text-sm font-medium hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-zinc-200"
            >
              Update Status
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
