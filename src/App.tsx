import { useState, useEffect, useRef } from "react";
import type React from "react";
import type { User, LostItem, Claim } from "./types/index";
import { ClaimStatus } from "./types/index";
import UserCard from "./components/UserCard";
import ItemCard from "./components/ItemCard";
import ClaimBadge from "./components/ClaimBadge";
import useToggle from "./hooks/useToggle";
import usePrevious from "./hooks/usePrevious";

const mockUser: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student",
  isActive: true,
};

const initialItems: LostItem[] = [
  {
    id: 101,
    title: "Hydro Flask Bottle",
    description: "Black 32oz flask left in Room 403.",
    locationFound: "Building A, 4th Floor",
    reportedBy: 1,
    createdAt: new Date(),
  },
  {
    id: 102,
    title: "Graphing Calculator",
    description: "TI-84 Plus left on the library table.",
    locationFound: "Main Library",
    reportedBy: 1,
    createdAt: new Date(),
  },
];

const mockClaim: Claim = {
  id: 501,
  itemId: 101,
  claimedBy: 1,
  status: ClaimStatus.Pending,
};

function App() {
  const [items, setItems] = useState<LostItem[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [showAdminPanel, toggleAdminPanel] = useToggle(false);
  const previousSearch = usePrevious<string>(searchTerm);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setItems(initialItems);
      setIsLoading(false);
    }, 600);

    return () => window.clearTimeout(timer);
  }, []);

  const handleFocusSearch = (): void => {
    searchInputRef.current?.focus();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 animate-pulse rounded-full bg-cyan-500" />
            <p className="text-lg font-semibold">Loading Campus Tracker items…</p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="h-28 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-700" />
            <div className="h-28 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-600 dark:text-cyan-400">
                Campus lost & found
              </p>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Campus Tracker</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
                Review discovered items, switch profiles, and monitor the claim workflow in one place.
              </p>
            </div>
            <button
              onClick={() => setIsDarkMode((prev) => !prev)}
              className="rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-cyan-400 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              {isDarkMode ? "☀️ Light mode" : "🌙 Dark mode"}
            </button>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">Search & controls</p>
                  <h2 className="text-lg font-semibold">Find the item you need</h2>
                </div>
                <button
                  onClick={handleFocusSearch}
                  className="rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-medium transition hover:border-cyan-400 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-800"
                >
                  Focus search
                </button>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  placeholder="Search items by title..."
                  onChange={handleSearchChange}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 dark:border-slate-700 dark:bg-slate-800"
                />
                <button
                  onClick={toggleAdminPanel}
                  className="rounded-2xl border border-slate-300 bg-slate-100 px-4 py-3 text-sm font-medium transition hover:border-cyan-400 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-800"
                >
                  {showAdminPanel ? "Hide admin" : "Show admin"}
                </button>
              </div>

              {previousSearch !== undefined && previousSearch !== searchTerm && (
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  Last search term: <span className="font-medium text-slate-700 dark:text-slate-200">“{previousSearch}”</span>
                </p>
              )}

              {showAdminPanel && (
                <div className="mt-4 rounded-2xl border border-cyan-200 bg-cyan-50 p-4 text-sm text-cyan-800 dark:border-cyan-900 dark:bg-cyan-950/40 dark:text-cyan-200">
                  <p className="font-semibold">Admin panel active</p>
                  <p className="mt-1">System status is healthy and the tracker is ready for review.</p>
                </div>
              )}
            </div>

            <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
              <UserCard user={mockUser} onSelect={setSelectedUser} />
              <ClaimBadge claim={mockClaim} claimedBy={mockUser.name}>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                  ⚠️ Pending approval from security personnel.
                </p>
              </ClaimBadge>
            </div>

            {selectedUser && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
                Active selection: <span className="font-semibold">{selectedUser.name}</span> ({selectedUser.email})
              </div>
            )}
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-600 dark:text-cyan-400">
                  Items found
                </p>
                <h2 className="mt-1 text-xl font-semibold">Discovered items</h2>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                {filteredItems.length}
              </span>
            </div>

            {filteredItems.length === 0 ? (
              <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
                <p className="font-semibold">No matches found</p>
                <p className="mt-1">Try another search term to surface the right lost item.</p>
              </div>
            ) : (
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {filteredItems.map((item) => (
                  <ItemCard key={item.id} item={item} variant={item.id === 102 ? "compact" : "default"} />
                ))}
              </div>
            )}
          </aside>
        </section>
      </div>
    </div>
  );
}

export default App;
