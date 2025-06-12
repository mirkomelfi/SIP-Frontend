import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);         // info usuario
  const [token, setTokenState] = useState(null);  // token
  const [rol, setRol] = useState(null);           // rol

  return (
    <UserContext.Provider value={{ user, setUser, token, setTokenState, rol, setRol }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
