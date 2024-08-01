import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'images/leaflet/marker-icon-2x.png',
  iconUrl: 'images/leaflet/marker-icon.png',
  shadowUrl: 'images/leaflet/marker-shadow.png'
});
