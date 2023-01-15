import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./Components/Home/Home";
import Dashboard from "./Components/Dashboard/Dashboard";
import Movies from "./Components/Movies/Movies";
import Saved from "./Components/Saved/Saved";

import EachMovie from "./Components/Movies/EachMovie";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/movie/:id" element={<EachMovie />} />
      </Route>
    </Routes>
  );
}

export default App;
