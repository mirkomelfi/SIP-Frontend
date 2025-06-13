// Item.jsx
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { Mensaje } from "../Mensaje/Mensaje";
import { Location } from "../Location/Location";
import { CodigoQR } from "../CodigoQR/CodigoQR";

const Item = ({ fromSector, id }) => {
  const { idSec, idCont, idItem } = useParams();
  const { token, rol } = useUser;
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);
  const [locations, setLocations] = useState(null);
  const [qr, setQr] = useState(false);
  const navigate = useNavigate();

  const generarQr = () => setQr(true);

  const ejecutarFetch = async () => {
    const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/items/${idItem}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.msj) setMensaje(data.msj);
    else setItem(data);
  };

  const eliminar = async () => {
    const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/items/${idItem}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.msj) setMensaje(data.msj);
  };

  const verLocations = () => setLocations(true);
  const navigateTo = (url) => navigate(url);

  useEffect(() => {
    ejecutarFetch().catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <>
      {!locations ? (
        !qr ? (
          <div className="tarjetaProducto">
            <h1>Item N°{item.id}</h1>
            {!mensaje ? (
              <>
                <h2>Nombre: {item.name}</h2>
                {item.image && <img src={`data:image/jpeg;base64,${item.image.imageData}`} alt="" />}
                <h2>Descripcion: {item.description}</h2>
                {item.containerID ? (
                  <h2>Se encuentra en contenedor: {item.containerID}</h2>
                ) : (
                  <h2>No se encuentra en ningun contenedor</h2>
                )}

                <button className="button btnPrimary" onClick={() => navigateTo(`/addImage/${item.id}`)}>
                  <span className="btnText">{item.image ? "Modificar imagen" : "Agregar imagen"}</span>
                </button>

                <button className="button btnPrimary" onClick={() => navigateTo(`updateItem`)}>
                  <span className="btnText">Modificar Item</span>
                </button>

                <button className="button btnPrimary" onClick={() => verLocations()}>
                  <span className="btnText">Historial de Locations</span>
                </button>

                {item.containerID && !idSec && (
                  <button className="button btnPrimary" onClick={() => navigateTo(`containers/${item.containerID}`)}>
                    <span className="btnText">Ver contenedor</span>
                  </button>
                )}

                <button className="button btnPrimary" onClick={() => navigateTo(`locationChange`)}>
                  <span className="btnText">
                    {item.containerID ? (!idSec ? "Cambiar contenedor" : null) : "Asignar contenedor"}
                  </span>
                </button>

                <button className="button btnPrimary" onClick={generarQr}>
                  <span className="btnText">Generar QR</span>
                </button>

                <button className="button btnPrimary" onClick={eliminar}>
                  <span className="btnText">Eliminar</span>
                </button>
              </>
            ) : (
              <Mensaje msj={mensaje} />
            )}
          </div>
        ) : (
          <CodigoQR url={window.location.href} />
        )
      ) : (
        <Location item={item} />
      )}

      <>
        {idSec ? (
          <button className="button btnPrimary" onClick={() => navigateTo(`/sectors/${idSec}/containers/${idCont}/items`)}>
            <span className="btnText">Volver</span>
          </button>
        ) : (
          <button className="button btnPrimary" onClick={() => navigateTo(`/items`)}>
            <span className="btnText">Volver</span>
          </button>
        )}
      </>
    </>
  );
};

export { Item };
