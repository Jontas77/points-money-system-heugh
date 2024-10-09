import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { AuthProvider } from "./context/Authcontext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ParentDashboard from "./pages/ParentDashboard";
import ChildDashboard from "./pages/ChildDashboard";
import { useAuth } from "./context/useAuth";
import ChildDetail from "./pages/ChildDetailPage";
import UpdateUserDetailPage from "./pages/UpdateUserDetailPage";

// PrivateRoute component for protecting routes
const PrivateRoute = ({
  children,
  role,
}: {
  children: React.ReactElement;
  role: string;
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  if (user.role !== role) {
    let redirectPath = "/auth/login";
    if (user?.role) {
      redirectPath = user.role === "parent" ? "/dashboard" : "/child-dashboard";
    }
    return <Navigate to={redirectPath} />;
  }

  return children;
};

const RedirectBasedOnRole = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/auth/login");
      } else {
        let redirectPath = "/auth/login";
        if (user?.role) {
          redirectPath = user.role === "parent" ? "/dashboard" : "/child-dashboard";
        }
        navigate(redirectPath);
      }
    }
  }, [user, loading, navigate]);

  return null;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute role="parent">
                <ParentDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/child-dashboard"
            element={
              <PrivateRoute role="child">
                <ChildDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/child/:id"
            element={
              <PrivateRoute role="parent">
                <ChildDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/update/:id"
            element={
              <PrivateRoute role="parent">
                <UpdateUserDetailPage />
              </PrivateRoute>
            }
          />
          {/* Default route redirects to login */}
          <Route path="*" element={<Navigate to="/auth/login" />} />
          <Route path="/" element={<RedirectBasedOnRole />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
