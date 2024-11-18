// src/components/MainBanner.tsx
"use client";

import { useState, useEffect } from 'react';

import { Carousel, Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import MarkFavorite from '../MarkFavorite';

const MainBanner = () => {
  const [banners, setBanners] = useState<{ id: number; title: string; backdrop_path: string; overview: string; vote_average:number }[]>([]);

  useEffect(() => {
    const fetchBanners = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
        },
      });
      console.log(response.data.results);
      setBanners(response.data.results);
    };

    fetchBanners();
  }, []);

  return (
    <Carousel indicators={false} pause={'hover'}>
      {banners.map(banner => (
        <Carousel.Item key={banner.id} style={{maxHeight: '436px'}}>
          <div className='d-flex'>
            <img
            style={{objectFit: 'cover', maxHeight: '436px'}}
              className="d-block w-100"
              src={`https://image.tmdb.org/t/p/w1280${banner.backdrop_path}`}
              alt={banner.title}
            />
            <div className='position-absolute w-100' style={{maxHeight: '436px', height: '436px', boxShadow: '#000 8px -200px 161px inset'}}></div>
            <Carousel.Caption style={{textAlign: 'left', left: '5%'}}>

            <Container fluid={true}>
              <Row>
                <Col>
                  <h3>{banner.title}</h3>
                  <p>{banner.overview}</p>
                </Col>
                <Col style={{display: 'flex', float: 'inline-end', justifyContent: 'flex-end'}}>
                
                <MarkFavorite movieId={banner.id}/>
                  <div style={{ width: 92, display: 'flex', float: 'inline-end', margin: 0, marginLeft: '50px'}}>
                    <CircularProgressbar
                      value={Math.ceil(banner.vote_average * 10)}
                      text={`${Math.ceil(banner.vote_average * 10)}%`}  
                      styles={buildStyles({
                        textSize: '30px',
                        pathColor: `rgba(11, 251, 5, ${banner.vote_average / 10})`,
                        textColor: 'white',
                        trailColor: '#d6d6d6',
                        backgroundColor: '#3e98c7',
                      })}
                    />
                  </div>
                </Col>
              </Row>
            </Container>
                      
            </Carousel.Caption>
          </div>
        
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default MainBanner;