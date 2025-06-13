import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";

export const SectorPost = () => {
  const [mensaje, setMensaje] = useState(null);
  const datForm = useRef();
  const navigate = useNavigate();

  const { tokenState, rol } = useUser();

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

      const data = await response.json();
      setMensaje(data.msj || "Sector creado con éxito.");
    } catch (error) {
      setMensaje("Error al conectar con el servidor.");
    }

    e.target.reset();
  };

  return (
    <div>
      {!mensaje ? (
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
      ) : (
        <Mensaje msj={mensaje} />
      )}
      <button className="button btnPrimary" onClick={() => navigate(-1)}>
        <span className="btnText">Volver</span>
      </button>
    </div>
  );
};
