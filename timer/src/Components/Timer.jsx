import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

const CountdownTimer = () => {
  const initialCountdownTime = 60; // 10 minutes in seconds
  const [countdownTime, setCountdownTime] = useState(initialCountdownTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdownTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup the interval when component unmounts
  }, []);

  useEffect(() => {
    if (countdownTime <= 0) {
      // Perform any action when the countdown reaches 0
    }
  }, [countdownTime]);

  const minutes = Math.floor(countdownTime / 60);
  const seconds = countdownTime % 60;

  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  const progress = (countdownTime / initialCountdownTime) * 100;

  const handleAddTenSeconds = () => {
    setCountdownTime((prevTime) => prevTime + 10);
  };

  const handleSkip = () => {
    setCountdownTime(0);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div style={{ width: "100px", height: "100px", position: "relative" }}>
        <CircularProgress
          variant="determinate"
          value={progress}
          color="primary"
          size={100}
          thickness={5}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          {formattedTime}
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTenSeconds}
        >
          +10 Sec
        </Button>
        &nbsp;
        <Button variant="contained" color="secondary" onClick={handleSkip}>
          Skip
        </Button>
      </div>
    </div>
  );
};

export default CountdownTimer;
