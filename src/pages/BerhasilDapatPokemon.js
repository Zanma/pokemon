import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { catchedPokemonContext } from "../context/catchedPokemonContext";

const BerhasilDapatPokemon = () => {
  const { catchedPokemon } = useContext(catchedPokemonContext);
  const [nickname, setNickname] = useState("");
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
      if (pokemon.nickname === nickname) {
        console.log("ada nama pokemon sama");
        namaSama = true;
      }
    });

    if (namaSama === true) {
      namaSama = false; //ubah kembali menjadi false, biar bisa push jika namanya beda
    } else {
      pokemonList.push({
        nickname: nickname,
        name: catchedPokemon.name,
      });

      navigate("/mypokemon");
    }

    localStorage.setItem("pokemonList", JSON.stringify(pokemonList));

    setNickname("");
  };

  const changeHandler = (e) => {
    setNickname(e);
  };

  return (
    <div>
      <h1>Selamat anda mendapat pokemon {catchedPokemon.name}</h1>
      <form onSubmit={(e) => submitHandler(e)}>
        <label htmlFor="nickname">Yuk, kasih nama pokemon barumu</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => changeHandler(e.target.value)}
          name="nickname"
          id="nickname"
        />
        <button type="submit">simpan</button>
      </form>
      <p>Nama pokemon baru: {localStorage.nickname}</p>
    </div>
  );
};

export default BerhasilDapatPokemon;
