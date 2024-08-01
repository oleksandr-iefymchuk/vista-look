import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useDispatch } from 'react-redux';

import './UserBox.scss';

import Button from '../../../../../../common/Button/Button';
import { Fragment } from 'react';
import { userLogout } from '../../../../../../../store/user/thunk';
import { toggleLogineModal } from '../../../../../../../store/appReduser/actionCreators';

const UserBox = () => {
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const { name, basket, favorites, isAuthenticated } = useSelector(
    store => store.user
  );

  const profileModalRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigationBasket = () => navigate('/basket');
  const navigationFavorites = () => navigate('/favorites');
  const navigationProfile = () => {
    navigate('/profile');
    setIsProfileModalVisible(false);
  };

  const isMobileDevice = useMediaQuery({ maxWidth: 768 });

  const totalQuantity = basket?.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const toggleLoginVisibility = () => {
    dispatch(toggleLogineModal());
  };

  const toggleLogoutModalVisibility = () => {
    setIsProfileModalVisible(!isProfileModalVisible);
  };

  const handleLogout = () => {
    dispatch(userLogout()).then(setIsProfileModalVisible(false));
    navigate('/');
  };

  const handleOutsideClick = event => {
    if (
      profileModalRef.current &&
      !profileModalRef.current.contains(event.target) &&
      !event.target.classList.contains('user-box-btn')
    ) {
      setIsProfileModalVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className='user-box'>
      {!isMobileDevice && (
        <Fragment>
          <Button
            buttonClassName='user-box-btn'
            imgClassName='favorites-img'
            icon='favorites'
            value={favorites.length}
            onClick={navigationFavorites}
          />
          {isAuthenticated ? (
            <Button
              buttonClassName='user-box-btn auth'
              icon='expand'
              onClick={toggleLogoutModalVisibility}
              buttonText={name.charAt(0).toUpperCase()}
            ></Button>
          ) : (
            <Button
              buttonClassName='user-box-btn'
              icon='user'
              onClick={toggleLoginVisibility}
            />
          )}
          <div
            className={`profile-modal ${isProfileModalVisible && 'show'}`}
            ref={profileModalRef}
          >
            <Button
              buttonClassName='user-box-btn profile'
              buttonText='Особистий кабінет'
              onClick={navigationProfile}
            />
            <Button
              buttonClassName='user-box-btn profile'
              buttonText='Вихід'
              onClick={handleLogout}
            />
          </div>
        </Fragment>
      )}

      <Button
        buttonClassName='buttonBlock'
        icon='basket'
        value={totalQuantity}
        onClick={navigationBasket}
      />
    </div>
  );
};

export default UserBox;
