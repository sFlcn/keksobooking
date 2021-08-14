const enableFormFields = (formElement, cssClassForForm) => {  //ф-ия для активации полей формы
  for (let formField of formElement.elements) {
    formField.removeAttribute('disabled');
  }
  formElement.classList.remove(cssClassForForm);
}

const changePlaceholderAndMin = (newValue, formField) => {
  formField.placeholder = newValue;
  formField.setAttribute('min', newValue);
}


const changeFieldsValue = (newValue, ...fields) =>  {
  for (let field of fields) {
    field.value = newValue;
  }
}

const validateFieldValue = (formField, minValue, maxValue) => {
  const fieldValue = formField.value;
  if (+fieldValue < +minValue) {
    formField.setCustomValidity(`Значение не менее ${minValue}`);
  } else if (+fieldValue > +maxValue) {
    formField.setCustomValidity(`Значение не более ${maxValue}`);
  } else {
    formField.setCustomValidity('');
  }
}

const validateFieldValueLength = (formField, minLength, maxLength) => {
  const valueLength = formField.value.length;
  if (valueLength < minLength) {
    formField.setCustomValidity(`Введите не менее ${minLength} символов (ещё ${minLength - valueLength})`);
  } else if (valueLength > maxLength) {
    formField.setCustomValidity(`Введите не более ${maxLength} символов (ещё ${maxLength - valueLength})`);
  } else {
    formField.setCustomValidity('');
  }
}

const checkCapacity = (сountField, сapacityField, capacityMinimum, сountMaximum, specialMessage) => {
  if (сountField.value === сountMaximum && сapacityField.value !== capacityMinimum) {
    сapacityField.setCustomValidity(specialMessage);
    сountField.setCustomValidity('');
  } else if ((сapacityField.value === capacityMinimum && сountField.value !== сountMaximum) || сountField.value < сapacityField.value) {
    сountField.setCustomValidity('Выбрано недостаточное значение');
    сapacityField.setCustomValidity('');
  } else {
    сountField.setCustomValidity('');
    сapacityField.setCustomValidity('');
  }
}

export {enableFormFields, changePlaceholderAndMin, changeFieldsValue, validateFieldValue, validateFieldValueLength, checkCapacity};
