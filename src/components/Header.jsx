import Select from "./Select";

const difficultyOptions = ["Easy", "Medium", "Hard", "Extreme"];

const Header = ({
  handleDifficulty,
  handleGeneration,
  generationList,
  pokemonClicked,
  highScore,
  pokemonList,
}) => {
  return (
    <header className=" flex flex-col gap-3 p-3 justify-center items-center  sm:flex-row sm:justify-around bg-gray-800 text-white">
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
    </header>
  );
};

export default Header;
