import React, { useState } from 'react';
import { snellenRows } from '../data/snellenData';

const SnellenChart = ({ onSubmit }) => {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleSelect = (level) => {
    setSelectedLevel(level);
  };

  const handleSubmit = () => {
    if (selectedLevel !== null) {
      const totalLevels = snellenRows.length;
      const scaledScore = Math.round((selectedLevel / (totalLevels - 1)) * 5); // Normalized to 0–5
      onSubmit(scaledScore);
    } else {
      alert('Please select a row');
    }
  };

  return (
    <div>
      <h1>Snellen Eye Chart</h1>
      <p class="fade-in"> Please select the last row whose alphabets are clearly visible to you. Scroll down upto the bottom to see all the rows. </p>
      <div style={{ marginBottom: '5rem'}}>
        {snellenRows.map((row, index) => (
          <div
            key={index}
            onClick={() => handleSelect(row.level)}
            style={{
              fontSize: row.size,
              cursor: 'pointer',
              fontWeight: selectedLevel === row.level ? 'bold' : 'normal',
              backgroundColor: selectedLevel === row.level ? '#d0f0d0' : 'lightyellow',
              padding: '10px 0',
              textAlign: 'center',
            }}
          >
            {row.letters}
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} style={{ marginTop: '20px', padding: '16px 32px' }}>Submit Score</button>
    </div>
  );
};

export default SnellenChart;

