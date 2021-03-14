function disableFormFields(formElement, cssClassForForm) {  //ф-ия для ДЕактивации полей формы
  for (let formField of formElement.elements) {
    formField.setAttribute('disabled', 'disabled');
  }
  formElement.classList.add(cssClassForForm);
}
function enableFormFields(formElement, cssClassForForm) {  //ф-ия для активации полей формы
  for (let formField of formElement.elements) {
    formField.removeAttribute('disabled');
  }
  formElement.classList.remove(cssClassForForm);
}

function changePlaceholderAndMin(newValue, formField) {
  formField.placeholder = newValue;
  formField.setAttribute('min', newValue);
}


function changeFieldsValue(newValue, ...fields) {
  for (let field of fields) {
    field.value = newValue;
  }
}

function fieldValueValidation(formField, minValue, maxValue) {
  const fieldValue = formField.value;
  if (fieldValue < minValue) {
    formField.setCustomValidity(`Значение не менее ${minValue}`);
  } else if (fieldValue > maxValue) {
    formField.setCustomValidity(`Значение не более ${maxValue}`);
  } else {
    formField.setCustomValidity('');
  }
}

function fieldValueLengthValidation(formField, minLength, maxLength) {
  const valueLength = formField.value.length;
  if (valueLength < minLength) {
    formField.setCustomValidity(`Введите не менее ${minLength} символов (ещё ${minLength - valueLength})`);
  } else if (valueLength > maxLength) {
    formField.setCustomValidity(`Введите не более ${maxLength} символов (ещё ${maxLength - valueLength})`);
  } else {
    formField.setCustomValidity('');
  }
}

function checkCapacity(сountField, сapacityField, capacityMinimum, сountMaximum, specialMessage) {
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

export {disableFormFields, enableFormFields, changePlaceholderAndMin, changeFieldsValue, fieldValueValidation, fieldValueLengthValidation, checkCapacity};
