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
  const monthAgo = moment().add(-30, "days").format("YYYY-MM-DD");
  const [dateOption, setDateOption] = useState("lastMonth");
  const [dateFrom, setDateFrom] = useState(monthAgo);
  const [dateTo, setDateTo] = useState(thisYearNow);
  const [calendarDisabled, setCalendarDisabled] = useState(true);

  useEffect(() => {
    props.update([dateFrom, dateTo]);
  }, []);

  const handleChangeDatePozwolenia = (event) => {
    if (event.target.value === "customdate") {
      setDateOption(event.target.value);
      setCalendarDisabled(false);
    }
    if (event.target.value === "lastMonth") {
      setCalendarDisabled(true);
      setDateOption(event.target.value);
      setDateFrom(monthAgo);
      console.log(monthAgo);
      setDateTo(thisYearNow);
      props.update([monthAgo, thisYearNow]);
    }
    if (event.target.value === "thisYear") {
      setCalendarDisabled(true);
      setDateOption(event.target.value);
      setDateFrom(thisYearStart);
      setDateTo(thisYearNow);
      props.update([thisYearStart, thisYearNow]);
    }
    if (event.target.value === "allYear") {
      setCalendarDisabled(true);
      setDateOption(event.target.value);
      setDateFrom("");
      setDateTo("");
      props.update(["", ""]);
    }
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">
        Data wydania pozwolenia na budowę
      </FormLabel>
      <RadioGroup
        aria-label="rokwydaniawniosku"
        name="rokwniosku"
        value={dateOption}
        onChange={handleChangeDatePozwolenia}
      >
        <FormControlLabel
          value="lastMonth"
          control={<Radio />}
          label="Ostatni miesiąc"
        />
        <FormControlLabel
          value="thisYear"
          control={<Radio />}
          label="Bieżący rok"
        />
        <FormControlLabel
          value="allYear"
          control={<Radio />}
          label="wszystkie lata"
        />
        <FormControlLabel
          value="customdate"
          control={<Radio />}
          label="Wybierz date"
        />
        {!calendarDisabled ? (
          <React.Fragment>
            <TextField
              id="dateFrom"
              label="od"
              type="date"
              disabled={calendarDisabled}
              defaultValue={thisYearStart}
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
              defaultValue={thisYearNow}
              //className={classes.textField}
              onChange={(date) => {
                setDateTo(date.target.value);
                props.update([dateFrom, date.target.value]);
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </React.Fragment>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </RadioGroup>
    </FormControl>
  );
};

export default FiltersPozwolenia;
