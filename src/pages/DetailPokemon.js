import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { catchedPokemonContext } from "../context/catchedPokemonContext";

import { dataPokemonContext } from "../context/dataPokemonContext";

const DetailPokemon = () => {
  const { dataPokemon } = useContext(dataPokemonContext);
  const { setCatchedPokemon } = useContext(catchedPokemonContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const pokemenSelected = dataPokemon[id - 1];

  const catchPokemon = (pokemonSelected) => {
    const hasilGacha = Math.round(Math.random() * 9);
    if (hasilGacha < 5) {
      // 0, 1, 2, 3, 4 = sukses
      console.log("SSR", hasilGacha, pokemenSelected);
      setCatchedPokemon(pokemonSelected);
      navigate("/berhasil-dapat-pokemon");
    } else {
      // 5, 6, 7, 8, 9 = gagal
      console.log("AMPAS", hasilGacha);
      navigate("/gagal-dapat-pokemon");
    }
  };

  return (
    <div>
      <p>detail pokemon</p>
      <img
        src={pokemenSelected.sprites.front_default}
        alt={pokemenSelected.name}
      />
      <p>{pokemenSelected.name}</p>
      <p>
        type: {pokemenSelected.types[0].type.name} | {""}
        {pokemenSelected.types[1].type.name}
      </p>
      <p>moves: {pokemenSelected.moves[0].move.name}</p>
      <button onClick={() => catchPokemon(pokemenSelected)}>
        Catch the pokemon
      </button>
    </div>
  );
};

export default DetailPokemon;
