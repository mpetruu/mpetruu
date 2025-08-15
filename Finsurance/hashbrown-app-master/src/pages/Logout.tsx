import { useSession } from "../components/SessionProvider";
import { useNavigate } from "react-router-dom";
import { defaultUser } from "../components/SessionProvider"; // Import default user

const Logout = () => {
  const { setUser } = useSession();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(defaultUser);
    navigate("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
