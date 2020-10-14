import React, { useState, useEffect } from "react";
import { GeoJSON, Marker, Popup } from "react-leaflet";
import DataF from "../assets/starysacz.json";

import PolygonModal from "../components/PolygonModal";
import PozwolenieInfo from "../components/PozwolenieInfo";
import { API } from "../components/api-service";
import axios from "axios";
import useSWR from "swr";
import L from "leaflet";
import MarkerCluserGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";

//delete L.Icon.Default.prototype._getIconUrl;

//L.Icon.Default.mergeOptions({
//  iconRetinaUtl: require("leaflet/dist/images/marker-icon-2x.png"),
//  iconUrl: require("../assets/redmarker.png"),
//  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
//});

const WnioskiLayer = (props) => {
  const [open, setOpen] = useState(false);
  const [feat, setFeat] = useState(undefined);
  const [id, setId] = useState(undefined);
  const [idP, setIdP] = useState(undefined);
  const [data, setData] = useState(undefined);

  const fetchData = async (id) => {
    const result = await axios(
      "http://127.0.0.1:8000/api/pozwolenie/?id=" + id
    );
    console.log(result.data);
    setData(result.data);
  };

  //console.log(props.dane);
  return (
    <React.Fragment>
      <MarkerCluserGroup>
        <GeoJSON
          //key={`geojson-01`}
          style={{ color: "yellow" }}
          data={props.dane}
          onEachFeature={(feature, layer) => {
            layer.on("click", () => {
              fetchData(feature.id);
            });
          }}
        />
      </MarkerCluserGroup>
      <PozwolenieInfo feat={data} />
    </React.Fragment>
  );
};

export default WnioskiLayer;
