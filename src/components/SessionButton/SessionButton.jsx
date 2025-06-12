import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const SessionButton = () => {
  const { user } = useUser();

  return (
    <>
      {user ? (
        <Link to="/logout" className="navbar__link">Logout</Link>
      ) : (
        <Link to="/login" className="navbar__link">Login</Link>
      )}
    </>
  );
};

export default SessionButton;
