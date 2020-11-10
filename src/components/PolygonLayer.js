import React, { useState } from "react";
import { GeoJSON, Tooltip } from "react-leaflet";
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
        data={props.dane}
        onEachFeature={(feature, layer) => {
          layer.on("click", () => {
            props.bbox(layer.getBounds());
            //setOpen(true);
            setFeat(feature);
            setId(Date.now());
            select(layer);
          });
          layer.on("mouseover", () => {
            highlight(layer);
            setFeat(feature);
            props.callBackFeat(feature);
            setIdP(Date.now());
          });
        }}
      >
        {" "}
        <Tooltip sticky>
          <MapInfo feat={feat} />
        </Tooltip>
      </GeoJSON>

      <PolygonModal opened={open} feat={feat} id={id} />
    </React.Fragment>
  );
};

export default PolygonLayer;
