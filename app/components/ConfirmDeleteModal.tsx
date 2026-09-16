"use client";

import { Issue } from "../types/issue";

type ConfirmDeleteModalProps = {
  issue: Issue;
  onConfirm: (id: string) => void;
  onClose: () => void;
};

export default function ConfirmDeleteModal({
  issue,
  onConfirm,
  onClose,
}: ConfirmDeleteModalProps) {
  function handleConfirm() {
    onConfirm(issue.id);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div
        className="w-full max-w-md rounded-lg border border-gray-700 bg-gray-900 p-6 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-issue-title"
      >
        <h2 id="delete-issue-title" className="text-xl font-semibold">
          Delete issue?
        </h2>
        <p className="mt-2 text-gray-400">
          This will permanently remove &ldquo;{issue.title}&rdquo;.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-gray-600 px-4 py-2 text-sm hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
