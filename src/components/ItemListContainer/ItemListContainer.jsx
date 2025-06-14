import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";
import { ItemPost } from "../Item/ItemPOST";
import { Mensaje } from "../Mensaje/Mensaje";
import { ItemFilter } from "../Item/ItemFilter";
import CreateButton from "../../utils/CreateButton/CreateButton";
import { useUser } from "../../context/UserContext";
import NavigateBackButton from "../../utils/NavigateBackButton/NavigateBackButton";

const ItemListContainer = ({ greeting }) => {
  const { idSec, idCont } = useParams();
  const [listaItems, setListaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { tokenState } = useUser();

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
          setMensaje(`No hay items cargados en el contenedor ${idCont}`);
        } else {
          setListaItems(items);
        }
      } else {
        if (data.msj) {
          setError(true);
          setMensaje(data.msj);
        } else {
          setListaItems(data);
        }
      }
    } catch (error) {
      console.error("Error al obtener los ítems:", error);
      setMensaje("Hubo un error al cargar los ítems.");
      setError(true);
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
      ) : !error ? (
       
          <>
            <NavigateBackButton/>
            <h1 className="greeting">{greeting}</h1>
            <CreateButton onClick={() => navigate(idCont?`/items/create/${idCont}`:"/items/create")} />
            {listaItems.length !== 0 ? (
              <ItemList listaItems={listaItems} />
            ) : (
              <Mensaje msj={mensaje} />
            )}
          </>
      ) : (
        <Mensaje msj={mensaje} />
      )}

    </>
  );
};

export default ItemListContainer;
