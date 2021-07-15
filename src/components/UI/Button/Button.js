import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.module.css';

function Button({ buttonType, clicked, children, disabled, type = 'submit' }) {
  const appliedClasses = [classes.Button];

  if (buttonType === 'success') {
    appliedClasses.push(classes.Success);
  } else if (buttonType === 'danger') {
    appliedClasses.push(classes.Danger);
  }

  if (disabled) {
    appliedClasses.push(classes.Disabled);
  }

  return (
    <button type={type} className={appliedClasses.join(' ')} onClick={clicked}>
      {children}
    </button>
  );
}

Button.propTypes = {
  buttonType: PropTypes.oneOf(['success', 'danger']),
  type: PropTypes.oneOf(['button', 'submit']),
  clicked: PropTypes.func,
};

export default Button;
