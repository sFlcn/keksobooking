import {
  GET_DATA_URL, GET_DATA_ALTERNATIVE_URL, SEND_DATA_URL,
  RERENDER_DELAY, MAX_MARKERS_QUANTITY, DEFAULT_FILTER_VALUE,
  TITLE_MIN_LENGTH, TITLE_MAX_LENGTH, MAX_PRICE, MIN_ROOM_CAPACITY, MAX_ROOM_COUNT, NO_GUESTS_TEXT, REALTY_PROPERTIES, HOUSING_PRICES,
  DATA_ALERT_TIME, DATA_ALERT_MESSAGE_CLASS, DEFAULT_PREVIEW_PICTURE, DATA_ALERT_TEXT,
  CSS_CLASS_FOR_DISABLED_FILTERS, CSS_CLASS_FOR_DISABLED_FORM} from './constants.js';
import {initMap, mainMarker, createMarkers, resetMap} from './map.js';
import {getLatLngRoundedString, debounce} from './util.js';
import {enableFormFields, changePlaceholderAndMin, changeFieldsValue, validateFieldValue, validateFieldValueLength, checkCapacity} from './form.js';
import {fetchData} from './api.js';
import {showSimpleAlert, showCustomVanishingAlert} from './alerts.js';
import {isPropertyFitsFilter, isNumericPropertyFitsFilter, isNumericPropertyFitsRangeFilter, isFeaturesInProperties, getFilteredObjects} from './filter.js';
import {setPreviewFromFileChooser, resetPreview, generatePreviewElements, resetPreviewElements} from './preview.js';
import {saveUserOffer} from './serverEmulation.js';

const mainElement = document.querySelector('main');
const mapSection = document.querySelector('.map');
const mapFilters = mapSection.querySelector('.map__filters');
const filterHousingType = mapFilters.querySelector('#housing-type');
const filterHousingPrice = mapFilters.querySelector('#housing-price');
const filterHousingRooms = mapFilters.querySelector('#housing-rooms');
const filterHousingGuests = mapFilters.querySelector('#housing-guests');
const filterHousingFeatures = mapFilters.querySelectorAll('#housing-features input[type="checkbox"]');
const adForm = document.querySelector('.ad-form');
const adFormUserpicChooser = adForm.querySelector('.ad-form-header__input');
const adFormUserpicImage = adForm.querySelector('.ad-form-header__preview img');
const adFormTitle = adForm.querySelector('#title');
const adFormAddress = adForm.querySelector('#address');
const adFormType = adForm.querySelector('#type');
const adFormPrice = adForm.querySelector('#price');
const adFormTime = adForm.querySelector('.ad-form__element--time');
const adFormCheckinTime = adFormTime.querySelector('#timein');
const adFormCheckoutTime = adFormTime.querySelector('#timeout');
const adFormRoomsCount = adForm.querySelector('#room_number');
const adFormCapacity = adForm.querySelector('#capacity');
const adFormPhotoChooser = adForm.querySelector('.ad-form__input');
const adFormPhotoContainer = adForm.querySelector('.ad-form__photo-container');
const adFormResetButton = adForm.querySelector('.ad-form__reset');
const successMessageTemplateElement = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplateElement = document.querySelector('#error').content.querySelector('.error');
const dataAlertTemplateElement = document.querySelector('#data-alert').content.querySelector('.data-alert');
const formPhotoTemplateElement = document.querySelector('#ad-form__photo-template').content.querySelector('.ad-form__photo');

const onTypeFieldChange = () => {
  changePlaceholderAndMin(REALTY_PROPERTIES[adFormType.value]['realtyMinPrice'], adFormPrice);
  onPriceFieldChange();
};

const onPriceFieldChange = () => {
  validateFieldValue(adFormPrice, adFormPrice.min, MAX_PRICE);
}

const onRoomsAndCapacityFieldsChange = () => {  //ф-ия валидация полей с количеством комнат и количеством мест
  checkCapacity(adFormRoomsCount, adFormCapacity, MIN_ROOM_CAPACITY, MAX_ROOM_COUNT, NO_GUESTS_TEXT);
};

const onMainMarkerMoove = () => {  //ф-ия вывода координат главного маркера в поле формы
  changeFieldsValue(getLatLngRoundedString(mainMarker.getLatLng()), adFormAddress);
}

