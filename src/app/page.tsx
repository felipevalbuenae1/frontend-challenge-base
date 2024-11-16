// src/app/page.tsx
"use client";

import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import MainBanner from './components/Header/MainBanner';
import GenreCarousel from './components/GenreCarousel';
import FilterBar from './components/FilterBar';

const Home = () => {
  // const [genres, setGenres] = useState<{ id: number; name: string; count: number }[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const categories = [ 'popular', 'upcoming' , 'now_playing', 'top_rated']
  const { user } = useContext(AuthContext);

  // useEffect(() => {
  //   const fetchGenres = async () => {
  //     const genreResponse = await axios.get(`https://api.themoviedb.org/3/genre/movie/list`, {
  //       headers: {
  //         Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
  //       },
  //     });
  //     const genres = genreResponse.data.genres;

  //     const genreCounts = await Promise.all(
  //       genres.map(async (genre) => {
  //         const moviesResponse = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
  //           headers: {
  //             Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
  //           },
  //           params: {
  //             with_genres: genre.id,
  //           },
  //         });
  //         return { ...genre, count: moviesResponse.data.total_results };
  //       })
  //     );

  //     genreCounts.sort((a, b) => b.count - a.count);
  //     setGenres(genreCounts);
  //   };

  //   fetchGenres();
  // }, []);

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

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      partialVisibilityGutter: 40 // this is needed to show the partially visible items
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      partialVisibilityGutter: 20 // this is needed to show the partially visible items
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 50 // this is needed to show the partially visible items
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 30 // this is needed to show the partially visible items
    }
  };

  return (
    <>
    <MainBanner />
    <FilterBar onSearch={handleSearch} onGenreSelect={handleGenreSelect} />
      <div>
        <h1>Movies by Genre</h1>
        {categories.map((genre) => (
          <GenreCarousel endpoint={genre} />
        ))}
      </div>
    </>
  );
};

export default Home;