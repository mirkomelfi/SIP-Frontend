import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import { Register } from './Register/Register';
import { Login } from './Login/Login';
import {EdificioListContainer} from './EdificioListContainer/EdificioListContainer';
import { CreacionUser } from './CreacionUser/CreacionUser';
import { UserPassword } from './UserPassword/UserPassword';
import { ChangePass } from './UserPassword/ChangePass';
import UnidadListContainer from './UnidadListContainer/UnidadListContainer';
import { Home } from './Home/Home';
import { Unidad } from './Unidad/Unidad';
import AreaListContainer from './AreaListContainer/AreaListContainer';
import { Area } from './Area/Area';
import { ReclamoListContainer } from './ReclamoListContainer/ReclamoListContainer';
import { Reclamo } from './Reclamo/Reclamo';
import UsuarioListContainer from './UsuarioListContainer/UsuarioListContainer';
import { Usuario } from './Usuario/Usuario';
import { UsuarioPut } from './Usuario/UsuarioPUT';
import { ReclamoPut } from './Reclamo/ReclamoPUT';
import { EdificioPut } from './Edificio/EdificioPUT';
import { AreaPut } from './Area/AreaPUT';
import { UnidadPut } from './Unidad/UnidadPUT';
import { EdificioPost } from './Edificio/EdificioPOST';
import UserUnidadListContainer from './UserUnidadListContainer/UserUnidadListContainer';
import { UnidadUser } from './Unidad/UnidadUser';
import UserAreaListContainer from './UserAreaListContainer copy/UserAreaListContainer';
import { AreaUser } from './Area/AreaUser';
import UserReclamoListContainer from './UserReclamoListContainer/UserReclamoListContainer';
import { ReclamoUser } from './Reclamo/ReclamoUser';
import ImagenPost from './Imagen/ImagenPOST';
import { Imagen } from './Imagen/Imagen';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
         <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path="/usuarios" element={<UsuarioListContainer greeting="Listado de Usuarios"/>}/>
          <Route path="/edificios" element={<EdificioListContainer greeting="Listado de Edificios"/>}/>
          <Route path="/reclamos" element={<ReclamoListContainer greeting="Listado de Reclamos"/>}/>
          <Route path="/edificios/:id/unidades" element={<UnidadListContainer greeting="Listado de Unidades del Edificio seleccionado"/>}/>
          <Route path="/edificios/:id/unidades/:id" element={<Unidad />}/> 
          <Route path="/edificios/:id/areas" element={<AreaListContainer greeting="Listado de Areas Comunes del Edificio seleccionado"/>}/>
          <Route path="/edificios/:id/areas/:id" element={<Area />}/> 
          <Route path="/reclamos/:id" element={<Reclamo />}/> 
          <Route path="/usuarios/:dni" element={<Usuario />}/> 
          <Route path="/updateUsuario/:dni" element={<UsuarioPut />}/> 
          <Route path="/updateReclamo/:id" element={<ReclamoPut />}/>
          <Route path="/verImagenes/:id" element={<Imagen num={1} />}/> 
          <Route path="/addImage/:id" element={<ImagenPost />}/> 
          <Route path="/updateEdificio/:id" element={<EdificioPut />}/>
          <Route path="/addEdificio" element={<EdificioPost />}/>
          <Route path="/updateArea/:id" element={<AreaPut />}/>
          <Route path="/updateUnidad/:id" element={<UnidadPut />}/>
          <Route path="/usuario/current" element={<Usuario />}/> 
          <Route path="/updateUsuario" element={<UsuarioPut />}/>
          <Route path="/usuario/unidades" element={<UserUnidadListContainer/>}/>
          <Route path="/usuario/unidades/:id" element={<UnidadUser />}/> 
          <Route path="/usuario/areas" element={<UserAreaListContainer/>}/>
          <Route path="/usuario/areas/:id" element={<AreaUser />}/> 
          <Route path="/usuario/reclamos" element={<UserReclamoListContainer/>}/>
          <Route path="/usuario/reclamos/:id" element={<ReclamoUser />}/> 
          <Route path="/admin" element={<CreacionUser />}/> 
          <Route path="/password"element={<UserPassword />}/> 
          <Route path="/newpassword"element={<ChangePass />}/> 
          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
        
      </BrowserRouter>

    </>

  )
}