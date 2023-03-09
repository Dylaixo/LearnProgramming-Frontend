import { useState } from 'react';
import axios from 'axios';
import Nonauth from '../Nonauth/Nonauth';

function PostRequest() {

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };
  const token = localStorage.getItem('token');
  return (
    
    <div>
        {token != null ? <p>xdxdx</p> : <Nonauth></Nonauth> }
      <button onClick={handleLogout}>Logout</button>
      <p>Token: {token}</p>
    </div>
  );
}

export default PostRequest;