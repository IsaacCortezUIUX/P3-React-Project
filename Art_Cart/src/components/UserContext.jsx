// src/components/UserContext.jsx
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]); // Array to hold registered users
  const [currentUser, setCurrentUser] = useState(null);

  const registerUser = (user) => {
    setUsers(prevUsers => [...prevUsers, { ...user, purchaseHistory: [] }]); // Add purchase history
    setCurrentUser(user);
  };

  const login = (email) => {
    const user = users.find(user => user.email === email);
    if (user) {
      setCurrentUser(user);
    }
  };

  const isEmailRegistered = (email) => {
    return users.some(user => user.email === email);
  };

  const updatePurchaseHistory = (newPurchase) => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        purchaseHistory: [...currentUser.purchaseHistory, newPurchase],
      };
      setCurrentUser(updatedUser); // Update context
      setUsers(prevUsers => prevUsers.map(user => 
        user.email === currentUser.email ? updatedUser : user
      )); // Update users list to reflect changes
    }
  };

  return (
    <UserContext.Provider value={{ currentUser, login, registerUser, isEmailRegistered, updatePurchaseHistory }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
