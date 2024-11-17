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
      await axios.post('http://localhost:3000/auth/signup', {
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
              <Nav variant="tabs" className='modalNavTabs'>
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="register">Register</Nav.Link>
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
                    <Form.Label>Username or Email</Form.Label>
                    <Form.Control
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                    </Form>
                  </Col>
                  <Col style={{backgroundColor: 'black', borderRadius: '5px'}}>
                    <h2>Welcome back!</h2>
                    <img className='img-login' src="/login.png" alt="Logo" style={{}} />
                  </Col>
                </Row>
              </Container>
            </Tab.Pane>
            <Tab.Pane eventKey="register">
              <Form onSubmit={handleRegisterSubmit}>
                <Form.Group className="mb-3" controlId="registerUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="registerEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="registerPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </Form>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;