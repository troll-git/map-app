import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { Popper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

function getModalStyle() {
  const top = 1;
  const right = 1;

  return {
    top: `${top}%`,
    right: `${right}%`,
    transform: `translate(-${top}%, -${right}%)`,
  };
}

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

export default function MapInfo(props) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = useState(props.opened);
  const [data, setData] = useState("");

  useEffect(() => {
    setOpen(props.opened);
    handleData();
  }, [props]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleData = () => {
    if (!!props.feat) {
      const dat = Object.values(props.feat.properties).map((e) => e);
      setData(dat);
    } else {
      console.log("ss");
    }
  };

  return (
    <div>
      <Popper open="true" onClose={handleClose}>
        <Typography variant="subtitle2" gutterBottom>
          Numer działki: {data[5]}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          {data === ""
            ? ""
            : "Województwo: " +
              data[6] +
              " powiat: " +
              data[7] +
              " gmina: " +
              data[8]}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          {data === ""
            ? ""
            : "Obwód działki [m]: " +
              data[10].toFixed(2) +
              " Powierzchnia działki [ar]: " +
              (data[11] / 100).toFixed(2) +
              "."}
        </Typography>
      </Popper>
    </div>
  );
}
