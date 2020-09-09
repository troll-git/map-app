import React, { Component, useEffect, useRef, useState } from "react";
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  WMSTileLayer,
  LayerGroup,
  LayersControl,
  AttributionControl,
  DivOverlay,
  GeoJSON,
} from "react-leaflet";

const PolygonControl = () => {
  const setPrefix = () => {
    return "wtf";
  };

  return <AttributionControl></AttributionControl>;
};

export default PolygonControl;
