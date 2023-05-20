import { useEffect, useRef, useState } from 'react';

// status : "INIT" | "STOP" | "START"

export const useTimer = ({ defaultTime }) => {
  const [status, setStatus] = useState('INIT');
  const [time, setTime] = useState(defaultTime);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (!intervalRef) return;
    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (!intervalRef) return;
    clearInterval(intervalRef.current);
  };

  const initializeTimer = () => {
    setTime(0);
  };

  useEffect(() => {
    switch (status) {
      case 'INIT':
        initializeTimer();
        return;
      case 'STOP':
        stopTimer();
        return;
      case 'START':
        startTimer();
        return;
    }
  }, [status]);

  return {
    time,
    setStatus,
  };
};
