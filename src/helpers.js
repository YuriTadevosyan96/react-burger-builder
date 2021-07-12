export const capitalizeString = (str) => {
  if (typeof str !== 'string') {
    throw Error(`capitalizeString() expects "string" as argument but ${typeof str} was provided`);
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const roundNthDecimalPlaces = (num, nthPlaces) => {
  return +(Math.round(num + `e+${nthPlaces}`) + `e-${nthPlaces}`);
};
