import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useAlert } from "../../context/AlertContext";
import NavigateBackButton from "../../utils/NavigateBackButton/NavigateBackButton";

const ImagenPost = () => {
  const { idItem } = useParams();
  const datForm = useRef();
  const navigate = useNavigate();
  const { tokenState, clearAuthData } = useUser();
  const { showAlert } = useAlert();

  const consultarForm = async (e) => {
    e.preventDefault();

    const datosFormulario = new FormData(datForm.current);
    const imagen = Object.fromEntries(datosFormulario);

    const formData = new FormData();
    formData.append("archivo", imagen.imagen);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_DOMINIO_BACK}/items/${idItem}/updateImage`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${tokenState}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        clearAuthData();
        showAlert("Sesión expirada. Inicie sesión nuevamente.", "error");
        navigate("/login");
      } else if (data.msj) {
        showAlert(data.msj, "success");
        navigate(`/items/${idItem}`);
      } else {
        showAlert("Imagen cargada exitosamente", "success");
        navigate(`/items/${idItem}`);
      }
    } catch (error) {
      console.error("Error al cargar imagen:", error);
      showAlert("Error al conectar con el servidor", "error");
    }

    e.target.reset();
  };

  return (
    <div className="container divForm">
      <h2>Cargado de Imagen</h2>
      <form onSubmit={consultarForm} ref={datForm}>
        <div className="mb-3">
          <label htmlFor="imagen" className="form-label">
            Imagen
          </label>
          <input type="file" className="form-control" name="imagen" required />
        </div>

        <button type="submit" className="btn-red">
          Cargar imagen
        </button>
      </form>

      <NavigateBackButton />
    </div>
  );
};

export default ImagenPost;
