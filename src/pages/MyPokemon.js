import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import iconDelete from "../assets/iconDelete.png";

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 24px;
  text-align: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;

const Button = styled.button`
  padding: 10px;
  margin-right: 0;
  background-color: white;
  border: 1px solid #707070;
  border-radius: 10px;
`;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  margin: 15px 0;
  padding-right: 20px;
  padding-bottom: 10px;
`;

const LeftContent = styled.div`
  width: 40%;
  padding-top: 10px;
`;

const RightContent = styled.div`
  width: 60%;
  margin-left: 10px;
  padding-top: 20px;
`;

const Desc = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Text = styled.p`
  margin-top: 0px;
  font-weight: 300;
  font-size: 18px;
  line-height: 22px;
  text-transform: capitalize;

  color: #4a4a4a;
`;

const Type = styled.p`
  border: 0.5px solid #696969;
  border-radius: 15px;
  width: 50px;
  padding: 5px 5px;
  text-align: center;
  text-transform: capitalize;
  margin: 0;
`;

const ImageWrapper = styled.div`
  float: right;
  margin-top: 15px;
`;

const Title = styled(Text)`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #4a4a4a;
`;

const MyPokemon = () => {
  const [myPokemon, setMyPokemon] = useState([]);

  const navigate = useNavigate();

  const ambilData = () => {
    if (localStorage.getItem("pokemonList") == null) {
      setMyPokemon([]);
    } else {
      setMyPokemon(JSON.parse(localStorage.getItem("pokemonList")));
    }
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
    <Container>
      <h2>My Pokemon</h2>
      <Header>
        <p>Owned : {myPokemon.length}</p>
        <Button onClick={() => navigate("/")}>Catch more</Button>
      </Header>
      <div>
        {myPokemon.map((pokemon, index) => (
          <Card className={pokemon.type} key={index}>
            <LeftContent>
              <img src={pokemon.image} alt="" />
              <Title>{pokemon.nickname}</Title>
            </LeftContent>
            <RightContent>
              <Desc>
                <Title>{pokemon.name}</Title>
                <Text>#{pokemon.id}</Text>
              </Desc>
              <Desc>
                <Text>Type</Text>
                <Type>{pokemon.type}</Type>
              </Desc>
              {/* <button onClick={() => deletePokemon(pokemon.nickname)}>
                Delete
              </button> */}
              <ImageWrapper onClick={() => deletePokemon(pokemon.nickname)}>
                <img src={iconDelete} alt="icon delete" />
              </ImageWrapper>
            </RightContent>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default MyPokemon;
