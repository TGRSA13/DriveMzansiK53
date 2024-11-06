import React, { useState, useEffect } from 'react';

const Timer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer); // Cleanup interval on component unmount
    } else {
      onTimeUp();  // Call function when time is up
    }
  }, [timeLeft, onTimeUp]);

  return <div>Time Left: {timeLeft}s</div>;
};

export default Timer;
