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
import { Col, Container, Row } from 'react-bootstrap';
import MovieComponent from '../components/MovieComponent';

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

    <Container className='bg-gray' style={{color: 'white'}}>
      <Row>
        <Col xs lg="2" className='pt-5'>
          <FilterBar onSearch={handleSearch} onGenreSelect={handleGenreSelect} />
        </Col>
        <Col lg='10' className='pt-5 p-5'>
        <div>
      <h1>Search Results for "{query}"</h1>
      <div className={styles.grid}>
        {movies.map(movie => (
          <MovieComponent key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
        </Col>
      </Row>
    </Container>

    
    </>
    
  );
};

export default SearchResults;