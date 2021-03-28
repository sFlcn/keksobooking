const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

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
  } else if (numberLastDigit === 1) {
    declension = wordFormsArray[0];
  }
  return number + ' ' + declension;
}

const getLatLngRoundedString = ({lat, lng}, fractionalDigitsCount = 5) => { //ф-ия возврата строки с округлёнными координатамии
  return `${lat.toFixed(fractionalDigitsCount)}, ${lng.toFixed(fractionalDigitsCount)}`
}

const debounce = (callback, delay) => {
  let timerId;
  return (...args) => {
    const boundFunction = callback.bind(this, ...args);
    clearTimeout(timerId);
    timerId = setTimeout(boundFunction, delay);
  }
}

export {isEscEvent, getNumWithWordDeclension, getLatLngRoundedString, debounce};
