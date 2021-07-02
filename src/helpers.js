export const capitalizeString = (str) => {
  if (typeof str !== 'string') {
    throw Error(`capitalizeString() expects "string" as argument but ${typeof str} was provided`);
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const roundTwoDecimalPlaces = (num) => {
  return +(Math.round(num + 'e+2') + 'e-2');
};
