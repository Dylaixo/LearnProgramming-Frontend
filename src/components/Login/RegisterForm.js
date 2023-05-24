import React from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { registerActions } from '../../store/registerForm-slice';

function RegisterForm() {

  const dispatch = useDispatch();
  const dataForm = useSelector(state => state.registerForm.data)
  const isAuth = useSelector(state=> state.registerForm.isAuth)
  const authCode = useSelector(state=> state.registerForm.authCode)

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(registerActions.setData({ ...dataForm, [name]: value }));
  };

  const handleVerificationCodeChange = (event) => {
    dispatch(registerActions.setAuthCode(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/register', dataForm);
      console.log(response.data);
      console.log(JSON.stringify(response.data))
      console.log('wysłano kod na email: ' + JSON.stringify(dataForm.email))
      dispatch(registerActions.setIsCode())
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/activate?code=${authCode}`, {
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
        <Form.Label>Username</Form.Label>
        <Form.Control type="username" placeholder="Username" name="username" value={dataForm.username} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" value={dataForm.email} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" value={dataForm.password} onChange={handleChange} />
        <Form.Text className="text-muted">
          We'll never share your password with anyone else.
        </Form.Text>
      </Form.Group>

      {isAuth ? (
        <Form.Group className="mb-3" controlId="formBasicCode">
          <Form.Label>Enter code:</Form.Label>
          <Form.Control type="string" placeholder="Enter verification code..." name="code" value={authCode} onChange={handleVerificationCodeChange} />
          <Button variant="primary" type="button" onClick={handleVerifyCode}>
            Verify Code
          </Button>
        </Form.Group>
      ) : (
        <Button variant="primary" type="submit">
          Submit
        </Button>
      )}
    </Form>
  );
}

export default RegisterForm;