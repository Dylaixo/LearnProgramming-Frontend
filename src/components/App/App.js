import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Nonauth from '../Nonauth/Nonauth';
import Auth from '../Auth/Auth';


function App() {
  const token = localStorage.getItem('token');
  return (
    <div>
      {token == null ? <Nonauth /> : <Auth />}
    </div>
  );
}

export default App;
