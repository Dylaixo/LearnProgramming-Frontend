import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
  
    const handleLogin = async (e) => {
      e.preventDefault();
      const data = { body: { username: 'user1', password: 'user1'} };
      const headers = {
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'multipart/form-data'
      };
      try {
        const response = await axios.post('http://127.0.0.1:8000/login', data.body, { headers });
        console.log(response.data.access_token)
        const token = response.data.access_token;
        localStorage.setItem('token', token);
        setLoggedIn(true);
      } catch (error) {
        console.error(error.response);
        setErrors(error.response.data.detail.reduce((acc, error) => {
          const field = error.loc[1];
          acc[field] = error.msg;
          return acc;
        }, {}));
      }
    };
    const handleLogout = () => {
      localStorage.removeItem('token');
      setLoggedIn(false);
    };
    const token = localStorage.getItem('token');
    return (
      <div className="container">
        <h1>Login</h1>
        {errors.non_field_errors && <Alert variant="danger">{errors.non_field_errors}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} isInvalid={!!errors.username} />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>
  
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} isInvalid={!!errors.password} />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
        {token == null ? <p>Nie jesteś zalogowany</p> : <p>Zalogowany</p>}
          <Button variant="primary" type="submit">
            Login
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Form>
      </div>
    );
  };
  
  export default LoginForm;