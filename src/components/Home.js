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
import Button from "@material-ui/core/Button";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "20px",
    marginBottom: "20px",
  },
  paper: {
    //padding: theme.spacing(2),
    //textAlign: "center",
    color: theme.palette.text.secondary,
    //width: "80%",
  },
  paperinfo: {
    width: "80%",
    margin: "auto",
    padding: "50px",
    fontSize: 20,
  },
}));

const Home = (props) => {
  const [data, setData] = useState(0);
  const [update, setUpdate] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [loadedUpdate, setLoadedUpdate] = useState(false);
  const classes = useStyles();
  const fetchData = async () => {
    const result = await axios("http://127.0.0.1:8000/api/stats/?");
    setData(result.data);
    setLoaded(true);
    return result;
  };

  const fetchUpdate = async () => {
    const result = await axios("http://127.0.0.1:8000/api/update/?");
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

  return (
    <div>
      <h1>Dane z GUNB</h1>

      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item className={classes.paper} xs={6}>
            {loaded ? (
              <div>
                <h1>Aktualny stan</h1>
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
                <Skeleton variant="text" height={30} />
                <Skeleton variant="rect" height={300} />
              </div>
            )}
          </Grid>
          <Grid item className={classes.paper} xs={6}>
            {loadedUpdate ? (
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
            )}
          </Grid>
        </Grid>
      </div>
      <Paper className={classes.paperinfo} elevation={3}>
        Na tej stronie prezentowane są dane pochodzące z{" "}
        <a href="http://wyszukiwarka.gunb.gov.pl/" target="_blank">
          wyszukiwarki publicznej
        </a>{" "}
        RWDZ publikowane przez Główny Urząd Nadzoru Budowlanego. Można je pobrać
        z ww strony w postaci plików CSV. Dane można przeglądać na mapie poprzez
        kliknięcie zakładki "MAPA". Na mapie można stosować filtry w celu
        zawężania obszru poszukiwań. Dane na tej stronie służą jedynie celom
        poglądowym. Poniższe tabele prezentują aktualny stan bazy danych oraz
        ilość rekordów po aktualizacji. Aktualizacja zasobów odbywa się raz na
        dzień. Jeśli masz pytania odnośnie tej strony, możesz skontaktować się
        poprzez formularz kontaktowy dostępny pod zakładką kontakt.
      </Paper>
    </div>
  );
};

export default Home;
