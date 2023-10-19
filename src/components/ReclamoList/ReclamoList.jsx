import {ReclamoDetail} from "../ReclamoDetail/ReclamoDetail"
import "../ReclamoDetail/ReclamoDetail.css";

const ReclamoList = ({listaReclamos})=>{
    console.log("ReclamoList",listaReclamos)
    return (
        <>
        {listaReclamos&&
            <div className="contenedorProductos">
                {listaReclamos.map(reclamo => <ReclamoDetail key={reclamo.id} reclamo={reclamo}/>)}
            </div>
        }
        </>

    )
}
export  {ReclamoList}