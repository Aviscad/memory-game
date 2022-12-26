import { useEffect, useState } from "react";
import Select from "./Select";

const difficultyOptions = ["Easy", "Medium", "Hard", "Extreme", "Hard Demon"];
const transformTime = (timeInSeconds) => {
  let min = Math.floor(timeInSeconds / 60);
  let sec = timeInSeconds - min * 60;

  if (min < 10 && min > 0) {
    min = "0" + min;
  } else if (min === 0) {
    min = "00";
  }

  if (sec < 10 && sec > 0) {
    sec = "0" + sec;
  } else if (sec === 0) {
    sec = "00";
  }

  return `${min} : ${sec} `;
};

const Header = ({
  handleDifficulty,
  handleGeneration,
  generationList,
  pokemonClicked,
  handleGameState,
  time,
  reset,
  highScore,
  pokemonList,
}) => {
  const [t, sett] = useState(time);

  const handleInterval = () => {
    if (t === 0) {
      handleGameState(true);
      sett(time);
    } else {
      sett(t - 1);
    }
  };

  useEffect(() => {
    let myTimer = setInterval(handleInterval, 1000);
    if (reset) {
      clearInterval(myTimer);
      sett(time);
      myTimer = setInterval(handleInterval, 1000);
    }
    return () => {
      clearInterval(myTimer);
    };
  }, [t]);
  return (
    <header className="flex flex-col gap-3 p-3 justify-center items-center  sm:flex-row sm:justify-around bg-gray-800 text-white">
      <div className="flex justify-center items-center flex-col sm:flex-row sm:gap-5">
        <p className="font-bold text-center">Captured: {pokemonClicked}</p>
        <p className="font-bold text-center">
          Left: {pokemonList - pokemonClicked}
        </p>
        <p className="font-bold text-center">Highscore: {highScore}</p>
      </div>

      <div className="flex flex-col justify-center items-center gap-1 sm:flex-row">
        <Select
          label="Difficulty: "
          options={difficultyOptions}
          handleChange={handleDifficulty}
        />
        <Select
          label="Generations: "
          options={generationList}
          handleChange={handleGeneration}
        />
      </div>
      <p className="fixed top-0 left-0 p-3 bg-gray-800 z-10">
        <span className="text-red-400 animate-pulse font-bold">
          {transformTime(t)}
        </span>
      </p>
    </header>
  );
};

export default Header;
