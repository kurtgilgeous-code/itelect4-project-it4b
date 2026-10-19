import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import ItemsPage from "./pages/ItemsPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import ReportItemPage from "./pages/ReportItemPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedPage from "./pages/ProtectedPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      {/* Dedicated Login Screen without item navigation tabs */}
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />

      {/* Main Application with Navigation Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="items" element={<ItemsPage />} />
        <Route path="items/:id" element={<ItemDetailPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="report" element={<ReportItemPage />} />
        </Route>

        <Route element={<ProtectedRoute adminOnly />}>
          <Route path="admin" element={<ProtectedPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
