import React from "react";
import Classes from "./Label.module.css";

export const Label = (props) => {
  let classes = [Classes.label_text];
  switch (props.type) {
    case "input_label": {
      classes.push(Classes.input_label);
      break;
    }
    default:
      break;
  }

  return (
    <label for={props.label} className={classes.join(" ")}>
      {props.label}
    </label>
  );
};
