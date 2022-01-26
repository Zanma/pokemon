import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import PokemonList from "../components/PokemonList";
import { DataPokemonContext } from "../context/DataPokemonContext";

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 24px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  background: white;
  padding-bottom: 20px;
  width: 100%;
`;

const PokemonContainer = styled.div`
  padding-top: 120px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Logo = styled.p`
  font-size: 30px;
  color: #dc9204;
  font-weight: 600;
`;

const Button = styled.button`
  margin: 25px;
  margin-right: 0;
  background-color: white;
  border: 1px solid #707070;
  border-radius: 10px;
`;

const Text = styled.p`
  margin-bottom: 0;
  text-transform: capitalize;
`;

const Homepage = () => {
  const { dataPokemon, setDataPokemon } = useContext(DataPokemonContext);
  const [myPokemon, setMyPokemon] = useState([]);

  const navigate = useNavigate();

  console.log(dataPokemon);

  const ambilData = () => {
    if (localStorage.getItem("pokemonList") == null) {
      setMyPokemon([]);
    } else {
      setMyPokemon(JSON.parse(localStorage.getItem("pokemonList")));
    }
  };

  const getAllPokemons = async () => {
    if (dataPokemon.length === 0) {
      //biar gk ngepush data lagi kalau di back (kerena bakal render ulang)
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100`);
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
    }
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  useEffect(() => {
    ambilData();
  }, []);

  return (
    <Container>
      <HeaderContainer>
        <Header>
          <Logo>Pokedex</Logo>
          <Button onClick={() => navigate("/mypokemon")}>My Pokemon</Button>
        </Header>
        <Header>
          <Text>Pokemon List</Text>
          <Text>Owned : {myPokemon.length}</Text>
        </Header>
      </HeaderContainer>
      <PokemonContainer>
        {dataPokemon
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((pokemon, index) => (
            <PokemonList pokemon={pokemon} key={index} />
          ))}
      </PokemonContainer>
    </Container>
  );
};

export default Homepage;
