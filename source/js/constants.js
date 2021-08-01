export const GET_DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';
export const GET_DATA_ALTERNATIVE_URL = 'data/serverData.json';
export const SEND_DATA_URL = 'https://22.javascript.pages.academy/keksobooking';

export const RERENDER_DELAY = 500;

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
export const MAP_LAYER = {
  layerLink: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}
export const CSS_CLASS_FOR_POPUP_PHOTOS = 'popup__photo';
export const CSS_CLASS_FOR_PHOTO_VIEW_CONTAINER = 'popup__full-view';
export const CSS_CLASS_MODIFIER_FOR_PHOTO_VIEW_CONTAINER = 'popup__full-view--show';

export const DEFAULT_FILTER_VALUE = 'any';

export const TITLE_MIN_LENGTH = 30;
export const TITLE_MAX_LENGTH = 100;
export const MAX_PRICE = 1000000;
export const MIN_ROOM_CAPACITY = '0';
export const MAX_ROOM_COUNT = '100';
export const NO_GUESTS_TEXT = 'Не для гостей';
export const REALTY_FEATURE_CLASS = 'popup__feature';
export const REALTY_PROPERTIES = {
  palace: {
    realtyType: 'Дворец',
    realtyMinPrice: 10000,
  },
  flat: {
    realtyType: 'Квартира',
    realtyMinPrice: 1000,
  },
  house: {
    realtyType: 'Дом',
    realtyMinPrice: 5000,
  },
  bungalow:{
    realtyType: 'Бунгало',
    realtyMinPrice: 0,
  },
};
export const HOUSING_PRICES = {
  high: {
    from: 50000,
    till: Infinity,
  },
  middle: {
    from: 10000,
    till: 50000,
  },
  low: {
    from: 0,
    till: 10000,
  },
};

export const PICTURES_MIME_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml'];
export const DEFAULT_PREVIEW_PICTURE = 'img/muffin-grey.svg';

export const DATA_ALERT_TIME = 3000;
export const DATA_ALERT_MESSAGE_CLASS = 'data-alert__message';
export const DATA_ALERT_TEXT = 'Не удаётся загрузить данные объявлений.<br>Повторите попытку позднее.';

export const CSS_CLASS_FOR_DISABLED_FILTERS = 'map__filters--disabled';
export const CSS_CLASS_FOR_DISABLED_FORM = 'ad-form--disabled';
