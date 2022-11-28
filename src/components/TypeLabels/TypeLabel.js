import React from "react";
import Classes from "./TypeLabel.module.css";

export const TypeLabel = (props) => {
  let classes = [Classes.typeLabel_container];
  switch (props.typeLabel) {
    case "feature": {
      classes.push(Classes.feature);
      break;
    }
    case "bug": {
      classes.push(Classes.bug);
      break;
    }
    case "request": {
      classes.push(Classes.request);
      break;
    }
    default: {
      break;
    }
  }
  return (
    <div className={classes.join(" ")}>
      <div className={Classes.type_dot} />
      <p>{props.typeLabel.toUpperCase()}</p>
    </div>
  );
};
