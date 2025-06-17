import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useAlert } from "../../context/AlertContext"; // ✅
import "./Item.css";

export const ItemPut = () => {
  const { idSec, idCont, idItem } = useParams();
  const { tokenState } = useUser();
  const { showAlert } = useAlert(); // ✅

  const [item, setItem] = useState([]);
  const navigate = useNavigate();
  const datForm = useRef();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/items/${idItem}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenState}`,
          },
        });

        const data = await response.json();

        if (data.msj) {
          showAlert(data.msj, "error"); // ✅
        } else {
          setItem(data);
        }
      } catch (error) {
        console.error("Error al obtener el ítem:", error);
        showAlert("No se pudo cargar el ítem", "error"); // ✅
      }
    };

    fetchItem();
  }, [idItem, tokenState, showAlert]);

  const consultarForm = async (e) => {
    e.preventDefault();

    const datosFormulario = new FormData(datForm.current);
    const itemUpdate = Object.fromEntries(datosFormulario);

    if (!itemUpdate.name && !itemUpdate.description) {
      showAlert("No se ingresaron valores para actualizar", "warning"); // ✅
      return;
    }

    if (itemUpdate.name === "") itemUpdate.name = null;
    if (itemUpdate.description === "") itemUpdate.description = null;

    try {
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/items/${idItem}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenState}`,
        },
        body: JSON.stringify(itemUpdate),
      });

      const data = await response.json();

      if (data.msj) {
        showAlert(data.msj, "success"); // ✅
      } 
    } catch (error) {
      console.error("Error al actualizar el ítem:", error);
      showAlert("Error al conectar con el servidor", "error"); // ✅
    }

    e.target.reset();
  };

  const handleVolver = () => {
    if (!idSec) {
      navigate(`/items/${idItem}`);
    } else {
      navigate(`/sectors/${idSec}/containers/${idCont}/items/${idItem}`);
    }
  };

  return (
    <div className="container divForm">
      <h2>Cambio en los datos del Ítem</h2>
      <h3>Ingrese solo los campos que desea modificar</h3>
      <form onSubmit={consultarForm} ref={datForm}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input type="text" className="form-control" name="name" placeholder={item.name} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descripción</label>
          <input type="text" className="form-control" name="description" placeholder={item.description} />
        </div>

        <div className="flex-div">
          <button type="button" className="button btnPrimary" onClick={handleVolver}>
            <span className="btnText">Volver</span>
          </button>
          <button type="submit" className="btn-red">
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
};
