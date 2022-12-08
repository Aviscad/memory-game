import PokemonCard from "./PokemonCard";
import Select from "./Select";
import Modal from "./Modal";
import { useState, useEffect, useRef } from "react";

const difficultyOptions = ["Easy", "Medium", "Hard", "Extreme"];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const checkGeneration = (generation) => {
  let arr;
  switch (generation) {
    case "i":
      arr = [1, 152];
      break;
    case "ii":
      arr = [152, 252];
      break;
    case "iii":
      arr = [252, 387];
      break;
    case "iv":
      arr = [387, 494];
      break;
    case "v":
      arr = [494, 650];
      break;
    case "vi":
      arr = [650, 722];
      break;
    case "vii":
      arr = [722, 810];
      break;
    case "viii":
      arr = [810, 905];
      break;
    default:
      arr = [];
      break;
  }
  return arr;
};

const checkDifficulty = (difficulty) => {
  let listSize;
  switch (difficulty) {
    case "EASY":
      listSize = 10;
      break;
    case "MEDIUM":
      listSize = 20;
      break;
    case "HARD":
      listSize = 30;
      break;
    case "EXTREME":
      listSize = 40;
      break;
    default:
      listSize = 0;
      break;
  }
  return listSize;
};

//Get pokemon numbers
const getRandomArray = (selectedDifficulty, selectedGeneration) => {
  const pokemonIds = new Set();

  const pokemonNumberRange = checkGeneration(selectedGeneration);
  const gameDifficulty = checkDifficulty(selectedDifficulty);
  const start = pokemonNumberRange[0];
  const end = pokemonNumberRange[1];

  for (let i = 0; i < gameDifficulty; i++) {
    let n = getRandomInt(start, end);

    while (pokemonIds.has(n)) {
      n = getRandomInt(start, end);
    }
    pokemonIds.add(n);
  }

  return pokemonIds;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

function PokemonGrid() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonClicked, setPokemonClicked] = useState([]);
  const [highScore, sethighScore] = useState(0);
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [selectedDifficulty, setselectedDifficulty] = useState("EASY");
  const [generationList, setgenerationList] = useState([]);
  const [selectedGeneration, setSelectedGeneration] = useState("i");
  const pokeList = useRef(null);

  const handlePokemonClicked = (pokemonId) => {
    if (pokemonClicked.indexOf(pokemonId) === -1) {
      setMessage("");
      pokemonClicked.push(pokemonId);
      setPokemonClicked([...pokemonClicked]);
      shuffleArray(pokemonList);
    } else {
      setMessage("You already clicked this pokemon, you lose!");
      setGameOver(true);
    }

    if (pokemonList.length === pokemonClicked.length) {
      setMessage("Congratulations, You Won!");
      setGameOver(true);
    }
  };

  const resetGame = () => {
    sethighScore(
      highScore <= pokemonClicked.length ? pokemonClicked.length : highScore
    );
    setGameOver(false);
    setMessage("");
    setPokemonClicked([]);
    setPokemonList([...getRandomArray(selectedDifficulty, selectedGeneration)]);
  };

  const handleChangeDifficulty = (e) => {
    setselectedDifficulty(e.target.value.toUpperCase());
    resetGame();
  };

  const handleChangeGeneration = (e) => {
    let generation = e.target.value.split("-").pop();
    setSelectedGeneration(generation);
    resetGame();
  };

  useEffect(() => {
    setPokemonList([...getRandomArray(selectedDifficulty, selectedGeneration)]);
    const abortController = new AbortController();

    const fetchGenerations = async () => {
      await fetch("https://pokeapi.co/api/v2/generation", {
        signal: abortController.signal,
      })
        .then((response) => response.json())
        .then((data) => {
          setgenerationList([
            ...data.results.map((generation) => generation.name),
          ]);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchGenerations();
    pokeList.current.scrollIntoView({ behavior: "smooth", block: "start" });

    return () => {
      abortController.abort();
    };
  }, [selectedGeneration, selectedDifficulty, highScore]);

  return (
    <div className="select-none">
      {/* GRID HEADER */}
      <div className="flex flex-col gap-3 p-3 justify-center items-center sm:flex-row sm:justify-around">
        <div>
          <p className="font-bold">Captured: {pokemonClicked.length}</p>
          <p className="font-bold">
            Left: {pokemonList.length - pokemonClicked.length}
          </p>
          <p className="font-bold">Highscore: {highScore}</p>
        </div>

        <div className="flex flex-col justify-center items-center gap-1 sm:flex-row">
          <Select
            label="Difficulty: "
            options={difficultyOptions}
            handleChange={handleChangeDifficulty}
          />
          <Select
            label="Generations: "
            options={generationList}
            handleChange={handleChangeGeneration}
          />
        </div>
      </div>
      <hr ref={pokeList} />
      {/* POKEMON LIST */}
      <div className="flex flex-wrap flex-auto gap-3 p-3 justify-center">
        {pokemonList.map((pokemonNumber) => (
          <PokemonCard
            number={pokemonNumber}
            key={pokemonNumber}
            handlePokemonClick={!gameOver ? handlePokemonClicked : null}
          />
        ))}
      </div>
      {gameOver ? <Modal message={message} handleResetClick={resetGame} /> : ""}
    </div>
  );
}

export default PokemonGrid;
