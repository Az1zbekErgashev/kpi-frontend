import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from 'types/User';

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
  roleAccess: string | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const updateUser = (updatedUser: User) => {
    setUser({
      ...updatedUser,
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser, roleAccess: user?.role }}>
      {children}
    </UserContext.Provider>
  );
};
