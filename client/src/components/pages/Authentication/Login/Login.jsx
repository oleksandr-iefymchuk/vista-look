import './Login.scss';
import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

import { loginInputTemplates } from '@/constants/inputTemplates';
import { TextField } from '@mui/material';

import { ButtonWrapper } from '../../../common/Button/Button';
import { getUserProfileThunk, googleUserRegistrationThunk, loginUserThunk } from '@/store/user/thunk';

import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { showMessage } from '@/store/user/actionCreators';
import { BREAKPOINTS } from '@/constants/constants';
import { Modal } from '@/components/common/Modal/Modal';

const Login = ({ isOpen, onClose, toggleAuthenticationModal }) => {
  const dispatch = useDispatch();
  const isMobileDevice = useMediaQuery({ maxWidth: BREAKPOINTS.MOBILE });
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange =
    (id) =>
    ({ target: { value } }) => {
      setUserData({ ...userData, [id]: value });
    };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUserThunk(userData, onClose));
  };

  const updateUser = () => {
    onClose();
    const tokenString = localStorage.getItem('userInfo');
    if (tokenString) {
      const token = JSON.parse(tokenString);
      dispatch(getUserProfileThunk(token));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className='login-block'>
      <form className='login-form' onSubmit={handleLogin}>
        <div className='login-form-header'>
          <h2>Вхід</h2>
          <ButtonWrapper buttonClassName='close-form-btn' icon='close' onClick={onClose} />
        </div>
        <div className='list-login-inputs'>
          {loginInputTemplates.map(({ id, ...otherInputProps }) => {
            return (
              <TextField
                key={id}
                {...otherInputProps}
                value={userData[id]}
                onChange={handleInputChange(id)}
                size='small'
                className='login-input'
                required
              />
            );
          })}
        </div>
        <ButtonWrapper type='submit' buttonText='Увійти' buttonClassName='login-btn' />
      </form>
      <div className='registration'>
        <p>У вас немає облікового запису?</p>
        <ButtonWrapper buttonText='Зареєструватись' buttonClassName='registration-btn' onClick={toggleAuthenticationModal} />
      </div>
      <div className='or'>
        <span className='separator'></span>
        <p>або</p>
        <span className='separator'></span>
      </div>

      <div className='google-login'>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const { name, email } = jwtDecode(credentialResponse.credential);
            dispatch(googleUserRegistrationThunk({ name, email }, updateUser));
          }}
          size='medium'
          width={isMobileDevice ? '360px' : '330px'}
          onError={(error) => {
            console.log('Login Failed:', error);
            dispatch(showMessage('Не вдалося авторизуватися через Google', 'error'));
          }}
        />
      </div>
    </Modal>
  );
};

Login.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  toggleAuthenticationModal: PropTypes.func
};

export default Login;
