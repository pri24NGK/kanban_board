import React from "react";

import Classes from "./Button.module.css";

export const Button = (props) => {
  let classes = [Classes.button];
  switch (props.type) {
    default:
      break;
  }
  return (
    <button
      className={classes.join(" ")}
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type}
    >
      {props.children}
    </button>
  );
};
