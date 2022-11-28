import { v4 as uuid } from "uuid";

export const cardFormData = {
  Card_Type: {
    elementType: "select",
    elementConfig: {
      options: [
        { value: "feature", displayValue: "FEATURE" },
        { value: "bug", displayValue: "BUG" },
        { value: "request", displayValue: "REQUEST" },
      ],
    },
    value: "feature",
    validation: {},
    valid: true,
  },
  Heading: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Heading",
    },
    value: "",
    validation: {
      required: true,
    },
    valid: false,
  },
};

export const initialLaneData = {
  name: "",
};

export const createLaneData = {
  name: "Create New Lane",
  id: uuid(),
};
