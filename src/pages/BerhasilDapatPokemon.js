import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import { CatchedPokemonContext } from "../context/CatchedPokemonContext";

import imageGetPokemon from "../assets/imageGetPokemon.png";

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
  margin-bottom: 30px;
`;

const InputContainer = styled.div`
  margin-top: 30px;
  max-width: 300px;
  border: 0.5px solid #696969;
  border-radius: 10px;
  padding: 20px;
`;

const InputLabel = styled.p`
  max-width: 230px;
  font-weight: 600;
  text-align: left;
  align-item: center;
  font-size: 16px;
  line-height: 20px;
  margin: 0 auto;
`;

const Input = styled.input`
  width: 235px;
  height: 49px;
  margin-top: 10px;
  box-sizing: border-box;
  border: 1px solid #c1c1c1;
  border-radius: 10px;
  padding: 10px;
  font-size: 16px;
`;

const InputNote = styled.p`
  color: #9e9e9e;
  font-weight: 300;
  font-size: 14px;
  margin: 4px auto;
`;

const InputError = styled.p`
  color: red;
  font-weight: 300;
  font-size: 14px;
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

const BerhasilDapatPokemon = () => {
  const { catchedPokemon } = useContext(CatchedPokemonContext);
  const [nickname, setNickname] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    let namaSama = false;

    //LOCAL STORAGE CREATE
    let pokemonList;
    //melakukan cek apakah local storage kosong atau sudah isi
    if (localStorage.getItem("pokemonList") == null) {
      pokemonList = [];
    } else {
      pokemonList = JSON.parse(localStorage.getItem("pokemonList"));
    }

    //cek apakah ada nama yg sama, jika ada ubah namaSama = true
    pokemonList.forEach((pokemon) => {
      if (pokemon.nickname.toLowerCase() === nickname.toLowerCase()) {
        namaSama = true;
      }
    });

    if (namaSama === true) {
      setErrorMessage("*You already use this nickname");
      namaSama = false; //ubah kembali menjadi false, biar bisa push jika namanya beda
    } else if (nickname === "") {
      setErrorMessage("*please fill pokemon nickname");
    } else {
      pokemonList.push({
        id: catchedPokemon.id,
        nickname: nickname.toLowerCase(),
        name: catchedPokemon.name,
        image: catchedPokemon.sprites.front_default,
        type: catchedPokemon.types[0].type.name,
      });

      navigate("/mypokemon");
    }

    localStorage.setItem("pokemonList", JSON.stringify(pokemonList));
  };

  const changeHandler = (e) => {
    setNickname(e);
  };

  return (
    <Container>
      <Title>You get {catchedPokemon.name}</Title>
      <img src={imageGetPokemon} alt="Pokeball" />
      <div>
        <form onSubmit={(e) => submitHandler(e)}>
          <InputContainer>
            <InputLabel>Please insert your pokemon nickname</InputLabel>
            <Input
              type="text"
              value={nickname}
              onChange={(e) => changeHandler(e.target.value)}
              name="nickname"
              id="nickname"
              maxLength={8}
            />
            <InputNote>*nickname max 8 character</InputNote>
          </InputContainer>
          <InputError>{errorMessage}</InputError>
          <Button type="submit">Save</Button>
        </form>
      </div>
    </Container>
  );
};

export default BerhasilDapatPokemon;
