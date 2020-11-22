import React, { useState } from "react";
import { Marker } from "react-leaflet";

import LayerInfo from "../components/LayerInfo";
import axios from "axios";
import L from "leaflet";
import MarkerCluserGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";
import moment from "moment"

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
              //fetchData(wniosek.id);
              props.callBackInfo({id:wniosek.id,type:"wniosek_info",token:moment.now()})
            }}
          />
        ))}
      </MarkerCluserGroup>
    
    </React.Fragment>
  );
};

export default WnioskiLayer;
