// src/components/Navbar.tsx
"use client";

import { useContext, useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import AuthContext from '../../../context/AuthContext';
import AuthModal from '../AuthModal';
import  logo  from "@public/Logo.png";

const AppNavbar = () => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  return (
    <>
    <Navbar bg="black" variant="dark" expand="lg" className='inter-regular'>
      <Container>
        <Navbar.Brand href="/">
        <img
              alt=""
              src={logo.src}
              
              className="d-inline-block align-top"
            />{' '}
        
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto inter-regular">
            <Nav.Link className='p-4' href="/">Popular</Nav.Link>
            <Nav.Link className='p-4' href="/about">Favorites</Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <Button variant="outline-light" onClick={logout}>Logout</Button>
            ) : (
              <Button variant="outline-light" style={{borderRadius: '100%', aspectRatio: '1 / 1', padding: 0}} onClick={() => setAuthModalOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width={30} fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg>
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
    
  );
};

export default AppNavbar;