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
      setLoading(false);
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
        <button onClick={handleLoadMore} className={styles.loadMoreButton}>Load More</button>
      )}
    </div>
    </>
  );
};

export default GenreResults;