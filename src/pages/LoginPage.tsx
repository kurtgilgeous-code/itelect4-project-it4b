import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/client";
import useAuthStore from "../store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDark, setIsDark] = useState(true);
  const token = useAuthStore((state) => state.token);
  const setSession = useAuthStore((state) => state.setSession);
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: ({ token: sessionToken, user }) => {
      setSession(sessionToken, user);
      navigate("/", { replace: true });
    },
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate({ email: email.trim(), password });
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-12 transition-colors duration-300 dark:bg-slate-950 sm:px-6 lg:px-8">
      {/* Top right theme toggle */}
      <div className="absolute right-6 top-6">
        <button
          onClick={() => setIsDark((s) => !s)}
          className="cursor-pointer rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium shadow-sm transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          title="Toggle neon theme"
        >
          {isDark ? "◉ NEON ON" : "◯ NEON OFF"}
        </button>
      </div>

      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-600 text-2xl text-white shadow-md">
            ⌕
          </div>
          <h1 className="cyber-title mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            LOST<span className="text-fuchsia-400">//</span>FOUND
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Sign in to report items, file claims, or access staff tools.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <form onSubmit={submit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required autoFocus />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
            </div>
            {loginMutation.isError && (
              <p role="alert" className="text-sm text-red-600 dark:text-red-400">
                {loginMutation.error.message}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 border-t border-slate-100 pt-4 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <p>
              New here? <Link to="/register" className="font-semibold text-cyan-600 hover:underline dark:text-cyan-400">Create an account</Link>
            </p>
            <Link to="/" className="font-semibold text-cyan-600 hover:underline dark:text-cyan-400">
              ← Continue as Guest to Browse Items
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
