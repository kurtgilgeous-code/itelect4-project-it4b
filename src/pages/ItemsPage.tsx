import { Link } from 'react-router';
import { useItems } from '../hooks/useItemsQuery';
import { useCategories } from '../hooks/useCategoriesQuery';
import useUIStore from '../store/uiStore';
import type { Item } from '../types';

export default function ItemsPage() {
  const { searchQuery, setSearchQuery, selectedCategoryId, setSelectedCategoryId } = useUIStore();

  // Fetch all items using TanStack Query
  const { data: items = [], isLoading: itemsLoading, error: itemsError } = useItems();

  // Fetch categories using TanStack Query
  const { data: categories = [] } = useCategories();

  // Filter items by category and search query
  const filteredItems = items.filter((item: Item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      !selectedCategoryId || item.categoryId === selectedCategoryId;

    return matchesSearch && matchesCategory;
  });

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || 'General';
  };

  if (itemsLoading) {
    return (
      <div className="flex h-48 items-center justify-center text-slate-500">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-600 border-t-transparent"></div>
          <span>Loading items from server...</span>
        </div>
      </div>
    );
  }

  if (itemsError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-300">
        <p className="font-semibold">Failed to fetch items</p>
        <p className="mt-1 text-sm">{itemsError.message}. Make sure json-server is running on port 3001.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Lost & Found Items
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Browse through items reported across the campus.
          </p>
        </div>

        <Link
          to="/report"
          className="inline-flex items-center justify-center rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
        >
          + Report Item
        </Link>
      </div>

      {/* Category Pills & Search Filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategoryId(null)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              selectedCategoryId === null
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryId(cat.id === selectedCategoryId ? null : cat.id)}
              className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition ${
                selectedCategoryId === cat.id
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title, desc, location..."
          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-1.5 text-sm text-slate-900 placeholder-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 sm:w-64"
        />
      </div>

      {/* Items Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.length > 0 ? (
          filteredItems.map((item: Item) => (
            <Link
              key={item.id}
              to={`/items/${item.id}`}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-500/50 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-cyan-100 px-2.5 py-0.5 text-xs font-medium text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300">
                    {getCategoryName(item.categoryId)}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                      item.status === 'found'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : item.status === 'claimed'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-semibold text-slate-900 group-hover:text-cyan-600 dark:text-slate-100 dark:group-hover:text-cyan-400">
                  {item.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <div className="flex items-center justify-between">
                  <span>📍 {item.location}</span>
                  <span>{new Date(item.dateReported).toLocaleDateString()}</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500 dark:border-slate-700">
            No items found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
