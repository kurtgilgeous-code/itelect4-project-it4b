import { useState } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [name, setName] = useState("");
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    login(name.trim());
    navigate("/", { replace: true });
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Student / Staff Sign In
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Enter your name to access reporting, claim submission, and admin capabilities.
          </p>
        </div>

        <form onSubmit={submit} className="mt-6 flex flex-col gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-foreground">
              Full Name or Student ID
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Juan dela Cruz"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Log In to Tracker
          </Button>
        </form>
      </div>
    </div>
  );
}
