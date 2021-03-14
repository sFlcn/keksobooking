import {generatePopupFragment} from './popup.js';

const MAP_DEFAULT_ZOOM_LEVEL = 9;
const MAP_DEFAULT_CENTER = {
  lat: 35.89,
  lng: 139.88,
}
const MARKERS_SIZE = [42, 42];
const MARKERS_ANCHOR_POINT = [21, 42];
const MARKERS_ICON = './img/pin.svg';
const MAIN_MARKER_ICON = './img/main-pin.svg';

/* global L:readonly */
const mapCanvas = L.map('map-canvas');

const mainMarkerIcon = L.icon({ //свойства главного маркера
  iconUrl: MAIN_MARKER_ICON,
  iconSize: MARKERS_SIZE,
  iconAnchor: MARKERS_ANCHOR_POINT,
});
const mainMarker = L.marker( //создание главного маркера
  MAP_DEFAULT_CENTER,
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

const icon = L.icon({ //свойства вторичных маркеров
  iconUrl: MARKERS_ICON,
  iconSize: MARKERS_SIZE,
  iconAnchor: MARKERS_ANCHOR_POINT,
});
const markers = L.layerGroup().addTo(mapCanvas); //создание слоя для вторичных маркеров

const createMarkers = (objectsArray) => { // ф-ия создания вторичных маркеров
  markers.clearLayers();
  objectsArray.forEach((item) => {
    const {location: {lat, lng}} = item;
    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      },
    );
    marker
      .addTo(markers)
      .bindPopup(generatePopupFragment(item),
        {
          keepInView: true,
        },
      );
  });
}

const initMap = (onSuccess) => { // ф-ия активации карты leaflet
  mapCanvas
    .on('load', () => {
      onSuccess();
    })
    .setView(MAP_DEFAULT_CENTER, MAP_DEFAULT_ZOOM_LEVEL);

  L.tileLayer(  //подключение слоя карты Open Street Map
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(mapCanvas);

  mainMarker.addTo(mapCanvas); //добавление главного маркера на карту

  return mapCanvas;
}

const resetMap = () => {
  mainMarker.setLatLng(MAP_DEFAULT_CENTER);
  mapCanvas.closePopup();
  mapCanvas.setView(MAP_DEFAULT_CENTER, MAP_DEFAULT_ZOOM_LEVEL);
}

export {initMap, mainMarker, createMarkers, resetMap};
