import { useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import NavigateBackButton from "../../utils/NavigateBackButton/NavigateBackButton";
import { useAlert } from "../../context/AlertContext";

export const ContainerPost = () => {
  const { idSec } = useParams();
  const datForm = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const { tokenState, rol, clearAuthData } = useUser();
  const { showAlert } = useAlert();

  const consultarForm = async (e) => {
    e.preventDefault();

    const datosFormulario = new FormData(datForm.current);
    const container = Object.fromEntries(datosFormulario);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_DOMINIO_BACK}/admin/sector/${idSec}/containers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenState}`,
          },
          body: JSON.stringify(container),
        }
      );

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          clearAuthData();
          navigate("/login", { state: { from: location.pathname } });
        } else {
          const errorData = await response.json();
          showAlert(errorData.msj || "Error al crear el contenedor.","error");
        }
        return;
      }

      showAlert("Contenedor creado exitosamente.","success");
      navigate(location.state?.from || "/");
    } catch (error) {
      console.error("Error al crear el contenedor:", error);
      showAlert("Error al conectar con el servidor.","error");
    }

    e.target.reset();
  };

  if (rol === "ROL_USER") {
    showAlert("No tiene permisos para crear contenedores.","error");
    navigate(location.state?.from || "/");
    return null;
  }

  return (
    <div className="container divForm">
      <NavigateBackButton />
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
