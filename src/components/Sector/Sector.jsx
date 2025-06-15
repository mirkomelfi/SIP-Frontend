import "./Sector.css"; 
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { CodigoQR } from "../CodigoQR/CodigoQR";
import { useAlert } from "../../context/AlertContext";

const Sector = ({ fromContainer }) => {
  const { idSec, idCont, idItem } = useParams();
  const [sector, setSector] = useState();
  const [qr, setQr] = useState(undefined);
  const navigate = useNavigate();
  const { tokenState, user, rol } = useUser();
  const { showAlert } = useAlert();
  const isAdmin = rol === "ROL_ADMIN";

  const generarQr = () => {
    setQr(true);
  };

  const ejecutarFetch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/sectors/${idSec}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenState}`,
        },
      });

      const data = await response.json();
      if (data.msj) {
        showAlert(data.msj, "error");
      } else {
        setSector(data);
      }
    } catch (error) {
      console.error("Error al obtener sector:", error);
      showAlert("Error al conectar con el servidor", "error");
    }
  };

  const eliminar = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/sectors/${idSec}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenState}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        showAlert(data.msj || "Error al eliminar el sector", "error");
        return;
      }

      const data = await response.json();
      showAlert(data.msj || "Sector eliminado correctamente", "success");
      navigate("/sectors");
    } catch (error) {
      console.error("Error al eliminar sector:", error);
      showAlert("Error al conectar con el servidor", "error");
    }
  };

  const navigateTo = (url) => {
    navigate(url);
  };

  useEffect(() => {
    ejecutarFetch().catch((error) => {
      console.error(error);
      showAlert("Error al cargar sector", "error");
    });
  }, []);

  return (
    <>
      {!qr ? (
        <div className="tarjetaProducto tarjetaById">
          <h1 className="titulo">Sector N°{idSec}</h1>
          {sector && (
            <>
              <div className="detalleSector">
                <p><strong>Nombre:</strong> {sector.name}</p>
                <p><strong>Descripción:</strong> {sector.description}</p>
              </div>

              {!fromContainer && (
                <div className="accionesGrid">
                  <button className="button btnPrimary" onClick={() => navigateTo("containers")}>Ver Contenedores</button>
                  {isAdmin && (
                    <button className="button btnPrimary" onClick={() => navigateTo(`/updateSector/${idSec}`)}>Modificar sector</button>
                  )}
                  <button className="button btnPrimary" onClick={generarQr}>Generar QR</button>
                  {isAdmin && (
                    <button className="button btnPrimary danger" onClick={eliminar}>Eliminar</button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <CodigoQR url={window.location.href} />
      )}

      {!fromContainer ? (
        <button className="button btnPrimary" onClick={() => navigateTo(`/sectors`)}>
          <span className="btnText">Volver</span>
        </button>
      ) : (
        <button className="button btnPrimary" onClick={() => navigateTo(`/items/${idItem}/containers/${idCont}`)}>
          <span className="btnText">Volver</span>
        </button>
      )}
    </>
  );
};

export { Sector };
