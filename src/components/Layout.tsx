import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router";
import useAuthStore from "../store/authStore";

export default function Layout() {
  const [isDark, setIsDark] = useState(false);
  const { token, userName, logout } = useAuthStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-6 flex items-center justify-between rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center gap-4">
            <NavLink to="/" end className={({ isActive }) => (isActive ? "font-semibold" : "")}>Campus Tracker</NavLink>
            <NavLink to="/items" className={({ isActive }) => (isActive ? "font-semibold" : "")}>Items</NavLink>
            <NavLink to="/report" className={({ isActive }) => (isActive ? "font-semibold" : "")}>Report</NavLink>
            <NavLink to="/admin" className={({ isActive }) => (isActive ? "font-semibold" : "")}>Admin</NavLink>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setIsDark((s) => !s)} className="rounded-full border px-3 py-1">
              {isDark ? "☀️" : "🌙"}
            </button>

            {token ? (
              <>
                <span className="text-sm">{userName}</span>
                <button onClick={logout} className="ml-2 rounded border px-3 py-1 text-sm">Logout</button>
              </>
            ) : (
              <NavLink to="/login" className="rounded border px-3 py-1 text-sm">Login</NavLink>
            )}
          </div>
        </nav>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
