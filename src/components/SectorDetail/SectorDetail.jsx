import "./SectorDetail.css";
import {Link, useNavigate} from "react-router-dom";

const SectorDetail =({sector})=>{
    const navigate=useNavigate()

    const navigateTo=(url)=>{
        navigate(url)
      }
    return(

            <div className="tarjetaProducto">
                <h1>Sector N°{sector.id}</h1>
                <h2>Nombre: {sector.name}</h2>
                <h2>Descripcion: {sector.description}</h2>
                <button class="button btnPrimary" onClick={()=>navigateTo(`${sector.id}`)}><span class="btnText">Ver Sector</span></button>
                
            </div>

    )
}

export {SectorDetail}