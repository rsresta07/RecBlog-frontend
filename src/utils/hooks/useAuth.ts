import { useEffect, useState } from "react";
import { getCookie, deleteCookie } from "cookies-next";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);

  // Load user on mount
  useEffect(() => {
    refreshUser();
  }, []);

  // Function to refresh user state from cookie
  const refreshUser = () => {
    const cookie = getCookie("user");
    if (cookie) {
      try {
        setUser(JSON.parse(cookie as string));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  const logout = () => {
    deleteCookie("user");
    deleteCookie("token");
    setUser(null);
    window.location.href = "/"; // or router.push("/")
  };

  return { user, logout, refreshUser };
};
