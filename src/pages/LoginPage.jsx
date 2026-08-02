import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';

const LoginPage = () => {
  const { isAuthenticated, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', name: '' });
  const [error, setError] = useState('');

  const destination = location.state?.from?.pathname || '/';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (!formData.email.trim()) {
      setError('Please enter your email address to continue.');
      return;
    }

    login({ email: formData.email.trim(), name: formData.name.trim() });
    navigate(destination, { replace: true });
  };

  if (isAuthenticated) {
    return (
      <div className="container auth-container">
        <div className="auth-card">
          <h1>Welcome back</h1>
          <p>You are already signed in.</p>
          <Link className="auth-button secondary" to={destination}>Continue to VisionCheck</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <p className="auth-intro">Create a local profile to keep your test session private on this device.</p>

        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          onChange={handleChange}
          placeholder="Your name"
          type="text"
          value={formData.name}
        />

        <label htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          onChange={handleChange}
          placeholder="you@example.com"
          type="email"
          value={formData.email}
        />

        {error && <p className="auth-error">{error}</p>}

        <button className="auth-button" type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default LoginPage;
