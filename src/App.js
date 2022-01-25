import { useState, useEffect } from "react";
import { catchedPokemonContext } from "./context/catchedPokemonContext";
import { dataPokemonContext } from "./context/dataPokemonContext";
import Routing from "./Routing";

function App() {
  const [dataPokemon, setDataPokemon] = useState([]);
  const [catchedPokemon, setCatchedPokemon] = useState([]);

  const getAllPokemons = async () => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
    const data = await res.json();

    function getPokemonObject(result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();

        setDataPokemon((currentData) => [...currentData, data]);
      });
    }
    getPokemonObject(data.results);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <dataPokemonContext.Provider value={{ dataPokemon, setDataPokemon }}>
      <catchedPokemonContext.Provider
        value={{ catchedPokemon, setCatchedPokemon }}
      >
        <Routing />
      </catchedPokemonContext.Provider>
    </dataPokemonContext.Provider>
  );
}

export default App;
