import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";
import { ItemPost } from "../Item/ItemPOST";
import { Mensaje } from "../Mensaje/Mensaje";
import { ItemFilter } from "../Item/ItemFilter";
import CreateButton from "../../utils/CreateButton/CreateButton";
import { useUser } from "../../context/UserContext";

const ItemListContainer = ({ greeting, filter }) => {
  const { idSec, idCont } = useParams();
  const [listaItems, setListaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);
  const [goBack, setGoBack] = useState(false);

  const navigate = useNavigate();
  const { token } = useUser();

  const returnToItem = () => {
    setGoBack(true);
  };

  const ejecutarFetch = async () => {
    let url = "";

    if (idCont) {
      url = `${process.env.REACT_APP_DOMINIO_BACK}/containers/${idCont}`;
    } else {
      url = `${process.env.REACT_APP_DOMINIO_BACK}/items/filter?query=${filter}`;
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
        !goBack ? (
          <>
            <h1 className="greeting">{greeting}</h1>
            <CreateButton onClick={() => navigate(`/items/create/${idCont}`)} />
            {listaItems.length !== 0 ? (
              <ItemList listaItems={listaItems} />
            ) : (
              <Mensaje msj={mensaje} />
            )}
          </>
        ) : (
          <ItemFilter />
        )
      ) : (
        <Mensaje msj={mensaje} />
      )}

      {idSec && (
        <button
          className="button btnPrimary"
          onClick={() => navigate(`/sectors/${idSec}/containers/${idCont}`)}
        >
          <span className="btnText">Volver</span>
        </button>
      )}

      {!goBack && !idSec && (
        <button className="button btnPrimary" onClick={returnToItem}>
          <span className="btnText">Volver</span>
        </button>
      )}
    </>
  );
};

export default ItemListContainer;
