import React, { useState } from "react";
import { Marker } from "react-leaflet";

import LayerInfo from "../components/LayerInfo";
import axios from "axios";
import L from "leaflet";
import MarkerCluserGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";

let myIcon = L.icon({
  iconUrl: require("../assets/redmarker.png"),
  iconSize: [38, 38],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

const WnioskiLayer = (props) => {
  const [data, setData] = useState(undefined);

  const fetchData = async (id) => {
    const result = await axios(process.env.REACT_APP_API_URL+"api/wniosek/?id=" + id);
    console.log(result.data);
    setData(result.data);
  };

  const createClusterCustomIcon = function (cluster) {
    return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: "marker-cluster-wnioski",
      iconSize: L.point(40, 40, true),
      color: "red",
    });
  };

  return (
    <React.Fragment>
      <MarkerCluserGroup
        spiderfyDistanceMultiplier={2}
        iconCreateFunction={createClusterCustomIcon}
      >
        {props.dane.features.map((wniosek) => (
          <Marker
            key={wniosek.id}
            position={[
              wniosek.geometry.coordinates[1],
              wniosek.geometry.coordinates[0],
            ]}
            icon={myIcon}
            onclick={() => {
              fetchData(wniosek.id);
            }}
          />
        ))}
      </MarkerCluserGroup>
      <LayerInfo feat={data} type={"wniosek_info"} />
    </React.Fragment>
  );
};

export default WnioskiLayer;
