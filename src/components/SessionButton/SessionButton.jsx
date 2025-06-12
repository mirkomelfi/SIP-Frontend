import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const SessionButton = () => {
  const { user } = useUser();

  return (
    <>
      {user ? (
        <Link to="/logout" className="session-button">Logout</Link>
      ) : (
        <Link to="/login" className="session-button">Login</Link>
      )}
    </>
  );
};

export default SessionButton;
