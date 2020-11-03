import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { Paper, Popper, Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import zIndex from "@material-ui/core/styles/zIndex";
import { Popup } from "react-leaflet";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { ClickAwayListener } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    height: 800,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[50],
    padding: theme.spacing(2, 4, 5),
  },
  decyzjePanel: {
    backgroundColor: "#2981CA",
  },
}));

export default function PozwolenieInfo(props) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = useState(props.open);
  const [data, setData] = useState();
  const classes = useStyles();

  useEffect(() => {
    setOpen(props.open);
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
        <ClickAwayListener onClickAway={handleClose}>
          <Popper
            open={open}
            onClose={handleClose}
            style={{
              zIndex: 999,
              position: "absolute",
              top: 50,
              left: 900,
              width: 600,
              height: 1600,
            }}
            disablePortal="true"
          >
            <Paper>
              <h2 className={classes.decyzjePanel}>DECYZJE</h2>
              <TableContainer component={Paper}>
                <Table
                  //className={classes.table}
                  size="large"
                  aria-label="stan aktualny"
                >
                  <TableBody>
                    <TableRow>
                      <TableCell>Numer działki</TableCell>
                      <TableCell>{props.feat[0].identyfikator}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Inwestor</TableCell>
                      <TableCell>
                        {props.feat[0].imie_inwestora === null
                          ? props.feat[0].nazwa_inwestor
                          : props.feat[0].imie_inwestora +
                            " " +
                            props.feat[0].nazwisko_inwestora}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Adres</TableCell>
                      <TableCell>
                        {props.feat[0].ulica
                          ? "ul. " + props.feat[0].ulica + ", "
                          : ""}
                        {props.feat[0].ulica_dalej
                          ? props.feat[0].ulica_dalej + ", "
                          : ""}
                        {props.feat[0].miasto}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Rodzaj inwestycji</TableCell>
                      <TableCell>{props.feat[0].rodzaj_inwestycji}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Kategoria</TableCell>
                      <TableCell>{props.feat[0].kategoria}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Zamierzenie budowlane</TableCell>
                      <TableCell>
                        {props.feat[0].nazwa_zamierzenia_bud + ". "}
                        {props.feat[0].nazwa_zam_budowlanego}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Kubatura</TableCell>
                      <TableCell>
                        {props.feat[0].kubatura
                          ? props.feat[0].kubatura
                          : "nie podano"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        Data wpływu wniosku / wydania decyzji
                      </TableCell>
                      <TableCell>
                        {props.feat[0].data_wplywu_wniosku +
                          " / " +
                          props.feat[0].data_wydania_decyzji}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Numer decyzji</TableCell>
                      <TableCell>
                        {props.feat[0].numer_decyzji_urzedu}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Organ</TableCell>
                      <TableCell>
                        {props.feat[0].nazwa_organu +
                          ", nr urząd: " +
                          props.feat[0].numer_urzad}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Projektant</TableCell>
                      <TableCell>
                        {props.feat[0].projektant_imie +
                          " " +
                          props.feat[0].projektant_nazwisko +
                          ", nr.upr: " +
                          props.feat[0].projektant_numer_uprawnien}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Popper>
        </ClickAwayListener>
      ) : (
        <div></div>
      )}
    </div>
  );
}
