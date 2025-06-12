import { createContext, useContext, useState, useEffect } from "react";
import {
  getToken,
  setToken,
  deleteToken,
  decodeToken,
  extractRol,
} from "../utils/auth-utils";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tokenState, setTokenState] = useState(null);
  const [rol, setRol] = useState(null);

  // Centraliza el login: guarda token + usuario + rol
  const setAuthData = (token, usuario) => {
    setToken(token);               // guarda en localStorage
    setTokenState(token);          // guarda en el contexto
    setUser(usuario);              // guarda el usuario
    setRol(extractRol(token));     // extrae y guarda el rol desde el token
  };

  // Centraliza el logout: limpia todo
  const clearAuthData = () => {
    deleteToken();                 // borra del localStorage
    setTokenState(null);          // limpia el token del contexto
    setUser(null);                // limpia usuario
    setRol(null);                 // limpia rol
  };

  // Al iniciar la app, intenta cargar sesión desde el token guardado
  useEffect(() => {
    const storedToken = getToken();
    if (storedToken) {
      const decoded = decodeToken(storedToken);
      if (decoded) {
        setTokenState(storedToken);
        setUser(decoded.user || null); // setteo el usuario desde el token JWT recibida
        setRol(extractRol(storedToken));
      } else {
        clearAuthData(); // token inválido
      }
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        tokenState,
        rol,
        setAuthData,
        clearAuthData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
