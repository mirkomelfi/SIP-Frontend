import "./Item.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useRef } from "react";
import { Mensaje } from "../Mensaje/Mensaje";
import ContainerListContainer from "../ContainerListContainer/ContainerListContainer";

const ItemLocation = () => {
  const { idItem } = useParams();
  const [mensaje, setMensaje] = useState(null);
  const [idCont, setIdCont] = useState(null);
  const [verContainers, setVerContainers] = useState(false);
  const datForm = useRef();
  const navigate = useNavigate();

  const consultarForm = (e) => {
    e.preventDefault();
    const datosFormulario = new FormData(datForm.current);
    const item = Object.fromEntries(datosFormulario);
    if (item.idCont) {
      setIdCont(item.idCont);
    }
    setVerContainers(true);
  };

  const navigateTo = (url) => {
    navigate(url);
  };

  if (mensaje) return <Mensaje msj={mensaje} />;

  return (
    <div>
      {!verContainers ? (
        <div className="container divForm">
          <h1>Cambio de ubicación del Item N°{idItem}</h1>
          <h2>
            Si no ingresa ningún contenedor, se mostrarán todos los disponibles
            para hacer el cambio.
          </h2>
          <form onSubmit={consultarForm} ref={datForm}>
            <div className="mb-3">
              <label htmlFor="idCont" className="form-label">
                ID del nuevo contenedor
              </label>
              <input type="text" className="form-control" name="idCont" />
            </div>
            <button type="submit" className="button btnPrimary">
              <span className="btnText">Ver contenedor/es</span>
            </button>
          </form>
          <button
            className="button btnPrimary"
            onClick={() => navigateTo(`/items/${idItem}`)}
          >
            <span className="btnText">Volver</span>
          </button>
        </div>
      ) : (
        <ContainerListContainer fromLoc={true} idContainer={idCont} idItem={idItem} />
      )}
    </div>
  );
};

export { ItemLocation };
