"use client";

import { useEffect, useState } from "react";
import ChooseView from "../components/ChooseView";
import ConfirmProjectDeleteModal from "../components/ConfirmProjectDeleteModal";
import CreateProjectModal from "../components/CreateProjectModal";
import NoIssueFound from "../components/NoIssueFound";
import { useIssueStore } from "../store/issuestore";
import { useProjectStore } from "../store/projectStore";
import { Project } from "../types/project";

const CREATION_WINDOW_MS = 3 * 60 * 1000;
const MAX_PROJECTS_PER_WINDOW = 3;

function createProjectId(projects: Project[]) {
  const usedIds = new Set(projects.map((project) => project.id));
  let number = 100;
  while (usedIds.has(`GL-${number}`)) number += 1;
  return `GL-${number}`;
}

export default function ProjectsPage() {
  const projects = useProjectStore((state) => state.projects);
  const addProject = useProjectStore((state) => state.addProject);
  const deleteProject = useProjectStore((state) => state.deleteProject);
  const creationTimestamps = useProjectStore((state) => state.creationTimestamps);
  const issues = useIssueStore((state) => state.issues);
  const deleteIssuesByProject = useIssueStore((state) => state.deleteIssuesByProject);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [projectForViews, setProjectForViews] = useState<Project | null>(null);
  const [emptyProject, setEmptyProject] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const updateCurrentTime = () => setCurrentTime(Date.now());
    updateCurrentTime();
    const intervalId = window.setInterval(updateCurrentTime, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  const activeCreationTimestamps = creationTimestamps.filter((timestamp) => currentTime - timestamp < CREATION_WINDOW_MS);
  const creationLimitReached = activeCreationTimestamps.length >= MAX_PROJECTS_PER_WINDOW;

  function handleCreateProject(name: string) {
    const now = Date.now();
    const recentTimestamps = creationTimestamps.filter((timestamp) => now - timestamp < CREATION_WINDOW_MS);
    if (recentTimestamps.length >= MAX_PROJECTS_PER_WINDOW) return false;
    addProject({ id: createProjectId(projects), name });
    setCurrentTime(now);
    return true;
  }

  function handleProjectSelect(project: Project) {
    if (issues.some((issue) => issue.projectId === project.id)) {
      setProjectForViews(project);
      return;
    }
    setEmptyProject(project);
  }

  function handleDeleteProject() {
    if (!projectToDelete) return;
    deleteIssuesByProject(projectToDelete.id);
    deleteProject(projectToDelete.id);
    setProjectToDelete(null);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <header className="flex flex-col gap-4 border-b border-zinc-800 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div><h1 className="text-2xl font-semibold">Projects</h1><p className="mt-1 text-sm text-zinc-400">Open a project to see its connected work.</p></div>
        <button type="button" onClick={() => setIsCreateModalOpen(true)} className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200">+ Create Project</button>
      </header>
      <section className="mx-auto w-full max-w-4xl space-y-4 p-5 sm:p-7" aria-label="Projects">
        {creationLimitReached && <p className="rounded-lg border border-amber-800 bg-amber-950/30 p-3 text-sm text-amber-200">You can create up to 3 projects every 3 minutes.</p>}
        {projects.length === 0 ? <div className="py-16 text-center"><p className="text-lg text-zinc-400">No current projects</p><button type="button" onClick={() => setIsCreateModalOpen(true)} className="mt-4 rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200">Create Project</button></div> : projects.map((project) => {
          const projectIssueCount = issues.filter((issue) => issue.projectId === project.id).length;
          return <article key={project.id} className="group flex min-w-0 items-center justify-between gap-4 rounded-xl border border-zinc-700 bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950 p-5 shadow-lg shadow-black/20 transition hover:border-zinc-500"><button type="button" onClick={() => handleProjectSelect(project)} className="min-w-0 flex-1 text-left"><h2 className="truncate text-lg font-semibold">{project.name}</h2><p className="mt-2 text-sm text-zinc-400">{projectIssueCount === 0 ? "No issues here" : `${projectIssueCount} ${projectIssueCount === 1 ? "issue" : "issues"}`}</p><p className="mt-3 text-xs text-zinc-500">{project.id}</p></button><button type="button" onClick={() => setProjectToDelete(project)} className="shrink-0 rounded-md border border-red-900/80 px-3 py-2 text-sm text-red-200 hover:bg-red-950/60" aria-label={`Delete ${project.name}`}>Delete</button></article>;
        })}
      </section>
      {isCreateModalOpen && <CreateProjectModal onCreate={handleCreateProject} onClose={() => setIsCreateModalOpen(false)} creationLimitReached={creationLimitReached} />}
      {projectForViews && <ChooseView project={projectForViews} onClose={() => setProjectForViews(null)} />}
      {emptyProject && <NoIssueFound project={emptyProject} onClose={() => setEmptyProject(null)} />}
      {projectToDelete && <ConfirmProjectDeleteModal project={projectToDelete} onConfirm={handleDeleteProject} onClose={() => setProjectToDelete(null)} />}
    </main>
  );
}
