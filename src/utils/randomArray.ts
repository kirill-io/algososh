const randomInteger = (min: number, max: number) => {
  let rand = min + Math.random() * (max + 1 - min);

  return Math.floor(rand);
};

const randomIntegerString = (min: number, max: number) => {
  let rand = min + Math.random() * (max + 1 - min);

  return String(Math.floor(rand));
};

export const randomArrayString = (
  minArrayLength: number,
  maxArrayLength: number,
  minArrayValue: number,
  maxArrayValue: number,
) => {
  return Array(randomInteger(minArrayLength, maxArrayLength))
    .fill("")
    .map(() => randomIntegerString(minArrayValue, maxArrayValue));
};

export const randomArrayNumber = (
  minArrayLength: number,
  maxArrayLength: number,
  minArrayValue: number,
  maxArrayValue: number,
) => {
  return Array(randomInteger(minArrayLength, maxArrayLength))
    .fill("")
    .map(() => randomInteger(minArrayValue, maxArrayValue));
};
