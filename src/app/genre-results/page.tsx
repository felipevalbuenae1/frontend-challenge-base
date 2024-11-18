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
import { Button } from 'react-bootstrap';

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
      fetchMovies();
    }
  }, [genreId, page]);

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
      <FilterBar onSearch={handleSearch} onGenreSelect={handleGenreSelect} />
      <div>
        <h1>Movies in Genre {genreId}</h1>
        <div className={styles.grid}>
          {movies.map(movie => (
            <div key={movie.id} className={styles.card} onClick={() => handleMovieClick(movie.id)}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={styles.image}
              />
              <h3>{movie.title}</h3>
              <div style={{ width: 50, height: 50 }}>
                <CircularProgressbar
                  value={Math.ceil(movie.vote_average * 10)}
                  text={`${Math.ceil(movie.vote_average * 10)}%`}
                  styles={buildStyles({
                    textSize: '30px',
                    pathColor: `rgba(62, 152, 199, ${movie.vote_average / 10})`,
                    textColor: '#f88',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7',
                  })}
                />
              </div>
              <p>Release Date: {movie.release_date}</p>
            </div>
          ))}
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className='d-flex justify-content-center m-5'>
            <Button onClick={handleLoadMore} className={`${styles.loadMoreButton} text-center warning`} variant='warning'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
              </svg>
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default GenreResults;