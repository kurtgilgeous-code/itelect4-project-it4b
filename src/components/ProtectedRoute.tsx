import { Navigate, Outlet } from "react-router";
import useAuthStore from "../store/authStore";

export default function ProtectedRoute({ adminOnly = false }: { adminOnly?: boolean }) {
  const token = useAuthStore((state) => state.token);
  const role = useAuthStore((state) => state.user?.role);
  if (!token) return <Navigate to="/login" replace />;
  if (adminOnly && role !== "admin") return <Navigate to="/" replace />;
  return <Outlet />;
}
