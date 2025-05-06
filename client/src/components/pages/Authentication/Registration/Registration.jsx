import './Registration.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { registrationInputTemplates } from '@/constants/inputTemplates';
import { TextField } from '@mui/material';

import { ButtonWrapper } from '@/components/common/Button/Button';
import { registrationUserThunk } from '@/store/user/thunk';
import { showMessage } from '@/store/user/actionCreators';
import { Modal } from '@/components/common/Modal/Modal';

const Registration = ({ isOpen, onClose, toggleAuthenticationModal }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const dispatch = useDispatch();

  const handleInputChange =
    (id) =>
    ({ target: { value } }) => {
      setUserData({ ...userData, [id]: value });
    };

  const handleRegistration = (e) => {
    e.preventDefault();
    dispatch(registrationUserThunk(userData, onRegistrationSucces));
  };

  const onRegistrationSucces = () => {
    toggleAuthenticationModal();
    dispatch(showMessage('Успішна реєстрація! Перевірте вашу Е-пошту для активації облікового запису!', 'success'));
  };

  return (
    <Modal
      className='registration-block'
      isOpen={isOpen}
      onClose={() => {
        onClose();
        toggleAuthenticationModal();
      }}
      closeAfterTransition
    >
      <form className='registration-form' onSubmit={handleRegistration}>
        <div className='registration-form-header'>
          <h2>Реєстрація</h2>
          <ButtonWrapper
            buttonClassName='close-form-btn'
            icon='close'
            onClick={() => {
              onClose();
              toggleAuthenticationModal();
            }}
          />
        </div>
        <div className='list-registration-inputs'>
          {registrationInputTemplates.map(({ id, ...otherInputProps }) => {
            return (
              <TextField
                key={id}
                {...otherInputProps}
                value={userData[id]}
                onChange={handleInputChange(id)}
                size='small'
                className='registration-input'
                required
              />
            );
          })}
        </div>
        <ButtonWrapper type='submit' buttonText='Зареєструватись' buttonClassName='registration-btn' />
      </form>

      <div className='login'>
        <p>У вас вже є обліковий запис?</p>
        <ButtonWrapper buttonText='Увійти' buttonClassName='login-btn' onClick={toggleAuthenticationModal} />
      </div>
    </Modal>
  );
};

Registration.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  toggleAuthenticationModal: PropTypes.func
};

export default Registration;
