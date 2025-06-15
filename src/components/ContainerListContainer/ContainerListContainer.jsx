import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContainerList } from "../ContainerList/ContainerList";
import CreateButton from "../../utils/CreateButton/CreateButton";
import { useUser } from "../../context/UserContext";
import { useAlert } from "../../context/AlertContext";
import NavigateBackButton from "../../utils/NavigateBackButton/NavigateBackButton"; // ✅

const ContainerListContainer = ({ fromLoc, greeting, idContainer, idItem }) => {
  const { idSec } = useParams();
  const [listaContainers, setListaContainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [add, setAdd] = useState(false);
  const navigate = useNavigate();

  const { tokenState, rol, clearAuthData } = useUser();
  const { showAlert } = useAlert();

  const agregar = () => setAdd(true);

  const ejecutarFetch = async () => {
    let url = idSec
      ? `${process.env.REACT_APP_DOMINIO_BACK}/sectors/${idSec}`
      : `${process.env.REACT_APP_DOMINIO_BACK}/containers/filter?idCont=${idContainer}`;

    try {
      const response = await fetch(url, {
        method: "GET",
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

      if (!response.ok) {
        const data = await response.json();
        showAlert(data.msj || "Error al obtener los contenedores", "error");
        return;
      }

      const data = await response.json();

      if (idSec) {
        const containers = data.containers;
        if (!containers.length) {
          showAlert(`No hay contenedores cargados en el sector ${idSec}`, "info");
        } else {
          setListaContainers(containers);
        }
      } else {
        if (data.msj) {
          showAlert(data.msj, "error");
        } else {
          setListaContainers(data);
        }
      }
    } catch (error) {
      console.error(error);
      showAlert("No se pudieron cargar los contenedores", "error");
    } finally {
      setLoading(false);
      setAdd(false);
    }
  };

  useEffect(() => {
    ejecutarFetch();
  }, []);

  return (
    <>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <h1 className="greeting">{greeting} {idSec}</h1>

          {idSec && rol !== "ROL_USER" && (
            <CreateButton
              onClick={() =>
                navigate(`/sectors/${idSec}/createContainer`, {
                  state: { from: `/sectors/${idSec}/containers` },
                })
              }
            />
          )}

          {!idSec && rol !== "ROL_USER" && (
            <button className="button btnPrimary" onClick={agregar}>
              <span className="btnText">Agregar contenedor</span>
            </button>
          )}

          {listaContainers.length > 0 && (
            <ContainerList
              listaContainers={listaContainers}
              isInSector={!!idSec}
              idItem={idItem}
            />
          )}
        </>
      )}

      <NavigateBackButton
        fallback={
          idSec
            ? `/sectors/${idSec}`
            : fromLoc
            ? `/items/${idItem}`
            : `/`
        }
      />
    </>
  );
};

export default ContainerListContainer;
