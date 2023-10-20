import { UserDetail } from "../UserDetail/UserDetail"
import { Link } from "react-router-dom"

const UserList = ({listaUsers})=>{
    console.log("userlist",listaUsers)
    return (
        <> 
           {// <Link to={``}>Agregar User</Link>
            }

            <div className="contenedorProductos">
                {listaUsers&&listaUsers.map(user => <UserDetail key={user.dni} user={user}/>)}
            </div>
        </> 
    )
}
export  {UserList}