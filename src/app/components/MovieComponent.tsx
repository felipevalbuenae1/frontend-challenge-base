// src/components/MovieComponent.tsx
import React from 'react';
import MarkFavorite from './MarkFavorite';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './components.module.css'; // Import CSS module for styling
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { Col, Container, Row } from 'react-bootstrap';

const MovieComponent = ({ movie }) => {
  const router = useRouter();

  const handleMovieClick = (id) => {
    router.push(`/movie-details/${id}`);
  };
  return (
    <>
     <div  key={movie.id} className={`${styles.card} bg-gray-card`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={styles.image}
                style={{cursor: 'pointer'}}
                onClick={() => handleMovieClick(movie.id)}
              />
              <div className='p-2'>
                <h6 className='text-start' style={{minHeight: '50px', fontSize: '12px'}}>{movie.title}</h6>
                <p className='text-start' style={{fontSize: '10px'}}>{movie.release_date}</p>
                <Container>
                  <Row>
                    <Col className='d-flow' lg='6'>
                      <p style={{fontSize: '10px'}}>Rating</p>
                      <div style={{ width: 35, height: 35 }} className='m-auto'>
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
                    </Col>
                    <Col  className='d-flow' lg='6'>
                      <p style={{fontSize: '10px'}}>Favorites</p>
                      <MarkFavorite movieId={movie.id} />
                    </Col>
                  </Row>
                </Container>
              </div>   
            </div>  
    </>
  );
};

export default MovieComponent;