import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { Paper, Dialog, DialogTitle, DialogContent,Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import { ClickAwayListener } from "@material-ui/core";
import KategoriaPopup from "../utils/KategoriaPopup";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 250,
    //height: 800,
    backgroundColor: theme.palette.background.paper,
    //overflow:"auto"
  },
  table: {
    //position: "absolute",
    //width: 250,
    //height: 300,
    //backgroundColor: theme.palette.background.paper,
    //overflow:"auto"
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
}));

export default function PozwolenieInfo(props) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = useState(props.open);
  const classes = useStyles();

  useEffect(() => {
    setOpen(props.open);
  }, [props]);

  const handleClose = () => {
    setOpen(false);
    //setData(props.feat[0]);
  };

  return (
    <div>
      {!!props.feat ? (
        <ClickAwayListener onClickAway={handleClose}>
        <Dialog
        open={open}
        onClose={handleClose}
       disablePortal="true"
       scroll={'paper'}
       style={{height:300}}
      >
      <DialogTitle id="simple-dialog-title">Decyzje</DialogTitle>
      <DialogContent>
          <TableContainer className={classes.table}>
          <Button>hi</Button>
          <Table
          
          //size="large"
        
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
              <TableCell>
                {" "}
                <KategoriaPopup kat={props.feat[0].kategoria} />
              </TableCell>
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
          </DialogContent>
          </Dialog>
        </ClickAwayListener>
      ) : (
        <div></div>
      )}
    </div>
  );
}
