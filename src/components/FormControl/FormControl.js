import React from "react";
import ClassNames from "./FormControl.module.css";
import DatePicker from "react-datepicker";

export const FormControl = (props) => {
  let data = null;
  switch (props.type) {
    case "input": {
      data = (
        <React.Fragment>
          <input
            type={props.fieldType}
            name={props.name}
            onChange={props.changeHandler}
            onBlur={props.blurHandler}
            className={`${props.addedStyle && ClassNames.added_styles} ${
              props.errorClass && ClassNames.error
            } `}
            placeholder={`Enter the ${props.name}`}
            value={props.value}
          />
        </React.Fragment>
      );
      break;
    }
    case "date": {
      data = (
        <React.Fragment>
          <DatePicker
            onChange={props.changeHandler}
            onBlur={props.blurHandler}
            selected={props.value}
            dateFormat="yyyy/MM/dd"
            popperPlacement="auto"
            closeOnScroll={(e) => e.target === document}
            className={`${props.addedStyle && ClassNames.added_styles} ${
              props.errorClass && ClassNames.error
            } `}
          />
        </React.Fragment>
      );
      break;
    }
    case "textarea": {
      data = (
        <textarea
          name={props.name}
          onChange={props.changeHandler}
          onBlur={props.blurHandler}
          placeholder={`Enter the ${props.name}`}
          className={`${props.addedStyle && ClassNames.added_styles} ${
            props.errorClass && ClassNames.error
          } `}
          value={props.value}
        />
      );
      break;
    }
    case "select": {
      data = (
        <select value={props.value} onChange={props.changeHandler}>
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    }
    default:
      break;
  }
  return data;
};
