import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { extractUrl } from "../../utils/auth-utils";
import { useUser } from "../../context/UserContext";
import { useAlert } from "../../context/AlertContext";
import "./Login.css";
import LoginUI from "./LoginUI/LoginUI";

export const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const datForm = useRef();

  const { user, setAuthData, clearAuthData } = useUser();
  const { showAlert } = useAlert();

  const consultarForm = async (credentials) => {
    if (!credentials.username || !credentials.password) {
      setError(true);
      showAlert("Complete los campos", "info");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.status === 200) {
        setError(false);
        setAuthData(data.token, data.user); // Guarda en localStorage + contexto
        showAlert("Inicio de sesión exitoso", "success");
        navigate(state?.from ? extractUrl(state.from) : "/");
      } else {
        setError(true);
        showAlert("Credenciales inválidas", "error");
        clearAuthData(); // Por si quedó algo viejo en el storage/contexto
      }
    } catch (err) {
      setError(true);
      showAlert("Error al conectar con el servidor", "error");
    }
  };

  return (
    <LoginUI onSubmit={consultarForm} ref={datForm} />
  );
};
