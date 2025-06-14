import "./Container.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Mensaje } from "../Mensaje/Mensaje";
import { CodigoQR } from "../CodigoQR/CodigoQR";
import { useUser } from "../../context/UserContext";

const Container = ({ fromItem, fromLocation }) => {
  const { idSec, idCont, idItem } = useParams();
  const navigate = useNavigate();
  const actualLocation = window.location.href;

  const [container, setContainer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);
  const [qr, setQr] = useState(false);

  const { tokenState, rol, clearAuthData } = useUser();

  const generarQr = () => {
    setQr(true);
  };

  const ejecutarFetch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/containers/${idCont}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenState}`,
        },
      });

      if (response.status === 401) {
        clearAuthData();
        navigate("/login", { state: { from: actualLocation } });
        return;
      }

      const data = await response.json();
      if (data.msj) {
        setMensaje(data.msj);
      } else {
        setContainer(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const eliminar = async () => {
    const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/containers/${idCont}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenState}`,
      },
    });

    if (response.status === 401) {
      clearAuthData();
      navigate("/login");
      return;
    }

    const data = await response.json();
    if (data.msj) {
      setMensaje(data.msj);
    }
  };

  const changeLocation = async () => {
    const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/items/${idItem}/newLocation/${idCont}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenState}`,
      },
    });

    if (response.status === 401) {
      clearAuthData();
      navigate("/login");
      return;
    }

    const data = await response.json();
    setMensaje(data.msj);
  };

  useEffect(() => {
    ejecutarFetch();
  }, []);

  return (
    <>
      {!qr ? (
        <div className="tarjetaProducto">
          <h1>Container N°{container.id}</h1>
          {!mensaje ? (
            <>
              <h2>Nombre: {container.name}</h2>
              <h2>Descripcion: {container.description}</h2>
              <h2>Se encuentra en sector: {container.sectorID}</h2>

              {!fromLocation ? (
                idSec ? (
                  <>
                    <button className="button btnPrimary" onClick={() => navigate(`items`,{state:{from:`/sectors/${idSec}/containers/${idCont}`}})}>
                      <span className="btnText">Ver items</span>
                    </button>
                    {rol === "ROL_ADMIN" && (
                      <>
                        <button className="button btnPrimary" onClick={() => navigate(`updateContainer`,{state:{from:`/sectors/${idSec}/containers/${idCont}`}})}>
                          <span className="btnText">Modificar</span>
                        </button>
                        <button className="button btnPrimary danger" onClick={eliminar}>
                          <span className="btnText">Eliminar</span>
                        </button>
                      </>
                    )}
                    <button className="button btnPrimary" onClick={generarQr}>
                      <span className="btnText">Generar QR</span>
                    </button>
                  </>
                ) : (
                  <button className="button btnPrimary" onClick={() => navigate(`sectors/${container.sectorID}`,{state:{from:`/sectors/${idSec}/containers/${idCont}`}})}>
                    <span className="btnText">Ver sector</span>
                  </button>
                )
              ) : (
                <button onClick={changeLocation} className="button btnPrimary">
                  <span className="btnText">Seleccionar contenedor</span>
                </button>
              )}
            </>
          ) : (
            <Mensaje msj={mensaje} />
          )}
        </div>
      ) : (
        <CodigoQR url={window.location.href} />
      )}

      {!fromItem && !fromLocation ? (
        <button
          className="button btnPrimary"
          onClick={() => navigate(`/sectors/${container.sectorID}/containers`,{state:{from:`/sectors/${idSec}/containers/${idCont}`}})}
        >
          <span className="btnText">Volver</span>
        </button>
      ) : (
        <button
          className="button btnPrimary"
          onClick={() => navigate(`/items/${idItem}/locationChange`,{state:{from:`/sectors/${idSec}/containers/${idCont}`}})}
        >
          <span className="btnText">Volver</span>
        </button>
      )}
    </>
  );
};

export { Container };
