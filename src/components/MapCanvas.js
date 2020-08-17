import React, { Component } from "react";
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  WMSTileLayer,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapLeaflet = () => {
  return (
    <React.Fragment>
      <Map
        id="map"
        center={[49.56, 20.63]}
        zoom={19}
        style={{ height: "800px" }}
        maxZoom={19}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer name="osm" checked={true}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="osm2">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.Overlay name="orto">
            <WMSTileLayer
              url="http://159.65.197.227:8080/geoserver/cite/wms?"
              layers="73121_876869_M-34-90-A-d-1-3"
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
      </Map>
    </React.Fragment>
  );
};

export default MapLeaflet;
