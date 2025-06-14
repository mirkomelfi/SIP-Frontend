import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useAlert } from "../../context/AlertContext";

export const SectorPut = () => {
  const { idSec } = useParams();
  const datForm = useRef();
  const navigate = useNavigate();

  const { tokenState, rol } = useUser();
  const { showAlert } = useAlert();

  const consultarForm = async (e) => {
    e.preventDefault();

    const datosFormulario = new FormData(datForm.current);
    const sector = Object.fromEntries(datosFormulario);

    // Convertir campos vacíos a null
    if (sector.name === "") sector.name = null;
    if (sector.description === "") sector.description = null;

    if (!sector.name && !sector.description) {
      showAlert("No se ingresaron valores para actualizar", "info");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_DOMINIO_BACK}/admin/sectors/${idSec}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenState}`,
          },
          body: JSON.stringify(sector),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        showAlert(data.msj || "Error al actualizar el sector", "error");
        return;
      }

      const data = await response.json();
      showAlert(data.msj || "Sector actualizado correctamente", "success");
    } catch (error) {
      showAlert("Error al conectar con el servidor.", "error");
    }

    e.target.reset();
  };

  return (
    <div>
      <div className="container divForm">
        <h2>Cambio en los datos del Sector</h2>
        <h3>Ingrese solo los campos que desea modificar</h3>
        <form onSubmit={consultarForm} ref={datForm}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Ingrese el nuevo nombre"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Descripción</label>
            <input
              type="text"
              className="form-control"
              name="description"
              placeholder="Ingrese la nueva descripción"
            />
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
