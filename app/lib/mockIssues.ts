import { Issue } from "../types/issue";

export const mockIssues: Issue[] = [
  {
    id: "GL-001",
    title: "Create Brand Identity",
    description: "Design the brand identity",
    status: "in-progress",
    priority: "high",
    assignee: "Rhythm",
    projectId: "project-01",
    dependencies: [],
  },

  {
    id: "GL-002",
    title: "Write Video Script",
    description: "Write the script for the campaign video",
    status: "todo",
    priority: "high",
    assignee: "Sree",
    projectId: "project-01",
    dependencies: ["GL-001"],
  },

  {
    id: "GL-003",
    title: "Record Voiceover",
    description: "Record the voiceover for the campaign video",
    status: "todo",
    priority: "high",
    assignee: "Sree",
    projectId: "project-01",
    dependencies: ["GL-001"],
  },
];