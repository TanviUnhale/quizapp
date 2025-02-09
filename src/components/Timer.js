import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Timer = ({ onTimeUp, timeLimit = 10 }) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prevTime) => prevTime - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, onTimeUp]);

  return <div className="timer">⏳ Time Left: {timeLeft}s</div>;
};

Timer.propTypes = {
  onTimeUp: PropTypes.func.isRequired,
  timeLimit: PropTypes.number,
};

export default Timer;
