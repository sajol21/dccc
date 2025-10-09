import React, { createContext, useContext, ReactNode } from 'react';
import { User, Role } from '../types';
import { DataContext } from './DataContext';
import { useLocalStorage } from './useLocalStorage';

type LoginResult = 'success' | 'suspended' | 'not_found';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string) => LoginResult;
  logout: () => void;
  registerUser: (user: Omit<User, 'id' | 'role' | 'isSuspended'>) => boolean;
  updateCurrentUser: (data: Partial<Omit<User, 'id' | 'email' | 'role'>>) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { users, setUsers, updateUser } = useContext(DataContext);
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>('dccc-currentUser', null);

  const login = (email: string): LoginResult => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      if (user.isSuspended) {
        return 'suspended';
      }
      setCurrentUser(user);
      return 'success';
    }
    return 'not_found';
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const registerUser = (userData: Omit<User, 'id' | 'role' | 'isSuspended'>): boolean => {
      const existingUser = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
      if (existingUser) {
          alert('An account with this email already exists.');
          return false;
      }
      const newUser: User = {
          ...userData,
          id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
          role: Role.GENERAL_STUDENT,
          isSuspended: false,
      };
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      return true;
  };

  const updateCurrentUser = (data: Partial<Omit<User, 'id' | 'email' | 'role'>>) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...data };
    setCurrentUser(updatedUser);
    updateUser(updatedUser);
  };

  const value = {
    currentUser,
    login,
    logout,
    registerUser,
    updateCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
