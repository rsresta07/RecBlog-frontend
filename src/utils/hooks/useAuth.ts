import { useEffect, useState } from "react";
import { getCookie, deleteCookie } from "cookies-next";

/**
 * A hook to manage user authentication state.
 *
 * @returns An object with 3 properties:
 * - `user`: The current user object.
 * - `logout`: A function to log the user out.
 * - `refreshUser`: A function to refresh the user state from the cookie.
 */
export const useAuth = () => {
  const [user, setUser] = useState<any>(null);

  // Load user on mount
  useEffect(() => {
    refreshUser();
  }, []);

  /**
   * Refreshes the user state using the "user" cookie.
   *
   * Attempts to parse the "user" cookie and update the user state.
   * If parsing fails or the cookie does not exist, sets the user state to null.
   */
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

  /**
   * Logs out the user.
   *
   * Deletes the "user" and "token" cookies and sets the user state to null.
   * Redirects to the homepage.
   */
  const logout = () => {
    deleteCookie("user");
    deleteCookie("token");
    setUser(null);
    window.location.href = "/"; // or router.push("/")
  };

  return { user, logout, refreshUser };
};
