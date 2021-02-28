import {initMap} from './map.js';
import {disableFormFields, enableFormFields, changePlaceholderAndMin, changeFieldsValue} from './form.js';
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
  const adFormCheckinTime = adFormTime.querySelector('#timein');
  const adFormCheckoutTime = adFormTime.querySelector('#timeout');

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

  initMap(adFormAddress, temporaryRentalList, initForms); //инициализация карты и форм
}
