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
import { Container } from './Container/Container';
import ItemListContainer from './ItemListContainer/ItemListContainer';
import { Sector } from './Sector/Sector';
import { ItemLocation } from './Item/ItemLocation';
import { ItemFilter } from './Item/ItemFilter';
import ImagenPost from './Imagen/ImagenPOST';
import { Logout } from './Logout/Logout';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import AdminRoute from './AdminRoute/AdminRoute';
import { useUser } from "../context/UserContext";
import { ContainerPost } from './Container/ContainerPOST';
import { ItemPost } from './Item/ItemPOST';
export const App = () => {
  const { loading } = useUser();

  if (loading) {
    return <div className="loader">Cargando sesión...</div>; // Podés usar un spinner lindo
  }
  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

          {/* Vista exclusiva del admin */}
          <Route element={<AdminRoute />}>
            <Route path="/users" element={<UserListContainer greeting="Listado de Usuarios" />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/sectors/:idSec/containers/:idCont/updateContainer" element={<ContainerPut />} />
          </Route>


          {/* Rutas privadas agrupadas */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<ItemFilter />} />
            <Route path="/sectors" element={<SectorListContainer greeting="Listado de Sectores" />} />
            <Route path="/sectors/:idSec" element={<Sector />} />
            <Route path="/sectors/:idSec/containers" element={<ContainerListContainer greeting="Listado de Contenedores del Sector seleccionado" />} />
            <Route path="/sectors/:idSec/containers/:idCont" element={<Container />} />
            <Route path="/items/:idItem/containers/:idCont" element={<Container fromItem={true} />} />
            <Route path="/items/:idItem/changeLocation/:idCont" element={<Container />} />
            <Route path="/items/:idItem/containers/:idCont/sectors/:idSec" element={<Sector fromContainer={true} />} />
            <Route path="/sectors/:idSec/containers/:idCont/items" element={<ItemListContainer greeting="Listado de Items del Contenedor seleccionado" />} />
            <Route path="/sectors/:idSec/containers/:idCont/items/:idItem" element={<Item fromSector={true} />} />
            <Route path="/items" element={<ItemFilter />} />
            <Route path="/items/create" element={<ItemPost />} />
            <Route path="/items/create/:idCont" element={<ItemPost />} />
            <Route path="/items/:idItem" element={<Item />} />
            <Route path="/items/:idItem/locationChange" element={<ItemLocation />} />
            <Route path="/items/:idItem/locationChange/:idCont" element={<Container fromLocation={true} />} />
            <Route path="/users/:idUser" element={<User />} />
            <Route path="/updateUser/:idUser" element={<UserPut />} />
            <Route path="/updateSector/:idSec" element={<SectorPut />} />
            <Route path="/addSector" element={<SectorPost />} />
            <Route path="/addImage/:idItem" element={<ImagenPost />} />
            <Route path="/sectors/:idSec/containers/:idCont/items/:idItem/updateItem" element={<ItemPut />} />
            <Route path="/items/:idItem/updateItem" element={<ItemPut />} />
            <Route path="/user/current" element={<User />} />
            <Route path="/updateUser" element={<UserPut fromPerfil={true} />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
  );
};
