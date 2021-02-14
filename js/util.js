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

// получение строки из числа и соответствующего склонённого существительного из массива с тремя вариантами; пример: [год, года, лет]
const getNumWithWordDeclension = (number, wordFormsArray) => {
  let declension = wordFormsArray[2];
  if (!number.isInteger) {
    declension = wordFormsArray[2];
  }
  let numberLastTwoDigits = Math.abs(number) % 100;
  let numberLastDigit = numberLastTwoDigits % 10;
  if (numberLastTwoDigits > 10 && numberLastTwoDigits < 20) {
    declension = wordFormsArray[2];
  } else if (numberLastDigit > 1 && numberLastDigit < 5) {
    declension = wordFormsArray[1];
  } else if (numberLastDigit == 1) {
    declension = wordFormsArray[0];
  }
  return number + ' ' + declension;
}

export {getRandomPositiveIntFromRange, getRandomPositiveFloatFromRange, getNumWithWordDeclension};
