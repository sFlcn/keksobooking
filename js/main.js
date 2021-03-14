import {initMap, mainMarker, createMarkers, resetMap} from './map.js';
import {getLatLngRoundedString} from './util.js';
import {disableFormFields, enableFormFields, changePlaceholderAndMin, changeFieldsValue, fieldValueValidation, fieldValueLengthValidation, checkCapacity} from './form.js';
import {REALTY_PROPERTIES} from './data.js';
import {getData, sendData} from './api.js';
import {showSimpleAlert, showCustomVanishingAlert} from './alerts.js';

const GET_DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const SEND_DATA_URL = 'https://23.javascript.pages.academy/keksobooking';
const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;
const MIN_PRICE = 0;
const MAX_PRICE = 1000000;
const MIN_ROOM_CAPACITY = '0';
const MAX_ROOM_COUNT = '100';
const DATA_ALERT_TIME = 3000;
const DATA_ALERT_MESSAGE_CLASS = 'data-alert__message';
const DATA_ALERT_TEXT = 'Не удаётся загрузить данные объявлений. Повторите попытку позднее.';
const mainElement = document.querySelector('main');
const mapSection = document.querySelector('.map');
const adForm = document.querySelector('.ad-form');
const cssClassForDisabledFilters = 'map__filters--disabled';
const cssClassForDisabledForm = 'ad-form--disabled';
const successMessageTemplateElement = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplateElement = document.querySelector('#error').content.querySelector('.error');
const dataAlertTemplateElement = document.querySelector('#data-alert').content.querySelector('.data-alert');

if (mapSection && adForm) {
  const mapFilters = mapSection.querySelector('.map__filters');
  const adFormTitle = adForm.querySelector('#title');
  const adFormAddress = adForm.querySelector('#address');
  const adFormType = adForm.querySelector('#type');
  const adFormPrice = adForm.querySelector('#price');
  const adFormTime = adForm.querySelector('.ad-form__element--time');
  const adFormCheckinTime = adFormTime.querySelector('#timein');
  const adFormCheckoutTime = adFormTime.querySelector('#timeout');
  const adFormRoomsCount = adForm.querySelector('#room_number');
  const adFormCapacity = adForm.querySelector('#capacity');
  const adFormResetButton = adForm.querySelector('.ad-form__reset');

  disableFormFields(adForm);  //деактивация формы объявления и фильтров до загрузки карты
  disableFormFields(mapFilters);
  adForm.classList.add(cssClassForDisabledForm);
  mapFilters.classList.add(cssClassForDisabledFilters);

  const initForms = () => {  //активация фильтров и формы после загрузки карты
    enableFormFields(adForm);
    enableFormFields(mapFilters);
    adForm.classList.remove(cssClassForDisabledForm);
    mapFilters.classList.remove(cssClassForDisabledFilters);
  };

  adFormAddress.setAttribute('readonly', ''); //блокировка редактирования поля адреса (координат)

  const syncCheckinAndCheckout = (evt) => {  //синхронизации полей времени заезда и выезда
    changeFieldsValue(evt.target.value, adFormCheckinTime, adFormCheckoutTime);
  }
  adFormTime.addEventListener('change', syncCheckinAndCheckout);

  const syncRealtyPriceToRealtyType = () => { // синхронизации поля цены в зависимости от типа жилья
    changePlaceholderAndMin(REALTY_PROPERTIES[adFormType.value]['realtyPrice'], adFormPrice);
  };
  adFormType.addEventListener('change', syncRealtyPriceToRealtyType);
  syncRealtyPriceToRealtyType();

  const validateAdFormTitle = () => { // Валидация поля заголовка
    fieldValueLengthValidation(adFormTitle, TITLE_MIN_LENGTH, TITLE_MAX_LENGTH);
  };
  adFormTitle.addEventListener('input', validateAdFormTitle);

  const validatePrice = () => { // Валидация поля цены за ночь
    fieldValueValidation(adFormPrice, MIN_PRICE, MAX_PRICE);
  };
  adFormPrice.addEventListener('input', validatePrice);

  const validateRoomsAndCapacity = () => { // Валидация полей с количеством комнат и количеством мест
    checkCapacity(adFormRoomsCount, adFormCapacity, MIN_ROOM_CAPACITY, MAX_ROOM_COUNT, 'Не для гостей');
  };
  adFormRoomsCount.addEventListener('change', validateRoomsAndCapacity);
  adFormCapacity.addEventListener('change', validateRoomsAndCapacity);
  validateRoomsAndCapacity();

  //  загрузка данных, инициализация КАРТЫ и ФОРМ
  getData(
    GET_DATA_URL,
    ((offersList) => {
      initMap(initForms);
      createMarkers(offersList);
    }),
    (() => {
      initMap(initForms);
      showCustomVanishingAlert(dataAlertTemplateElement, mainElement, DATA_ALERT_TIME, DATA_ALERT_MESSAGE_CLASS, DATA_ALERT_TEXT);
    }),
  );

  //  вывод координат главного маркера в поле формы
  const transferAddres = () => {
    changeFieldsValue(getLatLngRoundedString(mainMarker.getLatLng()), adFormAddress);
  }
  mainMarker.on('moveend', transferAddres);
  transferAddres();

  // ф-ия возвращение карты и форм в исходное состояние
  const resetUserInputs = () => {
    resetMap();
    mapFilters.reset();
    adForm.reset();
    syncRealtyPriceToRealtyType();
    transferAddres();
  }

  const onResetButtonClick = (evt) => {
    evt.preventDefault();
    resetUserInputs();
  }

  //  отправка данных формы
  const onFormSubmit = (evt) => {
    evt.preventDefault();
    sendData(
      new FormData(evt.target),
      SEND_DATA_URL,
      (() => {
        resetUserInputs();
        showSimpleAlert(successMessageTemplateElement, mainElement);
      }),
      (() => {
        showSimpleAlert(errorMessageTemplateElement, mainElement);
      }),
    );
  }
  adForm.addEventListener('submit', onFormSubmit);
  adFormResetButton.addEventListener('click', onResetButtonClick);

}
