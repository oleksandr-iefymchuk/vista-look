import './PersonalInfo.scss';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  personalInfoInputTemplates,
  passwordInputTemplates
} from '../../../../../constants/inputTemplates';
import { TextField } from '@mui/material';
import ButtonWrapper from '../../../../common/Button/Button';
import {
  updateUserPasswordThunk,
  updateUserProfileThunk
} from '../../../../../store/user/thunk';
import { showMessage } from '../../../../../store/user/actionCreators';
import SvgIcon from '../../../../common/SvgIcon';
import TextMaskCustom from '../MaskedInput/MaskedInput';

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const tokenString = localStorage.getItem('userInfo');

  const { name, surname, email, phone, city, address, authType } = useSelector(
    store => store.user
  );

  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    city: '',
    address: ''
  });
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    passwordConfirmation: ''
  });

  const handlePersonalInfoChange =
    id =>
    ({ target: { value } }) => {
      setPersonalInfo({ ...personalInfo, [id]: value });
    };

  const handlePasswordChange =
    id =>
    ({ target: { value } }) => {
      setPassword({ ...password, [id]: value });
    };

  const handleUpdateProfile = e => {
    e.preventDefault();
    if (tokenString) {
      const token = JSON.parse(tokenString);
      dispatch(updateUserProfileThunk(personalInfo, token, onUpdateUserSucces));
    }
  };

  const onUpdateUserSucces = () => {
    dispatch(showMessage('Особиста інформація успішно оновлена!', 'success'));
  };

  const handleUpdatePassword = e => {
    e.preventDefault();
    if (password.newPassword === password.currentPassword) {
      dispatch(
        showMessage(
          'Старий пароль і новий пароль не можуть співпадати!',
          'error'
        )
      );
      return;
    }

    if (password.newPassword !== password.passwordConfirmation) {
      dispatch(
        showMessage(
          'Новий пароль і підтвердження пароля не співпадають!',
          'error'
        )
      );
      return;
    }
    if (tokenString) {
      const token = JSON.parse(tokenString);
      const passwordData = {
        currentPassword: password.currentPassword,
        newPassword: password.newPassword
      };

      dispatch(updateUserPasswordThunk(passwordData, token));
    }
  };

  useEffect(() => {
    setPersonalInfo({
      name: name || '',
      surname: surname || '',
      email: email || '',
      phone: phone || '',
      city: city || '',
      address: address || ''
    });
  }, [name, surname, email, phone, city, address]);

  return (
    <div className='personal-info-wrap'>
      <form className='personal-info-form' onSubmit={handleUpdateProfile}>
        <h3>Загальна інформація</h3>
        <div className='list-personal-info-inputs'>
          {personalInfoInputTemplates.map(({ id, ...otherInputProps }) => {
            return (
              <TextField
                key={id}
                {...otherInputProps}
                value={personalInfo[id]}
                onChange={handlePersonalInfoChange(id)}
                size='small'
                className='personal-info-input'
                variant='standard'
                disabled={id === 'email'}
                InputProps={
                  id === 'phone' ? { inputComponent: TextMaskCustom } : {}
                }
              />
            );
          })}
        </div>
        <ButtonWrapper
          type='submit'
          buttonText='Зберегти зміни'
          buttonClassName='personal-info-btn'
        />
      </form>

      {authType !== 'google' && (
        <form className='password-form' onSubmit={handleUpdatePassword}>
          <h3>Замінити пароль</h3>
          <div className='list-password-inputs'>
            {passwordInputTemplates.map(({ id, ...otherInputProps }) => {
              return (
                <TextField
                  key={id}
                  {...otherInputProps}
                  value={password[id]}
                  onChange={handlePasswordChange(id)}
                  size='small'
                  className='personal-info-input'
                  variant='standard'
                  required
                  InputProps={{
                    endAdornment:
                      (id === 'newPassword' || id === 'passwordConfirmation') &&
                      password.newPassword === password.passwordConfirmation &&
                      password.newPassword.trim() !== '' ? (
                        <SvgIcon name='check' color='#26b663' />
                      ) : null
                  }}
                />
              );
            })}
          </div>
          <ButtonWrapper
            type='submit'
            buttonText='Замінити пароль'
            buttonClassName='personal-info-btn'
          />
        </form>
      )}
    </div>
  );
};

export default PersonalInfo;
