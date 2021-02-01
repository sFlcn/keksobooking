'use strict';
const INVALID_ARGUMENT = 'Аргументы вне допустимого диапазона';

const getRandomPositiveIntFromRange = (min, max) => {
  if (!Number.isInteger(min) || !Number.isInteger(max) || min < 0 || min > max) {
    throw new Error(INVALID_ARGUMENT);
  }
  return Math.floor(Math.random() * (max + 1 - min) + min); // формула с https://learn.javascript.ru/number
}

const getRandomPositiveFloatFromRange = (min, max, fractionalDigitsCount = 1) => {
  if (min < 0 || min > max) {
    throw new Error(INVALID_ARGUMENT);
  }
  return (Math.random() * (max - min) + min).toFixed(fractionalDigitsCount);
}

getRandomPositiveIntFromRange (5, 10);
getRandomPositiveFloatFromRange (1.1, 1.2, 1);
