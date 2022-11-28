function PokemonCard({sprite}) {
	return (
		<div>
			<img
				className="shadow-lg w-36 h-36 cursor-pointer"
				src={sprite}
			/>
		</div>
	);
}

export default PokemonCard;
