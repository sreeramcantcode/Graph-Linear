import Sidebar from "./components/sidebar";
export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="flex min-h-screen">
        <Sidebar></Sidebar>
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