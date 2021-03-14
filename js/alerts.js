import {isEscEvent} from './util.js';

const DEFAULT_VANISHING_TIME = 3000;
const DEFAULT_CSS_CLASS_FOR_ALERT_TEXT = 'alert-text';

const showSimpleAlert = (temlateElement, parentElement) => {
  const alert = temlateElement.cloneNode(true);
  parentElement.appendChild(alert);

  const onAlertEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeAlert();
    }
  };

  const onAlertClick = (evt) => {
    evt.preventDefault();
    closeAlert();
  }

  const closeAlert = () => {
    document.removeEventListener('keydown', onAlertEscKeydown);
    document.removeEventListener('click', onAlertClick);
    alert.remove();
  }

  document.addEventListener('keydown', onAlertEscKeydown);
  document.addEventListener('click', onAlertClick);
  return alert;
}

const showCustomVanishingAlert = (
  temlateElement,
  parentElement,
  time = DEFAULT_VANISHING_TIME,
  contentCssClass = DEFAULT_CSS_CLASS_FOR_ALERT_TEXT,
  htmlText,
) => {
  const alert = temlateElement.cloneNode(true);
  if (contentCssClass && htmlText) {
    alert.querySelector(`.${contentCssClass}`).innerHTML = htmlText;
  }
  parentElement.appendChild(alert);
  setTimeout(
    () => {alert.remove()},
    time,
  );
}

export {showSimpleAlert, showCustomVanishingAlert};
