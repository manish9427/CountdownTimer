import React, { useState, useEffect } from "react";
import "./Timer.css";

const Timer = () => {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAddTenSeconds = () => {
    setSeconds((prevSeconds) => prevSeconds + 10);
  };

  const handleSkip = () => {
    setSeconds(0);
  };

  const calculateCircleProgress = () => {
    return ((60 - seconds) / 60) * 100;
  };

  return (
    <div className="circular-timer">
      <div className="circular-timer-ring-container">
        <svg className="circular-timer-ring" viewBox="0 0 100 100">
          <circle
            className="circular-timer-ring-background"
            r="40"
            cx="50"
            cy="50"
          />
          <circle
            className="circular-timer-ring-progress"
            r="40"
            cx="50"
            cy="50"
            style={{
              strokeDashoffset: `calc(251.327412287 * (1 - ${calculateCircleProgress()} / 100))`,
            }}
          />
        </svg>
        <div className="timer-text-container">
          <span className="timer-text">{formatTime(seconds)}</span>
        </div>
      </div>
      <div className="timer">
        <div className="buttons">
          <button onClick={handleAddTenSeconds}>+10 sec</button>
          <button onClick={handleSkip}>Skip</button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
