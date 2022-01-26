import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import { CatchedPokemonContext } from "../context/CatchedPokemonContext";
import { DataPokemonContext } from "../context/DataPokemonContext";

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 24px;
  text-align: center;
`;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  margin: 15px 0;
  padding-left: 20px;
`;

const Text = styled.p`
  color: #4a4a4a;
  font-weight: 300;
`;

const Title = styled(Text)`
  font-weight: 600;
`;

const Id = styled(Text)`
  text-align: right;
  color: #4a4a4a;
`;

const Tag = styled.p`
  border: 0.5px solid #696969;
  border-radius: 15px;
  width: 50px;
  padding: 5px;
  text-align: center;
  text-transform: capitalize;
`;

const Detail = styled.div`
  border: 0.5px solid #696969;
  border-radius: 10px;
  margin: 20px 0;
  padding-bottom: 10px;
  background: #ffffff;
`;

const DetailUp = styled.div`
  display: flex;
  justify-content: space-around;
`;

const DetailTitle = styled(Text)`
  text-align: center;
  font-size: 14px;
`;

const DetailInfo = styled(Tag)`
  border-radius: 5px;
  border: 0.5px solid #c1c1c1;
  padding: 8px 25px;
  font-size: 13px;
  color: #8c8c8c;
`;

const MoveContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  max-width: 400px;
  justify-content: center;
  margin: 0 auto;
`;

const Move = styled.p`
  border-radius: 5px;
  border: 0.5px solid #c1c1c1;
  width: 70px;
  padding: 8px 10px;
  font-size: 12px;
  color: #8c8c8c;
  text-align: center;
  margin-bottom: 0px;
  margin-top: 5px;
  text-transform: capitalize;
  color: #8c8c8c;
`;

const Button = styled.button`
  max-width: 300px;
  background: #ff7425;
  border-radius: 10px;
  border: none;
  color: #ffffff;
  padding: 15px 60px;
  font-size: 16px;
`;

const DetailPokemon = () => {
  const { dataPokemon } = useContext(DataPokemonContext);
  const { setCatchedPokemon } = useContext(CatchedPokemonContext);
  const [moves, setMoves] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const pokemonSelected = dataPokemon[id - 1];
  console.log(pokemonSelected);

  const catchPokemon = (pokemonSelected) => {
    const hasilGacha = Math.round(Math.random() * 9);
    if (hasilGacha < 5) {
      // 0, 1, 2, 3, 4 = sukses
      setCatchedPokemon(pokemonSelected);
      navigate("/berhasil-dapat-pokemon");
    } else {
      // 5, 6, 7, 8, 9 = gagal
      navigate("/gagal-dapat-pokemon");
    }
  };

  const getMoves = () => {
    if (pokemonSelected.moves.length > 5) {
      for (let i = 0; i < 5; i++) {
        setMoves((currentData) => [
          ...currentData,
          pokemonSelected.moves[i].move.name,
        ]);
      }
    } else {
      for (let i = 0; i < pokemonSelected.moves.length; i++) {
        setMoves((moves) => [...moves, pokemonSelected.moves]);
      }
    }
  };

  useEffect(() => {
    getMoves();
  }, []);

  return (
    <Container>
      <Card className={pokemonSelected.types[0].type.name}>
        <div>
          <Title>{pokemonSelected.name}</Title>
          <Text>Type</Text>
        </div>
        <div>
          <Id>#{pokemonSelected.id}</Id>
          <Tag>{pokemonSelected.types[0].type.name}</Tag>
        </div>
        <div>
          <img
            src={pokemonSelected.sprites.front_default}
            alt={pokemonSelected.name}
          />
        </div>
      </Card>
      <Detail>
        <DetailUp>
          <div>
            <DetailTitle>Height</DetailTitle>
            <DetailInfo>{pokemonSelected.height / 10} m</DetailInfo>
          </div>
          <div>
            <DetailTitle>Weight</DetailTitle>
            <DetailInfo>{pokemonSelected.weight / 10} Kg</DetailInfo>
          </div>
        </DetailUp>
        <DetailTitle>Moves</DetailTitle>
        <MoveContainer>
          {moves.map((move, index) => (
            <Move key={index}>{move}</Move>
          ))}
        </MoveContainer>
      </Detail>

      <Button onClick={() => catchPokemon(pokemonSelected)}>
        Catch The Pokemon
      </Button>
      <DetailTitle>NB: You have a 50% chance to get the pokemon</DetailTitle>
    </Container>
  );
};

export default DetailPokemon;
