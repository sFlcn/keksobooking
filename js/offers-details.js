import {getRentalList} from './data.js';
import {getNumWithWordDeclension} from './util.js';

const ROOMS_DECLENSION_ARRAY = [
  'комната',
  'комнаты',
  'комнат',
];
const GUESTS_DECLENSION_ARRAY = [
  'гостя',
  'гостей',
  'гостей',
];
const REALTY_AMOUNT = 10;
const rentalList = getRentalList(REALTY_AMOUNT);

const mapCanvas = document.querySelector('.map__canvas');
const offersTemplate = document.querySelector('#card').content.querySelector('.popup');

const rentalListFragment = document.createDocumentFragment();

rentalList.forEach(({
  author,
  offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}
}) => {
  const rentalItem = offersTemplate.cloneNode(true);
  rentalItem.querySelector('.popup__avatar').src = author;
  rentalItem.querySelector('.popup__title').textContent = title;
  rentalItem.querySelector('.popup__text--address').textContent = address;
  rentalItem.querySelector('.popup__text--price').innerHTML = `${price} <span>₽/ночь</span>`;
  rentalItem.querySelector('.popup__text--capacity').textContent = `${getNumWithWordDeclension(rooms, ROOMS_DECLENSION_ARRAY)} для ${getNumWithWordDeclension(guests, GUESTS_DECLENSION_ARRAY)}`;
  rentalItem.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  rentalItem.querySelector('.popup__description').textContent = description;
  rentalListFragment.appendChild(rentalItem);
});

mapCanvas.appendChild(rentalListFragment);
