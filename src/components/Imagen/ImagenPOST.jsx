import React, { useContext, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import {UserContext, useUser} from "../../context/UserContext"

const ImagenPost = () => {
  const { idItem } = useParams();
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();
  const datForm = useRef();

  const { tokenState, clearAuthData } = useUser()

  const consultarForm = async (e) => {
    e.preventDefault();

    const datosFormulario = new FormData(datForm.current);
    const imagen = Object.fromEntries(datosFormulario);

    let img = new FormData();
    img.append("archivo", imagen.imagen);

    const response = await fetch(
      `${process.env.REACT_APP_DOMINIO_BACK}/items/${idItem}/updateImage`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${tokenState}`,
        },
        body: img,
      }
    );

    if (response.status === 401 || response.status === 403) {
      clearAuthData();
      navigate("/login");
    } else {
      const data = await response.json();
      if (data.msj) {
        setMensaje(data.msj);
      }
    }

    e.target.reset();
  };

  const navigateTo = (url) => {
    navigate(url);
  };

  return (
    <div>
      {!mensaje ? (
        <div className="container divForm">
          <h2>Cargado de Imagen</h2>
          <form onSubmit={consultarForm} ref={datForm}>
            <div className="mb-3">
              <label htmlFor="imagen" className="form-label">
                Imagen
              </label>
              <input
                type="file"
                className="form-control"
                name="imagen"
                required
              />
            </div>

            <button type="submit" className="btn-red">
              Cargar imagen
            </button>
          </form>
        </div>
      ) : (
        <Mensaje msj={mensaje} />
      )}

      <button
        className="button btnPrimary"
        onClick={() => navigateTo(`/items/${idItem}`)}
      >
        <span className="btnText">Volver</span>
      </button>
    </div>
  );
};

export default ImagenPost;
