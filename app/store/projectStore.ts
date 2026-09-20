import { create } from "zustand";
import { mockProjects } from "../lib/mockProjects";
import { Project } from "../types/project";

type ProjectStore = {
  projects: Project[];
  creationTimestamps: number[];
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
};

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: mockProjects,
  creationTimestamps: [],
  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
      creationTimestamps: [...state.creationTimestamps, Date.now()],
    })),
  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== id),
    })),
}));
