import { createContext, useContext, useState, useEffect } from "react";
import {
  getToken,
  setToken,
  deleteToken,
  extractRol,
} from "../utils/auth-utils";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tokenState, setTokenState] = useState(null);
  const [rol, setRol] = useState(null);
  const [loading, setLoading] = useState(true); // opcional para UX

  // Centraliza el login
  const setAuthData = (token, usuario) => {
    setToken(token);
    setTokenState(token);
    setUser(usuario);
    setRol(extractRol(token));
  };

  // Centraliza el logout
  const clearAuthData = () => {
    deleteToken();
    setTokenState(null);
    setUser(null);
    setRol(null);
  };

  // Validación real al iniciar
  useEffect(() => {
    const validateSession = async () => {
      const storedToken = getToken();
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/profile`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${storedToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
        } else {
          clearAuthData(); // token expirado o inválido
        }
      } catch (err) {
        console.error("Error al validar sesión:", err);
        clearAuthData();
      } finally {
        setLoading(false); // se completó la verificación
      }
    };

    validateSession();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        tokenState,
        rol,
        setAuthData,
        clearAuthData,
        loading, // útil si querés mostrar un loader
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
