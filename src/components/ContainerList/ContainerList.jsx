import {Edificio} from "../Edificio/Edificio"
import "../Edificio/Edificio.css";
import { ContainerDetail } from "../ContainerDetail/ContainerDetail";
import { Link } from "react-router-dom";

const ContainerList = ({listaContainers})=>{

    return (
        <>
           {listaContainers&&
           
            <div className="contenedorProductos">
                {listaContainers.map(container => <ContainerDetail key={container.id} container={container} />)}
            </div>
            }
        </>
    )
}
export  {ContainerList}