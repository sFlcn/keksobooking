export const GET_DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';
export const SEND_DATA_URL = 'https://22.javascript.pages.academy/keksobooking';

export const MAX_MARKERS_QUANTITY = 10;
export const MARKERS_SIZE = [42, 42];
export const MARKERS_ANCHOR_POINT = [21, 42];
export const MARKERS_ICON = './img/pin.svg';
export const MAIN_MARKER_ICON = './img/main-pin.svg';
export const MAP_DEFAULT_ZOOM_LEVEL = 9;
export const MAP_DEFAULT_CENTER = {
  lat: 35.89,
  lng: 139.88,
}

export const DEFAULT_FILTER_VALUE = 'any';

export const TITLE_MIN_LENGTH = 30;
export const TITLE_MAX_LENGTH = 100;
export const MIN_PRICE = 0;
export const MAX_PRICE = 1000000;
export const MIN_ROOM_CAPACITY = '0';
export const MAX_ROOM_COUNT = '100';
export const NO_GUESTS_TEXT = 'Не для гостей';
export const REALTY_PROPERTIES = {
  palace: {
    realtyType: 'Дворец',
    realtyPrice: 10000,
  },
  flat: {
    realtyType: 'Квартира',
    realtyPrice: 1000,
  },
  house: {
    realtyType: 'Дом',
    realtyPrice: 5000,
  },
  bungalow:{
    realtyType: 'Бунгало',
    realtyPrice: 0,
  },
};

export const DATA_ALERT_TIME = 3000;
export const DATA_ALERT_MESSAGE_CLASS = 'data-alert__message';
export const DATA_ALERT_TEXT = 'Не удаётся загрузить данные объявлений.<br>Повторите попытку позднее.';

export const CSS_CLASS_FOR_DISABLED_FILTERS = 'map__filters--disabled';
export const CSS_CLASS_FOR_DISABLED_FORM = 'ad-form--disabled';
