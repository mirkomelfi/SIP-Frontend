import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useAlert } from "../../context/AlertContext";

export const UserPut = ({ fromPerfil }) => {
  const { idUser } = useParams();
  const datForm = useRef();
  const navigate = useNavigate();
  const { tokenState, rol, clearAuthData } = useUser();
  const { showAlert } = useAlert();

  const consultarForm = async (e) => {
    e.preventDefault();

    const datosFormulario = new FormData(datForm.current);
    const cliente = Object.fromEntries(datosFormulario);

    // Convertimos campos vacíos en null
    Object.keys(cliente).forEach((key) => {
      if (cliente[key] === "") cliente[key] = null;
    });

    const todosNull = Object.values(cliente).every((v) => v === null);
    if (todosNull) {
      showAlert("No se ingresaron valores para actualizar", "info");
      return;
    }

    const url = idUser
      ? `${process.env.REACT_APP_DOMINIO_BACK}/admin/users/${idUser}`
      : `${process.env.REACT_APP_DOMINIO_BACK}/updateProfile`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenState}`,
      },
      body: JSON.stringify(cliente),
    });

    if (response.status === 403 || response.status === 401) {
      showAlert("No posee los permisos necesarios", "error");
      return;
    }
    else if(!response.ok){
      const data = await response.json();
      showAlert(`${data.msj}`, "error");
    }

    const data = await response.json();

    if (fromPerfil && cliente.username != null) {
      showAlert("Se modificó el nombre de usuario. Debe volver a iniciar sesión.", "info");
      clearAuthData();
      navigate("/login");
      return;
    }

    if (data.msj) {
      showAlert(data.msj, "success");
    }

    e.target.reset();
  };

  return (
    <div>
      <div className="container divForm">
        <h2>Cambio en los datos del User</h2>
        <h3>Ingrese solo los campos que desea modificar</h3>
        <form onSubmit={consultarForm} ref={datForm}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre</label>
            <input type="text" className="form-control" name="name" placeholder="Ingrese el nuevo nombre" />
          </div>
          <div className="mb-3">
            <label htmlFor="surname" className="form-label">Apellido</label>
            <input type="text" className="form-control" name="surname" placeholder="Ingrese el nuevo apellido" />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Nombre de User</label>
            <input type="text" className="form-control" name="username" placeholder="Ingrese el nuevo nombre de usuario" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control" name="password" placeholder="Ingrese la nueva contraseña" />
          </div>

          <button type="submit" className="button btnPrimary">
            <span className="btnText">Actualizar</span>
          </button>
        </form>
      </div>

      <button className="button btnPrimary" onClick={() => navigate(-1)}>
        <span className="btnText">Volver</span>
      </button>
    </div>
  );
};
