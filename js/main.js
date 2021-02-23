import {initMap, MAP_LOADED_EVENT} from './map.js';
import {switchEnableForm, addMinPriceChangeByTypeHandler, addFieldsSyncHandler} from './form.js';
import {REALTY_PROPERTIES, temporaryRentalList} from './data.js';

const mapSection = document.querySelector('.map');
const adForm = document.querySelector('.ad-form');
const cssClassForDisabledFilters = 'map__filters--disabled';
const cssClassForDisabledForm = 'ad-form--disabled';

if (mapSection && adForm) {
  const mapFilters = mapSection.querySelector('.map__filters');
  const adFormAddress = adForm.querySelector('#address');
  const adFormType = adForm.querySelector('#type');
  const adFormPrice = adForm.querySelector('#price');
  const adFormTime = adForm.querySelector('.ad-form__element--time');

  switchEnableForm(adForm, false);  //деактивация формы объявления и фильтров до загрузки карты
  switchEnableForm(mapFilters, false);
  adForm.classList.add(cssClassForDisabledForm);
  mapFilters.classList.add(cssClassForDisabledFilters);

  const mapLoadingHandler = () => {  //активация фильтров и формы после загрузки карты
    switchEnableForm(adForm, true);
    switchEnableForm(mapFilters, true);
    adForm.classList.remove(cssClassForDisabledForm);
    mapFilters.classList.remove(cssClassForDisabledFilters);
    document.removeEventListener(MAP_LOADED_EVENT, mapLoadingHandler);
  };
  document.addEventListener(MAP_LOADED_EVENT, mapLoadingHandler);

  adFormAddress.setAttribute('readonly', ''); //блокировка редактирования поля адреса (координат)

  addFieldsSyncHandler(adFormTime, adFormTime.querySelector('#timein'), adFormTime.querySelector('#timeout'));  //синхронизации полей времени заезда и выезда

  addMinPriceChangeByTypeHandler(adFormType, adFormPrice, REALTY_PROPERTIES); // синхронизация поля цены в зависимости от типа жилья
  adFormType.dispatchEvent(new Event('change'));

  initMap(adFormAddress, temporaryRentalList); //инициализация карты
}
