import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import MapCanvas from "./components/MapLeaflet";
import MapLeaflet from "./components/MapLeaflet";
import MapClass from "./components/MapClass";
import MapMapBox from "./components/MapMapbox";
import Home from "./components/Home";
import Contact from "./components/Contact";

import MainCanvas from "./components/MainCanvas";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

function App() {
  const [value, setValue] = useState("0");

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <div className="App">
      <Router>
        <AppBar position="static">
          <Grid container spacing={3} style={{ height: "100%" }}>
            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={12} sm={6}>
              <Grid container justify={"flex-end"}>
                <Tabs
                  value="0"
                  onChange={handleChange}
                  value={value}
                  aria-label="simple tabs example"
                >
                  <Tab
                    value={2}
                    label="Kontakt"
                    component={Link}
                    to="/contact"
                  />
                  <Tab value={1} label="Mapa" component={Link} to="/map" />
                  <Tab
                    value={0}
                    label="strona główna"
                    component={Link}
                    to="/"
                  />
                </Tabs>
              </Grid>
            </Grid>
          </Grid>
        </AppBar>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/map">
            <MainCanvas />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
