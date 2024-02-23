import React from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from '../../store/loginForm-slice';

const LoginForm = () => {

    const dispatch = useDispatch();
    // const loggedIn = useSelector(state => state.loginForm.setLoggedIn)
    const errors = useSelector(state => state.loginForm.errors)
    const dataForm = useSelector(state => state.loginForm.data)

    const handleLogin = async (e) => {
      e.preventDefault();
      const data = { body: dataForm };
      const headers = {
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'multipart/form-data'
      };
      console.log(dataForm)
      try {
        const response = await axios.post('http://34.136.176.140:8000/api/token/', data.body, { headers });
        console.log(response.data.access_token)
        console.log(data.body)
        const token = response.data.access;
        localStorage.setItem('token', token);
        dispatch(loginActions.setLoggedIn())
        window.location.reload();
      } catch (error) {
        console.error(error.response);
        alert("Błędny login lub hasło!")
      }
    };

    const handleChange = (event) => {
      const { name, value } = event.target;
      dispatch(loginActions.setData({ ...dataForm, [name]: value }));
    };

    // const token = localStorage.getItem('token');

    return (
      <div className="container">
        <h1>Logowanie</h1>
        {errors.non_field_errors && <Alert variant="danger">{errors.non_field_errors}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Nazwa użytkownika</Form.Label>
            <Form.Control type="text" placeholder="Enter username" name="username" value={dataForm.username} onChange={handleChange} isInvalid={!!errors.username} />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Hasło</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" value={dataForm.password} onChange={handleChange} isInvalid={!!errors.password} />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
        {/* {token == null ? <p>Nie jesteś zalogowany</p> : <p>Zalogowany</p>} */}
          <Button variant="primary" type="submit">
            Zaloguj
          </Button>
        </Form>
      </div>
    );
  };

  export default LoginForm;