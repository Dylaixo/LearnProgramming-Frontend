import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigaiton from '../Navigation/Navigaiton';
import Slider from '../Slider/Slider';
import About from '../About/About';


function App() {
  return (
    <div className='content'>
      <Navigaiton/>
      <About></About>
      <Slider/>
    </div>
  );
}

export default App;
