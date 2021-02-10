// random-функции
const INVALID_ARGUMENT = 'Аргументы вне допустимого диапазона';

const getRandomPositiveIntFromRange = (min, max) => {
  if (Number.isInteger(min) && Number.isInteger(max) && min >= 0 && min <= max) {
    return Math.floor(Math.random() * (max + 1 - min) + min); // формула с https://learn.javascript.ru/number
  }
  throw new Error(INVALID_ARGUMENT);
}

const getRandomPositiveFloatFromRange = (min, max, fractionalDigitsCount = 1) => {
  if (min >= 0 && min <= max) {
    return +(Math.random() * (max - min) + min).toFixed(fractionalDigitsCount);
  }
  throw new Error(INVALID_ARGUMENT);
}

export {getRandomPositiveIntFromRange, getRandomPositiveFloatFromRange};
