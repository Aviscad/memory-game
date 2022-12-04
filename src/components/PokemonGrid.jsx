import PokemonCard from "./PokemonCard";
import Modal from "./Modal";
import {useState, useEffect} from "react";

const getRandomInt = (min = 1, max = 152) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
};

//Get pokemon numbers
const getRandomArray = () => {
	let pokemonIds = new Set();

	for (let i = 0; i < 3; i++) {
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

function PokemonGrid() {
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
			setMessage("You already clicked this pokemon, you lose!");
			setGameOver(true);
		}

		if (pokemonList.length === pokemonClicked.length) {
			setMessage("Congratulations, You Won!");
			setGameOver(true);
		}
	};

	const resetGame = () => {
		setGameOver(false);
		setMessage("");
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
			<div className="flex gap-3 p-3 justify-center">
				<p className="font-bold">
					Pokemon left: {pokemonList.length - pokemonClicked.length}
				</p>
			</div>
			<div className="flex flex-wrap flex-auto gap-3 p-3 justify-center">
				{pokemonList.map(pokemonNumber => (
					<PokemonCard
						number={pokemonNumber}
						key={pokemonNumber}
						handlePokemonClick={!gameOver ? handlePokemonClicked : null}
					/>
				))}
			</div>
			{gameOver ? (
				<Modal
					message={message}
					handleResetClick={resetGame}
				/>
			) : (
				""
			)}
		</div>
	);
}

export default PokemonGrid;
