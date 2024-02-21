export const isInt = (n: number) => {
  return Number(n) === n && n % 1 === 0;
};

export const isFloat = (n: number) => {
  return Number(n) === n && n % 1 !== 0;
};
