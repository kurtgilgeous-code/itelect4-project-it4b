import { useState } from "react";
import { Link } from "react-router";
import { initialItems } from "../data/mockData";
import type { LostItem } from "../types/index";

export default function ItemsPage() {
  const [q, setQ] = useState("");
  const items = initialItems.filter((i) => i.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Items</h2>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." className="rounded border px-3 py-1" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item: LostItem) => (
          <Link key={item.id} to={`/items/${item.id}`} className="rounded-lg border p-4 hover:shadow">
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-slate-600">{item.locationFound}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
