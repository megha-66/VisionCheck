import React, {useState} from 'react';

const contrastLevels = Array.from({ length: 25 }, (_, i) => {
  const invertedIndex = 24 - i; // reverse the direction
  const value = 255 - Math.pow(invertedIndex / 24, 1.5) * 255;
  const gray = Math.round(value).toString(16).padStart(2, '0');
  return {
    bg: '#ffffff',
    fg: `#${gray}${gray}${gray}`,
    text: Array.from({ length: 5 }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join(''),
  };
});


const ContrastTest = ({ onSubmit }) => {
  const [selected, setSelected] = useState(null);

  const handleSubmit = () => {
    if (selected !== null) {
      const maxLevel = contrastLevels.length;
      const finalScore = ((selected+1) / maxLevel) * 5; 
      onSubmit(finalScore);
    } else {
      alert('Please select the last line you could clearly read.');
    }
  };

  return (
    <div>
      <h1>Contrast Sensitivity Test</h1>
      <p class="fade-in">Click the last line you can read clearly. Scroll down upto the bottom and check!</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {contrastLevels.map((level, i) => (
          <div
            key={i}
            onClick={() => setSelected(i)}
            style={{
              backgroundColor: level.bg,
              color: level.fg,
              padding: '12px',
              border: selected === i ? '2px solid green' : '1px solid #ccc',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '20px',
              textAlign: 'center',
              borderRadius: '6px',
            }}
          >
		{level.text}
          </div>
        ))}
      </div>

      <button onClick={handleSubmit} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Submit Score
      </button>
    </div>
  );
};

export default ContrastTest;

