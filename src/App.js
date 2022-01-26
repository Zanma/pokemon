import { useState } from "react";
import { CatchedPokemonContext } from "./context/CatchedPokemonContext";
import { DataPokemonContext } from "./context/DataPokemonContext";
import Routing from "./Routing";

function App() {
  const [dataPokemon, setDataPokemon] = useState([]);
  const [catchedPokemon, setCatchedPokemon] = useState([]);

  return (
    <DataPokemonContext.Provider value={{ dataPokemon, setDataPokemon }}>
      <CatchedPokemonContext.Provider
        value={{ catchedPokemon, setCatchedPokemon }}
      >
        <Routing />
      </CatchedPokemonContext.Provider>
    </DataPokemonContext.Provider>
  );
}

export default App;
