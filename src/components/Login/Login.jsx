import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import { extractUrl } from "../../utils/auth-utils";
import { useUser } from "../../context/UserContext";
import "./Login.css";
import LoginUI from "./LoginUI/LoginUI";

export const Login = () => {
  const [error, setError] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const datForm = useRef();

  const { user, setAuthData, clearAuthData } = useUser();

  const consultarForm = async (credentials) => {

    if (!credentials.username || !credentials.password) {
      setError(true);
      alert('Complete los campos')
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (response.status === 200) {
        setError(false);
        setAuthData(data.token,data.user); // Guarda todo en localStorage + contexto
        navigate(state?.from ? extractUrl(state.from) : "/");
      } else {
        setError(true);
        alert('Credenciales invalidas')
        clearAuthData(); // por si quedó algo viejo en el storage/contexto
      }
    } catch (err) {
      setError(true);
      setMensaje("Error al conectar con el servidor.");
    }
  };


  return (
    <LoginUI onSubmit={consultarForm} ref={datForm}/>
  );
};
