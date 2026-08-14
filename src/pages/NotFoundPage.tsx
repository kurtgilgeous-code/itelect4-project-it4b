import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">404 — Page not found</h2>
      <p className="text-sm">We couldn't find that page.</p>
      <Link to="/" className="rounded border px-3 py-1">Return home</Link>
    </div>
  );
}
