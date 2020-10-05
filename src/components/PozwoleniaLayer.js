import React, { useState, useEffect } from "react";
import { GeoJSON, Marker } from "react-leaflet";
import DataF from "../assets/starysacz.json";

import PolygonModal from "../components/PolygonModal";
import MapInfo from "../components/MapInfo";
import { API } from "../components/api-service";
import axios from "axios";
import useSWR from "swr";
import L from "leaflet";
import MarkerCluserGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUtl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const PozwoleniaLayer = (props) => {
  const [open, setOpen] = useState(false);
  const [feat, setFeat] = useState(undefined);
  const [id, setId] = useState(undefined);
  const [idP, setIdP] = useState(undefined);

  console.log(props.dane);
  return (
    <React.Fragment>
      <MarkerCluserGroup>
        <GeoJSON
          //key={`geojson-01`}
          style={{ color: "blue" }}
          data={props.dane}
        />
      </MarkerCluserGroup>
    </React.Fragment>
  );
};

export default PozwoleniaLayer;
