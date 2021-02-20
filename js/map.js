const mapSection = document.querySelector('.map');
const adForm = document.querySelector('.ad-form');

if (mapSection && adForm) {
  const mapFilters = mapSection.querySelector('.map__filters');
  mapFilters.classList.add(mapFilters.classList[0] + '--disabled'); //деактивация фильтров карты
  for (let children of mapFilters.children) {
    children.setAttribute('disabled', 'disabled');
  }

  adForm.classList.add(adForm.classList[0] + '--disabled'); //деактивация формы
  for (let children of adForm.children) {
    children.setAttribute('disabled', 'disabled');
  }

  const mapActivation = () => {
    mapFilters.classList.remove(mapFilters.classList[0] + '--disabled');
    adForm.classList.remove(adForm.classList[0] + '--disabled');
    for (let children of mapFilters.children) {
      children.removeAttribute('disabled', 'enabled');
    }
    for (let children of adForm.children) {
      children.removeAttribute('disabled', 'enabled');
    }
  }

  // КАРТА
  /* global L:readonly */
  const mapCanvas = L.map('map-canvas')
    .on('load', () => {
      mapActivation();
    })
    .setView({
      lat: 35.6969,
      lng: 139.7471,
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(mapCanvas);
}
