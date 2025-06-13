import { useState } from "react"

function LoginUI ({onSubmit}){

    const [username,setUsername] = useState(null);
    const [passw, setPassw] = useState(null)
    const handleSubmit = (e) =>{
        e.preventDefault()
        onSubmit({
            username : username,
            password : passw
        })
    }
    return( 
        <div>
        <div className="container divForm">
          <h3>Formulario de Inicio de Sesión</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-form">
              <label htmlFor="username" className="form-label">Nombre de Usuario</label>
              <input type="text" className="form-control" name="username" onChange={(e) => {setUsername(e.currentTarget.value)}} />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" className="form-control" name="password" onChange={(e) => {setPassw(e.currentTarget.value)}}/>
            </div>   
            <button type="submit" className="button btnPrimary">Iniciar Sesión</button> 
          </form>
        </div>
    </div>
    )
};
export default LoginUI