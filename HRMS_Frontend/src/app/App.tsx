import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../modules/Authentication/pages/LoginPage";
import { RegisterPage } from "../modules/Authentication/schemas";
import ForgotPasswordPage from "../modules/Authentication/pages/ForgotPasswordPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    </Routes>
  );
}