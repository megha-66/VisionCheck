import React, { useState } from 'react';

const plates = [
  { id: 1, image: '/plate1.png', options: ['74', '94', 'Nothing'], answer: '74' },
  { id: 2, image: '/plate2.jpg', options: ['42','24', 'Nothing'], answer: '42' },
  { id: 3, image: '/plate3.jpg', options: ['45', '46', 'Nothing'], answer: '45' },
  { id: 4, image: '/plate4.png', options: ['111','W', 'Nothing'], answer: 'Nothing' },
  { id: 5, image: '/plate5.png', options: ['73', '78', 'Nothing'], answer: '73' },
];

const ColorBlindnessTest = ({ onSubmit }) => {
	const [current, setCurrent] = useState(0);
	const [score, setScore] = useState(0);

	const handleAnswer = (selected) => {
		if (selected == plates[current].answer) {
			setScore(score + 1);
		}

		if ((current + 1) < plates.length) {
			setCurrent(current+1);
		}
		else {
			// scale score to 0-5
		        const finalScore = Math.round((score + (selected == plates[current].answer ? 1:0)) / plates.length*5);
			onSubmit(finalScore);
		}
	};

return (
	<div style={{ textAlign: 'center', padding:'2rem' }}>
	<h1> Color Blindness Test </h1>
	<p class="fade-in"> What number do you see in the circle? </p>
	<img 
	 src={plates[current].image}
	 alt={`Ishihara plate ${plates[current].id}`}
	 style={{ width: '350px', maxWidth: '90%', margin: '20px auto' }}
	/>
	<div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        {plates[current].options.map((option, idx) => (
          <button key={idx} onClick={() => handleAnswer(option)} style={{ marginTop: '20px', padding: '10px 20px' }}>
            {option}
          </button>
        ))}
      </div>
      </div>
  );
};

export default ColorBlindnessTest ;

