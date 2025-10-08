import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, Role } from '../types';
import { DataContext } from './DataContext';
import { useLocalStorage } from './useLocalStorage';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string) => boolean;
  logout: () => void;
  registerUser: (user: Omit<User, 'id' | 'role'>) => boolean;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { users, setUsers } = useContext(DataContext);
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>('dccc-currentUser', null);

  const login = (email: string): boolean => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const registerUser = (userData: Omit<User, 'id' | 'role'>): boolean => {
      const existingUser = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
      if (existingUser) {
          alert('An account with this email already exists.');
          return false;
      }
      const newUser: User = {
          ...userData,
          id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
          role: Role.GENERAL_STUDENT,
      };
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      return true;
  };

  const value = {
    currentUser,
    login,
    logout,
    registerUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};