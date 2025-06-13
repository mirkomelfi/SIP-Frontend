// Sector.jsx
import "./Sector.css"; 
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser} from "../../context/UserContext";
import { Mensaje } from "../Mensaje/Mensaje";
import { CodigoQR } from "../CodigoQR/CodigoQR";

const Sector = ({ fromContainer }) => {
  const { idSec, idCont, idItem } = useParams();
  const [mensaje, setMensaje] = useState(null);
  const [sector, setSector] = useState();
  const [qr, setQr] = useState(undefined);
  const navigate = useNavigate();
  const { tokenState, user,rol } = useUser();
  const isAdmin = rol === "ROL_ADMIN";

  const generarQr = () => {
    setQr(true);
  };

  const ejecutarFetch = async () => {
    const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/sectors/${idSec}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tokenState}`,
      },
    });
    const data = await response.json();
    if (data.msj) {
      setMensaje(data.msj);
    } else {
      setSector(data);
    }
  };

  const eliminar = async () => {
    const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/sectors/${idSec}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tokenState}`,
      },
    });
    const data = await response.json();
    setMensaje(data.msj);
  };

  const navigateTo = (url) => {
    navigate(url);
  };

  useEffect(() => {
    ejecutarFetch().catch((error) => console.error(error));
  }, []);

  return (
    <>
      {!qr ? (
        <div className="tarjetaProducto-sec">
          <h1 className="titulo-sec">Sector N°{idSec}</h1>
          {!mensaje ? (
            <>
              {sector && (
                <div className="detalleSector-sec">
                  <p><strong>Nombre:</strong> {sector.name}</p>
                  <p><strong>Descripción:</strong> {sector.description}</p>
                </div>
              )}
              {!fromContainer && (
                <div className="accionesGrid-sec">
                  <button className="button-sec btnPrimary-sec" onClick={() => navigateTo("containers")}>Ver Contenedores</button>
                  {isAdmin && (
                    <button className="button-sec btnPrimary-sec" onClick={() => navigateTo(`/updateSector/${idSec}`)}>Modificar sector</button>
                  )}
                  <button className="button-sec btnPrimary-sec" onClick={generarQr}>Generar QR</button>
                  {isAdmin && (
                    <button className="button-sec btnPrimary-sec danger-sec" onClick={eliminar}>Eliminar</button>
                  )}
                </div>
              )}
            </>
          ) : (
            <Mensaje msj={mensaje} />
          )}
        </div>
      ) : (
        <CodigoQR url={window.location.href} />
      )}
      {!fromContainer ? (
        <button className="button btnPrimary" onClick={() => navigateTo(`/sectors`)}><span className="btnText">Volver</span></button>
      ) : (
        <button className="button btnPrimary" onClick={() => navigateTo(`/items/${idItem}/containers/${idCont}`)}><span className="btnText">Volver</span></button>
      )}
    </>
  );
};

export { Sector };
