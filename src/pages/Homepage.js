import { useContext } from "react";
import styled from "@emotion/styled";

import PokemonList from "../components/PokemonList";
import { dataPokemonContext } from "../context/dataPokemonContext";

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
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
  const { dataPokemon } = useContext(dataPokemonContext);

  return (
    <Container>
      <Header>
        <Logo>Pokedex</Logo>
        <Button>My Pokemon</Button>
      </Header>
      <Header>
        <Text>Pokemon List</Text>
        <Text>Owned : </Text>
      </Header>
      <div>
        {dataPokemon
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((pokemon, index) => (
            <PokemonList pokemon={pokemon} key={index} />
          ))}
      </div>
    </Container>
  );
};

export default Homepage;
