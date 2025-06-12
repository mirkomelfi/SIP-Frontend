import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import { extractUrl } from "../../utils/auth-utils";
import { useUser } from "../../context/UserContext";
import "./Login.css";

export const Login = () => {
  const [error, setError] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const datForm = useRef();

  const { user, setAuthData, clearAuthData } = useUser();

  const consultarForm = async (e) => {
    e.preventDefault();
    const datosFormulario = new FormData(datForm.current);
    const cliente = Object.fromEntries(datosFormulario);

    if (!cliente.username || !cliente.password) {
      setError(true);
      setMensaje("Faltan ingresar datos para el Login");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente)
      });

      const data = await response.json();

      if (response.status === 200) {
        setError(false);
        setAuthData(data.token,data.user); // Guarda todo en localStorage + contexto
        navigate(state?.from ? extractUrl(state.from) : "/");
      } else {
        setError(true);
        setMensaje("Credenciales inválidas");
        clearAuthData(); // por si quedó algo viejo en el storage/contexto
      }
    } catch (err) {
      setError(true);
      setMensaje("Error al conectar con el servidor.");
    }

    e.target.reset();
  };

  const desloggear = () => {
    clearAuthData();
  };

  const navigateTo = (url) => {
    navigate(url);
  };

  return (
    <div>
      {!error ? (
        <div className="container divForm">
          <h3>Formulario de Inicio de Sesión</h3>
          <form onSubmit={consultarForm} ref={datForm}>
            <div className="input-form">
              <label htmlFor="username" className="form-label">Nombre de Usuario</label>
              <input type="text" className="form-control" name="username" />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" className="form-control" name="password" />
            </div>

            {!user && (
              <button type="submit" className="button btnPrimary">Iniciar Sesión</button>
            )}
          </form>

          {user && (
            <>
              <button className="button btnPrimary" onClick={desloggear}>
                <span className="btnText">Cerrar sesión</span>
              </button>
              <button className="button btnPrimary" onClick={() => navigateTo(`/`)}>
                <span className="btnText">Menú principal</span>
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          <Mensaje msj={mensaje} />
          <button className="button btnPrimary" onClick={() => navigateTo(`/login`)}>
            <span className="btnText">Volver a Login</span>
          </button>
        </>
      )}
    </div>
  );
};
