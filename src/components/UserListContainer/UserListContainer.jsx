import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserList } from "../UserList/UserList";
import { Mensaje } from "../Mensaje/Mensaje";
import CreateButton from "../../utils/CreateButton/CreateButton";
import { useUser } from "../../context/UserContext";

const UserListContainer = ({ greeting }) => {
  const { idUser } = useParams();
  const [listaUsers, setListaUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);

  const navigate = useNavigate();
  const { tokenState, rol } = useUser();
  const isAdmin = rol === "ROL_ADMIN";

  const ejecutarFetch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenState}`,
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
        setListaUsers(data);
      }
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      setMensaje("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      ejecutarFetch();
  }, []);

  const navigateTo = (url) => navigate(url);

  return (
    <>
      {!mensaje ? (
        <>
          <h1 className="greeting">{greeting}</h1>
          <CreateButton onClick={() => navigateTo("/register")} />
          {loading ? <p>Cargando...</p> : <UserList pid={idUser} listaUsers={listaUsers} />}
          <button className="button btnPrimary" onClick={() => navigateTo("/")}>
            <span className="btnText">Volver</span>
          </button>
        </>
      ) : (
        <Mensaje msj={mensaje} />
      )}
    </>
  );
};

export default UserListContainer;
