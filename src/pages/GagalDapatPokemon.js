import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import imageFail from "../assets/imageFail.png";

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 24px;
  text-align: center;
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 24px;
  color: #252525;
  margin-bottom: 70px;
`;

const Button = styled.button`
  max-width: 300px;
  background: #ff7425;
  border-radius: 10px;
  border: none;
  color: #ffffff;
  padding: 15px 60px;
  font-size: 16px;
  display: block;
  margin: 0 auto;
  margin-top: 80px;
`;

const GagalDapatPokemon = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>Oh no.. Pokemon run away</Title>
      <img src={imageFail} alt="Pokeball opened" />
      <Button onClick={() => navigate("/")}>Back to homepage</Button>
    </Container>
  );
};

export default GagalDapatPokemon;
