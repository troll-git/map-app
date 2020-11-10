import React from "react";
import { useState } from "react";
import PozwolenieInfo from "../components/PozwolenieInfo";
import WniosekInfo from "../components/WniosekInfo";

export default function LayerInfo(props) {
  const [infoType, setInfoType] = useState(props.type);

  if (infoType === "wniosek_info") {
    return (
      <React.Fragment>
        <PozwolenieInfo open={false} />
        <WniosekInfo feat={props.feat} open={true} />
      </React.Fragment>
    );
  }
  if (infoType === "pozwolenie_info") {
    return (
      <React.Fragment>
        <PozwolenieInfo feat={props.feat} open={true} />
        <WniosekInfo open={false} />
      </React.Fragment>
    );
  }
}
