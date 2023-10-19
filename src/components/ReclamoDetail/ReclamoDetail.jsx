import "./ReclamoDetail.css";
import {Link} from "react-router-dom";

const ReclamoDetail =({reclamo})=>{
    console.log(reclamo)
    return(
        <>
            <div className="tarjetaProducto">
                <h1>Reclamo N°{reclamo.id}</h1>
                <h2>Tipo: {reclamo.tipoReclamable}</h2>
                <h2>Id del Reclamable: {reclamo.idReclamable}</h2>
                
                <Link to={`${reclamo.id}`}>Ver más</Link> 
            </div>
        </>
    )
}

export {ReclamoDetail}