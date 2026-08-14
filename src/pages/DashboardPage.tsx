import { Link } from "react-router";
import { mockUser, initialItems } from "../data/mockData";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <h1 className="text-2xl font-semibold">Welcome to Campus Tracker</h1>
        <p className="text-sm text-slate-600">Hello, {mockUser.name} — review recently found items.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        {initialItems.map((it) => (
          <Link key={it.id} to={`/items/${it.id}`} className="rounded-lg border p-4 hover:shadow">
            <h3 className="font-semibold">{it.title}</h3>
            <p className="text-sm text-slate-600">{it.locationFound}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
