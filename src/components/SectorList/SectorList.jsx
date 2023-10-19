import {Sector} from "../sector/sector"
import "../Sector/Sector.css";
import { Link } from "react-router-dom";

const SectorList = ({listaSectors})=>{

    return (
        <>
        {listaSectors&&
        <div className="contenedorProductos">
            {listaSectors.map(sector => <Sector key={sector.id} sector={sector}/>)}
        </div>
        }
        </>
    )
}
export  {SectorList}