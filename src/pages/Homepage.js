import { useContext } from "react";
import PokemonList from "../components/PokemonList";
import { dataPokemonContext } from "../context/dataPokemonContext";

const Homepage = () => {
  const { dataPokemon } = useContext(dataPokemonContext);

  return (
    <div>
      <h2>Pokemon List</h2>
      {dataPokemon
        // .sort((a, b) => (a.id > b.id ? 1 : -1))
        .map((pokemon, index) => (
          <PokemonList pokemon={pokemon} key={index} />
        ))}
    </div>
  );
};

export default Homepage;
