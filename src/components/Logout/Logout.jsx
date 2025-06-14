import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useAlert } from "../../context/AlertContext";
import styles from "./Logout.module.css"; // suponiendo que estás usando CSS modules

export const Logout = () => {
  const navigate = useNavigate();
  const { user, clearAuthData } = useUser();
  const { showAlert } = useAlert();

  useEffect(() => {
    if (user) {
      clearAuthData();
      showAlert("Sesión cerrada con éxito", "success");
    } else {
      showAlert("No se encontraba logueado", "info");
    }
  }, [user, clearAuthData]);

  return (
    <div className={styles.tarjetaProducto}>
      <button
        className={styles.button}
        onClick={() => navigate("/login")}
      >
        <span className={styles.btnText}>Inicio de Sesión</span>
      </button>
    </div>
  );
};
