import React, { useState, useEffect, useRef, createContext } from "react";
import MapClass from "../components/MapClass";
import FilterDrawer from "../components/FilterDrawer";
import moment from "moment";

const MainCanvas = (props) => {
  const [enabledPozwolenia, setEnablePozwolenia] = useState(true);
  const [enabledWnioski, setEnableWnioski] = useState(true);
  const [Filtry, setFiltry] = useState("undefined");

  const callBackPozwolenia = (dataFromChild) => {
    setEnablePozwolenia(dataFromChild);
  };
  const callBackWnioski = (dataFromChild) => {
    setEnableWnioski(dataFromChild);
  };
  const callBackFiltry = (dataFromChild) => {
    setFiltry(dataFromChild);
  };

  return (
    <React.Fragment>
      <h1>Mapa GUNB</h1>

      <FilterDrawer
        callBackPozwolenia={callBackPozwolenia}
        callBackWnioski={callBackWnioski}
        cbFilters={callBackFiltry}
      />
      <MapClass
        enabledPozwolenia={enabledPozwolenia}
        enabledWnioski={enabledWnioski}
        filtry={Filtry}
      />
    </React.Fragment>
  );
};

export default MainCanvas;
