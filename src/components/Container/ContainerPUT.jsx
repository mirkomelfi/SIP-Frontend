import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";
import NavigateBackButton from "../../utils/NavigateBackButton/NavigateBackButton";


export const ContainerPut = () => {
  const { idSec, idCont } = useParams();
  const [mensaje, setMensaje] = useState(null);
  const datForm = useRef();
  const navigate = useNavigate();
  const { tokenState, clearAuthData } = useUser();

  const consultarForm = async (e) => {
    e.preventDefault();
    const datosFormulario = new FormData(datForm.current);
    const container = Object.fromEntries(datosFormulario);

    if (!container.name && !container.description) {
      setMensaje("No se ingresaron valores para actualizar");
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

      if (response.status === 401) {
        clearAuthData();
        navigate("/login");
        return;
      }

      const data = await response.json();
      setMensaje(data.msj || "Container actualizado correctamente.");
      e.target.reset();
    } catch (err) {
      setMensaje("Error al conectar con el servidor.");
    }
  };

  const navigateTo = (url) => navigate(url);

  return (
    <div>
      {!mensaje ? (
        <div className="container divForm">
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
            <button type="submit" className="button btnPrimary"><span className="btnText">Actualizar</span></button>
          </form>
        </div>
      ) : (
        <Mensaje msj={mensaje} />
      )}
      <NavigateBackButton/>
    </div>
  );
};