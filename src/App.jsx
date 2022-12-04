import PokemonCard from "./components/PokemonCard";
import {useState, useEffect} from "react";

const getRandomInt = (min = 1, max = 152) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
};

//Get pokemon numbers
const getRandomArray = () => {
	let pokemonIds = new Set();

	for (let i = 0; i < 20; i++) {
		let n = getRandomInt();

		while (pokemonIds.has(n)) {
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
	const [message, setMessage] = useState("");
	const [gameOver, setGameOver] = useState(false);

	const handlePokemonClicked = pokemonId => {
		if (pokemonClicked.indexOf(pokemonId) === -1) {
			setMessage("");
			pokemonClicked.push(pokemonId);
			setPokemonClicked([...pokemonClicked]);
			shuffleArray(pokemonList);
		} else {
			setMessage("Already Clicked!");
			setGameOver(true);
		}
		console.log(pokemonClicked);
	};

	const resetGame = () => {
		setGameOver(false);
		setPokemonClicked([]);
		setPokemonList([...getRandomArray()]);
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
		<div className="select-none">
			<div className="container flex flex-wrap gap-3 p-3 justify-center">
				{pokemonList.map(pokemonNumber => (
					<PokemonCard
						number={pokemonNumber}
						key={pokemonNumber}
						handlePokemonClick={!gameOver ? handlePokemonClicked : null}
					/>
				))}
			</div>
			<div className="container flex flex-wrap gap-3 p-3 justify-center">
				<p>Clicks: {pokemonClicked.length}</p>
				<p>{message}</p>
				<p>{pokemonClicked.length === pokemonList.length ? "Won" : ""}</p>
				<button
					className={
						!gameOver
							? "invisible"
							: "visible bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-5 border border-blue-500 hover:border-transparent rounded"
					}
					onClick={resetGame}
				>
					Reset
				</button>
			</div>
		</div>
	);
}

export default App;
