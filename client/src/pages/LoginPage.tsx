import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(loginData);

      if (response?.user?.role === 'parent') {
        navigate('/dashboard');
      } else {
        navigate('/child-dashboard');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input name="username" placeholder="Username" onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;