import './MobileMenu.scss';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { foterNavLinks } from '../../../constants/constants';
import { categories } from '../../../constants/categories';
import ButtonWrapper from '../../common/Button/Button';
import CatalogBatton from '../CatalogBatton/CatalogBatton';
import Logo from '../../common/Logo/Logo';
import {
  closeCategoryMenu,
  closeMobileMenu,
  toggleLogineModal,
  toggleMobileMenu
} from '../../../store/appReduser/actionCreators';
import { userLogout } from '../../../store/user/thunk';

const MobileMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { favorites, isAuthenticated, name, email } = useSelector(
    store => store.user
  );

  const isShowMobileMenu = useSelector(state => state.app.isShowMobileMenu);

  const navigationHome = () => {
    navigate('/');
    dispatch(toggleMobileMenu());
  };

  const navigationFavorites = () => {
    navigate('/favorites');
    dispatch(toggleMobileMenu());
  };

  const navigationStock = () => {
    navigate('/sale');
    dispatch(toggleMobileMenu());
  };

  const navigationProfile = () => {
    navigate('/profile');
    dispatch(toggleMobileMenu());
  };

  const handleCloseMenu = () => {
    dispatch(toggleMobileMenu());
    dispatch(closeCategoryMenu());
  };

  const toggleLoginVisibility = () => {
    dispatch(toggleLogineModal());
  };

  const handleLogout = () => {
    dispatch(userLogout());
  };

  useEffect(() => {
    if (isShowMobileMenu) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
      document.body.classList.remove('category-menu-open');
    }
  }, [isShowMobileMenu]);

  return (
    <Fragment>
      {isShowMobileMenu && (
        <div className='mobile-menu-overlay' onClick={handleCloseMenu}></div>
      )}
      <div className={`mobile-menu ${isShowMobileMenu ? 'show' : 'hide'}`}>
        <div className='mobile-menu-navigation'>
          <div className='mobile-menu-header'>
            <Logo onClick={navigationHome} />

            {isAuthenticated && (
              <div className='mobile-menu-user-name'>
                <p className='user-name'>{name}</p>
                <p className='user-email'>{email}</p>
              </div>
            )}

            <ButtonWrapper
              buttonClassName='mobile-menu-close-btn'
              icon='close'
              onClick={() => dispatch(closeMobileMenu())}
            />
          </div>
          <div className='mobile-user-box'>
            {!isAuthenticated ? (
              <ButtonWrapper
                buttonClassName='mobile-btn-user'
                buttonText='Увійти'
                icon='user'
                onClick={() => {
                  toggleLoginVisibility();
                  dispatch(toggleMobileMenu());
                }}
              />
            ) : (
              <Fragment>
                <ButtonWrapper
                  buttonClassName='mobile-btn-user logout'
                  buttonText='Вийти'
                  icon='logout'
                  onClick={handleLogout}
                />
                <ButtonWrapper
                  buttonClassName='mobile-btn-user'
                  buttonText='Кабінет'
                  icon='logged-user'
                  value={name.charAt(0)}
                  onClick={navigationProfile}
                />
              </Fragment>
            )}
            <ButtonWrapper
              buttonClassName='mobile-btn-favorite'
              imgClassName='favorites-img'
              buttonText='Улюблене'
              icon='favorites'
              value={favorites.length}
              onClick={navigationFavorites}
            />
          </div>
          <CatalogBatton
            buttonClassName='mobile-menu-catalog-btn'
            svgWrapperClassName='svg-wrapper'
            buttonText='Каталог товарів'
            categories={categories}
            iconBurger='menu'
          />
          <ButtonWrapper
            buttonClassName='mobile-btn-stock'
            buttonText='Акції'
            icon='sale'
            onClick={navigationStock}
          />
          <nav className='mobile-nav-bar'>
            <ul>
              {foterNavLinks.map(({ link, name }) => (
                <li key={link} onClick={() => dispatch(toggleMobileMenu())}>
                  <Link to={link}>{name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className='schedule'>
          Пн-Пт з 09:00 до 18:00 <br />
          Сб-Нд - вихідний
        </p>
      </div>
    </Fragment>
  );
};

MobileMenu.propTypes = {
  props: PropTypes.array,
  onClick: PropTypes.func,
  isShowMobileMenu: PropTypes.bool,
  closeMenu: PropTypes.func
};
export default MobileMenu;
