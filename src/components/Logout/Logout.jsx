import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";
import "./Logout.css";

export const Logout = () => {
  const [mensaje, setMensaje] = useState("No se encontraba logueado");
  const navigate = useNavigate();
  const { user, clearAuthData } = useUser();

  useEffect(() => {
    if (user) {
      clearAuthData();
      setMensaje("Sesión cerrada con éxito");
    }
  }, [user, clearAuthData]);

  return (
    <div className="tarjetaProducto">
      <Mensaje msj={mensaje} />
      <button className="button btnPrimary" onClick={() => navigate("/login")}>
        <span className="btnText">Inicio de Sesión</span>
      </button>
    </div>
  );
};
