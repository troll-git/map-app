import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { Paper, Popper, Divider } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import { ClickAwayListener } from "@material-ui/core";
import KategoriaPopup from "../utils/KategoriaPopup";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { CheckCircle } from "@material-ui/icons";
import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[50],
  },
  decyzjePanel: {
    backgroundColor: "#2981CA",
  },
  buttonClose: {
    position: "absolute",
    top: "15px",
    right: "10px",
    cursor: "pointer",
    "&:hover": {
      color: "red",
    },
  },
  dzialki: {
    color: "blue",
  },
  decyzje: {
    color: "green",
  },
  zgloszenia: {
    color: "red",
  },
  off: {
    color: "grey",
  },
}));

export default function Legend(props) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const classes = useStyles();

  return (
    <div>
      <Popper
        open={true}
        style={{
          zIndex: 999,
          position: "relative",
          //       top: 500,
          left: "35%",
          width: "30%",
        }}
        disablePortal="true"
      >
        <Paper>
          <h5>
            ZOOM: {props.zoom} |
            {props.zoom > 11 ? (
              <CheckCircle className={classes.decyzje} />
            ) : (
              <CancelIcon className={classes.off} />
            )}
            Decyzje
            {props.zoom > 11 ? (
              <CheckCircle className={classes.zgloszenia} />
            ) : (
              <CancelIcon className={classes.off} />
            )}{" "}
            Zgłoszenia{"  "}
            {props.zoom > 17 ? (
              <CheckCircle className={classes.dzialki} />
            ) : (
              <CancelIcon className={classes.off} />
            )}{" "}
            Działki
          </h5>
        </Paper>
      </Popper>
    </div>
  );
}
