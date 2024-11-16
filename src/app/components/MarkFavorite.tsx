// src/components/MarkFavorite.tsx
import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { Button } from 'react-bootstrap';

const MarkFavorite = ({ movieId }) => {
  const { user, markFavorite } = useContext(AuthContext);

  const handleMarkFavorite = async () => {
    try {
      await markFavorite(movieId);
      alert('Movie marked as favorite!');
    } catch (error) {
      console.error('Error marking favorite:', error);
    }
  };

  if (!user) {
    return null; // No mostrar el botón si no hay un usuario logueado
  }

  return (
    <Button variant="primary" onClick={handleMarkFavorite}>
      Mark as Favorite
    </Button>
  );
};

export default MarkFavorite;