import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { Paper, Popper, Divider } from "@material-ui/core";
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

export default function WniosekInfo(props) {
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
            float: "right",
            top: "15%",
            left: "80%",
            width: "20%",
          }}
          //disablePortal="true"
        >
          <Paper>
            <Typography variant="h6" gutterBottom>
              {props.feat[0].numer_ewidencyjny_system}
            </Typography>
            <Divider />
            <Typography variant="subtitle2" gutterBottom>
              {"Data wpływu wniosku do urzędu: " +
                props.feat[0].data_wplywu_wniosku_do_urzedu}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {"Rodzaj zamierzenia budowlanego: " +
                props.feat[0].rodzaj_zam_budowlanego}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {"\r Nazwa zamierzenia budowlanego: " +
                props.feat[0].nazwa_zam_budowlanego}
            </Typography>

            <Typography variant="subtitle2" gutterBottom>
              {props.feat[0].kubatura
                ? "Kubatura: " + props.feat[0].kubatura
                : ""}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {props.feat[0].kategoria
                ? "Kategoria: " + props.feat[0].kategoria
                : ""}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {"Miejscowość: " +
                props.feat[0].miasto +
                " obręb ewidencyjny " +
                props.feat[0].obreb_numer +
                " ,numer działki: " +
                props.feat[0].numer_dzialki}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {props.feat[0].cecha
                ? "Adres: " +
                  props.feat[0].cecha +
                  " " +
                  props.feat[0].ulica +
                  " " +
                  props.feat[0].ulica_dalej
                : ""}
            </Typography>
          </Paper>
        </Popper>
      ) : (
        <div></div>
      )}
    </div>
  );
}
