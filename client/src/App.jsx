import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import PremiumFooter from "./components/PremiumFooter";
import ProtectedRoute from "./components/ProtectedRoute";
import WhatsAppWidget from "./components/WhatsAppWidget";
import ContactRegistrationModal from "./components/ContactRegistrationModal";
import LandingPage from "./pages/LandingPage";
import FeaturesPage from "./pages/FeaturesPage";
import FeatureDetailPage from "./pages/FeatureDetailPage";
import LoginPage from "./pages/LoginPage";
import FarmerDashboardPage from "./pages/FarmerDashboardPage";
import AdminPage from "./pages/AdminPage";

function AppLayout() {
  const location = useLocation();
  const isWorkspaceView =
    location.pathname.startsWith("/dashboard") || location.pathname.startsWith("/admin");

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-primary-950 text-slate-900 transition-colors duration-500 dark:text-white">
      {!isWorkspaceView && (
        <Header />
      )}
      <main className={isWorkspaceView ? "min-h-screen" : "pt-32 md:pt-40 lg:pt-44"}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/features/:slug" element={<FeatureDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute roles={["farmer"]} />}>
              <Route path="/dashboard" element={<FarmerDashboardPage />} />
            </Route>
            <Route element={<ProtectedRoute roles={["admin"]} />}>
              <Route path="/admin" element={<AdminPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
      {!isWorkspaceView && <PremiumFooter />}
      {!isWorkspaceView && <WhatsAppWidget />}
      <ContactRegistrationModal />
    </div>
  );
}

export default function App() {
  return <AppLayout />;
}
