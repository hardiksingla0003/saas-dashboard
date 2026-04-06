import { createContext, useCallback, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
  });
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setAuth({ isAuthenticated: true, user: JSON.parse(storedUser) });
      }
    } catch {
      localStorage.removeItem("user");
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const login = useCallback((userData) => {
    setAuth({ isAuthenticated: true, user: userData });

    localStorage.setItem("user", JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setAuth({ isAuthenticated: false, user: null });
    localStorage.removeItem("user");
  }, []);
  return (
    <AuthContext.Provider value={{ auth, login, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
