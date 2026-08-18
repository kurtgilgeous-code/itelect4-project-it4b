import { Link } from 'react-router';
import { useItems } from '../hooks/useItemsQuery';
import { useCategories } from '../hooks/useCategoriesQuery';
import useAuthStore from '../store/authStore';
import useUIStore from '../store/uiStore';
import type { Item } from '../types';

export default function DashboardPage() {
  const { userName } = useAuthStore();
  const { setSelectedCategoryId } = useUIStore();

  const { data: items = [], isLoading: itemsLoading } = useItems();
  const { data: categories = [] } = useCategories();

  const lostCount = items.filter((i) => i.status === 'lost').length;
  const foundCount = items.filter((i) => i.status === 'found').length;
  const claimedCount = items.filter((i) => i.status === 'claimed').length;

  const recentItems = [...items].reverse().slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Welcome Hero Banner */}
      <header className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 sm:p-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              Campus Lost & Found Hub
            </h1>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
              {userName ? `Welcome back, ${userName}!` : 'Track, find, and reclaim lost student belongings.'}
            </p>
          </div>
          <Link
            to="/report"
            className="inline-flex items-center justify-center rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500"
          >
            + Report Item
          </Link>
        </div>

        {/* Quick Statistics Grid */}
        <div className="mt-6 grid grid-cols-3 gap-3 border-t border-slate-100 pt-6 dark:border-slate-800 sm:gap-6">
          <div className="rounded-2xl bg-amber-50 p-4 text-center dark:bg-amber-950/30">
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{lostCount}</p>
            <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Lost
            </p>
          </div>
          <div className="rounded-2xl bg-emerald-50 p-4 text-center dark:bg-emerald-950/30">
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{foundCount}</p>
            <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Found
            </p>
          </div>
          <div className="rounded-2xl bg-blue-50 p-4 text-center dark:bg-blue-950/30">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{claimedCount}</p>
            <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Claimed
            </p>
          </div>
        </div>
      </header>

      {/* Explore Categories */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Browse by Category</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to="/items"
              onClick={() => setSelectedCategoryId(cat.id)}
              className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:border-cyan-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="mt-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Items Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Recently Reported</h2>
          <Link to="/items" className="text-sm font-semibold text-cyan-600 hover:text-cyan-500">
            View All ({items.length}) →
          </Link>
        </div>

        {itemsLoading ? (
          <div className="flex h-32 items-center justify-center text-slate-500">
            <span>Loading recent items...</span>
          </div>
        ) : recentItems.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recentItems.map((item: Item) => (
              <Link
                key={item.id}
                to={`/items/${item.id}`}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <div>
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                      item.status === 'found'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : item.status === 'claimed'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}
                  >
                    {item.status}
                  </span>
                  <h3 className="mt-2 font-semibold text-slate-900 group-hover:text-cyan-600 dark:text-slate-100 dark:group-hover:text-cyan-400">
                    {item.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>
                <p className="mt-3 text-[11px] text-slate-400">📍 {item.location}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
            No items reported yet.
          </div>
        )}
      </section>
    </div>
  );
}
