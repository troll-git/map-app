import React, { useState, useEffect } from "react";
import { GeoJSON } from "react-leaflet";
import DataF from "../assets/starysacz.json";

import PolygonModal from "../components/PolygonModal";
import MapInfo from "../components/MapInfo";
import { API } from "../components/api-service";
import axios from "axios";
import useSWR from "swr";
import L from "leaflet";

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
      <GeoJSON
        //key={`geojson-01`}
        style={{ color: "blue" }}
        data={props.dane}
      />
    </React.Fragment>
  );
};

export default PozwoleniaLayer;
