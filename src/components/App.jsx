import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import { Register } from './Register/Register';
import { Login } from './Login/Login';
import UserListContainer from './UserListContainer/UserListContainer';
import { SectorListContainer } from './SectorListContainer/SectorListContainer';
import ContainerListContainer from './ContainerListContainer/ContainerListContainer';
import { Item } from './Item/Item';
import { User } from './User/User';
import { UserPut } from './User/UserPUT';
import { SectorPut } from './Sector/SectorPUT';
import { SectorPost } from './Sector/SectorPOST';
import { ContainerPut } from './Container/ContainerPUT';
import { ItemPut } from './Item/ItemPUT';


export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
         <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path="/users" element={<UserListContainer greeting="Listado de Usuarios"/>}/>
          <Route path="/sectors" element={<SectorListContainer greeting="Listado de Sectores"/>}/>
          <Route path="/sectors/:id/containers" element={<ContainerListContainer greeting="Listado de Unidades del Edificio seleccionado"/>}/>
          <Route path="/containers/:id/items/:id" element={<Item />}/> 
          <Route path="/users/:dni" element={<User/>}/> 
          <Route path="/updateUser/:dni" element={<UserPut />}/> 
          <Route path="/updateSector/:id" element={<SectorPut />}/>
          <Route path="/addSector" element={<SectorPost />}/>
          <Route path="/updateItem/:id" element={<ItemPut />}/>
          <Route path="/updateContainer/:id" element={<ContainerPut />}/>
          <Route path="/user/current" element={<User />}/> 
          <Route path="/updateUser" element={<UserPut />}/>
          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
        
      </BrowserRouter>

    </>

  )
}