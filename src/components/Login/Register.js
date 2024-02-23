import React from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import RegisterForm from './RegisterForm';
import { useDispatch, useSelector } from 'react-redux';
import {sideFormActions} from '../../store/offcanvas-slice';
import { registerActions } from '../../store/registerForm-slice';

function Register() {
  const showRegister = useSelector(state => state.sideForm.showRegister)
  const isAuth = useSelector(state => state.registerForm.isAuth)
  const dispatch = useDispatch();

  const handleCloseRegister = () => {
    dispatch(sideFormActions.setRegister());
    if(isAuth){
      dispatch(registerActions.setIsCode())
    }
  };

  const handleShowRegister = () => {
    dispatch(sideFormActions.setRegister());
  };

  return (
    <>
      <Button variant="outline-primary" onClick={handleShowRegister}>
        Zarejestruj się
      </Button>
      <Offcanvas show={showRegister} onHide={handleCloseRegister}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Rejestracja</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <RegisterForm/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default Register;