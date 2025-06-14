import { useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import NavigateBackButton from "../../utils/NavigateBackButton/NavigateBackButton";
import { useAlert } from "../../context/AlertContext";

export const ContainerPut = () => {
  const { idCont } = useParams();
  const datForm = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const { tokenState, clearAuthData } = useUser();
  const { showSuccess, showError } = useAlert();

  const consultarForm = async (e) => {
    e.preventDefault();
    const datosFormulario = new FormData(datForm.current);
    const container = Object.fromEntries(datosFormulario);

    if (!container.name && !container.description) {
      showError("No se ingresaron valores para actualizar");
      return;
    }

    if (container.name === "") container.name = null;
    if (container.description === "") container.description = null;

    try {
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/containers/${idCont}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenState}`,
        },
        body: JSON.stringify(container),
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          clearAuthData();
          navigate("/login", { state: { from: location.pathname } });
        } else {
          const errorData = await response.json();
          showError(errorData.msj || "Error al actualizar el contenedor.");
        }
        return;
      }

      showSuccess("Contenedor actualizado correctamente.");
      navigate(location.state?.from || "/");

    } catch (err) {
      console.error("Error:", err);
      showError("Error al conectar con el servidor.");
    }

    e.target.reset();
  };

  return (
    <div className="container divForm">
      <NavigateBackButton />
      <h2>Cambio en los datos del Container</h2>
      <h3>Ingrese solo los campos que desea modificar</h3>
      <form onSubmit={consultarForm} ref={datForm}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input type="text" className="form-control" name="name" placeholder="Ingrese el nuevo nombre" />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descripción</label>
          <input type="text" className="form-control" name="description" placeholder="Ingrese la nueva descripción" />
        </div>
        <button type="submit" className="button btnPrimary">
          <span className="btnText">Actualizar</span>
        </button>
      </form>
    </div>
  );
};
