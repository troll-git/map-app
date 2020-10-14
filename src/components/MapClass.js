import React, { useState, useEffect, useRef, createRef } from "react";
import {
  Map,
  TileLayer,
  WMSTileLayer,
  LayerGroup,
  LayersControl,
  Viewport,
  DivOverlay,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PolygonLayer from "../components/PolygonLayer";
import PozwoleniaLayer from "../components/PozwoleniaLayer";
import WnioskiLayer from "../components/WnioskiLayer"
import axios from "axios";
import { bounds, map } from "leaflet";
import CircularProgress from "@material-ui/core/CircularProgress";

const DEFAULT_VIEWPORT = {
  center: [49.55813806107707, 20.633729696273807],
  zoom: 16,
};

class MapClass extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      dane: "",
      pozwolenia: "",
      wnioski:"",
      viewport: DEFAULT_VIEWPORT,
      bbox: "",
    };
  }

  /*componentDidMount() {
    const fetchData = async () => {
      const result = await axios("http://127.0.0.1:8000/api/dzialki/");
      console.log(result.data);
      this.setState({
        dane: result.data,
        viewport: DEFAULT_VIEWPORT,
        bbox: "",
      });
      //this.bbox = 45;
      //return result.data;
    };
    fetchData();
  }*/

  handleClick = (viewport) => {
    this.setState({ dane: null });
    this.setState({ pozwolenia: null });
    this.setState({ wnioski: null });
    const map = this.mapRef.current;
    console.log(map.leafletElement.getBounds());
    console.log(viewport.zoom);
    const fetchData = async () => {
      const result = await axios(
        "http://127.0.0.1:8000/api/dzialki/?bbox=" +
          this.getBoundaries(map)._southWest.lat +
          "," +
          this.getBoundaries(map)._southWest.lng +
          "," +
          this.getBoundaries(map)._northEast.lat +
          "," +
          this.getBoundaries(map)._northEast.lng
      );
      console.log(result.data);
      console.log("fetching data");
      this.setState({
        dane: result.data,
        viewport: DEFAULT_VIEWPORT,
      });
    };

    const fetchPozwolenia = async () => {
      const result = await axios(
        "http://127.0.0.1:8000/api/pozwolenia_geom/?bbox=" +
          this.getBoundaries(map)._southWest.lat +
          "," +
          this.getBoundaries(map)._southWest.lng +
          "," +
          this.getBoundaries(map)._northEast.lat +
          "," +
          this.getBoundaries(map)._northEast.lng
      );
      //console.log(result.data);
      console.log("fetching data");
      this.setState({
        pozwolenia: result.data,
        viewport: DEFAULT_VIEWPORT,
      });
    };
    const fetchWnioski = async () => {
      const result = await axios(
        "http://127.0.0.1:8000/api/wnioski_geom/?bbox=" +
          this.getBoundaries(map)._southWest.lat +
          "," +
          this.getBoundaries(map)._southWest.lng +
          "," +
          this.getBoundaries(map)._northEast.lat +
          "," +
          this.getBoundaries(map)._northEast.lng
      );
      //console.log(result.data);
      console.log("fetching data");
      this.setState({
        wnioski: result.data,
        viewport: DEFAULT_VIEWPORT,
      });
    };

    {
      viewport.zoom > 17 ? fetchData() : this.setState({ dane: null });
    }
    {
      viewport.zoom > 10
        ? fetchPozwolenia()
        : this.setState({ pozwolenia: null });
    }
    {
      viewport.zoom > 5
        ? fetchWnioski()
        : this.setState({ wnioski: null });
    }
  };

  getBoundaries = (map) => {
    return map.leafletElement.getBounds();
  };

  getBbox = (bbox) => {
    console.log(bbox);
    console.log("parcel");
    const map = this.mapRef.current;
    map.leafletElement.fitBounds(bbox);
  };

  getBounds;

  onViewportChanged = (viewport: Viewport) => {
    this.setState({ viewport });
  };
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
            <LayersControl.Overlay name="orto2">
              <WMSTileLayer
                url="http://mapy.geoportal.gov.pl/wss/service/img/guest/ORTO/MapServer/WMSServer?"
                layers="Raster"
                transparent={true}
                format="image/png"
                opacity={0.8}
              />
            </LayersControl.Overlay>
            {!!this.state.pozwolenia ? (
              <PozwoleniaLayer dane={this.state.pozwolenia} />
            ) : (
              <CircularProgress
                style={{
                  zIndex: 999,
                  position: "absolute",
                  top: 500,
                }}
              />
            )}
            {!!this.state.wnioski ? (
              <WnioskiLayer dane={this.state.wnioski} />
            ) : (
              <CircularProgress
                style={{
                  zIndex: 999,
                  position: "absolute",
                  top: 400,
                }}
              />
            )}
            {!!this.state.dane ? (
              <PolygonLayer bbox={this.getBbox} dane={this.state.dane} />
            ) : (
              <p>dfd</p>
            )}
          </LayersControl>
        </LayerGroup>
      </Map>
    );
  }
}

export default MapClass;
