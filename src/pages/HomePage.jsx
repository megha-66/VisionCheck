import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearOAuthSession, getOAuthConfig, getOAuthSession } from '../oauth';

const HomePage = () => {
  const navigate = useNavigate();
  const session = getOAuthSession();
  const { providerName } = getOAuthConfig();
  const handleSignOut = () => {
    clearOAuthSession();
    navigate('/login', { replace: true });
  };

  const tests = [
    { name: 'Snellen Chart Test', path: 'snellen' },
    { name: 'Contrast Sensitivity Test', path: 'contrast' },
    { name: 'Astigmatism Test', path: 'astigmatism' },
    { name: 'Color Blindness (Ishihara) Test', path: 'color' },
  ];

  return (
    <div className="container">
      <div className="home-header">
        <div>
          <h1>VisionCheck</h1>
          <p className="user-greeting">Signed in with {session?.provider || providerName}</p>
        </div>
        <button className="logout-button" onClick={handleSignOut} type="button">Sign out</button>
      </div>
      <p className="fade-in">Welcome! Select a vision test below to begin:</p>
      <p> For all of the tests below, you need to maintain a distance of 35cm from your screen and remove your glasses (if any) </p>

      <ul>
        {tests.map((test) => (
          <li key={test.path} style={{ margin: '10px 0' }}>
            <Link to={`/test/${test.path}`} style={{ fontSize: '30px', color:'black' }}>
              {test.name}
            </Link>
          </li>
        ))}
      </ul>

      <hr />
    </div>
  );
};

export default HomePage;

