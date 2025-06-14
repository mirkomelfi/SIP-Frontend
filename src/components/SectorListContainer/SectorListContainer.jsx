import React, { useState, useEffect } from "react";
import "./SectorListContainer.css";
import { SectorList } from "../SectorList/SectorList";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import CreateButton from "../../utils/CreateButton/CreateButton";
import { useAlert } from "../../context/AlertContext";

export const SectorListContainer = ({ greeting }) => {
  const [listaSectors, setListaSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { tokenState, rol, clearAuthData } = useUser();
  const { showAlert } = useAlert();
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
        showAlert(data.msj, "error");
      } else {
        setListaSectors(data);
      }
    } catch (error) {
      console.error("Error al obtener sectores:", error);
      showAlert("No se pudieron cargar los sectores.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    ejecutarFetch();
  }, []);

  return (
    <>
      <h1 className="greeting">{greeting}</h1>

      {isAdmin && (
        <CreateButton onClick={() => navigate("/addSector")} />
      )}

      {loading ? (
        <p>cargando...</p>
      ) : (
        <SectorList listaSectors={listaSectors} />
      )}

      <button className="button btnPrimary" onClick={() => navigate("/")}>
        <span className="btnText">Volver</span>
      </button>
    </>
  );
};
