import "./App.css";
import PokemonCard from "./components/PokemonCard";

function App() {
	return (
		<div className="App">
			<h1 className="text-3xl font-bold underline m-1 shadow-lg">
				Hi from Vite + Tailwind
			</h1>
			<div className="container flex gap-3 p-3">
				<PokemonCard sprite="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/150.png" />
				<PokemonCard sprite="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/149.png" />
				<PokemonCard sprite="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/148.png" />
			</div>
		</div>
	);
}

export default App;
