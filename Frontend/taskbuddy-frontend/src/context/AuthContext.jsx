import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = async (email, password) => {
    // Mock authentication
    const mockUsers = [
      {
        id: '1',
        email: 'admin@taskbuddy.com',
        password: 'admin123',
        firstName: 'John',
        lastName: 'Doe',
        role: 'admin'
      },
      {
        id: '2',
        email: 'user@taskbuddy.com',
        password: 'user123',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'user'
      }
    ];

    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      const token = 'mock-jwt-token-' + foundUser.id;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
      return true;
    }
    
    return false;
  };

  const register = async (userData) => {
    // Mock registration
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      role: 'user'
    };
    
    const { password: _, ...userWithoutPassword } = newUser;
    const token = 'mock-jwt-token-' + newUser.id;
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    setUser(userWithoutPassword);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = (userData) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};