import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const PrivateRoute = () => {
  const { user } = useUser();
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
};

export default PrivateRoute;
