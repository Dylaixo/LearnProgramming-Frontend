import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nonauth from '../Nonauth/Nonauth';
import PostRequest from '../test/test';


function App() {
  const token = localStorage.getItem('token');
  return (
    <div className='content'>
        {token == null ?  <Nonauth/> : <PostRequest/>}
    </div>
  );
}

export default App;
