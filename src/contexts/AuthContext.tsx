import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  username: string | null;
  login: (username: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Read username synchronously but outside of render to avoid blocking
const getInitialUsername = (): string | null => {
  try {
    return sessionStorage.getItem('username');
  } catch {
    return null;
  }
};

const initialUsername = getInitialUsername();

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string | null>(initialUsername);

  const login = (name: string) => {
    setUsername(name);
    try {
      sessionStorage.setItem('username', name);
    } catch {
      // Ignore storage errors
    }
  };

  const logout = () => {
    setUsername(null);
    try {
      sessionStorage.removeItem('username');
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <AuthContext.Provider value={{ username, login, logout, isAuthenticated: !!username }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
