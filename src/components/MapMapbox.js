import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const styles = {
  width: "100vw",
  height: "calc(100vh - 80px)",
  position: "absolute",
};

const MapMapBox = () => {
  const [map, setMap] = useState(undefined);
  const mapContainer = useRef(undefined);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoicGlrb2xhayIsImEiOiJjaW9uM2xkMTEwMDJodmtrbmE3OWY0ZHMwIn0.1L_Tu0jir2I24OZPoSLY6w";
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [20.6, 49.55],
        zoom: 12,
      });
      map.on("load", () => {
        setMap(map);
        map.resize();
        map.addSource("rastersrs", {
          type: "raster",
          tiles: [
            "https://mapy.geoportal.gov.pl/wss/service/img/guest/ORTO/MapServer/WMSServer?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=ORTOFOTOMAPA",
          ],
          tileSize: 256,
        });
        map.addLayer({
          id: "wmstest",
          type: "raster",
          source: "rastersrs",
          paint: {},
        });
      });
    };
    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return <div ref={(el) => (mapContainer.current = el)} style={styles} />;
};

export default MapMapBox;
