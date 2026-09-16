"use client";

import { FormEvent, useState } from "react";
import { Issue } from "../types/issue";
import { IssueUpdates } from "../store/issuestore";

type EditIssueModalProps = {
  issue: Issue;
  onSave: (id: string, updates: IssueUpdates) => void;
  onClose: () => void;
};

function getFormValues(issue: Issue): IssueUpdates {
  return {
    title: issue.title,
    description: issue.description,
    status: issue.status,
    priority: issue.priority,
    assignee: issue.assignee,
  };
}

export default function EditIssueModal({
  issue,
  onSave,
  onClose,
}: EditIssueModalProps) {
  const [formValues, setFormValues] = useState(() => getFormValues(issue));
  const [titleError, setTitleError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = formValues.title.trim();

    if (!title) {
      setTitleError("Title is required.");
      return;
    }

    onSave(issue.id, { ...formValues, title });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div
        className="w-full max-w-lg rounded-lg border border-gray-700 bg-gray-900 p-6 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-issue-title"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 id="edit-issue-title" className="text-xl font-semibold">
            Edit Issue
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm">
            Title
            <input
              value={formValues.title}
              onChange={(event) => {
                setFormValues({ ...formValues, title: event.target.value });
                setTitleError("");
              }}
              aria-invalid={Boolean(titleError)}
              className="mt-1 w-full rounded border border-gray-700 bg-gray-800 p-2 text-white"
            />
            {titleError && (
              <p className="mt-1 text-sm text-red-400">{titleError}</p>
            )}
          </label>

          <label className="block text-sm">
            Description
            <textarea
              value={formValues.description}
              onChange={(event) =>
                setFormValues({ ...formValues, description: event.target.value })
              }
              className="mt-1 min-h-24 w-full rounded border border-gray-700 bg-gray-800 p-2 text-white"
            />
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              Status
              <select
                value={formValues.status}
                onChange={(event) =>
                  setFormValues({ ...formValues, status: event.target.value })
                }
                className="mt-1 w-full rounded border border-gray-700 bg-gray-800 p-2 text-white"
              >
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </label>

            <label className="block text-sm">
              Priority
              <select
                value={formValues.priority}
                onChange={(event) =>
                  setFormValues({ ...formValues, priority: event.target.value })
                }
                className="mt-1 w-full rounded border border-gray-700 bg-gray-800 p-2 text-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>

          <label className="block text-sm">
            Assignee
            <input
              value={formValues.assignee}
              onChange={(event) =>
                setFormValues({ ...formValues, assignee: event.target.value })
              }
              className="mt-1 w-full rounded border border-gray-700 bg-gray-800 p-2 text-white"
            />
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded border border-gray-600 px-4 py-2 text-sm hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-200"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
