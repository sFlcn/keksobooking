const switchEnableForm = (formElement, enable = 'true') => {  //ф-ия (де)активации элементов формы
  if (enable) {
    for (let formField of formElement.elements) {
      formField.removeAttribute('disabled');
    }
  } else {
    for (let formField of formElement.elements) {
      formField.setAttribute('disabled', 'disabled');
    }
  }
};

const addMinPriceChangeByTypeHandler = (formTypeField, formPriceField, realtyPropertiesObject) => {  //обработчик синхронизации поля цены в зависимости от типа жилья
  formTypeField.addEventListener('change', (evt) => {
    const newValue = realtyPropertiesObject[evt.target.value]['realtyPrice'];
    formPriceField.placeholder = newValue;
    formPriceField.setAttribute('min', newValue);
  });
};

const addFieldsSyncHandler = (listenerTarget, ...fields) => { //обработчик синхронизации значений полей
  listenerTarget.addEventListener('change', (evt) => {
    for (let field of fields) {
      field.value = evt.target.value;
    }
  });
};

export {switchEnableForm, addMinPriceChangeByTypeHandler, addFieldsSyncHandler};
