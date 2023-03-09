import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nonauth from '../Nonauth/Nonauth';


function App() {
  return (
    <div className='content'>
      <Nonauth/>
      <Navigaiton/>
      <About></About>
      <Slider/>
      <Options />
    </div>
  );
}

export default App;
