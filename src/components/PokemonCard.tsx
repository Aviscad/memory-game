import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

type PokemonCardProps = {
  number: number,
  handlePokemonClick: false | ((pokemonId: number) => void)
}

type PokemonInfo = {
  name: string,
  url: string,
}

function PokemonCard({ number, handlePokemonClick }: PokemonCardProps) {
  const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo>();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchUser = async () => {
      await fetch("https://pokeapi.co/api/v2/pokemon/" + number, {
        signal: abortController.signal,
      })
        .then((response) => response.json())
        .then((data) => {
          let info: PokemonInfo = { name: "", url: "" };

          info.name = data.name;
          if (data.sprites.other.dream_world.front_default) {
            info.url = data.sprites.other.dream_world.front_default;
          } else if (data.sprites.other.home.front_default) {
            info.url = data.sprites.other.home.front_default
          } else {
            info.url = data.sprites.other["official-artwork"].front_default
          }

          setPokemonInfo(info);
        })
        .catch((error) => {
          if (error.name !== "AbortError") {
            console.log(error)
          }
        });
    };

    fetchUser();
    return () => {
      abortController.abort();
    };
  }, []);

  return (<>
    {pokemonInfo && <figure
      className="shadow-md cursor-pointer rounded-md bg-white p-1 flex flex-col justify-center items-center max-w-20 max-h-40 hover:shadow hover:shadow-black hover:scale-105"
      onClick={() => {
        if (handlePokemonClick != false) {
          handlePokemonClick(number);
        }
      }}
    >
      <LazyLoadImage className="w-10 h-10 sm:w-16 sm:h-16 md:w-28 md:h-28 xl:w-32 xl:h-32"
        alt="Dynamically generated Pokémon image of the Selected Generation"
        src={pokemonInfo.url} />
      <figcaption className="text-center capitalize text-sm sm:text-base xl:text-lg">
        <small>
          <i>{pokemonInfo.name}</i>
        </small>
      </figcaption>
    </figure>}
  </>
  );
}
export default PokemonCard;
