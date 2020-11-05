import React, { useState, useEffect, useRef, createContext } from "react";
import MapClass from "../components/MapClass";
import FilterDrawer from "../components/FilterDrawer";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import ContainerDimensions from "react-container-dimensions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    //padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    //width: "80%",
  },
}));

const MainCanvas = () => {
  const [enabledPozwolenia, setEnablePozwolenia] = useState(true);
  const [enabledWnioski, setEnableWnioski] = useState(true);
  const [Filtry, setFiltry] = useState("undefined");
  const [FiltryWnioski, setFiltryWnioski] = useState("undefined");
  const classes = useStyles();

  const callBackPozwolenia = (dataFromChild) => {
    setEnablePozwolenia(dataFromChild);
  };
  const callBackWnioski = (dataFromChild) => {
    setEnableWnioski(dataFromChild);
  };
  const callBackFiltry = (dataFromChild) => {
    setFiltry(dataFromChild);
  };

  const callBackFiltryWnioski = (dataFromChild) => {
    setFiltryWnioski(dataFromChild);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item className={classes.paper} xs={2}>
          <FilterDrawer
            callBackPozwolenia={callBackPozwolenia}
            callBackWnioski={callBackWnioski}
            cbFilters={callBackFiltry}
            cbFiltersWnioski={callBackFiltryWnioski}
          />
        </Grid>
        <Grid item className={classes.paper} xs={10}>
          <ContainerDimensions>
            <MapClass
              enabledPozwolenia={enabledPozwolenia}
              enabledWnioski={enabledWnioski}
              filtry={Filtry}
              filtryWnioski={FiltryWnioski}
            />
          </ContainerDimensions>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainCanvas;
