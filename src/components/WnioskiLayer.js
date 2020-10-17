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

var myIcon = L.icon({
    iconUrl: require('../assets/redmarker.png'),
    iconSize: [38, 38],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    //shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
 

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

  /*{<GeoJSON          
    data={props.dane}
    style={() => ({
      pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, geojsonMarkerOptions);
      }
     })}
    onEachFeature={(feature, layer) => {
      layer.on("click", () => {
        fetchData(feature.id);
      });
    }}
  />}*/
  //console.log(props.dane);
  return (
    <React.Fragment>
      <MarkerCluserGroup>
      {props.dane.features.map(wniosek=>(
       <Marker key={wniosek.id} position={[wniosek.geometry.coordinates[1],wniosek.geometry.coordinates[0]]} icon={myIcon} onclick={function () {
          alert(wniosek.id);
        }} /> 
      ))}  
      </MarkerCluserGroup>
      <PozwolenieInfo feat={data} />
    </React.Fragment>
  );
};

export default WnioskiLayer;
