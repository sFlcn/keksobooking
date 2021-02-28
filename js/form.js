const disableFormFields = (formElement) => {  //ф-ия для ДЕактивации полей формы
  for (let formField of formElement.elements) {
    formField.setAttribute('disabled', 'disabled');
  }
};
const enableFormFields = (formElement) => {  //ф-ия для активации полей формы
  for (let formField of formElement.elements) {
    formField.removeAttribute('disabled');
  }
};

const changePlaceholderAndMin = (newValue, formField) => {
  formField.placeholder = newValue;
  formField.setAttribute('min', newValue);
};


const changeFieldsValue = (newValue, ...fields) => {
  for (let field of fields) {
    field.value = newValue;
  }
};

export {disableFormFields, enableFormFields, changePlaceholderAndMin, changeFieldsValue};
