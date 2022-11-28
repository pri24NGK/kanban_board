import React from "react";
import Classes from "./Lane.module.css";
import { FaTimes } from "react-icons/fa";
import { HeaderText } from "../HeaderText/HeaderText";

export const Lane = (props) => {
  let modifiedTitle = props.data?.name;

  if (props.data?.cards?.length > 0) {
    modifiedTitle = props.data.name + `(${props.data.cards.length})`;
  }

  return (
    <>
      <div
        className={Classes.lane_container}
        key={props.data.id}
        onDragOver={props.onDragOver}
        onDrop={props.onDrop}
      >
        <div
          className={`${Classes.lane_header_container} ${
            !!(
              props.data.name === "To-Do-List" ||
              props.data.name === "Create New Lane"
            )
              ? ""
              : Classes.space_start
          }`}
        >
          <HeaderText
            title={modifiedTitle}
            type={"lane_title"}
            data_for="lane"
          />
          {modifiedTitle !== "Create New Lane" && (
            <FaTimes onClick={props.delete} className={Classes.cancel} />
          )}
        </div>
        {props.children}
      </div>
    </>
  );
};
