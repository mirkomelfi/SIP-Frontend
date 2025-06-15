import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { useAlert } from "../../context/AlertContext";
import NavigateBackButton from "../../utils/NavigateBackButton/NavigateBackButton";

const Imagen = () => {
  const { id } = useParams();
  const [bytes, setBytes] = useState(null);
  const [num, setNum] = useState(1);

  const { tokenState, clearAuthData } = useUser();
  const { showAlert } = useAlert();

  const siguienteImg = () => {
    setNum((prev) => prev + 1);
  };

  const eliminarImg = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DOMINIO_BACK}/reclamos/${id}/imagenes/${num}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenState}`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        showAlert(data.msj || "Error al eliminar imagen", "error");
      } else {
        showAlert(data.msj || "Imagen eliminada", "success");
        setBytes(null);
      }
    } catch (error) {
      console.error("Error al eliminar imagen:", error);
      showAlert("Error al conectar con el servidor", "error");
    }
  };

  useEffect(() => {
    const fetchImg = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/reclamos/${id}/imagenes/${num}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenState}`,
          },
        });

        if (response.status === 401 || response.status === 403) {
          clearAuthData();
          showAlert("Sesión expirada o sin permisos", "error");
          return;
        }

        const data = await response.json();

        if (data.msj) {
          setBytes(null);
          showAlert(data.msj, "info");
        } else {
          setBytes(data.datosImagen);
        }
      } catch (error) {
        console.error("Error al obtener imagen:", error);
        showAlert("No se pudo cargar la imagen", "error");
      }
    };

    fetchImg();
  }, [num, id, tokenState, clearAuthData, showAlert]);

  return (
    <div className="tarjetaProducto">
      <h1>Imagen N°{num}</h1>

      {bytes ? (
        <img src={`data:image/jpeg;base64,${bytes}`} alt={`Imagen N°${num}`} />
      ) : (
        <p>No hay imagen para mostrar</p>
      )}

      <button onClick={eliminarImg} className="btn-red">Eliminar imagen</button>
      <button onClick={siguienteImg} className="btn-red">Siguiente imagen</button>

      <NavigateBackButton />
    </div>
  );
};

export { Imagen };
