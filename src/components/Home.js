import React, { useEffect, useState } from "react";
import CountUpAnimation from "../utils/CountUpAnimation";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import moment from "moment";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
  paper: {
    color: theme.palette.text.secondary,
    margin: "auto",
    width: "80vw",
  },
  paperinfo: {
    width: "80%",
    margin: "auto",
    marginTop: "40px",
    padding: "40px",
    fontSize: 20,
    opacity: 0.4,
  },
  snack:{
    backgroundColor:"lightgreen",
    color:"black",
    opacity:0.6,
  },

}));

const Home = (props) => {
  const [data, setData] = useState(0);
  const [update, setUpdate] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [loadedUpdate, setLoadedUpdate] = useState(false);
  const [snackbarOpen,setSnackbarOpen]=useState(true)
  const classes = useStyles();
  const fetchData = async () => {
    const result = await axios(process.env.REACT_APP_API_URL + "api/stats/?");
    setData(result.data);
    setLoaded(true);
    return result;
  };

  const fetchUpdate = async () => {
    const result = await axios(process.env.REACT_APP_API_URL + "api/update/?");
    console.log(result.data[0]);
    setUpdate(result.data[0]);
    setLoadedUpdate(true);

    return result;
  };
  useEffect(() => {
    fetchUpdate();
    fetchData();

    console.log(update.total_skipped_pozwolenia);
  }, []);
  const redirectToMap = () => {
    window.open(window.location.href + "map", "_self");
  };

  const handleClose=()=>{

    setSnackbarOpen(false)
  }
  return (
    <div>
      <h1>MAPA GUNB</h1>

      <div>
        <Grid container spacing={0} style={{ height: "100%" }}>
        <Grid item className={classes.paper} xs={12} sm={6}>
            {loadedUpdate ? (
              <h2>Ostatnio zaktualizowano: {update.updated_at}</h2>
            ) : (
              <div></div>
            )}
            {/*loadedUpdate ? (
              <div>
                <h1>Aktualizacja {update.updated_at}</h1>
                <TableContainer component={Paper}>
                  <Table
                    className={classes.table}
                    size="large"
                    aria-label="stan aktualny"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Dane</TableCell>
                        <TableCell>Nowe rekordy</TableCell>
                        <TableCell>Pominięte rekordy</TableCell>
                        <TableCell>Nieudane importy</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Zgłoszenia</TableCell>
                        <TableCell>
                          <CountUpAnimation duration={500}>
                            {update.total_updated_wnioski}
                          </CountUpAnimation>
                        </TableCell>
                        <TableCell>
                          <CountUpAnimation duration={500}>
                            {update.total_skipped_wnioski}
                          </CountUpAnimation>
                        </TableCell>
                        <TableCell>
                          <CountUpAnimation duration={500}>
                            {update.total_failed_wnioski}
                          </CountUpAnimation>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Decyzje</TableCell>
                        <TableCell>
                          <CountUpAnimation duration={500}>
                            {update.total_updated_pozwolenia}
                          </CountUpAnimation>
                        </TableCell>
                        <TableCell>
                          <CountUpAnimation duration={500}>
                            {update.total_skipped_pozwolenia}
                          </CountUpAnimation>
                        </TableCell>
                        <TableCell>
                          <CountUpAnimation duration={500}>
                            {update.total_failed_pozwolenia}
                          </CountUpAnimation>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            ) : (
              <div>
                <Skeleton variant="text" height={30} />
                <Skeleton variant="rect" height={300} />
              </div>
            )*/}
          </Grid>
          <Grid item className={classes.paper} xs={12} sm={6}>
            {loaded ? (
              <div>
                <h2>Aktualny stan</h2>
                <TableContainer component={Paper}>
                  <Table
                    className={classes.table}
                    size="large"
                    aria-label="stan aktualny"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Stan aktualny</TableCell>
                        <TableCell>Suma rekordów</TableCell>
                        <TableCell>Suma rekordów na mapie</TableCell>
                        <TableCell>%</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Liczba zgłoszeń</TableCell>
                        <TableCell>
                          <CountUpAnimation duration={500}>
                            {data.wnioski}
                          </CountUpAnimation>
                        </TableCell>
                        <TableCell>
                          <CountUpAnimation duration={500}>
                            {data.wnioski_geom}
                          </CountUpAnimation>
                        </TableCell>
                        <TableCell>
                          <CountUpAnimation duration={500}>
                            {(data.wnioski_geom / data.wnioski) * 100}
                          </CountUpAnimation>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Liczba decyzji</TableCell>
                        <TableCell>
                          <CountUpAnimation duration={500}>
                            {data.pozwolenia}
                          </CountUpAnimation>
                        </TableCell>
                        <TableCell>
                          <CountUpAnimation duration={500}>
                            {data.pozwolenia_geom}
                          </CountUpAnimation>
                        </TableCell>
                        <TableCell>
                          <CountUpAnimation duration={500}>
                            {(data.pozwolenia_geom / data.pozwolenia) * 100}
                          </CountUpAnimation>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Liczba działek</TableCell>

                        <TableCell>
                          <CountUpAnimation duration={1500}>
                            {data.dzialki}
                          </CountUpAnimation>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            ) : (
              <div>
                <Skeleton variant="text" height={30} animation="wave" />
                <p>Pobieram dane....</p>
                <Skeleton variant="rect" height={300} animation="wave" />
              </div>
            )}
          </Grid>
          
        </Grid>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}  
        variant={'success'}    
        message="Na tej stronie prezentowane są dane pochodzące z RWDZ publikowane przez Główny Urząd Nadzoru Budowlanego. Można je
        pobrać z ww strony w postaci plików CSV. Dane można przeglądać na
        mapie poprzez kliknięcie zakładki 'MAPA'. Na mapie można stosować
        filtry w celu zawężania obszru poszukiwań. Dane na tej stronie służą
        jedynie celom poglądowym. Poniższe tabele prezentują aktualny stan
        bazy danych oraz ilość rekordów po aktualizacji. Aktualizacja zasobów
        odbywa się raz na dzień. Jeśli masz pytania odnośnie tej strony,
        możesz skontaktować się poprzez formularz kontaktowy dostępny pod
        zakładką kontakt."
        action={  <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>}
      ContentProps={{className:classes.snack}}
        //onClose={setSnackbarOpen(false)}
      />
      
    </div>
  );
};

export default Home;
