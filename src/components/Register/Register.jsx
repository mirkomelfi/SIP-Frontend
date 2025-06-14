import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useAlert } from "../../context/AlertContext";

export const Register = () => {
  const datForm = useRef();
  const navigate = useNavigate();
  const { tokenState } = useUser(); 
  const { showAlert } = useAlert();

  const consultarForm = async (e) => {
    e.preventDefault();

    const datosFormulario = new FormData(datForm.current);
    const cliente = Object.fromEntries(datosFormulario);

    if (!cliente.username || !cliente.password) {
      showAlert("Faltan datos", "error");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenState}`,
        },
        body: JSON.stringify(cliente),
      });

      const data = await response.json();
      if (response.ok) {
        showAlert(data.msj || "Usuario creado con éxito", "success");
        e.target.reset();
      } else {
        showAlert(data.msj || "Error al registrar", "error");
      }
    } catch (err) {
      console.error(err);
      showAlert("Error al conectar con el servidor", "error");
    }
  };

  return (
    <div>
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

      <button className="button btnPrimary" onClick={() => navigate("/users")}>
        <span className="btnText">Volver</span>
      </button>
    </div>
  );
};
