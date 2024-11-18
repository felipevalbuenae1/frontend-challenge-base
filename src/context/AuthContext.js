// src/context/AuthContext.js
"use client";

import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log('Token:', token);
    if (token) {
      setAuthToken(token);
    }

    const user = localStorage.getItem('user');
    console.log('User:', user);
    if (user) {
      setUser(user);
    }
  }, []);

  const login = async (usernameOrEmail, password) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        usernameOrEmail,
        password
      });
      const { token, userId } = response.data;
      console.log('Login successful:', response.data);
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify({ usernameOrEmail, userId }));
      setUser({ usernameOrEmail, userId });
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  const markFavorite = async (movieId) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.post(`http://localhost:3000/favorites/${movieId}`, {
        userId: JSON.parse(user).userId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error marking favorite:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, markFavorite }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;