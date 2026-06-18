import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./LanguageContext.jsx";
import LandingPage from "./pages/LandingPage";
import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDashBoardHome from "./components/admin/AdminDashBoardHome";
import AdminFarm from "./components/admin/AdminFarm";
import AdminCrops from "./components/admin/AdminCrops";
import AdminEmployees from "./components/admin/AdminEmployees";
import AdminActivities from "./components/admin/AdminActivities";
import AdminReports from "./components/admin/AdminReports";
import AdminSettings from "./components/admin/AdminSettings";
import AuthCallback from "./pages/AuthCallback";

const App = () => {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<AdminDashBoardHome />} />
            <Route path="farms" element={<AdminFarm />} />
            <Route path="crops" element={<AdminCrops />} />
            <Route path="employees" element={<AdminEmployees />} />
            <Route path="activities" element={<AdminActivities />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;