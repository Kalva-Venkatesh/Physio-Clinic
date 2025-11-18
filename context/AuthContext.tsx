import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../types';
import apiClient from '../services/apiClient';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<User>;
  logout: () => void;
  signup: (userData: Omit<User, '_id' | 'role' | 'token'> & {password: string}) => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    const { data } = await apiClient.post<User>('/auth/login', { email, password });
    if (data) {
        localStorage.setItem('userInfo', JSON.stringify(data));
        setUser(data);
        return data;
    }
    throw new Error("Login failed: No user data returned from API.");
  };
  
  const signup = async (userData: Omit<User, '_id' | 'role'| 'token'> & {password: string}): Promise<User> => {
    const { data } = await apiClient.post<User>('/auth/register', userData);
    if (data) {
        localStorage.setItem('userInfo', JSON.stringify(data));
        setUser(data);
        return data;
    }
    throw new Error("Signup failed: No user data returned from API.");
  }

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};