import { useNavigate, useParams } from "react-router-dom";

const ItemDetail = ({ item }) => {
  const navigate = useNavigate();
  const { idSec, idCont } = useParams(); // <-- detecta si estás en un sector

  const verItem = () => {
    if (idSec && idCont) {
      navigate(`/sectors/${idSec}/containers/${idCont}/items/${item.id}`);
    } else {
      navigate(`/items/${item.id}`);
    }
  };

  return (
    <div className="tarjetaProducto">
      <h1>Item N°{item.id}</h1>
      <h2>Nombre: {item.name}</h2>

      {item.image && (
        <img src={`data:image/jpeg;base64,${item.image.imageData}`} alt={`Imagen de ${item.name}`} />
      )}

      <h2>Descripción: {item.description}</h2>

      {item.containerID === 0 || !item.containerID ? (
        <h2>No se encuentra en ningún contenedor</h2>
      ) : (
        <h2>Se encuentra en contenedor: {item.containerID}</h2>
      )}

      <button className="button btnPrimary" onClick={verItem}>
        <span className="btnText">Ver item</span>
      </button>
    </div>
  );
};

export { ItemDetail };
