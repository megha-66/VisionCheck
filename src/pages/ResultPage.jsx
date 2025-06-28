import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, type } = location.state || {};

  const getFeedback = (score) => {
    if (score >= 4) return 'Your Vision is pretty clear! Keep it up 👍';
    if (score === 3) return 'Average vision. Consider testing again or seeing a specialist.';
    if (score <= 2) return 'Low vision. Please consult an eye care professional.';
    return '';
  };

  const testNameMap = {
    snellen: 'Snellen Chart Test',
    contrast: 'Contrast Sensitivity Test',
    astigmatism: 'Astigmatism Test',
    color: 'Color Blindness (Ishihara) Test',
  };

  if (score === undefined || type === undefined) {
    return (
      <div className="container">
        <h1>Invalid Result</h1>
        <p>No result data found.</p>
        <button onClick={() => navigate('/')} style={{ marginTop: '20px', padding: '10px 20px' }}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="container1" style={{ textAlign: 'center', padding: '5rem' }}>
      <h2>Test Complete!</h2>
      <h3>{testNameMap[type] || type}</h3>

      <p><strong>Your Score:</strong> {score} / 5</p>
      <p>{getFeedback(score)}</p>

      <button onClick={() => navigate('/')} style={{ marginTop: '50px', padding: '17px 35px' }}>Back to Home</button>
    </div>
  );
};

export default ResultPage;

