import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  username: string;
  email: string;
  id: number;
}

export const defaultUser: User = {
  username: "Penny",
  email: "stock@gmail.com",
  id: 3,
};



interface SessionContextType {
  user: User;
  setUser: (user: User) => void;
}

// Create session context
const SessionContext = createContext<SessionContextType | undefined>(undefined);

// SessionProvider component
export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(() => {
    // Try to get user from sessionStorage first
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Validate that we have all required fields
        if (parsedUser.username && parsedUser.email && parsedUser.id) {
          return parsedUser;
        }
      } catch (e) {
        console.error('Error parsing stored user:', e);
      }
    }
    // Fall back to defaultUser if no valid stored user
    return defaultUser;
  });

  useEffect(() => {
    if (user) {
      // Always store the current user in sessionStorage
      sessionStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {children}
    </SessionContext.Provider>
  );
};

// Custom hook to use session state
export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  // Always return a default user when no session exists
  return {
    user: context.user ?? null,
    setUser: context.setUser,
  };
};


