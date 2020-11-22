import React, { useState, useEffect } from "react";
import MapClass from "../components/MapClass";
import FilterDrawer from "../components/FilterDrawer";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ContainerDimensions from "react-container-dimensions";
import axios from "axios";
import { Paper, Dialog, DialogTitle, DialogContent,Button } from "@material-ui/core";
import { ClickAwayListener } from "@material-ui/core";
import LayerInfo from "../components/LayerInfo"



const maph=document.documentElement.clientHeight-50
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "red",
    height: maph,
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const MainCanvas = () => {
  const [enabledPozwolenia, setEnablePozwolenia] = useState(true);
  const [enabledWnioski, setEnableWnioski] = useState(true);
  const [Filtry, setFiltry] = useState("undefined");
  const [FiltryWnioski, setFiltryWnioski] = useState("undefined");
  const [open,setOpen]=useState(false)
  const [info,setInfo]=useState(undefined)
  const classes = useStyles();

  const handleClose = () => {
    console.log("click away")
    setOpen(false);
    //setData(props.feat[0]);
  };

  const fetchData = async () => {
    const result = await axios(
      "https://geolocation-db.com/json/09ba3820-0f88-11eb-9ba6-e1dd7dece2b8"
    );
    SendIpData(result.data);
  };

  const SendIpData = (body) => {
    body.created_at = moment().format("YYYY-MM-DD hh:mm:ss");
    return fetch(process.env.REACT_APP_API_URL + `api/ipdata/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  };

  useEffect(() => {
    fetchData();
  }, []);



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
  const callBackInfo= (dataFromChild) => {
    console.log("new info")
    setInfo(dataFromChild)
       
  };

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item className={classes.paper} xs={2}>
          <FilterDrawer
            callBackPozwolenia={callBackPozwolenia}
            callBackWnioski={callBackWnioski}
            cbFilters={callBackFiltry}
            cbFiltersWnioski={callBackFiltryWnioski}
          />
        </Grid>
        <Grid className={classes.root} item xs={12}>
          <ContainerDimensions>
            <MapClass
              enabledPozwolenia={enabledPozwolenia}
              enabledWnioski={enabledWnioski}
              filtry={Filtry}
              filtryWnioski={FiltryWnioski}
              getInfo={callBackInfo}
            />
          </ContainerDimensions>
        </Grid>
      </Grid>
      
      {info ? (
        <LayerInfo info={info} height={maph}/>
      ) : (
        <div></div>
      )}
    
      
      
    </div>
  );
};

export default MainCanvas;
