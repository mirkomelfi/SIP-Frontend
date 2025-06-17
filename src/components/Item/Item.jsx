import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useAlert } from "../../context/AlertContext";
import { Location } from "../Location/Location";
import { CodigoQR } from "../CodigoQR/CodigoQR";
import NavigateBackButton from "../../utils/NavigateBackButton/NavigateBackButton";

const Item = ({ fromSector }) => {
  const { idSec, idCont, idItem } = useParams();
  const { tokenState,rol } = useUser();
  const { showAlert } = useAlert();

  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState(null);
  const [qr, setQr] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const tieneContenedor = Number(item.containerID) > 0;

  const generarQr = () => setQr(true);
  const verLocations = () => setLocations(true);
  const navigateTo = (url) => navigate(url);

  const ejecutarFetch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/items/${idItem}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenState}`,
        },
      });

      const data = await response.json();

      if (!response.ok || data.msj) {
        showAlert(data.msj || "Error al obtener el item", "error");
        return;
      }

      setItem(data);
    } catch (error) {
      console.error(error);
      showAlert("Error de conexión con el servidor", "error");
    } finally {
      setLoading(false);
    }
  };

  const eliminar = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/items/${idItem}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenState}`,
        },
      });

      const data = await response.json();
      showAlert(data.msj || "Item eliminado correctamente", "success");
      navigate(-1)
    } catch (error) {
      showAlert("Error al intentar eliminar el item", "error");
    }
  };

  useEffect(() => {
    ejecutarFetch();
  }, []);

  return (
    <>
      {!locations ? (
        !qr ? (
          <div className="tarjetaProducto tarjetaById">
            <h1>Item N°{item.id}</h1>

            {loading ? (
              <p>Cargando...</p>
            ) : (
              <>
                <h2>Nombre: {item.name}</h2>
                {item.image && (
                  <img
                    src={`data:image/jpeg;base64,${item.image.imageData}`}
                    alt="Imagen del item"
                  />
                )}
                <h2>Descripción: {item.description}</h2>
                <h2>
                  {tieneContenedor
                    ? `Se encuentra en contenedor: ${item.containerID}`
                    : "No se encuentra en ningún contenedor"}
                </h2>

                <div className="accionesGrid">
                  <button className="button btnPrimary" onClick={() => navigateTo(`/addImage/${item.id}`)}>
                    <span className="btnText">{item.image ? "Modificar imagen" : "Agregar imagen"}</span>
                  </button>

                  <button className="button btnPrimary" onClick={() => navigateTo(`updateItem`)}>
                    <span className="btnText">Modificar Item</span>
                  </button>

                  <button className="button btnPrimary" onClick={verLocations}>
                    <span className="btnText">Historial de Locations</span>
                  </button>

                  {tieneContenedor && !idSec && (
                    <button className="button btnPrimary" onClick={() => navigateTo(`containers/${item.containerID}`)}>
                      <span className="btnText">Ver contenedor</span>
                    </button>
                  )}

                  {!idSec && (
                    <button className="button btnPrimary" onClick={() => navigateTo(`locationChange`)}>
                      <span className="btnText">
                        {tieneContenedor ? "Cambiar contenedor" : "Asignar contenedor"}
                      </span>
                    </button>
                  )}

                  <button className="button btnPrimary" onClick={generarQr}>
                    <span className="btnText">Generar QR</span>
                  </button>

                  {rol!=="ROL_USER"&&
                  <button className="button btnPrimary danger" onClick={eliminar}>
                    <span className="btnText">Eliminar</span>
                  </button>}
                </div>
              </>
            )}
          </div>
        ) : (
          <CodigoQR url={window.location.href} />
        )
      ) : (
        <Location item={item} />
      )}

      <NavigateBackButton
        to={
          idSec
            ? `/sectors/${idSec}/containers/${idCont}/items`
            : "/items"
        }
      />
    </>
  );
};

export { Item };
