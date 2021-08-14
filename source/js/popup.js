import {getNumWithWordDeclension} from './util.js';
import {
  REALTY_FEATURE_CLASS, REALTY_PROPERTIES,
  CSS_CLASS_FOR_POPUP_PHOTOS, CSS_CLASS_FOR_PHOTO_VIEW_CONTAINER, CSS_CLASS_MODIFIER_FOR_PHOTO_VIEW_CONTAINER
} from './constants.js';

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

// генерация разметки объявления
const popupTemplate = document.querySelector('#card').content.querySelector('.popup');

const generatePopupFragment = ({
  author: {avatar},
  offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos},
}) => {
  const popupContent = popupTemplate.cloneNode(true);

  const fillOutThePopupElement = (data, popupElement, callback) => {
    if (data) {
      callback();
    } else {
      popupElement.remove();
    }
  }

  const popupAvatarElement = popupContent.querySelector('.popup__avatar');
  fillOutThePopupElement(avatar, popupAvatarElement, () => {
    popupAvatarElement.src = avatar;
  });

  const popupTitleElement = popupContent.querySelector('.popup__title');
  fillOutThePopupElement(title, popupTitleElement, () => {
    popupTitleElement.textContent = title;
  });

  const popupAddressElement = popupContent.querySelector('.popup__text--address');
  fillOutThePopupElement(address, popupAddressElement, () => {
    popupAddressElement.textContent = address;
  });

  const popupTypeElement = popupContent.querySelector('.popup__type');
  fillOutThePopupElement(type, popupTypeElement, () => {
    popupTypeElement.textContent = REALTY_PROPERTIES[type]['realtyType'];
  });

  const popupCapacityElement = popupContent.querySelector('.popup__text--capacity');
  fillOutThePopupElement((rooms && guests), popupCapacityElement, () => {
    popupCapacityElement.textContent = `${getNumWithWordDeclension(rooms, ROOMS_DECLENSION_ARRAY)} для ${getNumWithWordDeclension(guests, GUESTS_DECLENSION_ARRAY)}`;
  });

  const popupTimeElement = popupContent.querySelector('.popup__text--time');
  fillOutThePopupElement((checkin && checkout), popupTimeElement, () => {
    popupTimeElement.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  });

  const popupDescriptionElement = popupContent.querySelector('.popup__description');
  fillOutThePopupElement(title, popupDescriptionElement, () => {
    popupDescriptionElement.textContent = description;
  });

  const popupPriceElement = popupContent.querySelector('.popup__text--price');
  const popupCurrencyElement = popupPriceElement.querySelector('span');
  fillOutThePopupElement(price, popupCurrencyElement, () => {
    popupPriceElement.textContent = price + ' ';
    popupPriceElement.appendChild(popupCurrencyElement);
  });

  const popupFeaturesListElement = popupContent.querySelector('.popup__features');
  fillOutThePopupElement(features, popupFeaturesListElement, () => {
    const featuresFragment = document.createDocumentFragment();
    features.forEach((item) => {
      const featureItem = popupTemplate.querySelector(`.${REALTY_FEATURE_CLASS}`).cloneNode(true);
      featureItem.className = `${REALTY_FEATURE_CLASS} ${REALTY_FEATURE_CLASS}--${item}`;
      featuresFragment.appendChild(featureItem);
    });
    popupFeaturesListElement.innerHTML = '';
    popupFeaturesListElement.appendChild(featuresFragment);
  });

  const popupPhotosListElement = popupContent.querySelector('.popup__photos');
  fillOutThePopupElement(photos, popupPhotosListElement, () => {
    const photosFragment = document.createDocumentFragment();
    photos.forEach((item) => {
      const photoItem = popupTemplate.querySelector('.popup__photo').cloneNode(true);
      photoItem.src = item;
      photosFragment.appendChild(photoItem);
    });
    popupPhotosListElement.innerHTML = '';
    popupPhotosListElement.appendChild(photosFragment);
  });

  return document.createDocumentFragment().appendChild(popupContent);
}

const onPopupPhotoClick = (evt) => {  //ф-ия показа фото в попапе объявления по клику
  if (evt.target.classList.contains(CSS_CLASS_FOR_POPUP_PHOTOS)) {
    const photoViewContainer = document.querySelector(`.${CSS_CLASS_FOR_PHOTO_VIEW_CONTAINER}`);
    photoViewContainer.src = evt.target.getAttribute('src');
    photoViewContainer.classList.add(CSS_CLASS_MODIFIER_FOR_PHOTO_VIEW_CONTAINER);
  }
  if (evt.target.classList.contains(CSS_CLASS_MODIFIER_FOR_PHOTO_VIEW_CONTAINER)) {
    evt.target.classList.remove(CSS_CLASS_MODIFIER_FOR_PHOTO_VIEW_CONTAINER);
  }
}

export {generatePopupFragment, onPopupPhotoClick};
