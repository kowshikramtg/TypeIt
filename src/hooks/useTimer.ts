import { useEffect, useState } from "react";

type UseTimerProps = {
  running: boolean;
  onComplete: () => void;
};

const useTimer = ({
  running,
  onComplete,
}: UseTimerProps) => {
  const [testTime, setTestTime] =
    useState(30);

  const [timeLeft, setTimeLeft] =
    useState(30);

  useEffect(() => {
    if (!running) return;

    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);

          onComplete();

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running, timeLeft]);

  return {
    testTime,
    setTestTime,

    timeLeft,
    setTimeLeft,
  };
};

export default useTimer;