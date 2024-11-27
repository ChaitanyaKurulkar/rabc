import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage"; 
import PrivateRoute from "./PrivateRoutes";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import RoleManagement from "./pages/RoleManagement";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* User Management */}
        <Route
          path="/users"
          element={
            <PrivateRoute requiredRole="Admin">
              <UserManagement />
            </PrivateRoute>
          }
        />

        {/* Role Management */}
        <Route
          path="/roles"
          element={
            <PrivateRoute requiredRole="Admin">
              <RoleManagement />
            </PrivateRoute>
          }
        />

        {/* Redirect to login by default */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
