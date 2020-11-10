import { FormControl, FormLabel, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";

const FiltersInvestor = (props) => {
  const [Investor, setInvestor] = useState("");

  useEffect(() => {
    props.update(Investor);
  }, [Investor]);

  const handleChange = (event) => {
    if (event.target.value.length > 2 || event.target.value.length === 0)
      setInvestor(event.target.value);
  };

  return (
    <div>
      <FormControl>
        <FormLabel component="legend">Inwestor</FormLabel>
        <form onChange={handleChange} noValidate autoComplete="off">
          <TextField
            id="filled-basic"
            label="imię, nazwisko, nazwa"
            variant="filled"
          />
        </form>
      </FormControl>
    </div>
  );
};

export default FiltersInvestor;
