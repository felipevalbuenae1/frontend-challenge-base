// src/app/favorites/page.tsx
"use client";

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import MovieComponent from '../components/MovieComponent';
import { Container, Row, Col } from 'react-bootstrap';
import AuthContext from '../../context/AuthContext';
import FilterBar from '../components/FilterBar';

const FavoritesPage = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState<{ id: number; [key: string]: any }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          // Obtener los IDs de las películas favoritas desde tu backend
          const response = await axios.get(`http://localhost:3000/favorites/${JSON.parse(user).userId}`);
          const favoriteIds = response.data.map(favorite => favorite.movie_id);

          // Obtener los detalles completos de cada película desde api.themoviedb.org
          const movieDetailsPromises = favoriteIds.map(id =>
            axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
              },
            })
          );

          const movies = await Promise.all(movieDetailsPromises);
          setFavorites(movies.map(movie => movie.data));
        } catch (error) {
          console.error('Error fetching favorites:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchFavorites();
  }, [user]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId);
  };

  if (!user) {
    return <p>Please log in to see your favorites.</p>;
  }

  return (

    <Container className='bg-gray' style={{color: 'white'}}>
      <Row>
        <Col xs lg="2" className='pt-5'>
          <FilterBar onSearch={handleSearch} onGenreSelect={handleGenreSelect} />
        </Col>
        <Col lg='10' className='pt-5 p-5'>
        <h1>Your Favorites</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Row>
          {favorites.map(movie => (
            <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieComponent movie={movie} />
            </Col>
          ))}
        </Row>
      )}
        </Col>
      </Row>
    </Container>

  );
};

export default FavoritesPage;