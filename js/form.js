const adForm = document.querySelector('.ad-form');
const adFormAddress = adForm.querySelector('#address');
const REALTY_MIN_PRICES = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
};

if (adForm) {
  const adFormType = adForm.querySelector('#type');
  const adFormPrice = adForm.querySelector('#price');
  const adFormTime = adForm.querySelector('.ad-form__element--time');

  adForm.classList.add(adForm.classList[0] + '--disabled'); //деактивация формы до загрузки карты
  for (let children of adForm.children) {
    children.setAttribute('disabled', 'disabled');
  }

  const minPriceChangeByType = () => {  //ф-ия изменения минимальной цены в зависимости от типа жилья
    const newValue = REALTY_MIN_PRICES[adFormType.value];
    adFormPrice.placeholder = newValue;
    adFormPrice.setAttribute('min', newValue);
  }

  minPriceChangeByType();
  adFormType.addEventListener('change', minPriceChangeByType);

  adFormTime.addEventListener('change', (evt) => {  //синхронизации значений полей формы о времени заезда и выезда
    adFormTime.querySelector('#timein').value = evt.target.value;
    adFormTime.querySelector('#timeout').value = evt.target.value;
  });

  adFormAddress.setAttribute('readonly', 'readonly');
}

export const formActivation = () => { //ф-ия реактивации формы
  adForm.classList.remove(adForm.classList[0] + '--disabled');
  for (let children of adForm.children) {
    children.removeAttribute('disabled', 'enabled');
  }
}
export {adFormAddress};
