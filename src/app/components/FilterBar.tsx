// src/components/FilterBar.tsx
"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const FilterBar = ({ onSearch, onGenreSelect }) => {
    
  const [searchTerm, setSearchTerm] = useState('');
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
        },
      });
      setGenres(response.data.genres);
    };

    fetchGenres();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    router.push(`/search-results?query=${searchTerm}`);
  };

  const handleGenreSelect = (genreId) => {
    onGenreSelect(genreId);
    router.push(`/genre-results?genreId=${genreId}`);
  };

  return (
    <div className="filter-bar">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {genres.map(genre => (
          <li key={genre.id} onClick={() => handleGenreSelect(genre.id)}>
            {genre.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterBar;