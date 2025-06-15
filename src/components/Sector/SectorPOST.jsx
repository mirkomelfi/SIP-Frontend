import { useRef } from "react";
import { useUser } from "../../context/UserContext";
import { useAlert } from "../../context/AlertContext";
import NavigateBackButton from "../../utils/NavigateBackButton/NavigateBackButton";

export const SectorPost = () => {
  const datForm = useRef();
  const { tokenState } = useUser();
  const { showAlert } = useAlert();

  const consultarForm = async (e) => {
    e.preventDefault();
    const datosFormulario = new FormData(datForm.current);
    const sector = Object.fromEntries(datosFormulario);

    try {
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/sectors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenState}`,
        },
        body: JSON.stringify(sector),
      });

      if (!response.ok) {
        const data = await response.json();
        showAlert(data.msj || "Error al crear el sector", "error");
        return;
      }

      const data = await response.json();
      showAlert(data.msj || "Sector creado con éxito.", "success");
    } catch (error) {
      showAlert("Error al conectar con el servidor.", "error");
    }

    e.target.reset();
  };

  return (
    <div>
      <div className="container divForm">
        <h2>Creación de Sector</h2>
        <form onSubmit={consultarForm} ref={datForm}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre</label>
            <input type="text" className="form-control" name="name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Descripción</label>
            <input type="text" className="form-control" name="description" required />
          </div>
          <button type="submit" className="button btnPrimary">
            <span className="btnText">Crear</span>
          </button>
        </form>
      </div>

      <NavigateBackButton />
    </div>
  );
};
