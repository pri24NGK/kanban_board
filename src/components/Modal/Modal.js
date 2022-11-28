import React from "react";
import className from "./Modal.module.css";
import { FaTimes } from "react-icons/fa";

export const Modal = (props) => {
  return (
    <div className={className.Modal} style={props.style}>
      <div className={className.Icon}>
        <FaTimes onClick={props.clickHandler} className={className.cancel} />
      </div>
      {props.children}
    </div>
  );
};
