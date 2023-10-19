import {Edificio} from "../Edificio/Edificio"
import "../Edificio/Edificio.css";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { Link } from "react-router-dom";

const ItemList = ({listaItems})=>{

    return (
        <>        
            {listaItems&&

            <div className="contenedorProductos">
                {listaItems.map(item => <ItemDetail key={item.id} item={item} />)}
            </div>
            }
        </>
    )
}
export  {ItemList}