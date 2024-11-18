"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button, Form } from 'react-bootstrap';

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

  const handleGenreSelect = (e) => {
    const genreId = e.target.value;
    onGenreSelect(genreId);
    router.push(`/genre-results?genreId=${genreId}`);
  };

  return (
    <div className="filter-bar">
      <form onSubmit={handleSearchSubmit}>
        Search
        <div className='d-flex' style={{position: 'relative'}}>
          <Form.Control
            className='bg-dark text-white'
            style={{width: '-webkit-fill-available', color: 'white'}}
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Button className='border-light border-right-0' variant='dark' type="submit" style={{position: 'absolute', right: 0, borderLeft: 0, borderRadius: 'initial'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
          </Button>
        </div>
      </form>
      <Form.Select aria-label="Select genre" onChange={handleGenreSelect} className="mt-3 bg-dark text-light">
        <option value="">Select genre</option>
        {genres.map(genre => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </Form.Select>
    </div>
  );
};

export default FilterBar;