const checkFilters = (realtyObject) => {  //ф-ия проверки объекта фильтрами
  return (
    isPropertyFitsFilter(realtyObject.offer.type, filterHousingType, DEFAULT_FILTER_VALUE) &&
    isNumericPropertyFitsRangeFilter(realtyObject.offer.price, filterHousingPrice, HOUSING_PRICES, DEFAULT_FILTER_VALUE) &&
    isNumericPropertyFitsFilter(realtyObject.offer.guests, filterHousingGuests, DEFAULT_FILTER_VALUE) &&
    isNumericPropertyFitsFilter(realtyObject.offer.rooms, filterHousingRooms, DEFAULT_FILTER_VALUE) &&
    isFeaturesInProperties(realtyObject.offer.features, filterHousingFeatures)
  );
}

const filterAndCreateMarkers = (offersData) => {
  createMarkers(getFilteredObjects(offersData, checkFilters, MAX_MARKERS_QUANTITY));
}

const resetUserInputs = () => { //ф-ия возвращения карты и форм в исходное состояние
  resetMap();
  mapFilters.reset();
  adForm.reset();
  filterAndCreateMarkers(offersData);
  onTypeFieldChange();
  onMainMarkerMoove();
  resetPreview(adFormUserpicImage, DEFAULT_PREVIEW_PICTURE);
  resetPreviewElements(adFormPhotoContainer, formPhotoTemplateElement);
}

let offersData = null;
//блокировка редактирования поля адреса (координат)
adFormAddress.setAttribute('readonly', '');
//синхронизации полей времени заезда и выезда
adFormTime.addEventListener('change', (evt) => changeFieldsValue(evt.target.value, adFormCheckinTime, adFormCheckoutTime));
adFormType.addEventListener('change', onTypeFieldChange);
onTypeFieldChange();
//валидация длинны заголовка
adFormTitle.addEventListener('input', () => validateFieldValueLength(adFormTitle, TITLE_MIN_LENGTH, TITLE_MAX_LENGTH));
//валидация цены за ночь
adFormPrice.addEventListener('input', onPriceFieldChange);
adFormRoomsCount.addEventListener('change', onRoomsAndCapacityFieldsChange);
adFormCapacity.addEventListener('change', onRoomsAndCapacityFieldsChange);
onRoomsAndCapacityFieldsChange();
mainMarker.on('move', onMainMarkerMoove); //вывод координат главного маркера в поле адреса
onMainMarkerMoove();
adFormUserpicChooser.addEventListener('change', () => setPreviewFromFileChooser(adFormUserpicChooser, adFormUserpicImage));
adFormPhotoChooser.addEventListener('change', () => generatePreviewElements(adFormPhotoChooser, adFormPhotoContainer, formPhotoTemplateElement));

mapFilters.addEventListener(
  'change',
  debounce(
    () => filterAndCreateMarkers(offersData),
    RERENDER_DELAY,
  ),
);

adFormResetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetUserInputs();
});

//  загрузка данных, инициализация КАРТЫ и ФОРМ
const initializeInterface = (offersList) => {
  initMap(() => {
    enableFormFields(adForm, CSS_CLASS_FOR_DISABLED_FORM);
    enableFormFields(mapFilters, CSS_CLASS_FOR_DISABLED_FILTERS);
  });
  offersData = offersList;
  filterAndCreateMarkers(offersData);
}

fetchData(GET_DATA_URL)
  .then((offersList) => initializeInterface(offersList))
  .catch(() => {
    fetchData(GET_DATA_ALTERNATIVE_URL)
      .then((offersList) => initializeInterface(offersList))
      .catch(() => {
        initMap(() => enableFormFields(adForm, CSS_CLASS_FOR_DISABLED_FORM));
        showCustomVanishingAlert(dataAlertTemplateElement, mainElement, DATA_ALERT_TIME, DATA_ALERT_MESSAGE_CLASS, DATA_ALERT_TEXT);
      })
  });

//  отправка данных формы
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  fetchData(SEND_DATA_URL, {method: 'POST', body: formData})
    .then(() => {
      resetUserInputs();
      showSimpleAlert(successMessageTemplateElement, mainElement);
    })
    .catch(() => showSimpleAlert(errorMessageTemplateElement, mainElement));
  offersData = offersData.concat(saveUserOffer(formData));
});
