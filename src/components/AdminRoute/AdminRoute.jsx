import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const AdminRoute = () => {
  const { user, rol, clearAuthData} = useUser();
  const location = useLocation();

  // No está logueado → redirige al login
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Está logueado pero no es admin → redirige al home
  if (rol !== "ROL_ADMIN") {
    return <Navigate to="/" replace />;
  }

  // Todo bien → renderiza la ruta hija
  return <Outlet />;
};

export default AdminRoute;
