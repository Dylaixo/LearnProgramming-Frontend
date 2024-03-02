import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { registerActions } from '../../store/registerForm-slice';
import './Forms.css'
function RegisterForm() {

  const dispatch = useDispatch();
  const dataForm = useSelector(state => state.registerForm.data)
  const isAuth = useSelector(state=> state.registerForm.isAuth)
  const authCode = useSelector(state=> state.registerForm.authCode)
  const [isAdded, setIsAdded] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(registerActions.setData({ ...dataForm, [name]: value }));
  };

  const handleVerificationCodeChange = (event) => {
    dispatch(registerActions.setAuthCode(event.target.value));
  };
console.log(dataForm)
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://34.136.176.140:8000/api/users/', dataForm);
      console.log(response.data);
      console.log(JSON.stringify(response.data))
      console.log('wysłano kod na email: ' + JSON.stringify(dataForm.email))
      setIsAdded(!isAdded)
      dispatch(registerActions.setIsCode())
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await axios.post(`http://34.136.176.140:8000/api/users/`, {
        email: dataForm.email,
        code: authCode,
      });
      console.log(JSON.stringify(response.data))
      if (response.data.activated === true) {
        setInterval(function() {
          window.location.reload();
        }, 1000);
      } else {
        console.log('Verification failed!');
      }
    } catch (error) {
      console.error(error);
      alert("Błędny kod!")
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Nazwa użytownika</Form.Label>
        <Form.Control type="username" placeholder="Username" name="username" value={dataForm.username} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Adres e-mail</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" value={dataForm.email} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Hasło</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" value={dataForm.password} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Potwierdz hasło</Form.Label>
        <Form.Control type="password" placeholder="Confirm password" name="password2" value={dataForm.password2} onChange={handleChange} />
        <Form.Text className="text-muted">
          Nigdy nie udostępniaj swojego hasła!
        </Form.Text>
      </Form.Group>
        <Button variant="primary" className='register-button' type="submit">
          Zarejestruj
        </Button>
        {isAdded && (<p>Zaejestrowano pomyślnie, teraz możesz się zalogować</p>)}
    </Form>
  );
}

export default RegisterForm;