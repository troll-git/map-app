import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import PozwolenieInfo from "../components/PozwolenieInfo";
import WniosekInfo from "../components/WniosekInfo";
import { Alert } from "@material-ui/lab";
import { ClickAwayListener } from "@material-ui/core";

export default function LayerInfo(props) {
  const [infoType, setInfoType] = useState(props.type);
  const [feat, setFeat] = useState(props.feat);
  const [isOpen, setIsOpen] = useState(true);

  const clickAwayHandler = () => console.log("ee");

  if (infoType === "wniosek_info") {
    console.log("wniosek_info");
    return (
      <React.Fragment>
        <PozwolenieInfo open={false} />
        <WniosekInfo feat={props.feat} open={true} />
      </React.Fragment>
    );
  }
  if (infoType === "pozwolenie_info") {
    console.log("pozwolenie_info");
    return (
      <React.Fragment>
        <PozwolenieInfo feat={props.feat} open={true} />
        <WniosekInfo open={false} />
      </React.Fragment>
    );
  }
}
