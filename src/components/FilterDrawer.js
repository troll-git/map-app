import {
  Drawer,
  FormControlLabel,
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import moment from "moment";
import FiltersDate from "./FiltersDate";
import FiltersCategory from "./FiltersCategory";
import FiltersInvestor from "./FIltersInvestor";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const drawerWidth = "30hw";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "relative",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    overflow: "hidden",
    backgroundColor: "red",
  },
  hideDrawer: {
    position: "absolute",
    top: "40px",
    left: "80%",
    backgroundColor: "white",
    zIndex: 999,
  },
  showDrawer: {
    position: "absolute",
    top: "0px",
    left: "0%",
    backgroundColor: "white",
    zIndex: 999,
  },
}));

const FilterDrawer = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const thisYearStart = moment().startOf("year").format("YYYY-MM-DD");
  const thisYearNow = moment().format("YYYY-MM-DD");
  const monthAgo = moment().add(-31, "days").format("YYYY-MM-DD");
  const weekAgo = moment().add(-7, "days").format("YYYY-MM-DD");
  const categoryEmpty = "";

  const [checkedPozwolenia, setcheckedPozwolenia] = useState(true);
  const [checkedWnioski, setcheckedWnioski] = useState(true);
  const [ExpandedPozwolenia, setExpandedPozwolenia] = useState(false);
  const [ExpandedWnioski, setExpandedWnioski] = useState(false);
  const [FilterData, setFilterData] = useState({
    from: weekAgo,
    to: thisYearNow,
    category: categoryEmpty,
    investor: "",
  });
  const [FilterDataWnioski, setFilterDataWnioski] = useState({
    from: weekAgo,
    to: thisYearNow,
    category: categoryEmpty,
  });

  useEffect(() => {
    props.cbFilters(FilterData);
    props.cbFiltersWnioski(FilterDataWnioski);
  });
  //pozwolenia filtry
  const updateFilterData = (dataFromChild) => {
    setFilterData({
      from: dataFromChild[0],
      to: dataFromChild[1],
      category: FilterData.category,
      investor: FilterData.investor,
    });
  };

  const updateCategoryFilterPozwolenia = (dataFromChild) => {
    setFilterData({
      from: FilterData.from,
      to: FilterData.to,
      category: dataFromChild,
      investor: FilterData.investor,
    });
  };

  const closeDrawer = () => {
    setOpen(false);
  };
  const openDrawer = () => {
    setOpen(true);
  };

  const updateInvestorFilterPozwolenia = (dataFromChild) => {
    setFilterData({
      from: FilterData.from,
      to: FilterData.to,
      category: FilterData.category,
      investor: dataFromChild,
    });
  };
  //filters wnioski
  const updateFilterDataWnioski = (dataFromChild) => {
    setFilterDataWnioski({
      from: dataFromChild[0],
      to: dataFromChild[1],
      category: FilterDataWnioski.category,
    });
  };

  const updateCategoryFilterWnioski = (dataFromChild) => {
    setFilterDataWnioski({
      from: FilterDataWnioski.from,
      to: FilterDataWnioski.to,
      category: dataFromChild,
    });
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
      {open ? (
        <ArrowBackIosIcon
          className={classes.hideDrawer}
          onClick={closeDrawer}
          fontSize="large"
        />
      ) : (
        <ArrowForwardIosIcon
          className={classes.showDrawer}
          onClick={openDrawer}
          fontSize="large"
        />
      )}

      <Drawer
        className={classes.drawer}
        //BackdropProps={{ invisible: true }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <h2>Filtry </h2>
        <h2>
          {" "}
          <ArrowBackIosIcon
            className={classes.hideDrawer}
            onClick={closeDrawer}
            fontSize="large"
          />
        </h2>
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
            <FiltersDate
              update={updateFilterData}
              title={"Data wydania pozwolenia na budowę"}
            />
          </AccordionDetails>
          <AccordionDetails>
            <FiltersCategory update={updateCategoryFilterPozwolenia} />
          </AccordionDetails>
          <AccordionDetails>
            <FiltersInvestor update={updateInvestorFilterPozwolenia} />
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
            <FiltersDate
              update={updateFilterDataWnioski}
              title={"Data zgłoszenia"}
            />
          </AccordionDetails>
          <AccordionDetails>
            <FiltersCategory update={updateCategoryFilterWnioski} />
          </AccordionDetails>
        </Accordion>
      </Drawer>
    </div>
  );
};

export default FilterDrawer;
