import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Nonauth from '../Nonauth/Nonauth';
import Auth from '../Auth/Auth';
import Container from 'react-bootstrap/esm/Container';
import "./App.css"
function App() {
  const token = localStorage.getItem('token');
  return (
    /*<div>
         {token == null ? <Nonauth /> : <Auth />}
    </div>*/
    <Container fluid >
    <div>
      <Auth></Auth>
    </div>
    </Container>
  );
}

export default App;
