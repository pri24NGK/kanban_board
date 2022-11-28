import * as actionTypes from "../ActionTypes/Board";
import { database } from "../../firebase";
import { ref, push, set, remove } from "firebase/database";
import axios from "axios";

export const getLanesData = (payload, id) => {
  return {
    type: actionTypes.GET_LANES,
    payload,
    id,
  };
};

export const getLanesApi = () => {
  return (dispatch) => {
    axios
      .get("https://kanbanboard-86f74-default-rtdb.firebaseio.com/lanes.json")
      .then((res) => {
        let updatedData = [];
        let todoListId;
        if (res.data !== null) {
          for (let key in res.data) {
            let individualElement = { ...res.data[key] };
            let cardElements = [];
            if (individualElement.name === "To-Do-List") {
              todoListId = key;
            }
            if (individualElement.cards !== undefined) {
              for (let key in individualElement.cards) {
                cardElements.push({ ...individualElement.cards[key], id: key });
              }
            }
            updatedData.push({
              ...res.data[key],
              id: key,
              cards: cardElements,
            });
          }
        }

        dispatch(getLanesData(updatedData, todoListId));
        localStorage.setItem("updatedData", JSON.stringify(updatedData));
        localStorage.setItem("todoListId", todoListId);
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          getLanesData(
            JSON.parse(localStorage.getItem("updatedData")),
            localStorage.getItem("todoListId")
          )
        );
      });
  };
};

export const createLaneApi = (payload, close) => {
  return (dispatch) => {
    axios
      .post(
        "https://kanbanboard-86f74-default-rtdb.firebaseio.com/lanes.json",
        payload
      )
      .then(() => {
        close();
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteLaneApi = (id) => {
  return (dispatch) => {
    remove(ref(database, "lanes/" + id), null)
      .then(() => {
        dispatch(getLanesApi());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addCardToLaneApi = (payload, close = () => {}) => {
  return (dispatch, getState) => {
    const cardListRef = ref(
      database,
      "lanes/" + getState().Board.todoListId + "/cards/"
    );
    const updatedCardListRef = push(cardListRef);
    set(updatedCardListRef, payload)
      .then(() => {
        close();
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteCardApi = (laneId, cardId, cb = null) => {
  return (dispatch) => {
    remove(ref(database, "lanes/" + laneId + "/cards/" + cardId), null)
      .then(() => {
        if (!cb) {
          dispatch(getLanesApi());
        } else {
          cb();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const moveCardApi = (dragData, removeCard, endLaneId) => {
  return (dispatch, getState) => {
    dispatch(
      deleteCardApi(dragData.laneId, dragData.cardId, () => {
        const cardListRef = ref(database, "lanes/" + endLaneId + "/cards/");
        const updatedCardListRef = push(cardListRef);
        set(updatedCardListRef, removeCard)
          .then(() => {
            dispatch(getLanesApi());
          })
          .catch((error) => {
            console.log(error);
          });
      })
    );
  };
};
