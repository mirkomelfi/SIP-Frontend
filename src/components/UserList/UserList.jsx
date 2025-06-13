import { UserDetail } from "../UserDetail/UserDetail";

const UserList = ({ listaUsers }) => {
  return (
    <div className="contenedorProductos">
      {listaUsers &&
        listaUsers.map((user) => <UserDetail key={user.id} user={user} />)}
    </div>
  );
};

export { UserList };
