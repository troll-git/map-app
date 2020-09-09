import React, { useState } from "react";
import { GeoJSON } from "react-leaflet";
import Data from "../assets/starysacz.json";

import PolygonModal from "../components/PolygonModal";
import MapInfo from "../components/MapInfo";

const PolygonLayer = (props) => {
  const [open, setOpen] = useState(false);
  const [feat, setFeat] = useState(undefined);
  const [id, setId] = useState(undefined);
  const [idP, setIdP] = useState(undefined);

  function select(layer) {
    if (selected !== null) {
      var previous = selected;
    }
    layer.setStyle({ color: "green" });
    selected = layer;
    if (previous) {
      previous.setStyle({ color: "blue" });
    }
  }

  function highlight(layer) {
    if (highlighted !== null) {
      var previous = highlighted;
    }
    layer.setStyle({ color: "red" });
    highlighted = layer;
    if (previous) {
      previous.setStyle({ color: "blue" });
    }
  }

  let selected = null;
  let highlighted = null;

  return (
    <React.Fragment>
      <GeoJSON
        style={{ color: "blue" }}
        data={Data}
        onEachFeature={(feature, layer) => {
          layer.on("click", () => {
            props.bbox(layer.getBounds());
            setOpen(true);
            setFeat(feature);
            setId(Date.now());
            select(layer);
          });
          layer.on("mouseover", () => {
            highlight(layer);
            setFeat(feature);
            setIdP(Date.now());
          });
        }}
      />
      <PolygonModal opened={open} feat={feat} id={id} />
      <MapInfo feat={feat} id={idP} />
    </React.Fragment>
  );
};

export default PolygonLayer;
