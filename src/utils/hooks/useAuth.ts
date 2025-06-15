import { useEffect, useState } from "react";
import { getCookie, deleteCookie } from "cookies-next";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const cookie = getCookie("user");
    if (cookie) {
      try {
        setUser(JSON.parse(cookie as string));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const logout = () => {
    deleteCookie("user");
    deleteCookie("token");
    window.location.href = "/"; // or router.push("/")
  };

  return { user, logout };
};
