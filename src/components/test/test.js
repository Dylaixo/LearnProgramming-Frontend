import { useState } from 'react';
import axios from 'axios';

function PostRequest() {
  const [token, setToken] = useState('');
  const handleLogin = async () => {
    const data = { body: { username: 'user1', password: 'user1'} };
    const headers = {
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'multipart/form-data'
      };
    try {
      const response = await axios.post('http://127.0.0.1:8000/login', data.body, { headers });
      console.log(response.data.access_token);
      setToken(response.data.access_token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <p>Token: {token}</p>
    </div>
  );
}

export default PostRequest;