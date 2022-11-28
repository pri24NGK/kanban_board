import React from "react";
import { HeaderText } from "../HeaderText/HeaderText";
import { Button } from "../Button/Button";

export const ModalHeaderFooter = (props) => {
  return (
    <>
      <HeaderText title={props.headerTitle} />
      {props.children}
      <Button disabled={props.footerBtnDisabled} onClick={props.footerBtnClick}>
        {props.footerButtonText}
      </Button>
    </>
  );
};
