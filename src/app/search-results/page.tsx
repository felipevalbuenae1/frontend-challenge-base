// src/app/search-results/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from './SearchResults.module.css'; // Import CSS module for styling
import MainBanner from '../components/Header/MainBanner';
import FilterBar from '../components/FilterBar';

const SearchResults = () => {
  interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
  }
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const searchParams = useSearchParams();
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const query = searchParams.get('query');
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
        },
        params: {
          query,
        },
      });
      setMovies(response.data.results);
    };

    if (query) {
      fetchMovies();
    }
  }, [query]);

  useEffect(() => {
    console.log('search term:', searchTerm);
    console.log('selected genre:', selectedGenre);
  }
  , [searchTerm, selectedGenre]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId);
  };

  const handleMovieClick = (id) => {
    router.push(`/movie-details/${id}`);
  };

  return (
    <>
    <MainBanner />
    <FilterBar onSearch={handleSearch} onGenreSelect={handleGenreSelect} />
    <div>
      <h1>Search Results for "{query}"</h1>
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
    </div>
    </>
    
  );
};

export default SearchResults;