import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useAlert } from "../../context/AlertContext"; // nuevo
import { Location } from "../Location/Location";
import { CodigoQR } from "../CodigoQR/CodigoQR";

const Item = ({ fromSector }) => {
  const { idSec, idCont, idItem } = useParams();
  const { tokenState, rol } = useUser();
  const { showAlert } = useAlert(); // nuevo

  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState(null);
  const [qr, setQr] = useState(false);
  const navigate = useNavigate();

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

      if (!response.ok) {
        const data = await response.json();
        showAlert(data.msj || "Error al obtener el item", "error");
        return;
      }

      const data = await response.json();
      if (data.msj) {
        showAlert(data.msj, "error");
      } else {
        setItem(data);
      }
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
          <div className="tarjetaProducto">
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
                {item.containerID ? (
                  <h2>Se encuentra en contenedor: {item.containerID}</h2>
                ) : (
                  <h2>No se encuentra en ningún contenedor</h2>
                )}

                <button
                  className="button btnPrimary"
                  onClick={() => navigateTo(`/addImage/${item.id}`)}
                >
                  <span className="btnText">
                    {item.image ? "Modificar imagen" : "Agregar imagen"}
                  </span>
                </button>

                <button
                  className="button btnPrimary"
                  onClick={() => navigateTo(`updateItem`)}
                >
                  <span className="btnText">Modificar Item</span>
                </button>

                <button className="button btnPrimary" onClick={verLocations}>
                  <span className="btnText">Historial de Locations</span>
                </button>

                {item.containerID && !idSec && (
                  <button
                    className="button btnPrimary"
                    onClick={() => navigateTo(`containers/${item.containerID}`)}
                  >
                    <span className="btnText">Ver contenedor</span>
                  </button>
                )}

                <button className="button btnPrimary" onClick={() => navigateTo(`locationChange`)}>
                  <span className="btnText">
                    {item.containerID
                      ? !idSec
                        ? "Cambiar contenedor"
                        : null
                      : "Asignar contenedor"}
                  </span>
                </button>

                <button className="button btnPrimary" onClick={generarQr}>
                  <span className="btnText">Generar QR</span>
                </button>

                <button className="button btnPrimary danger" onClick={eliminar}>
                  <span className="btnText">Eliminar</span>
                </button>
              </>
            )}
          </div>
        ) : (
          <CodigoQR url={window.location.href} />
        )
      ) : (
        <Location item={item} />
      )}

      <button
        className="button btnPrimary"
        onClick={() =>
          idSec
            ? navigateTo(`/sectors/${idSec}/containers/${idCont}/items`)
            : navigateTo(`/items`)
        }
      >
        <span className="btnText">Volver</span>
      </button>
    </>
  );
};

export { Item };
