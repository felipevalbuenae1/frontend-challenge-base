// src/components/GenreCarousel.tsx
"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import MovieComponent from './MovieComponent';
import './components.module.css'
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    partialVisibilityGutter: 30 // this is needed to show the partially visible items
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    partialVisibilityGutter: 20 // this is needed to show the partially visible items
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 30 // this is needed to show the partially visible items
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30 // this is needed to show the partially visible items
  }
};

const GenreCarousel = ({ endpoint }) => {
  const [movies, setMovies] = useState<{ id: number; title: string; poster_path: string; vote_average: number; release_date: string }[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
        },
        params: {
          pages: 1,
        },
      });
      setMovies(response.data.results);
    };

    fetchMovies();
  }, [endpoint]);

  return (
    <div className='mb-5 p-3'>
      <h2 className='p-3 first-letter-genre'>{endpoint}</h2>
      <Carousel
        responsive={responsive}
        partialVisible={true}
        itemClass="carousel-item-padding-40-px"
      >
        {movies.map(movie => (
          <div style={{ padding: '0 10px' }}>
            <MovieComponent movie={movie} />
            {/* <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{ width: '100%', height: 'auto', pointerEvents: 'none'}}
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
            <p>Release Date: {movie.release_date}</p> */}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default GenreCarousel;