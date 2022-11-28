import React from "react";
import Classes from "./Card.module.css";
import { FaTimes } from "react-icons/fa";

export const Card = (props) => {
  let classes = [Classes.card_container];
  switch (props.type) {
    case "card_create_lane": {
      classes.push(Classes.card_create_lane);
      break;
    }
    case "card_usual": {
      classes.push(Classes.card_usual);
      break;
    }
    default:
      break;
  }

  return (
    <div
      className={classes.join(" ")}
      onClick={props.click}
      draggable={props.draggable}
      onDragStart={props.onDragStart}
    >
      {props.cross && (
        <div className={Classes.cancel_container}>
          <FaTimes onClick={props.clickHandler} />
        </div>
      )}
      {props.children}
    </div>
  );
};
