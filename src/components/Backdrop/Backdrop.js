import React from "react";
import ClassName from "./Backdrop.module.css";

export const Backdrop = (props) => {
  return <div className={ClassName.Backdrop}>{props.children}</div>;
};
