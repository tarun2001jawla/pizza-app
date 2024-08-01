import React, { createContext, useContext, useState, useEffect } from 'react';
import { parseJwt } from '../utils/jwt';

interface AuthContextProps {
  user: { name?: string; email?: string; sub?: string }; // Add sub to the user object
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<{ name?: string; email?: string; sub?: string }>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextProps>({
  user: {},
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ name?: string; email?: string; sub?: string }>({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('jwt='));
    if (token) {
      const tokenValue = token.split('=')[1];
      const decoded = parseJwt(tokenValue);
      console.log({decoded})
      if (decoded) {
        setUser({ name: decoded.name, email: decoded.email, sub: decoded.sub });
        setIsAuthenticated(true);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setUser, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);