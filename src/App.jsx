import "./App.css";
import PokemonCard from "./components/PokemonCard";
import {useState, useEffect} from "react";

const getRandomInt = (min = 1, max = 152) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
};

const getRandomArray = () => {
	let pokemonIds = new Set();

	for (let i = 0; i < 6; i++) {
		let n = getRandomInt();

		while (pokemonIds.has(n)) {
			console.log("repeated: " + n);
			n = getRandomInt();
		}
		pokemonIds.add(n);
	}
	return pokemonIds;
};

const shuffleArray = array => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
};

function App() {
	const [pokemonList, setPokemonList] = useState([]);
	const [pokemonClicked, setPokemonClicked] = useState([]);

	const handlePokemonClicked = pokemonId => {
		if (pokemonClicked.indexOf(pokemonId) === -1) {
			pokemonClicked.push(pokemonId);
			setPokemonClicked([...pokemonClicked]);
			shuffleArray(pokemonList);
		} else {
			setPokemonClicked([]);
			console.log("Already Clicked!");
		}
		console.log(pokemonClicked);
	};

	useEffect(() => {
		let ignore = false;
		if (!ignore) {
			setPokemonList([...getRandomArray()]);
		}
		return () => {
			ignore = true;
		};
	}, []);

	return (
		<div className="App">
			<div className="container flex gap-3 p-3">
				{pokemonList.map(pokemonNumber => (
					<PokemonCard
						number={pokemonNumber}
						key={pokemonNumber}
						handlePokemonClick={handlePokemonClicked}
					/>
				))}
				<p>Clicks: {pokemonClicked.length}</p>
				<p>{pokemonClicked.length === pokemonList.length ? "Won" : ""}</p>
			</div>
		</div>
	);
}

export default App;
