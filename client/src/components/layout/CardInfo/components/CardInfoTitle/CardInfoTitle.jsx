import './CardInfoTitle.scss';
import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import Rating from '@mui/material/Rating';

import { messengers } from '../../../../../constants/constants';
import ButtonWrapper from '../../../../common/Button/Button';
import { useTabContext } from '../../../../../contexts/TabControlContext';

const CardInfoTitle = ({ _id, productCode, title, quantity }) => {
  const isMobileDevice = useMediaQuery({ maxWidth: 1024 });
  const [isOpen, setIsOpen] = useState(false);
  const { setValue } = useTabContext();

  const reviews = useSelector(store => store.reviews);
  const productReviews = reviews.filter(review => review.productId === _id);

  const calculateAverageRating = reviews => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  const togglePopup = () => {
    if (!isOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
    setIsOpen(!isOpen);
  };

  const openNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const scrollToReviews = () => {
    const reviewsElement = document.getElementById('reviews');
    if (reviewsElement) {
      reviewsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const timeoutId = setTimeout(() => {
        setValue('reviews');
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  };

  const getReviewsWordForm = count => {
    const cases = [2, 0, 1, 1, 1, 2];
    return ['відгук', 'відгуки', 'відгуків'][
      count % 100 > 4 && count % 100 < 20
        ? 2
        : cases[count % 10 < 5 ? count % 10 : 5]
    ];
  };

  return (
    <div className='card-info-title'>
      <div className='title'>
        <h2>{title}</h2>
        {isOpen && (
          <Fragment>
            <div className='share-overlay' onClick={togglePopup}></div>
            <div className='share-popup'>
              <div className='share-popup-header'>
                <h3>Поділитися</h3>
                <ButtonWrapper
                  buttonClassName='close-popup-btn'
                  icon='close'
                  onClick={togglePopup}
                />
              </div>
              {messengers(window.location.href).map((messenger, index) => (
                <ButtonWrapper
                  buttonClassName='messenger-btn'
                  icon={messenger.icon}
                  key={index}
                  onClick={() => openNewTab(messenger.link)}
                />
              ))}
            </div>
          </Fragment>
        )}
      </div>
      <div className='product-code'>
        {!isMobileDevice && (
          <p
            className={
              quantity !== 0 ? 'available-product' : 'unavailable-product'
            }
          >
            {quantity !== 0 ? 'В наявності' : 'Немає в наявності'}
          </p>
        )}
        <p>
          Код: <span>{productCode}</span>{' '}
        </p>
        <div className='reviews'>
          {productReviews.length > 0 ? (
            <Fragment>
              <Rating
                className='rating'
                value={calculateAverageRating(productReviews)}
                precision={0.5}
                readOnly
              />
              <p className='link-comment' onClick={scrollToReviews}>
                {`${productReviews.length} ${getReviewsWordForm(
                  productReviews.length
                )}`}
              </p>
            </Fragment>
          ) : (
            <p
              className='link-comment'
              onClick={scrollToReviews}
            >{`Написати відгук`}</p>
          )}
        </div>
        <ButtonWrapper
          buttonClassName='share-btn'
          icon='share'
          onClick={togglePopup}
        />
      </div>
    </div>
  );
};

CardInfoTitle.propTypes = {
  _id: PropTypes.string.isRequired,
  productCode: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  reviews: PropTypes.array
};

export default CardInfoTitle;
