import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth';

const HomePage = () => {
  const { logout, user } = useAuth();
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
          <p className="user-greeting">Signed in as {user?.name || user?.email}</p>
        </div>
        <button className="logout-button" onClick={logout} type="button">Sign out</button>
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

