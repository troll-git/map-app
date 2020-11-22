import React from "react";
import { useState,useEffect } from "react";
import PozwolenieInfo from "../components/PozwolenieInfo";
import WniosekInfo from "../components/WniosekInfo";
import { Paper, Dialog, DialogTitle, DialogContent,Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import { ClickAwayListener } from "@material-ui/core";
import KategoriaPopup from "../utils/KategoriaPopup";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
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
  wnioskiPanel: {
    backgroundColor: "#E74C3C",
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

export default function LayerInfo(props) {
  const [infoType, setInfoType] = useState(props.info.type);
  const [token,setToken] = useState(props.info.token)
  const [feat,setFeat] = useState(undefined)
  const [open,setOpen]=useState(false)
  const [loaded, setLoaded] = useState(false);
  const classes = useStyles();



  const fetchPozwolenie = async (id) => {
    const result = await axios(
      process.env.REACT_APP_API_URL + "api/pozwolenie/?id=" + id
    );
    setFeat(result.data);
    setLoaded(true)
  };

  const fetchWniosek = async (id) => {
    const result = await axios(process.env.REACT_APP_API_URL+"api/wniosek/?id=" + id);
    console.log(result.data);
    setFeat(result.data);
    setLoaded(true)
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (props.info.type==='pozwolenie_info'){
      fetchPozwolenie(props.info.id)
    }
    else {
      fetchWniosek(props.info.id)
    }
    setOpen(true)
    }
  ,[props.info.token] );

  useEffect(()=>{
    if (props.info.type==='pozwolenie_info'){
      fetchPozwolenie(props.info.id)
    }
    else {
      fetchWniosek(props.info.id)
    }
    setOpen(true)
    },[]
  )


  if (props.info.type === "wniosek_info") {
    return (
      <React.Fragment>
      <Dialog
      open={open}
      onClose={handleClose}
     disablePortal="true"
     scroll={'paper'}
     style={{height:props.height-100}}
    >
    <DialogContent>
    {!loaded ? (<CircularProgress
      style={{
        color: "red",
        //zIndex: 999,
        position: "absolute",
        //top: 400,
      }}
    />):(<div><HighlightOffIcon
      className={classes.buttonClose}
      onClick={handleClose}
    />
    <Paper>
      <h2 className={classes.wnioskiPanel}>ZGŁOSZENIE</h2>
      <TableContainer component={Paper}>
        <Table
          //className={classes.table}
          size="large"
          aria-label="stan aktualny"
        >
          <TableBody>
            <TableRow>
              <TableCell>Numer działki</TableCell>
              <TableCell>
                {"Miejscowość: " +
                  feat[0].miasto +
                  " obręb ewidencyjny " +
                  feat[0].obreb_numer +
                  " ,numer działki: " +
                  feat[0].numer_dzialki}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Adres</TableCell>
              <TableCell>
                {feat[0].ulica
                  ? "ul. " + feat[0].ulica + ", "
                  : ""}
                {feat[0].ulica_dalej
                  ? feat[0].ulica_dalej + ", "
                  : ""}
                {feat[0].miasto}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Rodzaj inwestycji</TableCell>
              <TableCell>
                {feat[0].rodzaj_zam_budowlanego + ". "}
                {feat[0].nazwa_zam_budowlanego}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Kategoria</TableCell>
              <TableCell>
                <KategoriaPopup kat={feat[0].kategoria} />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Kubatura</TableCell>
              <TableCell>
                {feat[0].kubatura
                  ? feat[0].kubatura
                  : "nie podano"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Data wpływu wniosku</TableCell>
              <TableCell>
                {feat[0].data_wplywu_wniosku_do_urzedu}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Numer zgłoszenia</TableCell>
              <TableCell>
                {feat[0].numer_ewidencyjny_system}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Organ</TableCell>
              <TableCell>
                {feat[0].nazwa_organu +
                  ", nr urząd: " +
                  feat[0].numer_ewidencyjny_urzad}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Projektant</TableCell>
              <TableCell>
                {feat[0].imie_projektanta +
                  " " +
                  feat[0].nazwisko_projektanta +
                  ", nr.upr: " +
                  feat[0].projektant_numer_uprawnien}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Stan</TableCell>
              <TableCell>{feat[0].stan}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper></div>)}
        
        </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
  if (props.info.type === "pozwolenie_info") {
    return (
      <Dialog
      open={open}
      onClose={handleClose}
     disablePortal="true"
     scroll={'paper'}
     style={{height:props.height-50}}
    >
    <DialogContent>
    {!loaded ? (<CircularProgress
      style={{
        color: "red",
        //zIndex: 999,
        position: "absolute",
        //top: 400,
      }}
    />):(
      <div><HighlightOffIcon
      className={classes.buttonClose}
      onClick={handleClose}
    />
      <Paper>
      <h2 className={classes.decyzjePanel}>DECYZJA</h2>
      <TableContainer component={Paper}>
      <Table
        //className={classes.table}
        size="large"
        aria-label="stan aktualny"
      >
      <TableBody>
        <TableRow>
          <TableCell>Numer działki</TableCell>
          <TableCell>{feat[0].identyfikator}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Inwestor</TableCell>
          <TableCell>
            {feat[0].imie_inwestora === null
              ? feat[0].nazwa_inwestor
              : feat[0].imie_inwestora +
                " " +
                feat[0].nazwisko_inwestora}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Adres</TableCell>
          <TableCell>
            {feat[0].ulica
              ? "ul. " + feat[0].ulica + ", "
              : ""}
            {feat[0].ulica_dalej
              ? feat[0].ulica_dalej + ", "
              : ""}
            {feat[0].miasto}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Rodzaj inwestycji</TableCell>
          <TableCell>{feat[0].rodzaj_inwestycji}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Kategoria</TableCell>
          <TableCell>
            {" "}
            <KategoriaPopup kat={feat[0].kategoria} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Zamierzenie budowlane</TableCell>
          <TableCell>
            {feat[0].nazwa_zamierzenia_bud + ". "}
            {feat[0].nazwa_zam_budowlanego}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Kubatura</TableCell>
          <TableCell>
            {feat[0].kubatura
              ? feat[0].kubatura
              : "nie podano"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Data wpływu wniosku / wydania decyzji
          </TableCell>
          <TableCell>
            {feat[0].data_wplywu_wniosku +
              " / " +
              feat[0].data_wydania_decyzji}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Numer decyzji</TableCell>
          <TableCell>
            {feat[0].numer_decyzji_urzedu}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Organ</TableCell>
          <TableCell>
            {feat[0].nazwa_organu +
              ", nr urząd: " +
              feat[0].numer_urzad}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Projektant</TableCell>
          <TableCell>
            {feat[0].projektant_imie +
              " " +
              feat[0].projektant_nazwisko +
              ", nr.upr: " +
              feat[0].projektant_numer_uprawnien}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
      </TableContainer>
      </Paper>
      </div>)}
        
        </DialogContent>
        </Dialog>
    );
  }
  else {
    return(<div></div>)
  }
}
