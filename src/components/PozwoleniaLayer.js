import React, { useState, useEffect } from "react";
import { GeoJSON } from "react-leaflet";
import { Marker } from "react-leaflet";

import LayerInfo from "../components/LayerInfo";

import axios from "axios";
import L from "leaflet";
import MarkerCluserGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";
import CircularProgress from "@material-ui/core/CircularProgress";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUtl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

let myIcon = L.icon({
  iconUrl: require("../assets/greenmarker.png"),
  iconSize: [38, 38],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

const PozwoleniaLayer = (props) => {
  const [data, setData] = useState(undefined);
  const [circle, setCircle] = useState(false);
  const [info, setInfo] = useState("");
  let dane = undefined;

  useEffect(() => {
    console.log(props.filtry.from);
    fetchPozwolenia();
  }, []);

  const fetchPozwolenia = async () => {
    setCircle(true);
    const result = await axios(
      process.env.REACT_APP_API_URL +
        "api/pozwolenia_geom/?bbox=" +
        props.map.leafletElement.getBounds()._southWest.lat +
        "," +
        props.map.leafletElement.getBounds()._southWest.lng +
        "," +
        props.map.leafletElement.getBounds()._northEast.lat +
        "," +
        props.map.leafletElement.getBounds()._northEast.lng +
        "&start_date=" +
        props.filtry.from +
        "&end_date=" +
        props.filtry.to +
        "&category=" +
        props.filtry.category +
        "&investor=" +
        props.filtry.investor
      // { CancelToken: source.token }
    );
    console.log(result.data);
    dane = result.data;
    setCircle(false);
  };

  const fetchData = async (id) => {
    const result = await axios(
      process.env.REACT_APP_API_URL + "api/pozwolenie/?id=" + id
    );
    setInfo(result.data);
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
      {dane ? (
        <div>
          <MarkerCluserGroup
            spiderfyDistanceMultiplier={1}
            iconCreateFunction={createClusterCustomIcon}
            disableClusteringAtZoom={18}
          >
            {props.dane.features.map((pozw) => (
              <Marker
                key={pozw.id}
                position={[
                  pozw.geometry.coordinates[1],
                  pozw.geometry.coordinates[0],
                ]}
                icon={myIcon}
                onclick={() => {
                  fetchData(pozw.id);
                }}
              />
            ))}
          </MarkerCluserGroup>
        </div>
      ) : circle ? (
        <CircularProgress
          style={{
            zIndex: 999,
            position: "absolute",
            top: 500,
          }}
        />
      ) : (
        <div></div>
      )}
    </React.Fragment>
  );
};

export default PozwoleniaLayer;
