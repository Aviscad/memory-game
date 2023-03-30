import PokemonCard from "./PokemonCard";
import Header from "./Header";
import Footer from "./Footer";
import Modal from "./Modal";
import { useState, useEffect, ChangeEvent } from "react";
import { checkDifficulty, getRandomArray, shuffleArray } from "../utils/helpers"

type generationType = {
  name: string,
  url: string
}

const PokemonGrid = () => {
  const [pokemonClicked, setPokemonClicked] = useState<number[]>([]);
  const [highScore, sethighScore] = useState(
    localStorage.getItem("score") === null
      ? 0
      : Number(localStorage.getItem("score"))
  );
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [selectedDifficulty, setselectedDifficulty] = useState("EASY");
  const [generationList, setgenerationList] = useState<string[]>([]);
  const [selectedGeneration, setSelectedGeneration] = useState("i");
  const [pokemonList, setPokemonList] = useState<number[]>([]);
  const [timerReset, settimerReset] = useState(true);
  const [difficultyTime, setDifficultyTime] = useState(240);

  if (pokemonList.length === pokemonClicked.length && pokemonList.length != 0 && !gameOver) {
    setMessage("Congratulations, You Won!");
    setGameOver(true);
  }

  const handlePokemonClicked = (pokemonId: number): void => {
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

  const handleGameState = (value: boolean): void => {
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

  const handleChangeDifficulty = (e: ChangeEvent<HTMLSelectElement>) => {
    let difficulty = e.target as HTMLSelectElement;
    setselectedDifficulty(difficulty.value.toUpperCase());
    resetGame();
  };

  const handleChangeGeneration = (e: ChangeEvent<HTMLSelectElement>) => {
    let generation = e.target as HTMLSelectElement;
    setSelectedGeneration(String(generation.value.split("-").pop()));
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
              .filter((generation: object, index: number) => {
                if (index <= 7) return generation
              })
              .map((generation: generationType): string => {
                return generation.name
              }),
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
    <div className="select-none bg-gray-400 flex flex-col min-h-screen justify-between">
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
      <main className="lg:flex lg:justify-center lg:items-center">
        <div className="grid grid-cols-5 p-3 gap-3">
          {pokemonList.map((pokemonNumber) => (
            <PokemonCard
              number={pokemonNumber}
              key={pokemonNumber}
              handlePokemonClick={!gameOver && handlePokemonClicked}
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
