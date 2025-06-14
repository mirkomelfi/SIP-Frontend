import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ItemListContainer from "../ItemListContainer/ItemListContainer";
import CreateButton from "../../utils/CreateButton/CreateButton";
import "./Item.css";

export const ItemFilter = () => {
  const datForm = useRef();
  const navigate = useNavigate();

  const consultarForm = (e) => {
    e.preventDefault();
    const datosFormulario = new FormData(datForm.current);
    const item = Object.fromEntries(datosFormulario);

    if (item.query === "") {
      navigate("/search",{state:{from:"/",query:" "}})
    } else {
      navigate("/search",{state:{from:"/",query:item.query}})
    }

    e.target.reset();
  };

  return (
    <div>
          <div className="container divForm">
            <h2>Listado de Items</h2>
            <form onSubmit={consultarForm} ref={datForm}>
              <div className="mb-3">
                <label htmlFor="query" className="form-label">Nombre/Descripcion</label>
                <input type="text" className="form-control" name="query" />
              </div>
              <button type="submit" className="button btnPrimary">
                Buscar
              </button>
            </form>
          </div>
          <CreateButton onClick={() => navigate("/items/create",{state:{from:"/"}})} />
    </div>
  );
};
