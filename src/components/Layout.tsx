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
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-cyan-600 dark:text-cyan-400"
                  : "text-slate-700 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
              }
            >
              Campus Tracker
            </NavLink>
            <NavLink
              to="/items"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-cyan-600 dark:text-cyan-400"
                  : "text-slate-700 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
              }
            >
              Items
            </NavLink>
            <NavLink
              to="/report"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-cyan-600 dark:text-cyan-400"
                  : "text-slate-700 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
              }
            >
              Report
            </NavLink>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-cyan-600 dark:text-cyan-400"
                  : "text-slate-700 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
              }
            >
              Admin
            </NavLink>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDark((s) => !s)}
              className="cursor-pointer rounded-full border border-slate-200 px-3 py-1 text-xs transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
              title="Toggle Theme"
            >
              {isDark ? "☀️ Light" : "🌙 Dark"}
            </button>

            {token ? (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{userName}</span>
                <button
                  onClick={logout}
                  className="cursor-pointer rounded-xl border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="rounded-xl bg-cyan-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-cyan-500"
              >
                Login
              </NavLink>
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
