import React, { useState, useEffect } from "react";
import "./SectorListContainer.css";
import { SectorList } from "../SectorList/SectorList";
import { useNavigate } from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import { useUser } from "../../context/UserContext";
import CreateButton from "../../utils/CreateButton/CreateButton";

export const SectorListContainer = ({ greeting }) => {
  const [listaSectors, setListaSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();

  const { tokenState, rol, clearAuthData } = useUser();
  const isAdmin = rol === "ROL_ADMIN";

  const ejecutarFetch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/sectors`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenState}`
        }
      });

      if (response.status === 401 || response.status === 403) {
        clearAuthData();
        navigate("/login");
        return;
      }

      const data = await response.json();

      if (data.msj) {
        setMensaje(data.msj);
      } else {
        setListaSectors(data);
        setMensaje(null);
      }
    } catch (error) {
      console.error("Error al obtener sectores:", error);
      setMensaje("No se pudieron cargar los sectores.");
    } finally {
      setLoading(false);
    }
  };

  const navigateTo = (url) => {
    navigate(url);
  };

  useEffect(() => {
    ejecutarFetch();
  }, []);

  return (
    <>
      <h1 className="greeting">{greeting}</h1>

      {isAdmin && (
        <CreateButton onClick={() => navigate("/addSector")}/>
      )}

      {!mensaje ? (
        <div>
          {loading ? <p>cargando...</p> : <SectorList listaSectors={listaSectors} />}
        </div>
      ) : (
        <Mensaje msj={mensaje} />
      )}

      <button className="button btnPrimary" onClick={() => navigateTo("/")}>
        <span className="btnText">Volver</span>
      </button>
    </>
  );
};
