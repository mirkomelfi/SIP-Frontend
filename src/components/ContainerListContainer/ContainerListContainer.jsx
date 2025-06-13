import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContainerList } from "../ContainerList/ContainerList";
import { ContainerPost } from "../Container/ContainerPOST";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";

const ContainerListContainer = ({ fromLoc, greeting, idContainer, idItem }) => {
  const { idSec } = useParams();
  const [listaContainers, setListaContainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [add, setAdd] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { tokenState, rol, clearAuthData } = useUser();

  const agregar = () => {
    setAdd(true);
  };

  const ejecutarFetch = async () => {
    let url = "";
    if (idSec) {
      url = `${process.env.REACT_APP_DOMINIO_BACK}/sectors/${idSec}`;
    } else {
      url = `${process.env.REACT_APP_DOMINIO_BACK}/containers/filter?idCont=${idContainer}`;
    }

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

    const data = await response.json();

    if (idSec) {
      const containers = data.containers;
      if (!containers.length) {
        setMensaje(`No hay contenedores cargados en el sector ${idSec}`);
      } else {
        setListaContainers(containers);
      }
    } else {
      if (data.msj) {
        setError(true);
        setMensaje(data.msj);
      } else {
        setListaContainers(data);
      }
    }
  };

  const navigateTo = (url) => {
    navigate(url);
  };

  useEffect(() => {
    ejecutarFetch()
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
        setAdd(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <Mensaje msj={mensaje} />
      ) : add ? (
        <ContainerPost />
      ) : !mensaje ? (
        <>
          <h1 className="greeting">{greeting}</h1>
          {idSec ? (
            <>
              {rol !== "ROL_USER" && (
                <button className="button btnPrimary" onClick={agregar}>
                  <span className="btnText">Agregar contenedor</span>
                </button>
              )}
              <ContainerList listaContainers={listaContainers} isInSector={true} />
            </>
          ) : (
            <ContainerList listaContainers={listaContainers} idItem={idItem} />
          )}
        </>
      ) : (
        <>
          {rol !== "ROL_USER" && (
            <button className="button btnPrimary" onClick={agregar}>
              <span className="btnText">Agregar contenedor</span>
            </button>
          )}
          <Mensaje msj={mensaje} />
        </>
      )}

      {idSec ? (
        <button className="button btnPrimary" onClick={() => navigateTo(`/sectors/${idSec}`)}>
          <span className="btnText">Volver</span>
        </button>
      ) : fromLoc ? (
        <button className="button btnPrimary" onClick={() => navigateTo(`/items/${idItem}`)}>
          <span className="btnText">Volver</span>
        </button>
      ) : (
        <button className="button btnPrimary" onClick={() => navigateTo(`/`)}>
          <span className="btnText">Volver</span>
        </button>
      )}
    </>
  );
};

export default ContainerListContainer;
