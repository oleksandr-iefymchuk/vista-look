import './ReviewFormModal.scss';
import { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';
import { GoogleLogin } from '@react-oauth/google';
import { Modal, Fade, TextField, Rating } from '@mui/material';

import {
  getReviewsThunk,
  addReviewThunk,
  updateReviewThunk
} from '../../../../../../../store/reviews/thunk';
import {
  getUserProfileThunk,
  googleUserRegistrationThunk
} from '../../../../../../../store/user/thunk';
import { showMessage } from '../../../../../../../store/user/actionCreators';

import ButtonWrapper from '../../../../../../common/Button/Button';
import CustomAlert from '../../../../../../common/CustomAlert/CustomAlert';

const ReviewFormModal = ({
  _id,
  openModalForm,
  closeModalForm,
  replyToUser,
  parentCommentId
}) => {
  const dispatch = useDispatch();
  const isMobileDevice = useMediaQuery({ maxWidth: 768 });
  const reviews = useSelector(store => store.reviews);
  const { name, email, isAuthenticated } = useSelector(store => store.user);

  const [rating, setRating] = useState(null);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const updateUser = () => {
    const tokenString = localStorage.getItem('userInfo');
    if (tokenString) {
      const token = JSON.parse(tokenString);
      dispatch(getUserProfileThunk(token));
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCloseAlert = () => setNotification(null);

  const handleSuccess = () => {
    setNotification({
      severity: 'success',
      message: 'Дякуємо за ваш відгук!'
    });
  };

  const handleError = error => {
    console.error('Error:', error);
    setNotification({
      severity: 'error',
      message: 'Не вдалося додати відгук. Будь ласка, спробуйте ще раз.'
    });
  };

  const handleAddReview = e => {
    e.preventDefault();

    const { name, email, message } = formData;
    if (!rating && !parentCommentId) {
      setNotification({
        severity: 'error',
        message: 'Будь ласка, оцініть товар перед відправкою відгуку'
      });
      return;
    }

    const newReview = {
      userName: name,
      userEmail: email,
      comment: message,
      date: new Date().toISOString()
    };

    if (parentCommentId) {
      const parentComment = reviews.find(
        review => review._id === parentCommentId
      );
      if (parentComment) {
        const updatedParentComment = {
          ...parentComment,
          replies: [...parentComment.replies, newReview]
        };

        dispatch(updateReviewThunk(updatedParentComment))
          .then(() => {
            handleSuccess();
            dispatch(getReviewsThunk());
          })
          .catch(handleError);
      }
    } else {
      newReview.productId = _id;
      newReview.rating = rating;
      newReview.replies = [];
      dispatch(addReviewThunk(newReview))
        .then(handleSuccess)
        .then(dispatch(getReviewsThunk()))
        .catch(handleError);
    }

    setFormData({
      name: '',
      email: '',
      message: ''
    });
    setRating(0);
    closeModalForm();
  };

  useEffect(() => {
    if (openModalForm) {
      setFormData({
        name: name || '',
        email: email || '',
        message: ''
      });
    }
  }, [email, name, openModalForm]);

  return (
    <Fragment>
      {notification && (
        <CustomAlert
          open={true}
          onClose={handleCloseAlert}
          severity={notification.severity}
          message={notification.message}
        />
      )}

      <Modal open={openModalForm} onClose={closeModalForm} closeAfterTransition>
        <Fade in={openModalForm}>
          <div className='form-container'>
            <div className='form-header'>
              {!parentCommentId && <h4>Додати новий відгук</h4>}
              {replyToUser && typeof replyToUser === 'string' && (
                <h4>Відповідь для {replyToUser}</h4>
              )}

              <ButtonWrapper
                buttonClassName='close-form-btn'
                icon='close'
                onClick={closeModalForm}
              />
            </div>
            {!isAuthenticated && (
              <div className='google-login'>
                {!isMobileDevice && <p>Увійти за допомогою</p>}
                <GoogleLogin
                  onSuccess={credentialResponse => {
                    const { name, email } = jwtDecode(
                      credentialResponse.credential
                    );
                    dispatch(googleUserRegistrationThunk({ name, email })).then(
                      updateUser
                    );
                  }}
                  type={isMobileDevice ? 'standard' : 'icon'}
                  size={isMobileDevice ? 'medium' : 'large'}
                  width='334px'
                  onError={error => {
                    console.log('Login Failed:', error);
                    dispatch(
                      showMessage(
                        'Не вдалося авторизуватися через Google',
                        'error'
                      )
                    );
                  }}
                />
              </div>
            )}

            <form className='form-add-review' onSubmit={handleAddReview}>
              <TextField
                type='text'
                className='review-input'
                label="Ім'я та прізвище"
                name='name'
                value={formData.name}
                onChange={handleChange}
                size='small'
                required
              />

              <TextField
                type='email'
                className='review-input'
                label='E-пошта'
                name='email'
                value={formData.email}
                onChange={handleChange}
                size='small'
                required
              />
              <TextField
                multiline
                className='review-input textarea'
                label='Повідомлення'
                name='message'
                value={formData.message}
                onChange={handleChange}
                size='small'
                rows={5}
                required
              />
              {!parentCommentId && (
                <div className='rating-stars'>
                  <p>Оцінити товар:</p>
                  <Rating
                    value={rating}
                    onChange={(event, newValue) => setRating(newValue)}
                  />
                </div>
              )}
              <ButtonWrapper
                buttonClassName='submit-review-btn'
                type='submit'
                buttonText={
                  !parentCommentId ? 'Залишити відгук' : 'Залишити відповідь'
                }
              />
            </form>
          </div>
        </Fade>
      </Modal>
    </Fragment>
  );
};

ReviewFormModal.propTypes = {
  _id: PropTypes.string,
  openModalForm: PropTypes.bool,
  closeModalForm: PropTypes.func,
  onSubmit: PropTypes.func,
  replyToUser: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  parentCommentId: PropTypes.string
};

export default ReviewFormModal;
