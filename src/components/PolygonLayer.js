import React, { Component, useEffect, useRef, useState } from "react";
import { GeoJSON, Tooltip, Pane, MapControl } from "react-leaflet";
import Data from "../assets/parceltest84.json";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PolygonModal from "../components/PolygonModal";
import MapInfo from "../components/MapInfo";

const PolygonLayer = () => {
  const [open, setOpen] = useState(false);
  const [openP, setOpenP] = useState(false);
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
  let position = [50, 20];

  return (
    <React.Fragment>
      <Pane name="fixed">ererr</Pane>
      <GeoJSON
        style={{ color: "blue" }}
        data={Data}
        onEachFeature={(feature, layer) => {
          layer.on("click", () => {
            setOpen(true);
            console.log(open);
            setFeat(feature);
            setId(Date.now());
            console.log(Date.now());
            console.log(layer);
            //console.log(feature);
            select(layer);
            console.log("click");
          });
          layer.on("mouseover", () => {
            highlight(layer);
            setFeat(feature);
            setIdP(Date.now());
          });

          layer.bindTooltip(feature.properties.gmina, {
            pane: "fixed",
            className: "TooltipParcelInfo",
          });
        }}
      />
      <PolygonModal opened={open} feat={feat} id={id} />
      <MapInfo feat={feat} id={idP} />
    </React.Fragment>
  );
};

export default PolygonLayer;
