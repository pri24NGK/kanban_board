import React from "react";
import { Modal } from "../Modal/Modal";
import { Backdrop } from "../Backdrop/Backdrop";

export const ModalContainer = (props) => {
  return (
    <Backdrop>
      <Modal clickHandler={props.click}>{props.children}</Modal>
    </Backdrop>
  );
};
