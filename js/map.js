import {getLatLngRoundedString} from './util.js';
import {generatePopupFragment} from './popup.js';

const TOKYO_ZOOM_LEVEL = 12;
const TOKYO_CENTER = {
  lat: 35.6765,
  lng: 139.7494,
}
const MARKERS_SIZE = [42, 42];
const MARKERS_ANCHOR_POINT = [21, 42];
const MARKERS_ICON = './img/pin.svg';
const MAIN_MARKER_ICON = './img/main-pin.svg';
const MAP_LOADED_EVENT = 'map-loaded';

// КАРТА
const initMap = (addressField, rentalList) => {
  /* global L:readonly */
  const mapCanvas = L.map('map-canvas') //активация карты leaflet
    .on('load', () => {
      document.dispatchEvent(new Event(MAP_LOADED_EVENT));
    })
    .setView(TOKYO_CENTER, TOKYO_ZOOM_LEVEL);

  L.tileLayer(  //подключение слоя карты Open Street Map
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(mapCanvas);

  const mainMarkerIcon = L.icon({ //создание главного маркера
    iconUrl: MAIN_MARKER_ICON,
    iconSize: MARKERS_SIZE,
    iconAnchor: MARKERS_ANCHOR_POINT,
  });
  const mainMarker = L.marker(
    TOKYO_CENTER,
    {
      draggable: true,
      icon: mainMarkerIcon,
    },
  );
  mainMarker.addTo(mapCanvas);

  const icon = L.icon({ //создание вторичных маркеров
    iconUrl: MARKERS_ICON,
    iconSize: MARKERS_SIZE,
    iconAnchor: MARKERS_ANCHOR_POINT,
  });
  rentalList.forEach((item) => {
    const {location: {x, y}} = item;
    const marker = L.marker(
      {
        lat: x,
        lng: y,
      },
      {
        icon,
      },
    );
    marker
      .addTo(mapCanvas)
      .bindPopup(generatePopupFragment(item),
        {
          keepInView: true,
        },
      );
  });

  mainMarker.on('moveend', (evt) => {
    addressField.value = getLatLngRoundedString(evt.target.getLatLng());  //вывод координат главного маркера во внешний элемент (поле формы)
  });
}

export {initMap, MAP_LOADED_EVENT};
