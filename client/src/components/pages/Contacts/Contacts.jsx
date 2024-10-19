import './Contacts.scss';
import 'leaflet/dist/leaflet.css';
import '../../../../fix-leaflet-icon';
import { useEffect } from 'react';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMediaQuery } from 'react-responsive';

import SvgIcon from '../../common/SvgIcon';

const Contacts = () => {
  const isMobileDevice = useMediaQuery({ maxWidth: 1024 });

  const location = {
    address: "вул. В'ячеслава Черновола, буд. 15, м.Миколаїв",
    coordinates: [46.955044, 32.071453]
  };

  const mapContainerStyle = {
    height: isMobileDevice ? '250px' : '400px',
    width: isMobileDevice ? '100%' : '50%'
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='contacts-wrap'>
      <h2>Контактна інформація</h2>
      <div className='contacts'>
        <div
          className='map'
          style={{
            width: mapContainerStyle.width,
            height: mapContainerStyle.height
          }}
        >
          <MapContainer
            style={{ height: '100%', width: '100%' }}
            center={location.coordinates}
            zoom={15}
          >
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

            <Marker position={location.coordinates}>
              <Popup>{location.address}</Popup>
            </Marker>
          </MapContainer>
        </div>
        <ul>
          <li>
            <SvgIcon name='location' color='#fff'></SvgIcon>
            {location.address}
          </li>
          <li>
            <SvgIcon name='phone' color='#fff'></SvgIcon>
            +38 (093) 94-264-23
          </li>
          <li>
            <SvgIcon name='email' color='#fff'></SvgIcon>
            bizmailer24@gmail.com
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contacts;
