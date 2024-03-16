import React from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import LoginForm from './LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import {sideFormActions} from '../../store/offcanvas-slice';

function Login() {
  const showLogin = useSelector(state => state.sideForm.showLogin)
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(sideFormActions.setLogin());
  };

  const handleShow = () => {
    dispatch(sideFormActions.setLogin());
  };

  return (
    <>
      <Button className='log' variant="outline-primary" onClick={handleShow}>
        Zaloguj się
      </Button>
      <Offcanvas show={showLogin} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Zaloguj się</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <LoginForm />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default Login;