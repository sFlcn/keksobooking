import {getLatLngRoundedString} from './util.js';
import {temporaryRentalList} from './data.js';
import {generatePopupFragment} from './popup.js';
import {formActivation, adFormAddress} from './form.js';

const mapSection = document.querySelector('.map');
const TOKYO_ZOOM_LEVEL = 12;
const TOKYO_CENTER = {
  lat: 35.6765,
  lng: 139.7494,
}

if (mapSection) {
  const mapFilters = mapSection.querySelector('.map__filters');
  mapFilters.classList.add(mapFilters.classList[0] + '--disabled'); //деактивация фильтров карты
  for (let children of mapFilters.children) {
    children.setAttribute('disabled', 'disabled');
  }

  const mapActivation = () => { //ф-ия реактивации фильтров карты
    mapFilters.classList.remove(mapFilters.classList[0] + '--disabled');
    for (let children of mapFilters.children) {
      children.removeAttribute('disabled', 'enabled');
    }
  }

  // КАРТА
  /* global L:readonly */
  const mapCanvas = L.map('map-canvas') //активация карты leaflet
    .on('load', () => {
      mapActivation();  //активация фильтров
      formActivation(); //активация формы
      adFormAddress.value = getLatLngRoundedString(TOKYO_CENTER);
    })
    .setView(TOKYO_CENTER, TOKYO_ZOOM_LEVEL);

  L.tileLayer(  //подключение слоя карты Open Street Map
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(mapCanvas);

  const mainMarkerIcon = L.icon({ //создание главного маркера
    iconUrl: './img/main-pin.svg',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });
  const mainMarker = L.marker(
    TOKYO_CENTER,
    {
      draggable: true,
      icon: mainMarkerIcon,
    },
  );
  mainMarker.addTo(mapCanvas);

  temporaryRentalList.forEach((item, index) => {
    const {location: {x, y}} = item;

    const icon = L.icon({
      iconUrl: './img/pin.svg',
      iconSize: [42, 42],
      iconAnchor: [21, 42],
    });
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
      .bindPopup(generatePopupFragment(temporaryRentalList[index]),
        {
          keepInView: true,
        },
      );
  });

  mainMarker.on('moveend', (evt) => {
    adFormAddress.value = getLatLngRoundedString(evt.target.getLatLng());
  });
}
