import './Footer.scss';
import { Link, useNavigate } from 'react-router-dom';
import { foterNavLinks } from '../../../constants/constants';
import SvgIcon from '../../common/SvgIcon';
import Logo from '../../common/Logo/Logo';

const Footer = () => {
  const navigate = useNavigate();
  const navigationHome = () => navigate('/');
  return (
    <div className='footer-wrap'>
      <nav className='footer-nav-bar'>
        <h4>Клієнтам</h4>
        <ul>
          {foterNavLinks.map(({ link, name }) => (
            <li key={link}>
              <Link to={link}>{name}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className='footer-contacts'>
        <h4>Контакти</h4>
        <ul>
          <li>
            <SvgIcon name='phone' color='#fff'></SvgIcon>+38 (050) 174 70 15
          </li>
          <li>
            <SvgIcon width='22px' name='email' color='#fff'></SvgIcon>
            bizmailer24@gmail.com
          </li>
        </ul>
      </div>
      <div className='copyright'>
        <Logo onClick={navigationHome} />
        <p>&copy; 2024 Інтернет-магазин жіночого одягу «VistaLook»</p>
      </div>
    </div>
  );
};

export default Footer;
