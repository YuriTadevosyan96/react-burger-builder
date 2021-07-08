import React from 'react';

import classes from './Input.module.css';

function Input({ label, elementType, elementConfig, shouldValidate, invalid, ...otherProps }) {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (invalid && shouldValidate) {
    inputClasses.push(classes.Invalid);
  }

  switch (elementType) {
    case 'input':
      inputElement = (
        <input className={inputClasses.join(' ')} {...elementConfig} {...otherProps} />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea className={inputClasses.join(' ')} {...elementConfig} {...otherProps} />
      );
      break;
    case 'select':
      inputElement = (
        <select className={inputClasses.join(' ')} {...otherProps}>
          {elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input className={inputClasses.join(' ')} {...elementConfig} {...otherProps} />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{label}</label>
      {inputElement}
    </div>
  );
}

export default Input;
