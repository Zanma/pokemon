import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import { catchedPokemonContext } from "../context/catchedPokemonContext";
import { dataPokemonContext } from "../context/dataPokemonContext";

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 24px;
`;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  margin: 15px 0;
  padding-left: 20px;
`;

const Text = styled.p`
  text-transform: capitalize;
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
  display: flex;
  justify-content: space-around;
  border: 0.5px solid #e3e3e3;
  border-radius: 10px;
  margin: 20px 0;
`;

const DetailTitle = styled(Text)`
  text-align: center;
  font-size: 12px;
`;

const DetailInfo = styled(Tag)`
  border-radius: 5px;
  border: 0.5px solid #e3e3e3;
  padding: 8px 25px;
  font-size: 12px;
  color: #8c8c8c;
`;

const Image = styled.img``;

const DetailPokemon = () => {
  const { dataPokemon } = useContext(dataPokemonContext);
  const { setCatchedPokemon } = useContext(catchedPokemonContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const pokemonSelected = dataPokemon[id - 1];
  console.log(pokemonSelected);

  const catchPokemon = (pokemonSelected) => {
    const hasilGacha = Math.round(Math.random() * 9);
    if (hasilGacha < 5) {
      // 0, 1, 2, 3, 4 = sukses
      console.log("SSR", hasilGacha, pokemonSelected);
      setCatchedPokemon(pokemonSelected);
      navigate("/berhasil-dapat-pokemon");
    } else {
      // 5, 6, 7, 8, 9 = gagal
      console.log("AMPAS", hasilGacha);
      navigate("/gagal-dapat-pokemon");
    }
  };

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
          <Image
            src={pokemonSelected.sprites.front_default}
            alt={pokemonSelected.name}
          />
        </div>
      </Card>
      <h4>Detail Pokemon</h4>
      <Detail>
        <div>
          <DetailTitle>Height</DetailTitle>
          <DetailInfo>{pokemonSelected.height / 10} m</DetailInfo>
        </div>
        <div>
          <DetailTitle>Weight</DetailTitle>
          <DetailInfo>{pokemonSelected.weight / 10} Kg</DetailInfo>
        </div>
      </Detail>

      <button onClick={() => catchPokemon(pokemonSelected)}>
        Catch the pokemon
      </button>
    </Container>
  );
};

export default DetailPokemon;
