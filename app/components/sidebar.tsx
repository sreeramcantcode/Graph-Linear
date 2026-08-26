


export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-zinc-800 p-5">
      <h1 className="text-xl font-semibold">
        GraphLinear
      </h1>

      <nav className="mt-8 space-y-2">
        <div className="rounded-md bg-zinc-800 px-3 py-2">
          Inbox
        </div>

        <div className="px-3 py-2 text-zinc-400">
          Issues
        </div>

        <div className="px-3 py-2 text-zinc-400">
          Projects
        </div>

        <div className="mt-6 px-3 text-xs uppercase text-zinc-500">
          Views
        </div>

        <div className="px-3 py-2 text-zinc-400">
          Kanban
        </div>

        <div className="px-3 py-2 text-zinc-400">
          Graph
        </div>

        <div className="px-3 py-2 text-zinc-400">
          Timeline
        </div>
      </nav>
    </aside>
  );
}