import {Edificio} from "../Edificio/Edificio"
import "../Edificio/Edificio.css";
import { Link } from "react-router-dom";

const EdificioList = ({listaEdificios})=>{
    console.log()
    return (
        <>
        {listaEdificios&&
        <div className="contenedorProductos">
            {listaEdificios.map(edificio => <Edificio key={edificio.id} edificio={edificio}/>)}
        </div>
        }
        </>
    )
}
export  {EdificioList}