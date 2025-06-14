import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserList } from "../UserList/UserList";
import CreateButton from "../../utils/CreateButton/CreateButton";
import { useUser } from "../../context/UserContext";
import { useAlert } from "../../context/AlertContext";

const UserListContainer = ({ greeting }) => {
  const { idUser } = useParams();
  const [listaUsers, setListaUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { tokenState, rol } = useUser();
  const { showAlert } = useAlert();
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
        showAlert("No posee los permisos necesarios", "error");
        return;
      }

      const data = await response.json();
      if (data.msj) {
        showAlert(data.msj, "error");
      } else {
        setListaUsers(data);
      }
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      showAlert("Error al conectar con el servidor", "error");
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
      <h1 className="greeting">{greeting}</h1>
      <CreateButton onClick={() => navigateTo("/register")} />
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <UserList pid={idUser} listaUsers={listaUsers} />
      )}
      <button className="button btnPrimary" onClick={() => navigateTo("/")}>
        <span className="btnText">Volver</span>
      </button>
    </>
  );
};

export default UserListContainer;
