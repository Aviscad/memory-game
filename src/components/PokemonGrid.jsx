import PokemonCard from "./PokemonCard";
import Header from "./Header";
import Footer from "./Footer";
import Modal from "./Modal";
import { useState, useEffect } from "react";

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
    case "HARD DEMON":
      listSize = 50;
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
  const [pokemonClicked, setPokemonClicked] = useState([]);
  const [highScore, sethighScore] = useState(
    localStorage.getItem("score") === null
      ? 0
      : parseInt(localStorage.getItem("score"))
  );
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [selectedDifficulty, setselectedDifficulty] = useState("EASY");
  const [generationList, setgenerationList] = useState([]);
  const [selectedGeneration, setSelectedGeneration] = useState("i");
  const [pokemonList, setPokemonList] = useState([]);
  const [timerReset, settimerReset] = useState(true);
  const [difficultyTime, setDifficultyTime] = useState(240);

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

    settimerReset(false);
  };

  const handleGameState = (value) => {
    setMessage("Your time is over, you lose!");
    setGameOver(value);
  };

  const resetGame = () => {
    console.log(checkDifficulty);
    sethighScore(
      highScore <= pokemonClicked.length
        ? pokemonClicked.length
        : parseInt(localStorage.getItem("score"))
    );
    localStorage.setItem("score", JSON.stringify(highScore));
    setGameOver(false);
    setMessage("");
    setPokemonClicked([]);
    setPokemonList([...getRandomArray(selectedDifficulty, selectedGeneration)]);
    settimerReset(true);
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

    if (checkDifficulty(selectedDifficulty) === 10) {
      setDifficultyTime(240);
    } else if (checkDifficulty(selectedDifficulty) === 20) {
      setDifficultyTime(210);
    } else if (checkDifficulty(selectedDifficulty) === 30) {
      setDifficultyTime(180);
    } else if (checkDifficulty(selectedDifficulty) === 40) {
      setDifficultyTime(150);
    } else if (checkDifficulty(selectedDifficulty) === 50) {
      setDifficultyTime(90);
    }

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

    localStorage.setItem("score", JSON.stringify(highScore));

    return () => {
      abortController.abort();
    };
  }, [selectedGeneration, selectedDifficulty, highScore]);

  return (
    <div className="select-none bg-gray-400">
      {/* GRID HEADER */}

      <Header
        highScore={highScore}
        pokemonClicked={pokemonClicked.length}
        pokemonList={pokemonList.length}
        generationList={generationList}
        handleGeneration={handleChangeGeneration}
        handleGameState={handleGameState}
        handleDifficulty={handleChangeDifficulty}
        reset={timerReset}
        time={difficultyTime}
      />

      {/* POKEMON LIST */}
      <main className="min-h-screen lg:flex lg:justify-center lg:items-center">
        <div className="grid grid-cols-5 p-3 sm:grid-cols-8 lg:grid-cols-10 gap-3">
          {pokemonList.map((pokemonNumber) => (
            <PokemonCard
              number={pokemonNumber}
              key={pokemonNumber}
              handlePokemonClick={!gameOver ? handlePokemonClicked : null}
            />
          ))}
        </div>
      </main>
      {gameOver ? <Modal message={message} handleResetClick={resetGame} /> : ""}
      <Footer />
    </div>
  );
}

export default PokemonGrid;
