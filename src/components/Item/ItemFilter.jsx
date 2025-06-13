import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ItemListContainer from "../ItemListContainer/ItemListContainer";
import CreateButton from "../../utils/CreateButton/CreateButton";
import "./Item.css";

export const ItemFilter = () => {
  const [itemName, setItemName] = useState(null);
  const datForm = useRef();
  const navigate = useNavigate();

  const consultarForm = (e) => {
    e.preventDefault();
    const datosFormulario = new FormData(datForm.current);
    const item = Object.fromEntries(datosFormulario);

    if (item.query === "") {
      setItemName(" ");
    } else {
      setItemName(item.query);
    }

    e.target.reset();
  };

  const navigateTo = (url) => {
    navigate(url);
  };

  return (
    <div>
      {!itemName ? (
        <>
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
          <button className="button btnPrimary" onClick={() => navigateTo(`/`)}>
            <span className="btnText">Volver</span>
          </button>
          <CreateButton onClick={() => navigate("/items/create")} />
        </>
      ) : (
        <ItemListContainer filter={itemName} greeting="Listado de Items" />
      )}
    </div>
  );
};
