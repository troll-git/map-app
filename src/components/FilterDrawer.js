import {
  Divider,
  Drawer,
  FormControlLabel,
  FormControl,
  FormLabel,
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { useState, useEffect } from "react";
import moment from "moment";
import FiltersPozwolenia from "../components/FiltersPozwolenia";

const drawerWidth = "10%";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
}));

const FilterDrawer = (props) => {
  const classes = useStyles();

  const thisYearStart = moment().startOf("year").format("YYYY-MM-DD");
  const thisYearNow = moment().format("YYYY-MM-DD");

  const [checkedPozwolenia, setcheckedPozwolenia] = useState(true);
  const [checkedWnioski, setcheckedWnioski] = useState(true);
  const [ExpandedPozwolenia, setExpandedPozwolenia] = useState(false);
  const [ExpandedWnioski, setExpandedWnioski] = useState(false);
  const [FilterData, setFilterData] = useState({
    from: thisYearStart,
    to: thisYearNow,
  });

  useEffect(() => {
    props.cbFilters(FilterData);
  });

  const updateFilterData = (dataFromChild) => {
    setFilterData({ from: dataFromChild[0], to: dataFromChild[1] });
  };

  const handleChangePozwolenia = (event) => {
    props.callBackPozwolenia(event.target.checked);
    setcheckedPozwolenia(event.target.checked);
  };
  const handleChangeWnioski = (event) => {
    props.callBackWnioski(event.target.checked);
    setcheckedWnioski(event.target.checked);
  };

  const handleExpandPozwolenia = () => {
    ExpandedPozwolenia
      ? setExpandedPozwolenia(false)
      : setExpandedPozwolenia(true);
  };

  const handleExpandWnioski = () => {
    ExpandedWnioski ? setExpandedWnioski(false) : setExpandedWnioski(true);
  };

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        //BackdropProps={{ invisible: true }}
        variant="permanent"
        anchor="left"
        open="false"
      >
        <h2>Filtry</h2>
        <Accordion
          expanded={ExpandedPozwolenia}
          onChange={handleExpandPozwolenia}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
          >
            <FormControlLabel
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              control={
                <Switch
                  name="Pozwolenia"
                  onChange={handleChangePozwolenia}
                  color="primary"
                  checked={checkedPozwolenia}
                />
              }
              label="Decyzje"
            />
          </AccordionSummary>
          <AccordionDetails>
            <FiltersPozwolenia update={updateFilterData} />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={ExpandedWnioski} onChange={handleExpandWnioski}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
          >
            <FormControlLabel
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              control={
                <Switch
                  onChange={handleChangeWnioski}
                  name="Wnioski"
                  checked={checkedWnioski}
                />
              }
              label="Zgłoszenia"
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="textSecondary">WNioski blebleble</Typography>
          </AccordionDetails>
        </Accordion>
      </Drawer>
    </div>
  );
};

export default FilterDrawer;
