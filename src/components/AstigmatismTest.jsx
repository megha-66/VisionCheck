import React, { useState } from 'react';

const AstigmatismTest = ({ onSubmit }) => {
  const [showChoices, setShowChoices] = useState(false);

  const handleContinue = () => {
    setShowChoices(true);
  };

  const handleSelection = (choice) => {
    const score = choice === 'A' ? 5 : 2; // A = Normal, B = Possible Astigmatism
    onSubmit(score);
  };

  return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      <h1>Astigmatism Test</h1>

      {!showChoices ? (
        <>
          <p class="fade-in">Follow these 4 steps and see if you have astigmatism:</p>
          <ol style={{ textAlign: 'left', maxWidth: '500px', margin: 'auto' }}>
            <li>Take off your glasses. If you are wearing contact lenses, keep them in your eyes</li>
            <li>Cover first your right eye and then the left eye,one at a time for completing this test.</li>
            <li>Maintain a minimum distance of 35 cm from your screen</li>
            <li>Take a look at the picture below with both eyes covered one at a time and press "Next" </li>
          </ol>

          <img
            src="/astigmat.jpg"
            alt="Astigmatism radial chart"
            style={{ width: '900px', maxwidth:'90%', margin: '20px auto', display:'block' }}
          />

          <button onClick={handleContinue} style={{ marginTop: '20px', padding: '10px 20px' }}>
            Next
          </button>
        </>
      ) : (
        <>
          <p>Which of the two circles look appeared similar when your one eye was close? ( Be Honest )</p>

          <img
            src="/benchmark.jpg"
            alt="Circle A vs B"
            style={{ width: '800px', margin: '20px auto', textAlign: 'centre', padding:'2rem' }}
          />

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={() => handleSelection('A')} style={{ marginTop: '20px', padding: '10px 20px' }}>Circle A</button>
            <button onClick={() => handleSelection('B')} style={{ marginTop: '20px', padding: '10px 20px' }}>Circle B</button>
          </div>
        </>
      )}
    </div>
  );
};

export default AstigmatismTest;

