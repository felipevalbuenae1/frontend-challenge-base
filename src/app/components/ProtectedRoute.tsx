// src/components/ProtectedRoute.tsx
"use client";

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthContext from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return children;
};

export default ProtectedRoute;