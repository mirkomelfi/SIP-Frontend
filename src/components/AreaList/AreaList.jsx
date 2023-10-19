import {Edificio} from "../Edificio/Edificio"
import "../Edificio/Edificio.css";
import { AreaDetail } from "../AreaDetail/AreaDetail";
import { Link } from "react-router-dom";

const AreaList = ({listaAreas})=>{
    console.log(listaAreas)
    return (
        <>        
            {listaAreas&&

            <div className="contenedorProductos">
                {listaAreas.map(area => <AreaDetail key={area.id} area={area} />)}
            </div>
            }
        </>
    )
}
export  {AreaList}