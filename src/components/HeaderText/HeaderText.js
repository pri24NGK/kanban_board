import React from "react";
import Classes from "./HeaderText.module.css";
import ReactDOMServer from "react-dom/server";

export const HeaderText = (props) => {
  let classes = [Classes.header_text];
  switch (props.type) {
    case "lane_title": {
      classes.push(Classes.lane_title);
      break;
    }
    case "header_text_card": {
      classes.push(Classes.header_text_card);
      break;
    }
    default:
      break;
  }
  return (
    <p
      className={classes.join(" ")}
      data-for={props.data_for}
      data-html={!!props.data_for}
      data-tip={
        props.data_for &&
        ReactDOMServer.renderToString(
          <p className={Classes.tool_tip}>{props.title}</p>
        )
      }
    >
      {props.title}
    </p>
  );
};
