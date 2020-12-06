import React, { useState, useEffect } from "react";
import { GeoJSON } from "react-leaflet";
import { Marker } from "react-leaflet";

import LayerInfo from "../components/LayerInfo";

import axios from "axios";
import L from "leaflet";
import MarkerCluserGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";
import moment from "moment"

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUtl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

let myIcon = L.icon({
  iconUrl: require("../assets/greenmarker.png"),
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [-3, -76],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

const PozwoleniaLayer = (props) => {
  const [data, setData] = useState(undefined);

  const fetchData = async (id) => {
    const result = await axios(
      process.env.REACT_APP_API_URL + "api/pozwolenie/?id=" + id
    );
    setData(result.data);
  };

  const createClusterCustomIcon = function (cluster) {
    return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: "marker-cluster-pozwolenia",
      iconSize: L.point(40, 40, true),
      color: "red",
    });
  };

  return (
    <React.Fragment>
      <MarkerCluserGroup
        spiderfyDistanceMultiplier={1}
        iconCreateFunction={createClusterCustomIcon}
        disableClusteringAtZoom={18}
      >
        {props.dane.map((pozw) => (
          <Marker
            key={pozw.id}
            position={[
              pozw.point_wkt.split("(")[1].split(" ")[1].split(")")[0],
              pozw.point_wkt.split("(")[1].split(" ")[0],
            ]}
            icon={myIcon}
            onclick={() => {
              props.callBackInfo({id:pozw.id,type:"pozwolenie_info",token:moment.now()})
              //fetchData(pozw.id);
            }}
          />
        ))}
      </MarkerCluserGroup>
    </React.Fragment>
  );
};

export default PozwoleniaLayer;
