import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "./SessionProvider";

const ProtectedRoute = () => {
  const { user } = useSession(); // Get user state from session

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;