import React, { useEffect, useState } from "react";

const MyPokemon = () => {
  const [myPokemon, setMyPokemon] = useState([]);

  const ambilData = () => {
    const data = JSON.parse(localStorage.getItem("pokemonList"));
    setMyPokemon(data);
  };

  const deletePokemon = (myPokemonNickname) => {
    myPokemon.forEach((dataPokemon, index) => {
      if (dataPokemon.nickname === myPokemonNickname) {
        myPokemon.splice(index, 1);
      }
    });
    localStorage.setItem("pokemonList", JSON.stringify(myPokemon));
    ambilData(); //mengambil data terbaru (setalah delete) dr localStorage
  };

  useEffect(() => {
    ambilData();
  }, []);

  return (
    <div>
      <h2>My Pokemon</h2>
      <div>
        {myPokemon.map((pokemon, index) => (
          <div key={index}>
            <h3>{pokemon.nickname}</h3>
            <button onClick={() => deletePokemon(pokemon.nickname)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPokemon;
