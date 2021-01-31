'use strict';

const getRandomPositiveIntFromRange = (min, max) => {
  if (min < 0 || max < 0) return null;
  if (min == max) return min;

  let minValue = Math.min(min, max); // меняем местами аргументы, если они не в правильном порядке
  let maxValue = Math.max(min, max);
  minValue = Math.trunc(minValue); //отрезаем дробную часть
  maxValue = Math.trunc(maxValue);

  return Math.floor(Math.random() * (maxValue + 1 - minValue) + minValue); // формула с https://learn.javascript.ru/number
}

const getRandomPositiveFloatFromRange = (min, max, fractionalDigitsCount) => {
  const multiplier = 10 ** fractionalDigitsCount;
  return getRandomPositiveIntFromRange(min * multiplier, max * multiplier) / multiplier;
}

getRandomPositiveFloatFromRange (1.1, 1.2, 1);
