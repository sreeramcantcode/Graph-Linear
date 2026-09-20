"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useIssueStore } from "../store/issuestore";

function TimelineContent() {
    const projectId = useSearchParams().get("projectId");
    const allIssues = useIssueStore((state) => state.issues);
    const issues = projectId ? allIssues.filter((issue) => issue.projectId === projectId) : allIssues;
    return (
        <>
        <main>
            <div className="">
                <div className=" w-full p-7 text-2xl border-b border-gray-600">
                 <h1>{projectId ? "Project Timeline" : "Timeline"}</h1>
                </div>
                 <div className="p-7 py-10">
                <p className="text-3xl">{issues.length === 0 ? "No issues present" : "Project issue timeline"}</p>
                <div className="py-4 text-md text-gray-400">{issues.map((issue) => <p key={issue.id}>{issue.title}</p>)}</div>
                </div>
                
            </div>
        </main>
        </>
    )
}

export default function Timeline() {
    return <Suspense fallback={<main className="p-7 text-zinc-400">Loading timeline…</main>}><TimelineContent /></Suspense>;
}
