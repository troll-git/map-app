import React, { useState, useEffect, useRef } from "react";
import MapClass from "../components/MapClass"
import FilterDrawer from "../components/FilterDrawer"

const MainCanvas = (props)=>{
    const [enabledPozwolenia, setEnablePozwolenia] = useState(true);
    const [enabledWnioski, setEnableWnioski] = useState(true);

    const callBackPozwolenia= (dataFromChild)=>{
        setEnablePozwolenia(dataFromChild)
        console.log(dataFromChild)       
    }
    const callBackWnioski= (dataFromChild)=>{
        setEnableWnioski(dataFromChild)
        console.log(dataFromChild)       
    }


    return (
        <React.Fragment>
        <h1>Main Canvas</h1>
        <FilterDrawer callBackPozwolenia={callBackPozwolenia} callBackWnioski={callBackWnioski}/>
        <MapClass enabledPozwolenia={enabledPozwolenia} enabledWnioski={enabledWnioski}/>
        
        </React.Fragment>
    )
}

export default MainCanvas