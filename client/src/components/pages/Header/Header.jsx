import './Header.scss';
import HeaderControlPanel from './HeaderControlPanel/HeaderControlPanel';
import HeaderNavigation from './HeaderNavigation/HeaderNavigation';

const Header = () => {
  return (
    <header className='header-wrap'>
      <HeaderControlPanel />
      <div className='navigation-container'>
        <HeaderNavigation />
      </div>
    </header>
  );
};

export default Header;
