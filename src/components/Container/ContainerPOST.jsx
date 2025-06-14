import { useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";
import NavigateBackButton from "../../utils/NavigateBackButton/NavigateBackButton";

export const ContainerPost = () => {
  const { idSec } = useParams();
  const datForm = useRef();
  const navigate = useNavigate();
  const { tokenState, rol, clearAuthData } = useUser();
  const location = useLocation();
  const consultarForm = async (e) => {
    e.preventDefault();

    const datosFormulario = new FormData(datForm.current);
    const container = Object.fromEntries(datosFormulario);

    const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/sector/${idSec}/containers`, {
      method: "POST",
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

    if (data.msj) {
      alert(data.msj)
      navigate(location.state?.from || "/")
    }

    e.target.reset();
  };

  if (rol === "ROL_USER") {
    return <Mensaje msj="No tiene permisos para crear contenedores." />;
  }

  return (
    <div className="container divForm">
          <NavigateBackButton/>
          <h2>Creación de Contenedor</h2>
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
  );
};
