import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import { getToken, deleteToken } from "../../utils/auth-utils";
import { useUser } from "../../context/UserContext";
import "./Logout.css";

export const Logout = () => {
  const [mensaje, setMensaje] = useState("No se encontraba logueado");
  const navigate = useNavigate();

  // setters del contexto
  const { setUser, setTokenState, setRol } = useUser();

  useEffect(() => {
    // Ejecuta al montar el componente
    const token = getToken();

    if (token) {
      deleteToken();          // limpia localStorage
      setUser(null);          // limpia contexto
      setTokenState(null);
      setRol(null);
      setMensaje("Sesión cerrada con éxito");
    }
    // Si no había token, se mantiene el mensaje inicial
  }, [setUser, setTokenState, setRol]);

  const goToLogin = () => navigate("/login");

  return (
    <div className="tarjetaProducto">
      <Mensaje msj={mensaje} />
      <button className="button btnPrimary" onClick={goToLogin}>
        <span className="btnText">Inicio de Sesión</span>
      </button>
    </div>
  );
};
