import {Drawer,FormControlLabel,Switch} from '@material-ui/core';
import React ,{useState}from "react";

const FilterDrawer = (props)=>{

  const [checkedPozwolenia,setcheckedPozwolenia]=useState(true)
  const [checkedWnioski,setcheckedWnioski]=useState(true)


  const handleChangePozwolenia=(event)=>{
    props.callBackPozwolenia(event.target.checked)
    setcheckedPozwolenia(event.target.checked)
  }
  const handleChangeWnioski=(event)=>{
    props.callBackWnioski(event.target.checked)
    setcheckedWnioski(event.target.checked)

  }

    return(
        <Drawer
        BackdropProps={{ invisible: true }}
        variant="persistent"
        anchor='left'
        open='true'

      >
      <FormControlLabel
        control={<Switch name="Pozwolenia" onChange={handleChangePozwolenia} color="primary" checked={checkedPozwolenia}/>}
        label="Pozwolenia"
      />
      <FormControlLabel
      control={<Switch onChange={handleChangeWnioski} name="Wnioski" checked={checkedWnioski}/>}
      label="Wnioski"
    />
      </Drawer>
    )
}

export default FilterDrawer