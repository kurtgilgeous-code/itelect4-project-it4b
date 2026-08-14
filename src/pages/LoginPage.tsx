import { useState } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../store/authStore";

export default function LoginPage() {
  const [name, setName] = useState("");
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    login(name);
    navigate("/", { replace: true });
  };

  return (
    <div className="max-w-md">
      <h2 className="text-xl font-semibold">Login</h2>
      <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
        <input value={name} onChange={(e) => setName(e.target.value)} className="rounded border px-3 py-2" placeholder="Your name" />
        <button className="rounded bg-cyan-600 px-3 py-2 text-white">Login</button>
      </form>
    </div>
  );
}
