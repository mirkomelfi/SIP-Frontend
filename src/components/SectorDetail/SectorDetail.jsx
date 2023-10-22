import "./SectorDetail.css";
import {Link} from "react-router-dom";

const SectorDetail =({sector})=>{
   
    return(

            <div className="tarjetaProducto">
                <h1>Sector N°{sector.id}</h1>
                <h2>Nombre: {sector.name}</h2>
                <h2>Descripcion: {sector.description}</h2>
                
                <Link to={`${sector.id}`}>Ver sector</Link>  

            </div>

    )
}

export {SectorDetail}