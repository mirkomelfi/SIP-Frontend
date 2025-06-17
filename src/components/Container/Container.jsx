import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { CodigoQR } from "../CodigoQR/CodigoQR";
import { useUser } from "../../context/UserContext";
import { useAlert } from "../../context/AlertContext";
import NavigateBackButton from "../../utils/NavigateBackButton/NavigateBackButton";

const Container = ({ fromItem, fromLocation }) => {
  const { idSec, idCont, idItem } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { tokenState, rol, clearAuthData } = useUser();
  const { showAlert } = useAlert();

  const [container, setContainer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qr, setQr] = useState(false);

  const generarQr = () => setQr(true);

  const ejecutarFetch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/containers/${idCont}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenState}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          clearAuthData();
          navigate("/login", { state: { from: location.pathname } });
        } else {
          showAlert("Error al obtener contenedor", "error");
        }
        return;
      }

      const data = await response.json();
      if (data.msj) {
        showAlert(data.msj, "error");
      } else {
        setContainer(data);
      }
    } catch (err) {
      console.error(err);
      showAlert("Error al cargar el contenedor.", "error");
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

    if (!response.ok) {
      if (response.status === 401) {
        clearAuthData();
        navigate("/login");
      } else {
        showAlert("No se pudo eliminar el contenedor", "error");
      }
      return;
    }

    const data = await response.json();
    if (data.msj) showAlert(data.msj, "success");
    navigate(-1)
  };

  const changeLocation = async () => {
    const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/items/${idItem}/newLocation/${idCont}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenState}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        clearAuthData();
        navigate("/login");
      } else {
        showAlert("No se pudo cambiar la ubicación", "error");
      }
      return;
    }

    const data = await response.json();
    showAlert(data.msj, "success");
    navigate(-2)
  };

  useEffect(() => {
    ejecutarFetch();
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <>
      {!qr ? (
        <div className="tarjetaProducto tarjetaById">
          <h1>Container N°{container.id}</h1>
          <h2>Nombre: {container.name}</h2>
          <h2>Descripción: {container.description}</h2>
          <h2>Se encuentra en sector: {container.sectorID}</h2>

          {!fromLocation ? (
            idSec ? (
              <div className="accionesGrid">
                <button className="button btnPrimary" onClick={() => navigate("items", { state: { from: location.pathname } })}>
                  <span className="btnText">Ver items</span>
                </button>
                {rol === "ROL_ADMIN" && (
                  <>
                    <button className="button btnPrimary" onClick={() => navigate("updateContainer", { state: { from: location.pathname } })}>
                      <span className="btnText">Modificar</span>
                    </button>
                  </>
                )}
                <button className="button btnPrimary" onClick={generarQr}>
                  <span className="btnText">Generar QR</span>
                </button>
                {rol === "ROL_ADMIN" && (
                  <button className="button btnPrimary danger" onClick={eliminar}>
                    <span className="btnText">Eliminar</span>
                  </button>
                )}
              </div>
            ) : (
              <button className="button btnPrimary" onClick={() => navigate(`sectors/${container.sectorID}`, { state: { from: location.pathname } })}>
                <span className="btnText">Ver sector</span>
              </button>
            )
          ) : (
            <button onClick={changeLocation} className="button btnPrimary">
              <span className="btnText">Seleccionar contenedor</span>
            </button>
          )}
        </div>
      ) : (
        <CodigoQR url={window.location.href} />
      )}

      <NavigateBackButton
        fallback={
          fromItem
            ? `/items/${idItem}`
            : fromLocation
            ? `/items/${idItem}/locationChange`
            : `/sectors/${container.sectorID}/containers`
        }
      />
    </>
  );
};

export { Container };
