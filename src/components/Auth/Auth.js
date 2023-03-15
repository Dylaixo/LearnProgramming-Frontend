import { useState } from 'react';
import axios from 'axios';

function Auth() {

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };
  const token = localStorage.getItem('token');
  return (

    <div>
      <button onClick={handleLogout}>Logout</button>
      <p>Token: {token}</p>
    </div>
  );
}

export default Auth;