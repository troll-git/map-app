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
import React, { useEffect, useState } from "react";
import moment from "moment";

const FiltersPozwolenia = (props) => {
  //const classes = useStyles();
  const thisYearStart = moment().startOf("year").format("YYYY-MM-DD");
  const thisYearNow = moment().format("YYYY-MM-DD");
  const [dateOption, setDateOption] = useState("thisYear");
  const [dateFrom, setDateFrom] = useState(thisYearStart);
  const [dateTo, setDateTo] = useState(thisYearNow);
  const [calendarDisabled, setCalendarDisabled] = useState(true);

  useEffect(() => {
    props.update([dateFrom, dateTo]);
  }, []);

  const handleChangeDatePozwolenia = (event) => {
    if (event.target.value === "customdate") {
      setDateOption(event.target.value);
      setCalendarDisabled(false);
      console.log(document.getElementById("dateFrom").value);
    }
    if (event.target.value === "thisYear") {
      setCalendarDisabled(true);
      setDateOption(event.target.value);
      setDateFrom(thisYearStart);
      setDateTo(thisYearNow);
    }
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Data wydania wniosku</FormLabel>
      <RadioGroup
        aria-label="rokwydaniawniosku"
        name="rokwniosku"
        value={dateOption}
        onChange={handleChangeDatePozwolenia}
      >
        <FormControlLabel
          value="thisYear"
          control={<Radio />}
          label="Bieżący rok"
        />
        <FormControlLabel
          value="customdate"
          control={<Radio />}
          label="Wybierz date"
        />
        <TextField
          id="dateFrom"
          label="od"
          type="date"
          disabled={calendarDisabled}
          defaultValue={moment()}
          //className={classes.textField}
          onChange={(date) => {
            setDateFrom(date.target.value);
            props.update([date.target.value, dateTo]);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="dateTo"
          label="do"
          type="date"
          disabled={calendarDisabled}
          defaultValue={moment()}
          //className={classes.textField}
          onChange={(date) => {
            setDateTo(date.target.value);
            props.update([dateFrom, date.target.value]);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default FiltersPozwolenia;
