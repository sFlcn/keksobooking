'use strict';

const INVALID_ARGUMENT = 'Аргументы вне допустимого диапазона';


// random-функции
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


// генерация временных данных
const REALTY_AMOUNT = 10;
const NUMBER_OF_AVATAR_PICTURES = 8;
const REALTY_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];
const CHECKIN_TIME = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES_LIST = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS_LIST = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const getRandomString = (words = 6) => {  // ф-ия генерации строки случайного текста
  if (words >= 1 && words < 1000) {
    const abc = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
    let randString = '';
    for (let i = 0; i < words; i++) {
      let randWord = '';
      while (randWord.length < getRandomPositiveIntFromRange (1, 10)) {
        randWord += abc[getRandomPositiveIntFromRange (0, abc.length - 1)];
      }
      randString += randWord + ' ';
    }
    return randString.slice(0, 1).toUpperCase() + randString.slice(1, randString.length - 1) + '.';
  } else {
    throw new Error(INVALID_ARGUMENT);
  }
}

const shuffleArray = (array) => {  // ф-ия случайной перестановки элементов массива по Фишеру-Йетсу
  for (let i = array.length - 1; i > 0; i--) {
    let j = getRandomPositiveIntFromRange (0, i);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const cutArrayRandomly = (array) => {  // ф-ия укорачивания массива на случайную длину
  let cutEnd = getRandomPositiveIntFromRange (1, array.length);
  return array.slice(0, cutEnd);
}

const randomizeArray = (array) => {  //ф-ия перемешивания и обрезки массива
  return cutArrayRandomly(shuffleArray(array));
}

const createRealty = (id) => {  // ф-ия компановки объекта недвижимости
  let location = {
    x: getRandomPositiveFloatFromRange (35.65000, 35.70000, 5),
    y: getRandomPositiveFloatFromRange (139.70000, 139.80000, 5),
  };
  let checkInTime = CHECKIN_TIME[getRandomPositiveIntFromRange (0, CHECKIN_TIME.length - 1)]

  return {
    id,
    author: `img/avatars/user0${getRandomPositiveIntFromRange (1, NUMBER_OF_AVATAR_PICTURES)}.png`,
    offer: {
      title: getRandomString(10),
      address: location.x + ', ' + location.y,
      price: getRandomPositiveIntFromRange (1, 1000000),
      type: REALTY_TYPES[getRandomPositiveIntFromRange (0, REALTY_TYPES.length - 1)],
      rooms: getRandomPositiveIntFromRange (1, 100),
      guests: getRandomPositiveIntFromRange (1, 100),
      checkin: checkInTime,
      checkout: checkInTime,
      features: randomizeArray(FEATURES_LIST),
      description: getRandomString(100),
      photos: randomizeArray(PHOTOS_LIST),
    },
    location,
  };
}

const getRentalList = (amount) => {  // ф-ия сбора массива объектов недвижимости
  return new Array(amount).fill(null).map((_, index) => createRealty(index));
}

getRentalList(REALTY_AMOUNT);
