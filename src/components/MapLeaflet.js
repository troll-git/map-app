import React, { useState, useEffect, useRef } from "react";
import {
  Map,
  TileLayer,
  WMSTileLayer,
  LayerGroup,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PolygonLayer from "../components/PolygonLayer";
import axios from "axios";
import { bounds } from "leaflet";

const MapLeaflet = () => {
  const [bbox, setBbox] = useState([
    [45, 56],
    [0, 5],
  ]);
  const [center, setCenter] = useState([49.56, 20.635]);
  const [dane, setDane] = useState(undefined);
  const [zoom, setZoom] = useState(20);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://127.0.0.1:8000/api/dzialki/");
      console.log(result.data);
      setDane(result.data);
      //return result.data;
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log("dick");
  }, [zoom]);
  const getBbox = (bbox) => {
    setBbox(bbox);
  };

  const testG = () => {
    setZoom(Map.zoom);
    console.log(zoom);
  };

  return (
    <React.Fragment>
      <Map
        id="map"
        center={center}
        zoom={zoom}
        style={{ height: "800px" }}
        maxZoom={19}
        bounds={bbox}
        animate="true"
        //onClick={testG}
      >
        <LayerGroup>
          <LayersControl position="topright">
            <LayersControl.BaseLayer name="osm" checked={true}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="esraj">
              <TileLayer
                attribution='Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
              />
            </LayersControl.BaseLayer>
            <LayersControl.Overlay name="orto">
              <WMSTileLayer
                url="http://159.65.197.227:8080/geoserver/cite/wms?"
                layers="stary"
                transparent={true}
                format="image/png"
                opacity={0.8}
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="orto">
              <WMSTileLayer
                url="http://mapy.geoportal.gov.pl/wss/service/img/guest/ORTO/MapServer/WMSServer?"
                layers="Raster"
                transparent={true}
                format="image/png"
                opacity={0.8}
              />
            </LayersControl.Overlay>
          </LayersControl>
          {!!dane ? <PolygonLayer bbox={getBbox} dane={dane} /> : <p>dfd</p>}
        </LayerGroup>
      </Map>
    </React.Fragment>
  );

};

export default MapLeaflet;
