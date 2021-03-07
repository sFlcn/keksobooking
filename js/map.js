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
const mainMarkerIcon = L.icon({
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
const icon = L.icon({
  iconUrl: MARKERS_ICON,
  iconSize: MARKERS_SIZE,
  iconAnchor: MARKERS_ANCHOR_POINT,
});

// КАРТА
const initMap = (rentalList, onSuccess) => {
  /* global L:readonly */
  const mapCanvas = L.map('map-canvas') //активация карты leaflet
    .on('load', () => {
      onSuccess();
    })
    .setView(TOKYO_CENTER, TOKYO_ZOOM_LEVEL);

  L.tileLayer(  //подключение слоя карты Open Street Map
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(mapCanvas);

  mainMarker.addTo(mapCanvas); //создание главного маркера

  rentalList.forEach((item) => { //создание вторичных маркеров
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
}

export {initMap, mainMarker};
