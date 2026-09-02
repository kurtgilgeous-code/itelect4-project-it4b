import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import useAuthStore from "../store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [isDark, setIsDark] = useState(false);
  const { token, login } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    login(name.trim());
    navigate("/", { replace: true });
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-12 transition-colors duration-300 dark:bg-slate-950 sm:px-6 lg:px-8">
      {/* Top right theme toggle */}
      <div className="absolute right-6 top-6">
        <button
          onClick={() => setIsDark((s) => !s)}
          className="cursor-pointer rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium shadow-sm transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          title="Toggle Theme"
        >
          {isDark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-600 text-2xl text-white shadow-md">
            🔍
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Campus Lost & Found
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Sign in with your name or Student ID to report items, file claims, or access staff tools.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <form onSubmit={submit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Student Name or ID
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Juan dela Cruz"
                required
                autoFocus
              />
            </div>

            <Button type="submit" className="w-full">
              Sign In to Tracker
            </Button>
          </form>

          <div className="mt-6 border-t border-slate-100 pt-4 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <Link to="/" className="font-semibold text-cyan-600 hover:underline dark:text-cyan-400">
              ← Continue as Guest to Browse Items
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
