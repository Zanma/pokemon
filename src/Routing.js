import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BerhasilDapatPokemon from "./pages/BerhasilDapatPokemon";
import DetailPokemon from "./pages/DetailPokemon";
import GagalDapatPokemon from "./pages/GagalDapatPokemon";
import Homepage from "./pages/Homepage";
import MyPokemon from "./pages/MyPokemon";
// const Homepage = lazy(() => import("./pages/Homepage"));

const Routing = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/detail/:id" element={<DetailPokemon />} />
          <Route
            path="/berhasil-dapat-pokemon"
            element={<BerhasilDapatPokemon />}
          />
          <Route path="/gagal-dapat-pokemon" element={<GagalDapatPokemon />} />
          <Route path="/mypokemon" element={<MyPokemon />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Routing;
