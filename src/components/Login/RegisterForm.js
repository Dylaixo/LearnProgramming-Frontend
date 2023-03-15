import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [authCode, setAuthCode] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleVerificationCodeChange = (event) => {
    setVerificationCode(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/register', formData);
      console.log(response.data);
      console.log(JSON.stringify(response.data))
      console.log('wysłano kod na email: ' + JSON.stringify(response.data.email))
      setAuthCode(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/activate?code=${verificationCode}`, {
        email: formData.email,
        code: verificationCode,
      });
      console.log(JSON.stringify(response.data))
      if (response.data.activated == true) {
        setInterval(function() {
          window.location.reload();
        }, 1000);
        alert("Utworzono konto!")
      } else {
        console.log('Verification failed!');
        // handle failed verification'
        // setInterval
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
        <Form.Control type="username" placeholder="Username" name="username" value={formData.username} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
        <Form.Text className="text-muted">
          We'll never share your password with anyone else.
        </Form.Text>
      </Form.Group>

      {authCode ? (
        <Form.Group className="mb-3" controlId="formBasicCode">
          <Form.Label>Enter code:</Form.Label>
          <Form.Control type="string" placeholder="Enter verification code..." name="code" value={verificationCode} onChange={handleVerificationCodeChange} />
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
