import Link from "next/link";


export default function Sidebar() {
  return (
    <aside className="w-64 border-r hidden lg:block border-zinc-800 p-5">
      <h1 className="text-xl font-semibold">
        GraphLinear
      </h1>

      <nav className="mt-8 space-y-2">
        <div className="rounded-md bg-zinc-800 px-3 py-2">
          <Link href="/">Inbox</Link>
        </div>

        <div className="px-3 py-2 text-zinc-400">
          <Link href="/issues">Issues</Link>
        </div>

        <div className="px-3 py-2 text-zinc-400">
          <Link href="/projects">Projects</Link>
        </div>

        <div className="mt-6 px-3 text-xs uppercase text-zinc-500">
          Views
        </div>

        <div className="px-3 py-2 text-zinc-400">
          <Link href="/kanban">Kanban</Link>
        </div>

        <div className="px-3 py-2 text-zinc-400">
          <Link href="/graph">Graphs</Link>
        </div>

        <div className="px-3 py-2 text-zinc-400">
          <Link href="/timeline">Timeline</Link>
        </div>
      </nav>
    </aside>
  );
}