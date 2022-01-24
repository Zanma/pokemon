import React from "react";
import { useNavigate } from "react-router-dom";

const PokemonList = ({ pokemon }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/detail/${pokemon.id}`)}>
      <h4>{pokemon.name}</h4>
    </div>
  );
};

export default PokemonList;
