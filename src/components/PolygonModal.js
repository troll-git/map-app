import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { useEffect } from "react";

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

export default function PolygonModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(props.opened);
  const [numerDzialki, setnumerDzialki] = React.useState(0);
  let closeImg = {
    cursor: "pointer",
    float: "right",
    marginTop: "5px",
    width: "20px",
  };

  useEffect(() => {
    setOpen(props.opened);
    console.log(open);
    handleData();
  }, [props.id]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleData = () => {
    if (!!props.feat) {
      const dat = Object.values(props.feat.properties).map((e) => e);
      setnumerDzialki(dat[5]);
      console.log(dat);
    } else {
      setnumerDzialki(0);
    }
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <img
        src="https://d30y9cdsu7xlg0.cloudfront.net/png/53504-200.png"
        style={closeImg}
        onClick={handleClose}
      />
      <h2 id="simple-modal-title">{numerDzialki}</h2>
      <p id="simple-modal-description">Opis działki.</p>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        hideBackdrop={true}
        disableBackdropClick={true}
        disableScrollLock={true}
        closeAfterTransition={true}
      >
        {body}
      </Modal>
    </div>
  );
}
