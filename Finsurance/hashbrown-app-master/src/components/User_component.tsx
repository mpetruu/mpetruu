import { useSession } from "./SessionProvider";
import { User as UserIcon } from "lucide-react"; // Import user icon

const User_component = () => {
  const { user } = useSession();

  if (!user) return null; // Hide component if no user is logged in

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <UserIcon size={24} /> {/* User Icon */}
      <span>{user.username}</span> {/* Display Username */}
    </div>
  );
};

export default User_component;
