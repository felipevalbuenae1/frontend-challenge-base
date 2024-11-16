// hello-action.ts
import 'dotenv/config';

export const helloAction = async (
  name: string,
): Promise<{
  message: string;
}> => {
  const token = process.env.TMDB_BEARER_TOKEN;
  if (!token) {
    throw new Error('TMDB Bearer Token is not defined in .env file');
  }

  // Example of using the token in a request
  const response = await fetch('https://api.themoviedb.org/3/movie/popular', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data from TMDB');
  }

  const data = await response.json();

  return Promise.resolve({ message: `Hello ${name}, from server!`, data });
};