
const adFormType = document.querySelector('#type');
const adFormPrice = document.querySelector('#price');
const adFormTime = document.querySelector('.ad-form__element--time');

const REALTY_MIN_PRICES = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
};

//ф-ия изменения минимальной цены в зависимости от типа жилья
const minPriceChangeByType = () => {
  let newValue = REALTY_MIN_PRICES[adFormType.value];
  adFormPrice.placeholder = newValue;
  adFormPrice.setAttribute('min', newValue);
}

if (adFormType && adFormPrice) {
  minPriceChangeByType();
  adFormType.addEventListener('change', minPriceChangeByType);
}

//синхронизации значений полей формы о времени заезда и выезда
if (adFormTime) {
  adFormTime.addEventListener('change', (evt) => {
    adFormTime.querySelector('#timein').value = evt.target.value;
    adFormTime.querySelector('#timeout').value = evt.target.value;
  });
}
