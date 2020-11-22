import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Popper, Divider } from "@material-ui/core";
import { Autorenew, CheckCircle } from "@material-ui/icons";
import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[50],
  },
  decyzjePanel: {
    backgroundColor: "#2981CA",
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
  legend: {
    zIndex: 999,
    display:"inline-block"

  }
}));

export default function Legend(props) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const classes = useStyles();

  return (
    <div>
      <Popper className={classes.legend} style={{position:"relative",left:props.offset,top:props.topoffset}}
        open={true}
        disablePortal="true"
      >
        <Paper>
          <h5>
            ZOOM: {props.zoom} |
            {props.zoom > 11 ? (
              <CheckCircle fontSize="small" className={classes.decyzje} />
            ) : (
              <CancelIcon fontSize="small" className={classes.off} />
            )}
            {props.zoom > 11 ? (
              <CheckCircle fontSize="small" className={classes.zgloszenia} />
            ) : (
              <CancelIcon fontSize="small" className={classes.off} />
            )}{" "}
            {props.zoom > 17 ? (
              <CheckCircle fontSize="small" className={classes.dzialki} />
            ) : (
              <CancelIcon fontSize="small" className={classes.off} />
            )}{" "}
          </h5>
        </Paper>
      </Popper>
    </div>
  );
}
