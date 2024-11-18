import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const MarkFavorite = ({ movieId }) => {
  const { user, markFavorite } = useContext(AuthContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkIfFavorite = async () => {
      if (user) {
        try {
          const response = await axios.get(`https://backend-challenge-base.vercel.app/favorites/${JSON.parse(user).userId}`);
          const favorites = response.data;
          
          const isFavorite = favorites.some(favorite => favorite.movie_id === movieId);
          setIsFavorite(isFavorite);
        } catch (error) {
          console.error('Error fetching favorites:', error);
        }
      }
    };

    checkIfFavorite();
  }, [user, movieId]);

  useEffect(() => {
  
  }
  , [isFavorite]);
  const handleMarkFavorite = async () => {
    try {
      await markFavorite(movieId);
      alert('Movie marked as favorite!');

      // Consultar todos los favoritos del usuario
      const response = await axios.get(`https://backend-challenge-base.vercel.app/favorites/${JSON.parse(user).userId}`);
      const favorites = response.data;

      // Verificar si la película marcada está en la lista de favoritos
      const isFavorite = favorites.some(favorite => favorite.movie_id === movieId);
      setIsFavorite(isFavorite);
    } catch (error) {
      console.error('Error marking favorite:', error);
    }
  };

  const handleUnmarkFavorite = async () => {
    try {
      await axios.delete(`https://backend-challenge-base.vercel.app/favorites/${movieId}`, {
        data: { userId: JSON.parse(user).userId }
      });
      alert('Movie unmarked as favorite!');

      // Consultar todos los favoritos del usuario
      const response = await axios.get(`https://backend-challenge-base.vercel.app/favorites/${JSON.parse(user).userId}`);
      const favorites = response.data;

      // Verificar si la película desmarcada ya no está en la lista de favoritos
      const isFavorite = favorites.some(favorite => favorite.movie_id === movieId);
      setIsFavorite(isFavorite);
    } catch (error) {
      console.error('Error unmarking favorite:', error);
    }
  };

  if (!user) {
    return null; // No mostrar el botón si no hay un usuario logueado
  }

  return (
    <Button
      variant="outline"
      onClick={isFavorite ? handleUnmarkFavorite : handleMarkFavorite}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isFavorite ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-heart-fill" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
        </svg>
      ) : (
        <>
          {isHovered ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-heart-fill" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-heart" viewBox="0 0 16 16">
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
            </svg>
          )}
        </>
      )}
    </Button>
  );
};

export default MarkFavorite;