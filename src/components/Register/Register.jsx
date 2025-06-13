import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import { getToken, deleteToken, validateRol, isRolUser } from "../../utils/auth-utils";
import { useUser } from "../../context/UserContext";

export const Register = () => {
  const [mensaje, setMensaje] = useState(null);
  const datForm = useRef();
  const navigate = useNavigate();
  const { rol } = useUser();
  const isAdmin = rol === "ROL_ADMIN";

  const consultarForm = async (e) => {
    e.preventDefault();

    const datosFormulario = new FormData(datForm.current);
    const cliente = Object.fromEntries(datosFormulario);

    if (!cliente.username || !cliente.password) {
      setMensaje("Faltan datos");
      return;
    }

    const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(cliente),
    });

    const esValido = validateRol(response);
    if (!esValido) {
      if (isRolUser(getToken())) {
        setMensaje("No posee los permisos necesarios");
      } else {
        deleteToken();
        navigate("/login");
      }
    } else {
      const data = await response.json();
      setMensaje(data.msj);
    }

    e.target.reset();
  };

  return (
    <div>
      {!mensaje ? (
        <div className="container divForm">
          <h3>Formulario de registro</h3>
          <form onSubmit={consultarForm} ref={datForm}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre</label>
              <input type="text" className="form-control" name="name" required />
            </div>
            <div className="mb-3">
              <label htmlFor="surname" className="form-label">Apellido</label>
              <input type="text" className="form-control" name="surname" required />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Nombre de Usuario</label>
              <input type="text" className="form-control" name="username" required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" className="form-control" name="password" required />
            </div>

            <button type="submit" className="button btnPrimary">
              <span className="btnText">Registrar</span>
            </button>
          </form>
        </div>
      ) : (
        <Mensaje msj={mensaje} />
      )}
      <button className="button btnPrimary" onClick={() => navigate("/users")}>
        <span className="btnText">Volver</span>
      </button>
    </div>
  );
};
