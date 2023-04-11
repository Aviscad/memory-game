import { useState, useEffect } from "react";

export default function useGameTimer (time: number, handleGameState: (val: boolean) => void, reset: boolean){
  const [timer, setTimer] = useState(time);

  const handleInterval = () => {
    if (timer === 0) {
      handleGameState(true);
      setTimer(time);
    } else {
      setTimer(prevTimer => prevTimer - 1);
    }
  };

  useEffect(() => {
    let myTimer = setInterval(handleInterval, 1000);
    if (reset) {
      clearInterval(myTimer);
      setTimer(time);
      myTimer = setInterval(handleInterval, 1000);
    }
    return () => {
      clearInterval(myTimer);
    };
  }, [timer]);

  return timer
}