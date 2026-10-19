import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { register } from "../api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: () => navigate("/login", { replace: true }),
  });

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    registerMutation.mutate({ name: name.trim(), email: email.trim(), password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 dark:bg-slate-950">
      <div className="w-full max-w-md space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">Create your account</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Register to report items and submit claims.</p>
        </header>
        <form onSubmit={submit} className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">Name</Label>
            <Input id="name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required autoFocus />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">Email</Label>
            <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">Password</Label>
            <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" minLength={8} required />
            <p className="text-xs text-slate-500">Use at least 8 characters.</p>
          </div>
          {registerMutation.isError && (
            <p role="alert" className="text-sm text-red-600 dark:text-red-400">{registerMutation.error.message}</p>
          )}
          <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
            {registerMutation.isPending ? "Creating account..." : "Create Account"}
          </Button>
          <p className="text-center text-sm text-slate-500">
            Already registered? <Link to="/login" className="font-semibold text-cyan-600 hover:underline dark:text-cyan-400">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}