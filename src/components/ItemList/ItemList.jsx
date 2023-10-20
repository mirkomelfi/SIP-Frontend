import { ItemDetail } from "../ItemDetail/ItemDetail";


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