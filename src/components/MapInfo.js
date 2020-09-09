import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { useState, useEffect } from "react";
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
  Tooltip,
} from "react-leaflet";
import { Popper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import PolygonModal from "../components/PolygonModal";

function getModalStyle() {
  const top = 1;
  const right = 1;

  return {
    top: `${top}%`,
    right: `${right}%`,
    transform: `translate(-${top}%, -${right}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function MapInfo(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(props.opened);
  const [numerDzialki, setnumerDzialki] = React.useState("");
  let closeImg = {
    cursor: "pointer",
    float: "right",
    marginTop: "5px",
    width: "20px",
  };

  useEffect(() => {
    setOpen(props.opened);
    console.log(open);
    handleData();
  }, [props]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleData = () => {
    if (!!props.feat) {
      const dat = Object.values(props.feat.properties).map((e) => e);
      setnumerDzialki(dat[5]);
      console.log(dat);
    } else {
      setnumerDzialki(0);
    }
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">{numerDzialki}</h2>
      <p id="simple-modal-description">Opis działki.</p>
    </div>
  );

  return (
    <div>
      <Popper open="true" onClose={handleClose}>
        <Typography variant="subtitle2" gutterBottom>
          subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Quos blanditiis tenetur {numerDzialki === 0 ? "" : numerDzialki}
        </Typography>
      </Popper>
    </div>
  );
}