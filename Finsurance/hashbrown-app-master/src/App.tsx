import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Income_and_expenses from "./pages/Income_and_expenses";
import Home from "./pages/Home";
import FinancialLiteracyQuiz from "./pages/FinancialLiteracyQuiz";
import DarkModeToggle from "./components/DarkModeToggle";
import { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { SessionProvider } from "./components/SessionProvider"; // Import session provider

const AppContent: React.FC = () => {
  useKeyboardNavigation(); // Move the navigation logic to the custom hook

  return (
    <div>
      <DarkModeToggle />
      <Routes>
        {/* Public Route for Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route index element={<Home />} />
          <Route path="/income_and_expenses" element={<Income_and_expenses />} />
          <Route path="/financial-literacy-quiz" element={<FinancialLiteracyQuiz />} />
        </Route>

        {/* Redirect all unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <SessionProvider> {/* Provide session state to the entire app */}
      <Router>
        <AppContent />
      </Router>
    </SessionProvider>
  );
};

export default App;