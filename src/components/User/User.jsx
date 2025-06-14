import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useAlert } from "../../context/AlertContext";

export const User = () => {
  const { idUser } = useParams();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { tokenState, rol } = useUser(); 
  const { showAlert } = useAlert();
  const isAdmin = rol === "ROL_ADMIN";

  const ejecutarFetch = async () => {
    const url = idUser
      ? `${process.env.REACT_APP_DOMINIO_BACK}/admin/users/${idUser}`
      : `${process.env.REACT_APP_DOMINIO_BACK}/profile`;

    const response = await fetch(url, {
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
          Authorization: `Bearer ${tokenState}`,
        },
      }
    );

    if (response.status === 403 || response.status === 401) {
      showAlert("No posee los permisos necesarios", "error");
      return;
    }    
    else if(!response.ok){
      const data = await response.json();
      showAlert(`${data.msj}`, "error");
    }


    const data = await response.json();
    showAlert(data.msj, "success");
    navigate("/users");
  };

  const navigateTo = (url) => {
    navigate(url);
  };

  useEffect(() => {
    ejecutarFetch()
      .catch((error) => {
        console.error(error);
        showAlert("Error al obtener los datos del usuario", "error");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="tarjetaProducto">
        <h1>Numero de usuario: {userData.id}</h1>
        <h2>Nombre de usuario: {userData.username}</h2>
        <h2>Nombre: {userData.name}</h2>
        <h2>Apellido: {userData.surname}</h2>

        <button
          className="button btnPrimary"
          onClick={() =>
            navigateTo(idUser ? `/updateUser/${idUser}` : `/updateUser`)
          }
        >
          <span className="btnText">Modificar</span>
        </button>

        {idUser && isAdmin && (
          <button className="button btnPrimary" onClick={eliminar}>
            <span className="btnText">Eliminar</span>
          </button>
        )}
      </div>

      <button
        className="button btnPrimary"
        onClick={() => navigateTo(idUser ? "/users" : "/")}
      >
        <span className="btnText">Volver</span>
      </button>
    </>
  );
};
