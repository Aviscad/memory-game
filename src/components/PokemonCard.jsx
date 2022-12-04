import {useEffect, useState} from "react";

function PokemonCard({number, handlePokemonClick}) {
	const [pokemonInfo, setPokemonInfo] = useState({});

	useEffect(() => {
		const abortController = new AbortController();

		const fetchUser = async () => {
			await fetch("https://pokeapi.co/api/v2/pokemon/" + number, {
				signal: abortController.signal,
			})
				.then(response => response.json())
				.then(data => {
					setPokemonInfo(data);
					console.log(pokemonInfo);
				})
				.catch(error => {
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
			className="shadow-md cursor-pointer p-1 hover:shadow-2xl"
			onClick={() => {
				if (handlePokemonClick != null) {
					handlePokemonClick(number);
				}
			}}
		>
			<img
				className="w-36 h-36"
				src={pokemonInfo?.sprites?.other?.dream_world?.front_default}
				alt=""
			/>
			<figcaption className="text-center capitalize">
				{pokemonInfo.name}
			</figcaption>
		</figure>
	);
}
export default PokemonCard;
