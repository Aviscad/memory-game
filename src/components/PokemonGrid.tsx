import PokemonCard from "./PokemonCard";
import Header from "./Header";
import Footer from "./Footer";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import { checkDifficulty, getRandomArray, shuffleArray } from "../utils/helpers"

const PokemonGrid = () => {
  const [pokemonClicked, setPokemonClicked] = useState([]);
  const [highScore, sethighScore] = useState(
    localStorage.getItem("score") === null
      ? 0
      : Number(localStorage.getItem("score"))
  );
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [selectedDifficulty, setselectedDifficulty] = useState("EASY");
  const [generationList, setgenerationList] = useState([]);
  const [selectedGeneration, setSelectedGeneration] = useState("i");
  const [pokemonList, setPokemonList] = useState([]);
  const [timerReset, settimerReset] = useState(true);
  const [difficultyTime, setDifficultyTime] = useState(240);

  if (pokemonList.length === pokemonClicked.length && pokemonList.length != 0 && !gameOver) {
    setMessage("Congratulations, You Won!");
    setGameOver(true);
  }

  const handlePokemonClicked = (pokemonId: number) => {
    if (pokemonClicked.indexOf(pokemonId) === -1) {
      setMessage("");
      setPokemonClicked([...pokemonClicked, pokemonId]);
      shuffleArray(pokemonList);
    } else {
      setMessage("You already clicked this pokemon, you lose!");
      setGameOver(true);
    }
    settimerReset(false);
  };

  const handleGameState = (value: boolean) => {
    setMessage("Your time is over, you lose!");
    setGameOver(value);
  };

  const resetGame = () => {
    sethighScore(
      highScore <= pokemonClicked.length
        ? pokemonClicked.length
        : Number(localStorage.getItem("score"))
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

    setDifficultyTime(checkDifficulty(selectedDifficulty, true))

    const abortController = new AbortController();

    const fetchGenerations = async () => {
      await fetch("https://pokeapi.co/api/v2/generation", {
        signal: abortController.signal,
      })
        .then((response) => response.json())
        .then((data) => {
          setgenerationList([
            ...data
              .results
              .filter((generation, index) => {
                if (index <= 7) return generation
              })
              .map((generation) => generation.name),
          ]);
        })
        .catch((error) => {
          if (error.name !== "AbortError") {
            console.log(error)
          }
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
