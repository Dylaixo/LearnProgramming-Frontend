import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import LoginForm from './LoginForm';

function Register() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className='log' variant="outline-primary" onClick={handleShow}>
        Log in
      </Button>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Log in</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <LoginForm />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default Register;