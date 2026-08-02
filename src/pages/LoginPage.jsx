import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getOAuthConfig, isOAuthAuthenticated, startOAuthLogin } from '../oauth';

const LoginPage = () => {
  const location = useLocation();
  const [error, setError] = useState('');
  const destination = location.state?.from?.pathname || '/';
  const { clientId, authorizationUrl, providerName } = getOAuthConfig();
  const isConfigured = Boolean(clientId && authorizationUrl);

  const handleOAuthLogin = () => {
    setError('');

    try {
      startOAuthLogin(destination);
    } catch (oauthError) {
      setError(oauthError.message);
    }
  };

  if (isOAuthAuthenticated()) {
    return (
      <div className="container auth-container">
        <div className="auth-card">
          <p className="auth-eyebrow">Authenticated</p>
          <h1>Welcome back</h1>
          <p>You are already signed in with OAuth.</p>
          <Link className="auth-button secondary" to={destination}>Continue to VisionCheck</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container auth-container">
      <div className="auth-card">
        <p className="auth-eyebrow">Secure OAuth sign in</p>
        <h1>Sign in</h1>
        <p className="auth-intro">
          Continue with your configured OAuth identity provider to access VisionCheck tests.
        </p>

        {!isConfigured && (
          <p className="auth-error">
            OAuth is not configured yet. Add VITE_OAUTH_AUTHORIZATION_URL and VITE_OAUTH_CLIENT_ID to your environment.
          </p>
        )}

        {error && <p className="auth-error">{error}</p>}

        <button className="auth-button" disabled={!isConfigured} onClick={handleOAuthLogin} type="button">
          Continue with {providerName}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
