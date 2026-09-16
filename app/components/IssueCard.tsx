import { Issue } from "../types/issue"

type IssueCardProps = {
  issue: Issue;
  onEdit: (issue: Issue) => void;
  onDelete: (issue: Issue) => void;
};

export default function IssueCard({ issue, onEdit, onDelete }: IssueCardProps) {
  return (
    <div className="border border-gray-700 rounded-lg p-5 mb-4">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-xl font-semibold">
          {issue.title}
        </h2>
        <button
          type="button"
          onClick={() => onEdit(issue)}
          className="rounded border border-gray-600 px-3 py-1 text-sm hover:bg-gray-800"
        >
          Edit
        </button>
      </div>

      <p className="text-gray-400 mt-2">
        {issue.description}
      </p>

      <div className="mt-4 flex items-end justify-between gap-4">
        <div className="flex gap-4 text-sm text-gray-400">
          <span>Status: {issue.status}</span>
          <span>Priority: {issue.priority}</span>
          <span>Assignee: {issue.assignee}</span>
        </div>
        <button
          type="button"
          onClick={() => onDelete(issue)}
          className="rounded border border-red-800 px-3 py-1 text-sm text-red-400 hover:bg-red-950"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
