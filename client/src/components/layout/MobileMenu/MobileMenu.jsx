import css from './MobileMenu.module.scss';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { foterNavLinks } from '../../../constants/constants';
import { categories } from '../../../constants/categories';
import { ButtonWrapper } from '../../common/Button/Button';
import { Logo } from '../../common/Logo/Logo';
import { closeMobileMenu, toggleLogineModal, toggleMobileMenu } from '../../../store/appReduser/actionCreators';
import { userLogout } from '../../../store/user/thunk';
import { Modal } from '@/components/common/Modal/Modal';
import cn from 'classnames';
import { MobileCategoryListModal } from './MobileCategoryListModal/MobileCategoryListModal';
import { ROUTES } from '@/constants/routes';

const MobileMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  const { favorites, isAuthenticated, name, email } = useSelector((store) => store.user);
  const isShowMobileMenu = useSelector((state) => state.app.isShowMobileMenu);

  const handleNavigate = (path) => {
    navigate(path);
    dispatch(toggleMobileMenu());
  };

  const handleCloseMenu = () => {
    dispatch(toggleMobileMenu());
  };

  const toggleLoginVisibility = () => {
    dispatch(toggleLogineModal());
  };

  const handleLogout = () => {
    dispatch(userLogout());
  };

  return (
    <Modal isOpen={isShowMobileMenu} onClose={handleCloseMenu} isMobileMenu className={css.modal}>
      <div className={css.navigation}>
        <div className={css.header}>
          <Logo onClick={() => handleNavigate(ROUTES.HOME)} />
          {isAuthenticated && (
            <div className={css.userName}>
              <p className={css.name}>{name}</p>
              <p className={css.email}>{email}</p>
            </div>
          )}
          <ButtonWrapper buttonClassName={css.closeBtn} icon='close' onClick={() => dispatch(closeMobileMenu())} />
        </div>

        <div className={css.userBox}>
          {!isAuthenticated ? (
            <ButtonWrapper
              buttonClassName={css.user}
              buttonText='Увійти'
              icon='user'
              onClick={() => {
                toggleLoginVisibility();
                dispatch(toggleMobileMenu());
              }}
            />
          ) : (
            <Fragment>
              <ButtonWrapper buttonClassName={cn(css.user, css.logout)} buttonText='Вийти' icon='logout' onClick={handleLogout} />
              <ButtonWrapper
                buttonClassName={css.user}
                buttonText='Кабінет'
                icon='logged-user'
                value={name.charAt(0)}
                onClick={() => handleNavigate(ROUTES.PROFILE)}
              />
            </Fragment>
          )}
          <ButtonWrapper
            buttonClassName={css.favorite}
            imgClassName='favorites-img'
            buttonText='Улюблене'
            icon='favorites'
            value={favorites.length}
            onClick={() => handleNavigate(ROUTES.FAVORITES)}
          />
        </div>
        <ButtonWrapper
          buttonClassName={css.catalog}
          icon={!showCategoryMenu ? 'menu' : 'close'}
          onClick={() => setShowCategoryMenu(true)}
          buttonText='Каталог товарів'
        />
        <ButtonWrapper buttonClassName={css.stock} buttonText='Акції' icon='sale' onClick={() => handleNavigate(ROUTES.SALE)} />
        <nav className={css.navBar}>
          <ul>
            {foterNavLinks.map(({ link, defaultMessage }) => (
              <li key={link} onClick={() => dispatch(toggleMobileMenu())}>
                <Link to={link}>{defaultMessage}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className={css.schedule}>
        Пн-Пт з 09:00 до 18:00 <br />
        Сб-Нд - вихідний
      </p>
      <MobileCategoryListModal categories={categories} isOpen={showCategoryMenu} onClose={() => setShowCategoryMenu(false)} />
    </Modal>
  );
};

MobileMenu.propTypes = {
  props: PropTypes.array,
  onClick: PropTypes.func,
  isShowMobileMenu: PropTypes.bool,
  closeMenu: PropTypes.func
};
export default MobileMenu;
