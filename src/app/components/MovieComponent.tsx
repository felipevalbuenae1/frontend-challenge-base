// src/components/MovieComponent.tsx
import React from 'react';
import MarkFavorite from './MarkFavorite';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

const MovieComponent = ({ movie }) => {
  return (
    <>
        <img
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
            <p>Release Date: {movie.release_date}</p>
      <h2>Movie Title</h2>
      <MarkFavorite movieId={movie.id} />
    </>
  );
};

export default MovieComponent;