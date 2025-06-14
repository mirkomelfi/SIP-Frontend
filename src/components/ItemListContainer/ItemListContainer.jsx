import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";
import CreateButton from "../../utils/CreateButton/CreateButton";
import { useUser } from "../../context/UserContext";
import NavigateBackButton from "../../utils/NavigateBackButton/NavigateBackButton";
import { useAlert } from "../../context/AlertContext"; // ✅

const ItemListContainer = ({ greeting }) => {
  const { idSec, idCont } = useParams();
  const [listaItems, setListaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { tokenState } = useUser();
  const { showAlert } = useAlert(); // ✅

  const ejecutarFetch = async () => {
    let url = "";

    if (idCont) {
      url = `${process.env.REACT_APP_DOMINIO_BACK}/containers/${idCont}`;
    } else {
      url = `${process.env.REACT_APP_DOMINIO_BACK}/items/filter?query=${location.state?.query || ""}`;
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenState}`,
        },
      });

      const data = await response.json();

      if (idCont) {
        const items = data.items;
        if (!items || items.length === 0) {
          showAlert(`No hay items cargados en el contenedor ${idCont}`, "info");
        } else {
          setListaItems(items);
        }
      } else {
        if (data.msj) {
          showAlert(data.msj, "error");
        } else {
          setListaItems(data);
        }
      }
    } catch (error) {
      console.error("Error al obtener los ítems:", error);
      showAlert("Hubo un error al cargar los ítems.", "error");
    } finally {
      setLoading(false);
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
          <NavigateBackButton />
          <h1 className="greeting">{greeting}</h1>
          <CreateButton onClick={() => navigate(idCont ? `/items/create/${idCont}` : "/items/create")} />
          {listaItems.length !== 0 && <ItemList listaItems={listaItems} />}
        </>
      )}
    </>
  );
};

export default ItemListContainer;
