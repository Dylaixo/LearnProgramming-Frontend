import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nonauth from '../Nonauth/Nonauth';
import PostRequest from '../test/test';


function App() {
  return (
    <div className='content'>
      <Nonauth/>
      <PostRequest></PostRequest>
    </div>
  );
}

export default App;
