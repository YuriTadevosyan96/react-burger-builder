import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.module.css';

function Button({ buttonType, clicked, children }) {
  const appliedClasses = [classes.Button];

  if (buttonType === 'success') {
    appliedClasses.push(classes.Success);
  } else if (buttonType === 'danger') {
    appliedClasses.push(classes.Danger);
  }

  return (
    <button className={appliedClasses.join(' ')} onClick={clicked}>
      {children}
    </button>
  );
}

Button.propTypes = {
  buttonType: PropTypes.oneOf(['success', 'danger']),
  clicked: PropTypes.func,
};

export default Button;
