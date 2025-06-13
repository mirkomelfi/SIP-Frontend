import { useNavigate } from "react-router-dom";
import styles from "./UserDetail.module.css";

const UserDetail = ({ user }) => {
  const navigate = useNavigate();

  const navigateTo = (url) => {
    navigate(url);
  };

  return (
    <div
      className={`tarjetaProducto ${styles.tarjetaProducto}`} // corregí el nombre del estilo importado
      onClick={() => navigateTo(`${user.id}`)}
    >
      <h1>Usuario N°: {user.id}</h1>
      <h2>Nombre de usuario: {user.username}</h2>
    </div>
  );
};

export { UserDetail };
