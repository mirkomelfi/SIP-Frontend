import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../context/AlertContext";
import CreateButton from "../../utils/CreateButton/CreateButton";
import "./Item.css";

export const ItemFilter = () => {
  const datForm = useRef();
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const consultarForm = (e) => {
    e.preventDefault();
    const datosFormulario = new FormData(datForm.current);
    const item = Object.fromEntries(datosFormulario);
    const query = item.query?.trim();

    // Si no hay nada ingresado, se busca igual con un espacio, como en la versión original
    if (!query) {
      showAlert("Buscando todos los items...", "info"); // opcional: podés comentar esta línea si no querés mostrar nada
      navigate("/search", { state: { from: "/", query: " " } });
    } else {
      navigate("/search", { state: { from: "/", query } });
    }

    e.target.reset();
  };

  return (
    <div>
      <div className="container divForm">
        <h2>Listado de Items</h2>
        <form onSubmit={consultarForm} ref={datForm}>
          <div className="mb-3">
            <label htmlFor="query" className="form-label">Nombre/Descripción</label>
            <input type="text" className="form-control" name="query" />
          </div>
          <button type="submit" className="button btnPrimary">
            Buscar
          </button>
        </form>
      </div>
      <CreateButton onClick={() => navigate("/items/create", { state: { from: "/" } })} />
    </div>
  );
};
