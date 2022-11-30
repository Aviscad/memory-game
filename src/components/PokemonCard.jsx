function PokemonCard({number, handlePokemonClick}) {
	return (
		<div>
			<img
				className="shadow-md w-36 h-36 cursor-pointer"
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${number}.png`}
				alt=""
				onClick={() => {
					handlePokemonClick(number);
					console.log(number);
				}}
			/>
		</div>
	);
}

/*
 GET: https://pokeapi.co/api/v2/pokemon/{id or name}/
*/
export default PokemonCard;
