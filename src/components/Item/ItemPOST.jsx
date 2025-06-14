import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useAlert } from "../../context/AlertContext"; // ✅
import "./Item.css";

export const ItemPost = ({ fromFilter }) => {
  const { tokenState } = useUser();
  const { idCont } = useParams();
  const navigate = useNavigate();
  const datForm = useRef();
  const { showAlert } = useAlert(); // ✅

  const consultarForm = async (e) => {
    e.preventDefault();

    const datosFormulario = new FormData(datForm.current);
    const item = Object.fromEntries(datosFormulario);

    const url = idCont
      ? `${process.env.REACT_APP_DOMINIO_BACK}/containers/${idCont}/addItem`
      : `${process.env.REACT_APP_DOMINIO_BACK}/items`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenState}`,
        },
        body: JSON.stringify(item),
      });

      const data = await response.json();

      if (!response.ok || data.msj) {
        showAlert(data.msj || "No se pudo crear el ítem", "error"); // ✅
      } else {
        showAlert("Ítem creado exitosamente", "success"); // ✅
        navigate(-1); // volver inmediatamente
      }
    } catch (error) {
      console.error("Error al crear el ítem:", error);
      showAlert("Error al conectar con el servidor", "error"); // ✅
    }

    e.target.reset();
  };

  return (
    <div className="container divForm">
      <h2>Creación de Ítem</h2>
      <form onSubmit={consultarForm} ref={datForm}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input type="text" className="form-control" name="name" required />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descripción</label>
          <input type="text" className="form-control" name="description" required />
        </div>

        <div className="flex-div">
          <button
            type="button"
            className="button btnPrimary"
            onClick={() => navigate(-1)}
          >
            <span className="btnText">Cancelar</span>
          </button>
          <button type="submit" className="button btnPrimary">
            <span className="btnText">Crear</span>
          </button>
        </div>
      </form>
    </div>
  );
};
