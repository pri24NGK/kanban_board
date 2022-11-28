import React, { useState, useEffect } from "react";
import { Card } from "../../components/Card/Card";
import { Lane } from "../../components/Lane/Lane";
import Classes from "./Dashboard.module.css";
import { BsPlusLg } from "react-icons/bs";
import { ModalContainer } from "../../components/ModalContainer/ModalContainer";
import { HeaderText } from "../../components/HeaderText/HeaderText";
import { FormControl } from "../../components/FormControl/FormControl";
import ReactTooltip from "react-tooltip";
import { Label } from "../../components/Label/Label";
import { ModalHeaderFooter } from "../../components/ModalHeaderFooter/ModalHeaderFooter";
import { checkValidity } from "../../utils/checkValid";
import {
  cardFormData,
  initialLaneData,
  createLaneData,
} from "../../utils/initialStates";
import { TypeLabel } from "../../components/TypeLabels/TypeLabel";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/Index/Board";

export const Dashboard = (props) => {
  const [laneData, setLaneData] = useState(initialLaneData);
  const [modalData, setModalData] = useState({
    status: false,
    type: "",
    data: {
      title: "",
      buttonText: "",
    },
  });
  const [formData, setFormData] = useState(cardFormData);
  const dispatch = useDispatch();
  const BoardData = useSelector((state) => state.Board);

  useEffect(() => {
    dispatch(actions.getLanesApi());
  }, [dispatch]);

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const callBackForCreate = () => {
    setLaneData(initialLaneData);
    setFormData(cardFormData);
    dispatch(actions.getLanesApi());
    modalChange("", true);
  };

  const changeHandler = (event) => {
    setLaneData((laneData) => {
      return {
        ...laneData,
        name: event.target.value,
      };
    });
  };

  const changeMultipleHandler = (label, event) => {
    setFormData((formData) => {
      const updatedForm = { ...formData };
      const updatedFormElement = { ...updatedForm[label] };
      updatedFormElement.value = event.target.value;
      updatedFormElement.valid = checkValidity(
        event.target.value,
        updatedFormElement.validation
      );
      updatedForm[label] = updatedFormElement;
      return updatedForm;
    });
  };

  const clickHandler = (type) => {
    if (type === "add_lane") {
      let updatedLaneData = {
        ...laneData,
        cards: [],
      };
      dispatch(actions.createLaneApi(updatedLaneData, callBackForCreate));
    } else if (type === "add_card") {
      let cardData = {
        type: formData.Card_Type.value,
        title: formData.Heading.value,
      };
      dispatch(actions.addCardToLaneApi(cardData, callBackForCreate));
    }
  };

  const deleteLaneHandler = (id) => {
    dispatch(actions.deleteLaneApi(id));
  };

  const modalChange = (type, close = false) => {
    setModalData((data) => {
      let updatedData = { ...data };
      if (close) {
        updatedData.status = false;
        return updatedData;
      }
      if (type === "add_lane") {
        updatedData.data = {
          title: "Add a Lane",
          buttonText: "Add Lane",
        };
      } else if (type === "add_card") {
        updatedData.data = {
          title: "Add a Card",
          buttonText: "Add Card",
        };
      }
      updatedData.status = true;
      updatedData.type = type;
      return updatedData;
    });
  };

  const deleteCardHandler = (laneId, cardId) => {
    dispatch(actions.deleteCardApi(laneId, cardId));
  };

  const dragStartHandler = (laneId, cardId, event) => {
    event.dataTransfer.setData("text/plain", "");
    let data = {
      cardId: cardId,
      laneId: laneId,
    };
    event.dataTransfer.setData("text/plain", JSON.stringify(data));
  };

  const dropHandler = (laneId, event) => {
    let draggedData = JSON.parse(event.dataTransfer.getData("text"));
    let removeCardLaneIndex = BoardData.lanes.findIndex(
      (lane) => lane.id === draggedData.laneId
    );
    let removeCardData = BoardData.lanes[removeCardLaneIndex].cards.find(
      (card) => card.id === draggedData.cardId
    );
    dispatch(actions.moveCardApi(draggedData, removeCardData, laneId));
  };

  let mappedFormData = [];
  for (let key in formData) {
    mappedFormData.push({
      label: key,
      elementData: formData[key],
    });
  }
  let formInputData = "",
    modalDataType = modalData?.type;
  if (modalDataType === "add_lane") {
    formInputData = (
      <FormControl
        type="input"
        fieldType="text"
        name="lane_name"
        changeHandler={changeHandler}
        value={laneData?.name}
      />
    );
  } else if (modalDataType === "add_card") {
    formInputData = mappedFormData.map((formElement) => {
      return (
        <div className={Classes.label_input_container}>
          <Label label={formElement.label} type="input_label" />
          <FormControl
            type={formElement.elementData.elementType}
            fieldType={formElement.elementData.elementConfig.type}
            name={formElement.elementData.elementConfig.placeholder}
            value={formElement.elementData.value}
            elementConfig={formElement.elementData.elementConfig}
            changeHandler={changeMultipleHandler.bind(this, formElement.label)}
          />
        </div>
      );
    });
  }

  return (
    <>
      {modalData?.status && (
        <ModalContainer click={modalChange.bind(this, "", true)}>
          <div className={Classes.lane_modal_content}>
            <ModalHeaderFooter
              headerTitle={modalData.data.title}
              footerButtonText={modalData.data.buttonText}
              footerBtnClick={() => clickHandler(modalData.type)}
              footerBtnDisabled={
                modalData.type === "add_lane"
                  ? !laneData?.name
                  : !formData?.Heading?.value
              }
            >
              {formInputData}
            </ModalHeaderFooter>
          </div>
        </ModalContainer>
      )}
      <div className={Classes.dashboard_container}>
        <div className={Classes.dashboard_grids}>
          {BoardData?.lanes?.length > 0 &&
            BoardData?.lanes.map((lane) => {
              return (
                <>
                  <Lane
                    data={lane}
                    delete={deleteLaneHandler.bind(this, lane.id)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={dropHandler.bind(this, lane.id)}
                  >
                    {lane.name === "To-Do-List" && (
                      <Card
                        type="card_create_lane"
                        click={() => modalChange("add_card")}
                      >
                        <BsPlusLg />
                        &nbsp;&nbsp;
                        <Label label={" Add card"} />
                      </Card>
                    )}
                    {lane?.cards?.length > 0 &&
                      lane.cards.map((card) => {
                        return (
                          <Card
                            type="card_usual"
                            key={card.id}
                            cross
                            clickHandler={deleteCardHandler.bind(
                              this,
                              lane.id,
                              card.id
                            )}
                            draggable
                            onDragStart={dragStartHandler.bind(
                              this,
                              lane.id,
                              card.id
                            )}
                          >
                            <TypeLabel typeLabel={card.type} />
                            <HeaderText
                              title={card.title}
                              type="header_text_card"
                            />
                          </Card>
                        );
                      })}
                  </Lane>
                  <ReactTooltip id="lane" />
                </>
              );
            })}
          <Lane data={createLaneData}>
            <Card type="card_create_lane" click={() => modalChange("add_lane")}>
              <BsPlusLg />
            </Card>
          </Lane>
          <ReactTooltip id="lane" />
        </div>
      </div>
    </>
  );
};
