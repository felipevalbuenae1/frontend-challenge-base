// src/app/movie-details/[id]/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from '../MovieDetails.module.css'; // Import CSS module for styling

interface Movie {
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  genres: { name: string }[];
}

const MovieDetails = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
        },
      });
      setMovie(response.data);
    };

    if (id) {
      fetchMovie();
    }
  }, [id]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className={styles.image}
      />
      <div className={styles.details}>
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <div style={{ width: 100, height: 100 }}>
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
        <p>Runtime: {movie.runtime} minutes</p>
        <p>Genres: {movie.genres.map(genre => genre.name).join(', ')}</p>
      </div>
    </div>
  );
};

export default MovieDetails;