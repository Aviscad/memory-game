import {  ChangeEventHandler } from "react";
import { difficultyOptions, transformTime } from "../utils/helpers";
import Select from "./Select";
import useGameTimer from "../hook/useGameTimer";

type HeaderProps = {
  handleDifficulty: ChangeEventHandler<HTMLSelectElement>,
  handleGeneration: ChangeEventHandler<HTMLSelectElement>,
  generationList: string[],
  pokemonClicked: number,
  handleGameState: (val: boolean) => void,
  time: number,
  reset: boolean,
  highScore: number,
  pokemonList: number,
}

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
}: HeaderProps) => {
  const timer = useGameTimer(time, handleGameState, reset);

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
      <p className="fixed top-1.5 left-1.5 py-3 px-5 bg-gray-800 z-10 rounded-3xl text-xs sm:top-14 lg:top-1.5">
        <span className="text-red-500 animate-pulse font-bold">
          {transformTime(timer)}
        </span>
      </p>
    </header>
  );
};

export default Header;
