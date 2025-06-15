import "./Item.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useRef } from "react";
import ContainerListContainer from "../ContainerListContainer/ContainerListContainer";
import { useAlert } from "../../context/AlertContext";
import NavigateBackButton from "../../utils/NavigateBackButton/NavigateBackButton";

const ItemLocation = () => {
  const { idItem } = useParams();
  const [idCont, setIdCont] = useState(null);
  const [verContainers, setVerContainers] = useState(false);
  const datForm = useRef();
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const consultarForm = (e) => {
    e.preventDefault();
    const datosFormulario = new FormData(datForm.current);
    const item = Object.fromEntries(datosFormulario);
    const idContInput = item.idCont?.trim();

    if (idContInput && isNaN(idContInput)) {
      showAlert("El ID del contenedor debe ser numérico", "error");
      return;
    }

    setIdCont(idContInput);
    setVerContainers(true);
  };

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

          <NavigateBackButton />
        </div>
      ) : (
        <ContainerListContainer fromLoc={true} idContainer={idCont} idItem={idItem} />
      )}
    </div>
  );
};

export { ItemLocation };
