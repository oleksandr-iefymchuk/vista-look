import './Navigation.scss';
import { Link } from 'react-router-dom';

import { headerNavbarLinks } from '../../../../../constants/constants';
import SvgIcon from '../../../../common/SvgIcon';

const Navigation = () => {
  return (
    <div className='nav-wrap'>
      <div className='control-panel'>
        <nav className='nav-bar'>
          <ul>
            {headerNavbarLinks.map(({ link, name }) => (
              <li key={link}>
                <Link to={link}>{name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className='contacts'>
          <p>
            <SvgIcon name='phone' color='#fff'></SvgIcon> +38 (093) 94-264-23
          </p>
          <p>
            <SvgIcon width='22px' name='email' color='#fff'></SvgIcon>{' '}
            bizmailer24@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
