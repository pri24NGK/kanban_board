import * as actionTypes from "../ActionTypes/Board.js";

const initialState = {
  lanes: [],
  todoListId: null,
};

export const BoardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LANES: {
      return {
        ...state,
        lanes: action.payload,
        todoListId: action.id,
      };
    }
    default: {
      return state;
    }
  }
};
