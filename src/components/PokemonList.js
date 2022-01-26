import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  margin: 15px 0;
  padding-left: 20px;
`;

const NameWrap = styled.div`
  display: flex;
  gap: 5px;
`;

const Text = styled.p`
  margin-bottom: 0;
  text-transform: capitalize;
  color: #4a4a4a;
  font-weight: 300;
`;

const Title = styled(Text)`
  font-weight: 600;
`;

const Type = styled.p`
  border: 0.5px solid #696969;
  border-radius: 15px;
  width: 60px;
  padding: 5px;
  text-align: center;
  text-transform: capitalize;
`;

const PokemonList = ({ pokemon }) => {
  const navigate = useNavigate();
  const type = pokemon.types[0].type.name; //untuk menentukan warna bg dr index.css

  return (
    <Card className={type} onClick={() => navigate(`/detail/${pokemon.id}`)}>
      <div>
        <NameWrap>
          <Text>#{pokemon.id}</Text>
          <Title>{pokemon.name}</Title>
        </NameWrap>
        <div>
          <Type>{pokemon.types[0].type.name}</Type>
        </div>
      </div>
      <div>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
    </Card>
  );
};

export default PokemonList;
