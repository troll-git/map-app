import React, { useEffect, useState, useRef } from "react";

import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Snackbar } from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";
import moment from "moment";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  paper: {
    color: theme.palette.text.secondary,
    margin: "auto",
    width: "60vw",
  },
  paperinfo: {
    width: "60%",
    margin: "auto",
    marginTop: "40px",
    padding: "10px",
    fontSize: 20,
    opacity: 0.9,
  },
  green_ok: {
    color: "green",
  },
}));

const Contact = () => {
  const formInput = useRef(null);
  const [name, setName] = useState(undefined);
  const [email, setEmail] = useState("");
  const [textMessage, setTextMessage] = useState("");
  const [buttonOn, setButtonOn] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const classes = useStyles();

  const SendContactData = (body) => {
    return fetch(`http://127.0.0.1:8000/api/contact/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  };

  const sendMessage = (event) => {
    event.preventDefault();
    const jsontosend = {
      created_at: moment().format("YYYY-MM-DD hh:mm:ss"),
      name: name,
      email: email,
      message: textMessage,
    };
    SendContactData(jsontosend);
    formInput.current.reset();
    setName("");
    setEmail("");
    setTextMessage("");
    setSnackbarOpen(true);
  };

  useEffect(() => {
    if (name && email && textMessage) setButtonOn(false);
  });

  function emailIsValid(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  return (
    <div>
      <h1>MAPA GUNB</h1>
      <Paper className={classes.paperinfo} elevation={3}>
        <form ref={formInput} onSubmit={sendMessage}>
          <div>
            {name ? <CheckCircle className={classes.green_ok} /> : <div></div>}
            <TextField
              variant="filled"
              id="name_field"
              label="Imię i Nazwisko"
              style={{ margin: 8, width: "90%" }}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onInput={(e) => setName(e.target.value)}
              helperText="wpisz imię"
              defaultValue={name}
            />
          </div>
          <div>
            {email ? <CheckCircle className={classes.green_ok} /> : <div></div>}
            <TextField
              variant="filled"
              id="email-full-width"
              label="E-mail"
              style={{ margin: 8 }}
              helperText="podaj email"
              style={{ width: "90%" }}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onInput={(e) => {
                if (emailIsValid(e.target.value)) setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            {textMessage ? (
              <CheckCircle className={classes.green_ok} />
            ) : (
              <div></div>
            )}
            <TextField
              variant="filled"
              rows={4}
              multiline
              id="message-full-width"
              label="Wiadomość"
              style={{ margin: 8 }}
              helperText="wpisz wiadomość"
              style={{ width: "90%" }}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onInput={(e) => setTextMessage(e.target.value)}
            />
          </div>

          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={buttonOn}
          >
            Wyślij wiadomość
          </Button>
        </form>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        //onClose={setSnackbarOpen(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          //onClose={handleClose}
          severity="success"
        >
          Dziękujemy za wiadomość
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Contact;
