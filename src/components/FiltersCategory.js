import {
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import KategoriaPopup from "../utils/KategoriaPopup";

const FiltersCategory = (props) => {
  const [category, setCategory] = useState("");

  useEffect(() => {
    props.update(category);
  }, [category]);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <FormControl>
        <FormLabel component="legend">Kategoria</FormLabel>
        <Select value={category} onChange={handleChange}>
          <MenuItem value={""}>Wszystkie</MenuItem>
          <MenuItem value={"I"}>
            <KategoriaPopup kat={"I"} />
          </MenuItem>
          <MenuItem value={"II"}>
            <KategoriaPopup kat={"II"} />
          </MenuItem>
          <MenuItem value={"III"}>
            <KategoriaPopup kat={"III"} />
          </MenuItem>
          <MenuItem value={"IV"}>
            <KategoriaPopup kat={"IV"} />
          </MenuItem>
          <MenuItem value={"V"}>
            <KategoriaPopup kat={"V"} />
          </MenuItem>
          <MenuItem value={"VI"}>
            <KategoriaPopup kat={"VI"} />
          </MenuItem>
          <MenuItem value={"VII"}>
            <KategoriaPopup kat={"VII"} />
          </MenuItem>
          <MenuItem value={"VIII"}>
            <KategoriaPopup kat={"VIII"} />
          </MenuItem>
          <MenuItem value={"IX"}>
            <KategoriaPopup kat={"IX"} />
          </MenuItem>
          <MenuItem value={"X"}>
            <KategoriaPopup kat={"X"} />
          </MenuItem>
          <MenuItem value={"XI"}>
            <KategoriaPopup kat={"XI"} />
          </MenuItem>
          <MenuItem value={"XII"}>
            <KategoriaPopup kat={"XII"} />
          </MenuItem>
          <MenuItem value={"XIII"}>
            <KategoriaPopup kat={"XIII"} />
          </MenuItem>
          <MenuItem value={"XIV"}>
            <KategoriaPopup kat={"XIV"} />
          </MenuItem>
          <MenuItem value={"XV"}>
            <KategoriaPopup kat={"XV"} />
          </MenuItem>
          <MenuItem value={"XVI"}>
            <KategoriaPopup kat={"XVI"} />
          </MenuItem>
          <MenuItem value={"XVII"}>
            <KategoriaPopup kat={"XVII"} />
          </MenuItem>
          <MenuItem value={"XVIII"}>
            <KategoriaPopup kat={"XVIII"} />
          </MenuItem>
          <MenuItem value={"XIX"}>
            <KategoriaPopup kat={"XIX"} />
          </MenuItem>
          <MenuItem value={"XX"}>
            <KategoriaPopup kat={"XX"} />
          </MenuItem>
          <MenuItem value={"XXI"}>
            <KategoriaPopup kat={"XXI"} />
          </MenuItem>
          <MenuItem value={"XXII"}>
            <KategoriaPopup kat={"XXII"} />
          </MenuItem>
          <MenuItem value={"XXIII"}>
            <KategoriaPopup kat={"XXIII"} />
          </MenuItem>
          <MenuItem value={"XXIV"}>
            <KategoriaPopup kat={"XXIV"} />
          </MenuItem>
          <MenuItem value={"XXV"}>
            <KategoriaPopup kat={"XXV"} />
          </MenuItem>
          <MenuItem value={"XXVI"}>
            <KategoriaPopup kat={"XXVI"} />
          </MenuItem>
          <MenuItem value={"XXVII"}>
            <KategoriaPopup kat={"XXVII"} />
          </MenuItem>
          <MenuItem value={"XXVIII"}>
            <KategoriaPopup kat={"XXVIII"} />
          </MenuItem>
          <MenuItem value={"XXIX"}>
            <KategoriaPopup kat={"XIX"} />
          </MenuItem>
          <MenuItem value={"XXX"}>
            <KategoriaPopup kat={"XXX"} />
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default FiltersCategory;
