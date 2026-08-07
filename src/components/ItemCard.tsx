import type { LostItem } from "../types/index";

interface ItemCardProps {
  item: LostItem;
  variant?: "default" | "compact";
}

function ItemCard({ item, variant = "default" }: ItemCardProps) {
  const isCompact = variant === "compact";

  return (
    <article
      className={`rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 ${isCompact ? "p-4" : "p-5"}`}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400">Logged item</p>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
          #{item.id}
        </span>
      </div>
      <h3 className={`mt-3 font-semibold text-slate-900 dark:text-slate-100 ${isCompact ? "text-lg" : "text-xl"}`}>
        {item.title}
      </h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">📍 {item.locationFound}</p>
      <p className="mt-3 text-xs font-medium uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
        Reported on {item.createdAt.toLocaleDateString()}
      </p>
    </article>
  );
}

export default ItemCard;