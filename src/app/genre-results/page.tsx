// src/app/genre-results/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from './GenreResults.module.css'; // Import CSS module for styling
import MainBanner from '../components/Header/MainBanner';
import FilterBar from '../components/FilterBar';
import MovieComponent from '../components/MovieComponent';
import { Button, Col, Container, Row } from 'react-bootstrap';

const GenreResults = () => {
  interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
  }

  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const genreId = searchParams.get('genreId');
  const router = useRouter();

  useEffect(() => {
    setMovies([]);
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
          },
          params: {
            with_genres: genreId,
            page,
          },
        });
        setMovies(prevMovies => [...prevMovies, ...response.data.results]);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    if (genreId) {
      console.log('fetching movies for genre:', genreId);
      fetchMovies();
    }
  }, [genreId]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
          },
          params: {
            with_genres: genreId,
            page,
          },
        });
        setMovies(prevMovies => [...prevMovies, ...response.data.results]);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    if (genreId) {
      console.log('fetching movies for genre:', genreId);
      fetchMovies();
    }
  }, [page]);

  useEffect(() => {

    

  }
  , [movies]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleMovieClick = (id) => {
    router.push(`/movie-details/${id}`);
  };

  return (
    <>
      <MainBanner />

      <Container className='bg-gray' style={{color: 'white'}}>
      <Row>
        <Col xs lg="2" className='pt-5'>
          <FilterBar onSearch={handleSearch} onGenreSelect={handleGenreSelect} />
        </Col>
        <Col lg='10' className='pt-5 p-5'>
        <div>
          <h1>Movies in Genre {genreId}</h1>
          <div className={styles.grid}>
            {movies.map(movie => (
              <MovieComponent key={movie.id} movie={movie} />

            ))}
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className='d-flex justify-content-center m-5'>
              <Button onClick={handleLoadMore} className={`${styles.loadMoreButton} text-center warning`} variant='warning'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
          </svg>
          Load More
            
          </Button>
            </div>
            
          )}
        </div>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default GenreResults;