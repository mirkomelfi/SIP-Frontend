import { useEffect, useState } from "react";
import { Item } from "../Item/Item";

const Location = ({ item }) => {
  const [locations, setLocations] = useState([]);
  const [goBack, setGoBack] = useState(false);

  const returnToItem = () => {
    setGoBack(true);
  };

  useEffect(() => {
    setLocations(item.changes || []);
  }, [item.changes]);

  return (
    <>
      {!goBack ? (
        <div className="tarjetaProducto">
          {locations.length !== 0 ? (
            locations.map((location, index) => (
              <div key={index}>
                <h2>Autor: {location.completeName}</h2>
                <h3>{location.description}</h3>
              </div>
            ))
          ) : (
            <h2>No hay historial por el momento</h2>
          )}
          <button className="button btnPrimary" onClick={returnToItem}>
            <span className="btnText">Volver al Item</span>
          </button>
        </div>
      ) : (
        <Item />
      )}
    </>
  );
};

export { Location };
