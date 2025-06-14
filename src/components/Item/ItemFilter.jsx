import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../context/AlertContext"; // ✅
import CreateButton from "../../utils/CreateButton/CreateButton";
import "./Item.css";

export const ItemFilter = () => {
  const datForm = useRef();
  const navigate = useNavigate();
  const { showAlert } = useAlert(); // ✅

  const consultarForm = (e) => {
    e.preventDefault();
    const datosFormulario = new FormData(datForm.current);
    const item = Object.fromEntries(datosFormulario);

    if (!item.query || item.query.trim() === "") {
      showAlert("Debe ingresar un nombre o descripción para buscar", "error"); // ✅
      return;
    }

    navigate("/search", { state: { from: "/", query: item.query.trim() } });
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
