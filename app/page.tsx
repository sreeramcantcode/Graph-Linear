export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="flex min-h-screen">
        {/* Sidebar */}
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

        {/* Main content */}
        <section className="flex-1">
          <header className="border-b border-zinc-800 px-8 py-5">
            <h2 className="text-lg font-medium">
              Inbox
            </h2>
          </header>

          <div className="p-8">
            <h3 className="text-2xl font-semibold">
              Welcome to GraphLinear
            </h3>

            <p className="mt-2 text-zinc-400">
              Manage issues, dependencies, and project execution.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}