// src/app/movie-details/[id]/generateStaticParams.ts
import axios from 'axios';

export async function generateStaticParams() {
  // Fetch a list of movies to pre-render
  const response = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
    },
  });

  const movies = response.data.results;

  return movies.map(movie => ({
    id: movie.id.toString(),
  }));
}