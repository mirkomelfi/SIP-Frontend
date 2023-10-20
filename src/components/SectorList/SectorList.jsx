
import "../Sector/Sector.css";
import { Link } from "react-router-dom";
import { SectorDetail } from "../SectorDetail/SectorDetail";

const SectorList = ({listaSectors})=>{

    return (
        <>
        {listaSectors&&
        <div className="contenedorProductos">
            {listaSectors.map(sector => <SectorDetail key={sector.id} sector={sector}/>)}
        </div>
        }
        </>
    )
}
export  {SectorList}