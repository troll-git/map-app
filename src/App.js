import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MapCanvas from "./components/MapLeaflet";
import MapLeaflet from "./components/MapLeaflet";
import MapMapBox from "./components/MapMapbox";
import TestC from "./components/testcomponent";

function App() {
  return (
    <div className="App">
      <h1>Map</h1>
      <MapLeaflet />
    </div>
  );
}

export default App;
