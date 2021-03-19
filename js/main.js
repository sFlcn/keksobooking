import {initMap, mainMarker, createMarkers, resetMap} from './map.js';
import {getLatLngRoundedString} from './util.js';
import {disableFormFields, enableFormFields, changePlaceholderAndMin, changeFieldsValue, fieldValueValidation, fieldValueLengthValidation, checkCapacity} from './form.js';
import {REALTY_PROPERTIES} from './data.js';
import {getData, sendData} from './api.js';
import {showSimpleAlert, showCustomVanishingAlert} from './alerts.js';
import {getFilteredObjects, isPropertyFitsFilter} from './filter.js';

const GET_DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const SEND_DATA_URL = 'https://22.javascript.pages.academy/keksobooking';
const MAX_MARKERS_QUANTITY = 10;
const DEFAULT_FILTER_VALUE = 'any';
const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;
const MIN_PRICE = 0;
const MAX_PRICE = 1000000;
const MIN_ROOM_CAPACITY = '0';
const MAX_ROOM_COUNT = '100';
const DATA_ALERT_TIME = 3000;
const DATA_ALERT_MESSAGE_CLASS = 'data-alert__message';
const DATA_ALERT_TEXT = 'Не удаётся загрузить данные объявлений.<br>Повторите попытку позднее.';
const CSS_CLASS_FOR_DISABLED_FILTERS = 'map__filters--disabled';
const CSS_CLASS_FOR_DISABLED_FORM = 'ad-form--disabled';
const mainElement = document.querySelector('main');
const mapSection = document.querySelector('.map');
const adForm = document.querySelector('.ad-form');
const successMessageTemplateElement = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplateElement = document.querySelector('#error').content.querySelector('.error');
const dataAlertTemplateElement = document.querySelector('#data-alert').content.querySelector('.data-alert');

if (mapSection && adForm) {
  const mapFilters = mapSection.querySelector('.map__filters');
  const filterHousingType = mapFilters.querySelector('#housing-type');
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

  const initForms = () => {  //ф-ия активация фильтров и формы после загрузки карты
    enableFormFields(adForm, CSS_CLASS_FOR_DISABLED_FORM);
    enableFormFields(mapFilters, CSS_CLASS_FOR_DISABLED_FILTERS);
  };

  const syncCheckinAndCheckout = (evt) => {  //ф-ия синхронизации полей времени заезда и выезда
    changeFieldsValue(evt.target.value, adFormCheckinTime, adFormCheckoutTime);
  }

  const syncRealtyPriceToRealtyType = () => { //ф-ия синхронизации поля цены в зависимости от типа жилья
    changePlaceholderAndMin(REALTY_PROPERTIES[adFormType.value]['realtyPrice'], adFormPrice);
  };

  const validateAdFormTitle = () => { //ф-ия валидация поля заголовка
    fieldValueLengthValidation(adFormTitle, TITLE_MIN_LENGTH, TITLE_MAX_LENGTH);
  };

  const validatePrice = () => { //ф-ия валидация поля цены за ночь
    fieldValueValidation(adFormPrice, MIN_PRICE, MAX_PRICE);
  };

  const validateRoomsAndCapacity = () => {  //ф-ия валидация полей с количеством комнат и количеством мест
    checkCapacity(adFormRoomsCount, adFormCapacity, MIN_ROOM_CAPACITY, MAX_ROOM_COUNT, 'Не для гостей');
  };

  const transferAddres = () => {  //ф-ия вывода координат главного маркера в поле формы
    changeFieldsValue(getLatLngRoundedString(mainMarker.getLatLng()), adFormAddress);
  }

  const checkFilters = (realtyObject) => {  //ф-ия проверки объекта фильтрами
    return (
      isPropertyFitsFilter(realtyObject.offer.type, filterHousingType, DEFAULT_FILTER_VALUE)
    );
  }

  const onFiltersChange = (offersList) => { //обработчик изменения фильтров
    createMarkers(getFilteredObjects(offersList, checkFilters, MAX_MARKERS_QUANTITY));
  }

  const onResetButtonClick = (evt) => { //обработчик кнопки сброса
    evt.preventDefault();
    resetUserInputs();
  }

  const resetUserInputs = () => { //ф-ия возвращения карты и форм в исходное состояние
    resetMap();
    mapFilters.reset();
    adForm.reset();
    syncRealtyPriceToRealtyType();
    transferAddres();
  }

  disableFormFields(adForm, CSS_CLASS_FOR_DISABLED_FORM); //деактивация формы объявления и фильтров до загрузки карты
  disableFormFields(mapFilters, CSS_CLASS_FOR_DISABLED_FILTERS);
  adFormAddress.setAttribute('readonly', ''); //блокировка редактирования поля адреса (координат)
  adFormTime.addEventListener('change', syncCheckinAndCheckout);
  adFormType.addEventListener('change', syncRealtyPriceToRealtyType);
  syncRealtyPriceToRealtyType();
  adFormTitle.addEventListener('input', validateAdFormTitle);
  adFormPrice.addEventListener('input', validatePrice);
  adFormRoomsCount.addEventListener('change', validateRoomsAndCapacity);
  adFormCapacity.addEventListener('change', validateRoomsAndCapacity);
  validateRoomsAndCapacity();
  adFormResetButton.addEventListener('click', onResetButtonClick);
  mainMarker.on('moveend', transferAddres); //вывод координат главного маркера в поле адреса
  transferAddres();

  //  загрузка данных, инициализация КАРТЫ и ФОРМ
  getData(
    GET_DATA_URL,
    ((offersList) => {
      initMap(initForms);
      createMarkers(offersList);
      mapFilters.addEventListener('change', () => onFiltersChange(offersList));
    }),
    (() => {
      initMap(initForms);
      showCustomVanishingAlert(dataAlertTemplateElement, mainElement, DATA_ALERT_TIME, DATA_ALERT_MESSAGE_CLASS, DATA_ALERT_TEXT);
    }),
  );

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

}
