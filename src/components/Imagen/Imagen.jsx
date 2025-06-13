import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";

const Imagen = () => {
  const { id } = useParams();
  const [mensaje, setMensaje] = useState(null);
  const [bytes, setBytes] = useState(null);
  const [num, setNum] = useState(1);

  const { tokenState, clearAuthData } = useUser();

  const siguienteImg = () => {
    setNum(num + 1);
  };

  const eliminarImg = async () => {
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
    setMensaje(data.msj);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_DOMINIO_BACK}/reclamos/${id}/imagenes/${num}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenState}`,
      },
    })
      .then((response) => {
        if (response.status === 401 || response.status === 403) throw new Error("Unauthorized");
        return response.json();
      })
      .then((data) => {
        if (data.msj) {
          setMensaje(data.msj);
        } else {
          setBytes(data.datosImagen);
        }
      })
      .catch((error) => {
        if (error.message === "Unauthorized") clearAuthData();
        else console.error(error);
      });
  }, [num]);

  return (
    <>
      {!mensaje ? (
        <div className="tarjetaProducto">
          <h1>Imagen N°{num}</h1>
          <img src={`data:image/jpeg;base64,${bytes}`} alt="Imagen cargada" />
          <button onClick={eliminarImg} className="btn-red">Eliminar imagen</button>
          <button onClick={siguienteImg} className="btn-red">Siguiente imagen</button>
        </div>
      ) : (
        <Mensaje msj={mensaje} />
      )}
      <Link to="/reclamos">Volver</Link>
    </>
  );
};

export { Imagen };
