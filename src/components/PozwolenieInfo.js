import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { Paper, Popper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import zIndex from "@material-ui/core/styles/zIndex";
import { Popup } from "react-leaflet";

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

export default function PozwolenieInfo(props) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = useState(props.opened);
  const [data, setData] = useState("");

  useEffect(() => {
    //setOpen(props.opened);
    handleData();
  }, [props]);

  const handleClose = () => {
    setOpen(false);
    setData(props.feat[0]);
  };

  const handleData = () => {
    if (!!props.feat) {
      console.log(props.feat[0].imie_inwestora);
      //fetchData();
    } else {
      console.log("ss");
    }
  };

  return (
    <div>
      {!!props.feat ? (
        <Popper
          open="true"
          onClose={handleClose}
          //popperOptions={{ positionFixed: true }}
          //modifiers={{
          //  offset: {
          //     enabled: true,
          //    offset: "500, 300",
          //  },
          //}}
          style={{
            zIndex: 999,
            position: "absolute",
            top: 500,
            left: 1300,
            width: 600,
          }}
          disablePortal="true"
        >
          <Paper>
            <Typography variant="subtitle2" gutterBottom>
              {props.feat[0].imie_inwestora === null
                ? props.feat[0].nazwa_inwestor
                : props.feat[0].imie_inwestora +
                  " " +
                  props.feat[0].nazwisko_inwestora}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {props.feat[0].rodzaj_inwestycji}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {props.feat[0].nazwa_zamierzenia_bud}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {props.feat[0].nazwa_zam_budowlanego}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {"Data wpływu wniosku: " +
                props.feat[0].data_wplywu_wniosku +
                " Data wydania decyzji " +
                props.feat[0].data_wydania_decyzji}
            </Typography>
          </Paper>
        </Popper>
      ) : (
        <div></div>
      )}
    </div>
  );
}
