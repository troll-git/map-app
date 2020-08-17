import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MapCanvas from "./components/MapCanvas";
import MapLeaflet from "./components/MapCanvas";

function App() {
  return (
    <div className="App">
      <h1>Mapa srapa</h1>
      <MapLeaflet />
    </div>
  );
}

export default App;
