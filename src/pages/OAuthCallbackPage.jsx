import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { completeOAuthLogin } from '../oauth';

const OAuthCallbackPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const { returnTo } = completeOAuthLogin();
      navigate(returnTo, { replace: true });
    } catch (oauthError) {
      setError(oauthError.message);
    }
  }, [navigate]);

  if (error) {
    return (
      <div className="container auth-container">
        <div className="auth-card">
          <p className="auth-eyebrow">OAuth error</p>
          <h1>Sign in failed</h1>
          <p className="auth-error">{error}</p>
          <Link className="auth-button secondary" to="/login">Back to sign in</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container auth-container">
      <div className="auth-card">
        <p className="auth-eyebrow">OAuth callback</p>
        <h1>Signing you in…</h1>
        <p>Completing your OAuth session.</p>
      </div>
    </div>
  );
};

export default OAuthCallbackPage;
