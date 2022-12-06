import { useEffect, useState } from "react";

function PokemonCard({ number, handlePokemonClick }) {
  const [pokemonInfo, setPokemonInfo] = useState({});

  useEffect(() => {
    const abortController = new AbortController();

    const fetchUser = async () => {
      await fetch("https://pokeapi.co/api/v2/pokemon/" + number, {
        signal: abortController.signal,
      })
        .then((response) => response.json())
        .then((data) => {
          setPokemonInfo(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchUser();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <figure
      className="shadow-md cursor-pointer p-1 hover:shadow-2xl flex flex-col justify-center items-center max-w-20"
      onClick={() => {
        if (handlePokemonClick != null) {
          handlePokemonClick(number);
        }
      }}
    >
      <img
        className="w-10 h-10 sm:w-16 sm:h-16 md:w-28 md:h-28 xl:w-32 xl:h-32"
        src={
          pokemonInfo?.sprites?.other?.dream_world?.front_default ||
          pokemonInfo?.sprites?.other?.home?.front_default ||
          pokemonInfo?.sprites?.other?.["official-artwork"]?.front_default
        }
      />
      <figcaption className="text-center capitalize text-sm sm:text-base xl:text-lg">
        {pokemonInfo.name}
      </figcaption>
    </figure>
  );
}
export default PokemonCard;
