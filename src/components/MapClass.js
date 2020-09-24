import React, { useState, useEffect, useRef, createRef } from "react";
import {
  Map,
  TileLayer,
  WMSTileLayer,
  LayerGroup,
  LayersControl,
  Viewport,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PolygonLayer from "../components/PolygonLayer";
import axios from "axios";
import { bounds } from "leaflet";

const DEFAULT_VIEWPORT = {
  center: [49.55813806107707, 20.633729696273807],
  zoom: 16,
};

class MapClass extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = { dane: "", viewport: DEFAULT_VIEWPORT, bbox: "" };
  }

  componentDidMount() {
    const fetchData = async () => {
      const result = await axios("http://127.0.0.1:8000/api/dzialki/");
      console.log(result.data);
      this.setState({
        dane: result.data,
        viewport: DEFAULT_VIEWPORT,
        bbox: "po",
      });
      //this.bbox = 45;
      //return result.data;
    };
    fetchData();
  }

  handleClick = () => {
    const map = this.mapRef.current;
    console.log(map.leafletElement.getBounds());
  };

  onViewportChanged() {
    //this.setState({ viewport: viewport });
    const map = this.mapRef.current;
    console.log(map.leafletElement.getBounds());
  }
  render() {
    return (
      <Map
        id="map"
        viewport={this.state.viewport}
        style={{ height: "800px" }}
        maxZoom={19}
        bounds={this.bbox}
        animate="true"
        onzoomend={console.log("zoom")}
        onViewportChanged={this.handleClick}
        ref={this.mapRef}
        onclick={this.handleClick}
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
          {!!this.state.dane ? (
            <PolygonLayer bbox={this.bbox} dane={this.state.dane} />
          ) : (
            <p>dfd</p>
          )}
        </LayerGroup>
      </Map>
    );
  }
}

export default MapClass;
