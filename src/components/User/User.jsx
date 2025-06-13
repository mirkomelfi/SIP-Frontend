import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";

export const User = () => {
  const { idUser } = useParams();
  const [userData, setUserData] = useState([]);
  const [mensaje, setMensaje] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { token, rol } = useUser(); 
  const isAdmin = rol === "ROL_ADMIN";

  const ejecutarFetch = async () => {
    let url = idUser
      ? `${process.env.REACT_APP_DOMINIO_BACK}/admin/users/${idUser}`
      : `${process.env.REACT_APP_DOMINIO_BACK}/profile`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 403 || response.status === 401) {
      setMensaje("No posee los permisos necesarios");
      return;
    }

    const data = await response.json();
    if (data.msj) {
      setMensaje(data.msj);
    } else {
      setUserData(data);
    }
  };

  const eliminar = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_DOMINIO_BACK}/admin/users/${idUser}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 403 || response.status === 401) {
      setMensaje("No posee los permisos necesarios");
      return;
    }

    const data = await response.json();
    setMensaje(data.msj);
  };

  const navigateTo = (url) => {
    navigate(url);
  };

  useEffect(() => {
    ejecutarFetch()
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {!mensaje ? (
        <div className="tarjetaProducto">
          <h1>Numero de usuario: {userData.id}</h1>
          <h2>Nombre de usuario: {userData.username}</h2>
          <h2>Nombre: {userData.name}</h2>
          <h2>Apellido: {userData.surname}</h2>

          {idUser ? (
            <button
              className="button btnPrimary"
              onClick={() => navigateTo(`/updateUser/${idUser}`)}
            >
              <span className="btnText">Modificar</span>
            </button>
          ) : (
            <button
              className="button btnPrimary"
              onClick={() => navigateTo(`/updateUser`)}
            >
              <span className="btnText">Modificar</span>
            </button>
          )}

          {idUser && isAdmin && (
            <button className="button btnPrimary" onClick={eliminar}>
              <span className="btnText">Eliminar</span>
            </button>
          )}
        </div>
      ) : (
        <Mensaje msj={mensaje} />
      )}

      {idUser ? (
        <button
          className="button btnPrimary"
          onClick={() => navigateTo("/users")}
        >
          <span className="btnText">Volver</span>
        </button>
      ) : (
        <button className="button btnPrimary" onClick={() => navigateTo("/")}>
          <span className="btnText">Volver</span>
        </button>
      )}
    </>
  );
};
