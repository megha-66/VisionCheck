import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SnellenChart from '../components/SnellenChart';
import ContrastTest from '../components/ContrastTest';
import AstigmatismTest from '../components/AstigmatismTest';
import ColorBlindnessTest from '../components/ColorBlindnessTest';

const TestPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [score, setScore] = useState(null);

  const handleTestComplete = (testScore) => {
    setScore(testScore);

    // You could send this score to the backend later
    console.log(`Test "${type}" completed. Your Score : ${testScore}`);

    setTimeout(() => {
      navigate('/results', { state: { score: testScore, type } });
    }, 1000);
  };

  const renderTest = () => {
    switch (type) {
      case 'snellen':
        return <SnellenChart onSubmit={handleTestComplete} />;
      case 'contrast':
	return <ContrastTest onSubmit={handleTestComplete} />;
      case 'astigmatism':
        return <AstigmatismTest onSubmit={handleTestComplete} />;
      case 'color':
	return <ColorBlindnessTest onSubmit={handleTestComplete} />;
      default:
        return <p>Test not implemented yet.</p>;

    }
  };

return (
    <div className="container1">
      {renderTest()}
    </div>
  );
};

export default TestPage;

