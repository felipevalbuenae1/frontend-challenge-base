// src/components/AuthModal.tsx
"use client";

import { useRouter } from 'next/navigation';
import AuthContext from '../../context/AuthContext';
import { useState, useContext } from 'react';
import { Modal, Tab, Nav, Button, Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const AuthModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [identifier, setIdentifier] = useState(''); // Puede ser username o email
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(identifier, password);
      onClose();
      router.push('/');
    } catch (error) {
      console.error('Error during login:', error);
      // Maneja el error de inicio de sesión
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://backend-challenge-base.vercel.app/auth/signup', {
        username,
        email: identifier,
        password
      });
      onClose();
      router.push('/');
    } catch (error) {
      console.error('Error during registration:', error);
      // Maneja el error de registro
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose} size='xl' style={{}}>
      <Modal.Header style={{display: 'flex', flexDirection: 'row-reverse', justifyContent: 'flex-end', color: 'white'}} closeButton>
        Back
      </Modal.Header>
      <Modal.Body>
        <Tab.Container activeKey={activeTab} onSelect={(k) => k && setActiveTab(k)}>
          <Container>
            
            <Row>
              
              <Col className='containerTabs'>
              <Nav variant="tabs" className='modalNavTabs border-0'>
                <Nav.Item>
                  <Nav.Link className='border-0 rounded' style={{color: 'white'}} eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className='border-0 rounded' style={{color: 'white'}} eventKey="register">Register</Nav.Link>
                </Nav.Item>
              </Nav>
              </Col>
              <Col>

              </Col>
            </Row>
          </Container>
         
          <Tab.Content>
            <Tab.Pane eventKey="login">
              <Container>
                
                <Row>
                  <Col className='containerFormLogin'>
                    <Form onSubmit={handleLoginSubmit}>
                  <Form.Group className="mb-3" controlId="loginIdentifier">
                    <Form.Label></Form.Label>
                    <p className='text-center text-light'>We love having you back</p>
                    <Form.Control
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="Username or Email"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="loginPassword">
                    <Form.Label></Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      required
                    />
                  </Form.Group>
                  <Button style={{width: '-webkit-fill-available' }} variant="warning" type="submit">
                  Continue
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-ticket-perforated" viewBox="0 0 16 16">
                      <path d="M4 4.85v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9z"/>
                      <path d="M1.5 3A1.5 1.5 0 0 0 0 4.5V6a.5.5 0 0 0 .5.5 1.5 1.5 0 1 1 0 3 .5.5 0 0 0-.5.5v1.5A1.5 1.5 0 0 0 1.5 13h13a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-.5-.5 1.5 1.5 0 0 1 0-3A.5.5 0 0 0 16 6V4.5A1.5 1.5 0 0 0 14.5 3zM1 4.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v1.05a2.5 2.5 0 0 0 0 4.9v1.05a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-1.05a2.5 2.5 0 0 0 0-4.9z"/>
                    </svg>
                  </Button>
                  <p className='text-center mt-5 text-light'>
                  For any questions, reach out to support@Quickbetdmovies.com
                  </p>
                    </Form>
                  </Col>
                  <Col style={{backgroundColor: '#1c1c1c', borderRadius: '5px 15px 20px 5px', color: 'white'}}>
                    <h2 className='text-center mt-5'>Welcome back to Quickbet Movies!</h2>
                    <p className='text-center'>🍿 Ready to dive into the world of unlimited entertainment? Enter your credentials and let the cinematic adventure begin!</p>
                    <img className='img-login' src="/login.png" alt="Logo" style={{marginTop: '-145px'}} />
                  </Col>
                </Row>
              </Container>
            </Tab.Pane>
            <Tab.Pane eventKey="register">
             
            <Container>
                
                <Row>
                  <Col className='containerFormLogin'>
                  <Form onSubmit={handleRegisterSubmit}>
                <Form.Group className="mb-3" controlId="registerUsername">
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="registerEmail">
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Email"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="registerPassword">
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                </Form.Group>
                <Button style={{width: '-webkit-fill-available' }} variant="warning" type="submit">
                  Register
                </Button>
              </Form>
                  </Col>
                  <Col style={{backgroundColor: '#1c1c1c', borderRadius: '5px 15px 20px 5px', color: 'white'}}>
                    <h2 className='text-center mt-5'>Welcome to Quickbet Movies!</h2>
                    <p className='text-center'>🎬 Ready to unlock a universe of cinematic delights? Sign up now and start your journey with us!</p>
                    <img className='img-login' src="/signup.png" alt="Logo" style={{marginTop: '-145px'}} />
                  </Col>
                </Row>
              </Container>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;